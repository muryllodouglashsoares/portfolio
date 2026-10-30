import { useEffect, useLayoutEffect, useMemo, useRef, type MutableRefObject } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { Box3, CanvasTexture, Group, Mesh, SkinnedMesh, SRGBColorSpace, Vector3 } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import robotUrl from "@/assets/models/robot.glb?url";
import { HeadTracker, findBone } from "./headTracking";
import { RobotAnimationController } from "./RobotAnimationController";
import { ROBOT_TUNING as T, sideOf, type ClipKey, type Side } from "./robotBehaviors";
import { RobotStateMachine } from "./robotStateMachine";
import { restOpacity, restX, type RobotLayout } from "./robotLayout";
import type { HeadPointer } from "./useHeadPointer";
import type { RobotScroll } from "./useRobotScroll";

/** Altura do robô na cena (unidades). O layout converte 2 unidades em `robotPx` pixels. */
const MODEL_HEIGHT = 2;
const D2R = Math.PI / 180;

/** Começa a baixar o GLB assim que este módulo (lazy) é carregado. */
useLoader.preload(GLTFLoader, robotUrl);

const wrapDeg = (d: number) => ((((d + 180) % 360) + 360) % 360) - 180;
const dampAngle = (current: number, target: number, lambda: number, dt: number) =>
  current + wrapDeg(target - current) * (1 - Math.exp(-lambda * dt));

/** Giro de repouso do corpo (graus): esquerda olha para a direita (+) e vice-versa. */
const restYawOf = (side: Side, motion: number) => (side === "left" ? 1 : -1) * T.restYaw * motion;

/** Sombra de contato: núcleo escuro + brilho violeta (mesma cor de destaque do portfólio). */
function useShadowTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const ctx = c.getContext("2d")!;
    const glow = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    glow.addColorStop(0, "rgba(139, 108, 255, 0.34)");
    glow.addColorStop(1, "rgba(139, 108, 255, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 128, 128);
    const core = ctx.createRadialGradient(64, 64, 0, 64, 64, 34);
    core.addColorStop(0, "rgba(0, 0, 0, 0.55)");
    core.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = core;
    ctx.fillRect(0, 0, 128, 128);
    const tex = new CanvasTexture(c);
    tex.colorSpace = SRGBColorSpace;
    return tex;
  }, []);
}

interface Props {
  layout: RobotLayout;
  scroll: RobotScroll;
  pointer: MutableRefObject<HeadPointer>;
  reduced: boolean;
}

/**
 * Hierarquia:
 *   outer -> posição do canto + giro do corpo (nunca toca no esqueleto)
 *   fit   -> normaliza escala e apoia os pés em y = 0 (calculado uma vez)
 *   scene -> GLB original, intacto (os materiais nunca são alterados: o fade é aplicado
 *            na composição do canvas, então não há ordenação de transparência a corrigir)
 */
