import { ROBOT_TUNING as T, behaviorOf, sideOf, type ClipKey, type Side } from "./robotBehaviors";

/**
 * Máquina de estados do robô — pura (sem three/React), testável com um relógio simulado.
 *
 * Responsabilidades:
 *   1. Troca de canto por fade:
 *        visible ─(lado desejado ≠ atual, estável)─▶ out ─(opacidade ≈ 0: troca o canto)─▶ in ─▶ visible
 *      Se o lado desejado voltar a coincidir com o atual durante `out`, o robô só reaparece no
 *      mesmo lugar. A posição NUNCA muda enquanto o robô está visível.
 *   2. Gatilho das animações pontuais: a mudança de seção arma uma reação, tocada quando o robô
 *      está visível, a seção está estável e o cooldown do clipe permite.
 *
 * Quem consome lê `frame` (sempre o mesmo objeto) e executa `play`/`toIdle` no controlador.
 */

export type Phase = "visible" | "out" | "in";
export type OneShot = Exclude<ClipKey, "idle">;

export interface MachineFrame {
  /** Canto em que o robô está desenhado agora (só muda com opacidade ≈ 0). */
  side: Side;
  phase: Phase;
  /** Opacidade do fade (0–1, já suavizada). */
  opacity: number;
  /** Praticamente invisível: bom momento para "snapar" pose/cabeça sem ninguém ver. */
  invisible: boolean;
  /** Clipe pontual a iniciar neste frame (ou null). */
  play: OneShot | null;
  /** Voltar ao Idle neste frame. */
  toIdle: boolean;
  /** O canto mudou neste frame. */
  swapped: boolean;
}

const smoothstep = (x: number) => x * x * (3 - 2 * x);

export class RobotStateMachine {
  readonly frame: MachineFrame = {
    side: "left",
    phase: "in",
    opacity: 0,
    invisible: true,
    play: null,
    toIdle: false,
    swapped: false,
  };

  private init = false;
  private clock = 0;
  private fade = 0; // progresso linear 0–1 (opacidade = smoothstep)
  private hold = 0; // tempo invisível restante entre "out" e "in"
  private wantedSide: Side = "left";
  private wantedAge = 0;
  private sinceSwap = Infinity;
  private visibleAge = 0;
  private sectionId = "";
  private sectionAge = 0;
  private armed = false;
  private playing: OneShot | null = null;
  /** Quando cada SEÇÃO tocou sua reação pela última vez (o cooldown é por seção, não por clipe). */
  private lastPlayed: Record<string, number> = {};

  /** `hasClip`: o GLB tem este clipe? Clipes ausentes são simplesmente ignorados. */
  constructor(private readonly hasClip: (key: ClipKey) => boolean) {}

  /** Volta ao estado inicial (nasce invisível e reaparece com fade). */
  reset() {
    this.init = false;
  }

  /**
   * @param dt        segundos desde o último frame
   * @param sectionId seção ativa (já com histerese)
   * @param remaining segundos que faltam para o clipe pontual terminar
   */
  update(dt: number, sectionId: string, remaining: (key: ClipKey) => number): MachineFrame {
    const f = this.frame;
    f.play = null;
    f.toIdle = false;
    f.swapped = false;

    const wanted = sideOf(sectionId);
    if (!this.init) {
      this.init = true;
      this.clock = 0;
      this.fade = 0;
      this.hold = 0;
      this.wantedSide = wanted;
      this.wantedAge = 0;
      this.sinceSwap = Infinity;
      this.visibleAge = 0;
      this.sectionId = "";
      this.armed = false;
      this.playing = null;
      this.lastPlayed = {};
      f.side = wanted;
      f.phase = "in";
    }
    this.clock += dt;

    // ---- Troca de canto por fade -------------------------------------------------------------
    if (wanted !== this.wantedSide) {
      this.wantedSide = wanted;
      this.wantedAge = 0;
    } else {
      this.wantedAge += dt;
    }
    this.sinceSwap += dt;

    const mayStartSwap =
      wanted !== f.side && this.wantedAge >= T.sideDwell && this.sinceSwap >= T.minSwapGap;

    if (f.phase === "visible") {
      this.visibleAge += dt;
      if (mayStartSwap) f.phase = "out";
    } else if (f.phase === "out") {
      this.fade = Math.max(0, this.fade - dt / T.fade.out);
      if (wanted === f.side && this.wantedAge >= T.sideDwell) {
        f.phase = "in"; // o visitante voltou: reaparece onde já estava
        this.hold = 0;
      } else if (smoothstep(this.fade) <= T.swapAtOpacity) {
        // Invisível: é seguro trocar de canto sem ninguém ver o salto.
        this.fade = 0;
        f.side = wanted;
        f.phase = "in";
        f.swapped = true;
        this.hold = T.fade.hold;
        this.sinceSwap = 0;
      }
    } else {
      if (this.hold > 0) {
        this.hold -= dt;
      } else {
        this.fade = Math.min(1, this.fade + dt / T.fade.in);
        if (this.fade >= 1) {
          f.phase = "visible";
          this.visibleAge = 0;
        }
      }
      if (mayStartSwap && this.hold <= 0) f.phase = "out"; // mudou de ideia durante o reaparecimento
    }

    // ---- Animações: a mudança de seção é o gatilho ---------------------------------------------
    if (sectionId !== this.sectionId) {
      this.sectionId = sectionId;
      this.sectionAge = 0;
      this.armed = true; // cada entrada na seção (inclusive ao rolar para cima) arma uma reação
    } else {
      this.sectionAge += dt;
    }

    if (this.playing) {
      // Volta ao Idle com crossfade um pouco antes do fim, em vez de segurar o último frame.
      if (remaining(this.playing) <= T.clipFade.out) {
        f.toIdle = true;
        this.playing = null;
      }
    } else if (this.armed && f.phase === "visible" && this.visibleAge >= T.clipSettle) {
      const b = behaviorOf(sectionId);
      if (b?.clip && this.sectionAge >= T.clipDelay) {
        this.armed = false;
        const last = this.lastPlayed[sectionId] ?? -Infinity;
        if (this.hasClip(b.clip) && this.clock - last >= (b.cooldown ?? T.defaultCooldown)) {
          this.lastPlayed[sectionId] = this.clock;
          this.playing = b.clip;
          f.play = b.clip;
        }
      }
    }

    f.opacity = smoothstep(this.fade);
    f.invisible = this.fade < 0.05;
    return f;
  }
}
