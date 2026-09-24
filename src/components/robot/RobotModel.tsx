import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import {
  Box3,
  CanvasTexture,
  Group,
  MathUtils,
  Mesh,
  SkinnedMesh,
  SRGBColorSpace,
  Vector3,
} from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import robotUrl from "@/assets/models/robot.glb?url";
import { RobotAnimationController } from "./RobotAnimationController";
import {
  ROBOT_TUNING as T,
  evaluateBehavior,
  greetsIn,
  type BehaviorSample,
  type Gait,
} from "./robotBehaviors";
import { contentOverlap, laneX, type RobotLayout } from "./robotLayout";
import type { RobotScroll } from "./useRobotScroll";

/** Altura do robô na cena (unidades). O layout converte 2 unidades em `robotPx` pixels. */
const MODEL_HEIGHT = 2;
const D2R = Math.PI / 180;

/** Começa a baixar o GLB assim que este módulo (lazy) é carregado. */
useLoader.preload(GLTFLoader, robotUrl);

const wrapDeg = (d: number) => ((((d + 180) % 360) + 360) % 360) - 180;
const dampAngle = (current: number, target: number, lambda: number, dt: number) =>
  current + wrapDeg(target - current) * (1 - Math.exp(-lambda * dt));

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
  reduced: boolean;
}

/** Estado interno do robô — vive num ref, nunca em React state. */
const createState = () => ({
  init: false,
  u: 0,
  speed: 0, // pista/s, suavizada
  moving: false,
  stopTimer: 0,
  dir: 1 as 1 | -1,
  gait: "idle" as Gait | "wave",
  sinceGait: 0,
  rate: 0, // cadência atual das pernas (ciclos/s)
  yaw: 0,
  pitch: 0,
  scrollReact: 0,
  opacity: 1,
  waving: false,
  greeted: false,
  greetTimer: 0,
  clock: 0,
});

/**
 * Hierarquia:
 *   outer -> posição na pista + rotação (nunca toca no esqueleto)
 *   fit   -> normaliza escala e apoia os pés em y = 0 (calculado uma vez)
 *   scene -> GLB original, intacto
 */
