import { Euler, MathUtils, Quaternion, Vector3, type Camera, type Object3D } from "three";

import type { HeadPointer } from "./useHeadPointer";
import { ROBOT_TUNING as T } from "./robotBehaviors";

/**
 * Rastreamento do cursor pela cabeça, composto POR CIMA do clipe de animação.
 *
 * Estrutura real do GLB (inspecionada): ... Torso > Neck > Head (osso) > Head (mesh rígido).
 * O osso "Head" é animado (rotação) por Idle, Yes, ThumbsUp e Wave; o mixer reescreve o
 * quaternion dele a cada `update()`. Por isso a composição é feita DEPOIS do mixer, no mesmo
 * frame, como um delta que nunca é acumulado:
 *
 *     head.quaternion  ←  delta · head.quaternion(pose do clipe)
 *
 * O delta é definido no referencial do grupo externo do robô ("frente" = +Z, "cima" = +Y,
 * yaw + = olhar para a direita da tela) e convertido para o espaço local do pai do osso
 * (Neck): delta = M⁻¹ · R · M, com M = Q_outer⁻¹ · Q_pai. Assim não dependemos dos eixos
 * locais do esqueleto (que vêm rotacionados da exportação do Blender).
 *
 * ATENÇÃO — o mixer do three só escreve num osso quando o valor acumulado MUDOU desde o frame
 * anterior (otimização do PropertyMixer). Numa pose constante (trecho parado de um clipe,
 * dt = 0) ele NÃO reescreve a cabeça e o delta se acumularia a cada frame. Por isso guardamos
 * a pose "limpa" (`clean`) e o último resultado aplicado (`applied`): se o quaternion do osso
 * ainda é exatamente o `applied`, o mixer não escreveu nada e `clean` continua válido; se é
 * diferente, o mixer escreveu uma pose nova e ela vira o novo `clean`.
 *
 * Só o osso Head é tocado: corpo, pernas e braços continuam 100% por conta do clipe.
 */

const D2R = Math.PI / 180;

export interface HeadInput {
  pointer: HeadPointer;
  camera: Camera;
  /** Tamanho do canvas (px) e distância do topo dele ao topo do viewport (px). */
  width: number;
  height: number;
  top: number;
  /** Yaw atual do corpo (graus). A cabeça gira relativa a ele. */
  bodyYaw: number;
  /** Intensidade dos ângulos (1 = desktop). */
  scale: number;
  /** Segue o cursor? (false = volta ao repouso, suavemente). */
  enabled: boolean;
  /** Robô invisível: acompanha o alvo sem suavização (sem "re-mirar" ao reaparecer). */
  snap: boolean;
}

export class HeadTracker {
  private yaw = 0; // graus, relativo ao corpo
  private pitch = 0; // graus, + = olhar para baixo

  // Temporários reutilizados (nada é alocado no loop de render).
  private readonly v1 = new Vector3();
  private readonly v2 = new Vector3();
  private readonly qParent = new Quaternion();
  private readonly qOuter = new Quaternion();
  private readonly qM = new Quaternion();
  private readonly qInv = new Quaternion();
  private readonly qLook = new Quaternion();
  private readonly euler = new Euler(0, 0, 0, "YXZ");
  private readonly clean = new Quaternion();
  private readonly applied = new Quaternion();
  private hasApplied = false;

  constructor(
    private readonly head: Object3D,
    private readonly headEnd: Object3D | null,
    private readonly outer: Object3D,
  ) {}

  /** Deve ser chamado depois de `mixer.update()` e depois de posicionar `outer`. */
  update(dt: number, o: HeadInput) {
    const H = T.head;
    const q = this.head.quaternion;

    // 1) Pose do clipe. Se o quaternion ainda é exatamente o que aplicamos, o mixer não escreveu
    //    nada neste frame (ver "ATENÇÃO" acima): restauramos a pose limpa. Senão, ela é nova.
    if (!this.hasApplied || !q.equals(this.applied)) this.clean.copy(q);
    else q.copy(this.clean);

    // 2) Alvo: onde está o cursor em relação ao centro da cabeça (medido na pose limpa).
    let targetYaw = 0;
    let targetPitch = 0;
    let lambda: number = H.release;

    if (o.enabled && o.pointer.active) {
      // Centro da cabeça (meio entre o osso Head e a ponta Head_end) projetado em px de viewport.
      this.head.getWorldPosition(this.v1);
      if (this.headEnd) {
        this.headEnd.getWorldPosition(this.v2);
        this.v1.add(this.v2).multiplyScalar(0.5);
      }
      this.v1.project(o.camera);
      const hx = ((this.v1.x + 1) / 2) * o.width;
      const hy = o.top + ((1 - this.v1.y) / 2) * o.height;

      const dx = o.pointer.x - hx;
      const dy = o.pointer.y - hy;
      // atan: resposta quase linear perto da cabeça, saturando suavemente longe dela.
      const lookYaw = Math.atan(dx / H.reach) / D2R;
      const lookPitch = (Math.atan(dy / H.reach) / D2R) * H.pitchRatio;

      targetYaw = MathUtils.clamp(lookYaw - o.bodyYaw, -H.maxYaw, H.maxYaw) * o.scale;
      targetPitch = MathUtils.clamp(lookPitch, -H.maxUp, H.maxDown) * o.scale;
      lambda = H.follow;
    }

    if (o.snap) lambda = 60;
    this.yaw = MathUtils.damp(this.yaw, targetYaw, lambda, dt);
    this.pitch = MathUtils.damp(this.pitch, targetPitch, lambda, dt);

    // 3) Aplica o delta por cima da pose do clipe. Em repouso (delta ~ 0) não mexe em nada.
    const parent = this.head.parent;
    if (parent && (Math.abs(this.yaw) >= 0.01 || Math.abs(this.pitch) >= 0.01)) {
      parent.getWorldQuaternion(this.qParent); // atualiza a cadeia com a pose do mixer deste frame
      this.outer.getWorldQuaternion(this.qOuter);

      // M = Q_outer⁻¹ · Q_pai  (rotação do pai do osso vista do referencial do robô)
      this.qM.copy(this.qOuter).invert().multiply(this.qParent);
      // R no referencial do robô: yaw em Y, pitch em X (+ = para baixo), ordem YXZ.
      this.qLook.setFromEuler(this.euler.set(this.pitch * D2R, this.yaw * D2R, 0));
      // delta = M⁻¹ · R · M  (aplicado sobre a pose do clipe)
      this.qLook.premultiply(this.qInv.copy(this.qM).invert()).multiply(this.qM);
      q.premultiply(this.qLook);
    }
    this.applied.copy(q);
    this.hasApplied = true;
  }
}

/** Acha o osso (isBone) com o nome dado, ignorando meshes homônimos (o GLB tem "Head" osso e "Head" mesh). */
export function findBone(root: Object3D, name: string): Object3D | null {
  if ((root as Object3D & { isBone?: boolean }).isBone && root.name === name) return root;
  for (const child of root.children) {
    const hit = findBone(child, name);
    if (hit) return hit;
  }
  return null;
}