export function RobotModel({ layout, scroll, pointer, reduced }: Props) {
  const { scene, animations } = useLoader(GLTFLoader, robotUrl);
  const invalidate = useThree((s) => s.invalidate);
  const gl = useThree((s) => s.gl);

  const outer = useRef<Group>(null);
  const shadow = useRef<Mesh>(null);
  const layoutRef = useRef(layout);
  layoutRef.current = layout;
  const yawRef = useRef<number | null>(null);
  const shadowTex = useShadowTexture();

  const controller = useMemo(
    () => new RobotAnimationController(scene, animations),
    [scene, animations],
  );

  const machine = useMemo(() => new RobotStateMachine((k) => controller.has(k)), [controller]);
  const remainingOf = useMemo(() => (k: ClipKey) => controller.remaining(k), [controller]);

  const fit = useMemo(() => {
    scene.updateMatrixWorld(true);
    const box = new Box3().setFromObject(scene, true); // precise: considera o skinning
    const size = box.getSize(new Vector3());
    const c = box.getCenter(new Vector3());
    const s = isFinite(size.y) && size.y > 0 ? MODEL_HEIGHT / size.y : 1;
    return { s, pos: [-c.x * s, -box.min.y * s, -c.z * s] as const };
  }, [scene]);

  // Osso da cabeça (confirmado no GLB: "Head", isBone, filho de "Neck"). Se não existir, sem rastreamento.
  // Criado em layout effect porque precisa do ref do grupo externo (só existe depois do commit).
  const headTracker = useRef<HeadTracker | null>(null);
  useLayoutEffect(() => {
    const head = findBone(scene, "Head");
    if (!head?.parent || !outer.current) {
      if (import.meta.env.DEV)
        console.warn('[robot] osso "Head" não encontrado: rastreamento desativado');
      headTracker.current = null;
      return;
    }
    headTracker.current = new HeadTracker(
      head,
      head.getObjectByName("Head_end") ?? null,
      outer.current,
    );
    return () => {
      headTracker.current = null;
    };
  }, [scene]);

  useEffect(() => {
    scene.traverse((o) => {
      // A bounding box de skinned mesh usa a pose de bind: sem culling, sem "piscar".
      if ((o as SkinnedMesh).isSkinnedMesh) o.frustumCulled = false;
    });
  }, [scene]);

  useEffect(() => () => controller.dispose(), [controller]);

  /** Escreve posição/rotação do grupo externo e da sombra. */
  const place = (side: Side, yawDeg: number) => {
    const g = outer.current;
    if (!g) return;
    const L = layoutRef.current;
    const x = (restX(L, side) - L.width / 2) / L.zoom;
    g.position.set(x, 0, 0);
    g.rotation.set(0, yawDeg * D2R, 0);
    if (shadow.current) shadow.current.position.set(x, 0.01, 0);
  };

  /** Opacidade do canvas inteiro (fade × translucidez sobre o conteúdo). */
  const setOpacity = (fadeOpacity: number, side: Side) => {
    const v = fadeOpacity * restOpacity(layoutRef.current, side);
    const el = gl.domElement;
    if (Math.abs(Number(el.style.opacity || 1) - v) > 0.004) el.style.opacity = v.toFixed(3);
  };

  // ---- Reduced motion: pose estática, sem fade/rastreamento/animações e sem loop de render ----
  // O canto ainda acompanha a seção, mas por evento de scroll e com troca instantânea.
  useLayoutEffect(() => {
    if (!reduced) return;
    const apply = (sectionId: string) => {
      const side = sideOf(sectionId);
      place(side, restYawOf(side, layoutRef.current.motion));
      setOpacity(1, side);
      invalidate();
    };
    controller.setStatic("idle", 0.6);
    scroll.listener = apply;
    apply(scroll.sample().sectionId);
    return () => {
      scroll.listener = null;
      machine.reset(); // ao sair do modo reduzido, o loop normal recomeça limpo
      yawRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, controller, machine, layout, scroll, invalidate]);

  useFrame((frame, rawDt) => {
    if (reduced) return;
    const g = outer.current;
    if (!g) return;

    const dt = Math.min(rawDt, 0.05); // aba em segundo plano não pode "teleportar" nada
    const L = layoutRef.current;

    // Estado: canto atual, fade e gatilhos de animação (tudo decidido em robotStateMachine).
    const f = machine.update(dt, scroll.sample().sectionId, remainingOf);
    if (f.play) controller.playOnce(f.play, T.clipFade.in);
    if (f.toIdle) controller.fadeTo("idle", T.clipFade.out);

    // Corpo parado no canto: só gira (suavemente) para o conteúdo; ao trocar de canto, já invisível, "snapa".
    const restYaw = restYawOf(f.side, L.motion);
    const yaw =
      yawRef.current === null
        ? restYaw
        : dampAngle(yawRef.current, restYaw, f.invisible ? 60 : 5, dt);
    yawRef.current = yaw;
    place(f.side, yaw);

    // Pose: o clipe escreve o esqueleto inteiro (inclusive o osso Head)...
    controller.update(dt);
    // ...e a cabeça acompanha o cursor por cima, sem acumular (o mixer reescreve a cada frame).
    headTracker.current?.update(dt, {
      pointer: pointer.current,
      camera: frame.camera,
      width: frame.size.width,
      height: frame.size.height,
      top: window.innerHeight - L.canvasHeight,
      bodyYaw: yaw,
      scale: L.motion,
      enabled: f.phase === "visible",
      snap: f.invisible,
    });

    setOpacity(f.opacity, f.side);
  });

  return (
    <>
      <group ref={outer} rotation-order="YXZ">
        <group scale={fit.s} position={[fit.pos[0], fit.pos[1], fit.pos[2]]}>
          <primitive object={scene} />
        </group>
      </group>
      <mesh ref={shadow} rotation-x={-Math.PI / 2} scale={[1.55, 1, 1]}>
        <planeGeometry args={[1.1, 1.1]} />
        <meshBasicMaterial map={shadowTex} transparent depthWrite={false} toneMapped={false} />
      </mesh>
    </>
  );
}