export function RobotModel({ layout, scroll, reduced }: Props) {
  const { scene, animations } = useLoader(GLTFLoader, robotUrl);
  const invalidate = useThree((s) => s.invalidate);
  const gl = useThree((s) => s.gl);

  const outer = useRef<Group>(null);
  const shadow = useRef<Mesh>(null);
  const layoutRef = useRef(layout);
  layoutRef.current = layout;
  const state = useRef(createState());
  const sample = useRef<BehaviorSample>({ u: 0, gait: "idle", restYaw: 0, weaveYaw: 0 });
  const shadowTex = useShadowTexture();

  const controller = useMemo(
    () => new RobotAnimationController(scene, animations),
    [scene, animations],
  );

  const fit = useMemo(() => {
    scene.updateMatrixWorld(true);
    const box = new Box3().setFromObject(scene, true); // precise: considera o skinning
    const size = box.getSize(new Vector3());
    const c = box.getCenter(new Vector3());
    const s = isFinite(size.y) && size.y > 0 ? MODEL_HEIGHT / size.y : 1;
    return { s, pos: [-c.x * s, -box.min.y * s, -c.z * s] as const };
  }, [scene]);

  useEffect(() => {
    scene.traverse((o) => {
      // A bounding box de skinned mesh usa a pose de bind: sem culling, sem "piscar".
      if ((o as SkinnedMesh).isSkinnedMesh) o.frustumCulled = false;
    });
  }, [scene]);

  useEffect(() => () => controller.dispose(), [controller]);

  /** Escreve posição/rotação do grupo externo. */
  const place = (xPx: number, yawDeg: number, pitchDeg: number, width: number) => {
    const g = outer.current;
    if (!g) return;
    const L = layoutRef.current;
    const x = (xPx - width / 2) / L.zoom;
    g.position.set(x, 0, 0);
    g.rotation.set(pitchDeg * D2R, yawDeg * D2R, 0);
    if (shadow.current) shadow.current.position.set(x, 0.01, 0);
  };

  // Reduced motion: pose estática, sem scroll e sem loop de animação (frameloop="demand").
  useLayoutEffect(() => {
    if (!reduced) return;
    controller.setStatic("idle", 0.6);
    const L = layout;
    const x = laneX(L, L.compact ? 1 : 0);
    place(x, L.compact ? -20 : 24, 0, L.width);
    gl.domElement.style.opacity = (
      1 -
      contentOverlap(L, x) * (1 - T.minOpacityOverContent)
    ).toFixed(2);
    invalidate();
  }, [reduced, controller, layout, invalidate, gl]);

  useFrame((frame, rawDt) => {
    if (reduced) return;
    const g = outer.current;
    if (!g) return;

    const dt = Math.min(rawDt, 0.05); // aba em segundo plano não pode "teleportar" o robô
    const L = layoutRef.current;
    const st = state.current;
    const s = scroll.sample(dt);
    const target = evaluateBehavior(s.sectionId, s.progress, sample.current);
    st.clock += dt;

    // ---- Posição na pista: suavizada, com teto de velocidade ------------------------------
    if (!st.init) {
      st.init = true;
      st.u = target.u;
      st.yaw = target.restYaw * L.motion;
    }
    const prevU = st.u;
    const damped = MathUtils.damp(prevU, target.u, T.positionLambda, dt);
    const maxStep = T.maxLaneSpeed * dt;
    st.u = prevU + MathUtils.clamp(damped - prevU, -maxStep, maxStep);
    const laneSpeed = dt > 0 ? (st.u - prevU) / dt : 0;
    st.speed = MathUtils.damp(st.speed, laneSpeed, 12, dt);

    // Velocidade em "alturas do robô por segundo": independe do tamanho da tela.
    const laneWidth = L.xRight - L.xLeft;
    const bodySpeed = (Math.abs(st.speed) * laneWidth) / L.robotPx;

    // ---- Está andando? (histerese + atraso para parar) -------------------------------------
    if (st.moving) {
      st.stopTimer = bodySpeed < T.stopSpeed ? st.stopTimer + dt : 0;
      if (st.stopTimer > T.stopDelay) st.moving = false;
    } else if (bodySpeed > T.startSpeed) {
      st.moving = true;
      st.stopTimer = 0;
    }
    if (st.moving && bodySpeed > T.stopSpeed) st.dir = st.speed >= 0 ? 1 : -1;

    // ---- Marcha desejada ---------------------------------------------------------------------
    let gait: Gait = "idle";
    if (st.moving) {
      gait = target.gait === "run" || bodySpeed > T.forceRunSpeed ? "run" : "walk";
    }

    // ---- Wave (Contato): Idle → Wave → Idle, uma vez por visita ------------------------------
    const atGreeting = greetsIn(s.sectionId);
    if (atGreeting) {
      st.greetTimer = st.moving || st.waving ? 0 : st.greetTimer + dt;
      if (!st.greeted && !st.waving && st.greetTimer > T.greetDelay && controller.has("wave")) {
        st.waving = true;
        st.greeted = true;
        st.gait = "wave";
        controller.playOnce("wave", T.fade.toWave);
      }
    } else {
      st.greeted = false; // saiu da seção: pode acenar de novo na próxima visita
      st.greetTimer = 0;
    }
    if (st.waving) {
      if (!atGreeting || st.moving) {
        st.waving = false; // cancelado: st.gait continua "wave", então a marcha é reaplicada já
        st.sinceGait = T.minGaitHold;
      } else if (controller.isFinished("wave")) {
        st.waving = false;
        st.gait = "idle";
        st.sinceGait = 0;
        controller.fadeTo("idle", T.fade.waveToIdle);
      }
    }

    // ---- Aplica a marcha (com permanência mínima para não "piscar" entre clipes) -------------
    st.sinceGait += dt;
    if (!st.waving && gait !== st.gait && st.sinceGait >= T.minGaitHold) {
      const fade =
        gait === "idle" ? T.fade.toIdle : st.gait === "idle" ? T.fade.toWalk : T.fade.walkRun;
      controller.fadeTo(gait, fade);
      st.gait = gait;
      st.sinceGait = 0;
    }

    // ---- Cadência das pernas: scrub por deslocamento, com inércia ----------------------------
    const cfg = st.gait === "run" ? T.run : T.walk;
    const wanted = st.moving
      ? MathUtils.clamp(bodySpeed / cfg.stride, cfg.minRate, cfg.maxRate)
      : 0;
    st.rate = MathUtils.damp(st.rate, wanted, 6, dt);
    controller.advanceLocomotion(st.rate, dt);
    controller.update(dt);

    // ---- Rotação: base (estado) + reativa (scroll) -------------------------------------------
    let targetYaw: number;
    let lambda: number;
    if (st.moving) {
      targetYaw = st.dir * (cfg.yaw * L.motion + target.weaveYaw * L.motion);
      lambda = T.yawLambdaMoving;
    } else {
      // Parado: yaw de repouso da seção + balanço quase imperceptível + reação sutil ao scroll.
      const react = MathUtils.clamp(s.velocity / 1400, -1, 1);
      st.scrollReact = MathUtils.damp(st.scrollReact, react, 4, dt);
      targetYaw =
        target.restYaw * L.motion +
        st.scrollReact * T.scrollReactionYaw * L.motion +
        Math.sin(st.clock * 0.6) * T.idleSway;
      lambda = T.yawLambdaResting;
    }
    st.yaw = dampAngle(st.yaw, targetYaw, lambda, dt);

    const targetPitch = st.moving ? (st.gait === "run" ? T.run.pitch : T.walk.pitch) : 0;
    st.pitch = MathUtils.damp(st.pitch, targetPitch, 6, dt);

    const x = laneX(L, st.u);
    place(x, st.yaw, st.pitch, frame.size.width);

    // Sobre o conteúdo o robô fica levemente translúcido (texto embaixo continua legível);
    // na margem livre ao lado do container ele é opaco.
    const wantOpacity = 1 - contentOverlap(L, x) * (1 - T.minOpacityOverContent);
    st.opacity = MathUtils.damp(st.opacity, wantOpacity, 8, dt);
    const el = frame.gl.domElement;
    if (Math.abs(Number(el.style.opacity || 1) - st.opacity) > 0.01) {
      el.style.opacity = st.opacity.toFixed(2);
    }
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
