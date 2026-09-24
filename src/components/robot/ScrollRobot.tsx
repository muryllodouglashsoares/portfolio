import { Suspense, lazy, useEffect, useState } from "react";

import { useReducedMotion } from "@/hooks/use-motion";
import { RobotErrorBoundary } from "./RobotErrorBoundary";
import { computeLayout, laneX, sameLayout, type RobotLayout } from "./robotLayout";

/**
 * Robô 3D que acompanha a navegação do portfólio.
 *
 * Este é o único ponto de entrada do módulo: o resto do site só precisa renderizar
 * <ScrollRobot />. Para remover o robô, apague esta linha em routes/index.tsx e a pasta
 * components/robot (e o id="github" opcional em GithubCta).
 *
 * three + R3F + GLB só são baixados no cliente, depois do `load` da página e num momento
 * ocioso, então não competem com o conteúdo. No SSR nada disso entra no bundle do servidor.
 */
const RobotScene = import.meta.env.SSR ? null : lazy(() => import("./RobotScene"));

/** Abaixo disso (celular muito pequeno / landscape baixo) o conteúdo tem prioridade total. */
const VIEWPORT_QUERY = "(min-width: 340px) and (min-height: 481px)";

function supportsRobot() {
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (conn?.saveData) return false;
  try {
    const probe = document.createElement("canvas");
    const gl = probe.getContext("webgl2") ?? probe.getContext("webgl");
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

/** Executa `cb` quando a página já carregou e o navegador está ocioso. */
function whenIdleAfterLoad(cb: () => void) {
  let cancelled = false;
  let handle: number | undefined;
  const ric = window.requestIdleCallback as typeof window.requestIdleCallback | undefined;

  const schedule = () => {
    if (cancelled) return;
    if (ric) handle = ric(() => !cancelled && cb(), { timeout: 2000 });
    else handle = window.setTimeout(() => !cancelled && cb(), 300);
  };

  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });

  return () => {
    cancelled = true;
    window.removeEventListener("load", schedule);
    if (handle === undefined) return;
    if (ric && window.cancelIdleCallback) window.cancelIdleCallback(handle);
    else window.clearTimeout(handle);
  };
}

function useRobotEnabled() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!supportsRobot()) return;
    const mq = window.matchMedia(VIEWPORT_QUERY);
    let armed = false;
    const sync = () => {
      if (armed) setEnabled(mq.matches);
    };
    const cancel = whenIdleAfterLoad(() => {
      armed = true;
      sync();
    });
    mq.addEventListener("change", sync);
    return () => {
      cancel();
      mq.removeEventListener("change", sync);
    };
  }, []);

  return enabled;
}

function useRobotLayout(enabled: boolean) {
  const [layout, setLayout] = useState<RobotLayout | null>(null);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const next = computeLayout(document.documentElement.clientWidth, window.innerHeight);
      setLayout((prev) => (prev && sameLayout(prev, next) ? prev : next));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled]);

  return layout;
}

/** Enquanto o modelo carrega: só uma sombra violeta discreta onde o robô vai ficar. */
function RobotFallback({ layout }: { layout: RobotLayout }) {
  const x = laneX(layout, layout.compact ? 1 : 0);
  return (
    <span
      className="absolute animate-pulse rounded-full"
      style={{
        left: x - 30,
        bottom: layout.bottomPad,
        width: 60,
        height: 12,
        background:
          "radial-gradient(ellipse at center, color-mix(in oklab, var(--primary) 45%, transparent), transparent 70%)",
      }}
    />
  );
}

export function ScrollRobot() {
  const enabled = useRobotEnabled();
  const reduced = useReducedMotion();
  const [failed, setFailed] = useState(false);
  const layout = useRobotLayout(enabled && !failed);

  if (!RobotScene || !enabled || failed || !layout) return null;

  return (
    <div
      aria-hidden="true"
      data-robot=""
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 select-none [&_*]:pointer-events-none!"
      style={{ height: layout.canvasHeight }}
    >
      <RobotErrorBoundary onError={() => setFailed(true)}>
        <Suspense fallback={<RobotFallback layout={layout} />}>
          <RobotScene layout={layout} reduced={reduced} onContextLost={() => setFailed(true)} />
        </Suspense>
      </RobotErrorBoundary>
    </div>
  );
}
