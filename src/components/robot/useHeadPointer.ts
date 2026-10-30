import { useEffect, useRef, type MutableRefObject } from "react";

/**
 * Posição do cursor para o rastreamento da cabeça.
 *
 * Vive num ref mutável — nunca em React state — e é atualizada por um único listener
 * passivo; o useFrame lê o valor mais recente. Só reage a mouse/caneta: toque não gera
 * posição (não simulamos um cursor que não existe) e dispositivos sem ponteiro fino
 * (celular/tablet) nem registram o listener.
 */
export interface HeadPointer {
  /** Coordenadas de viewport (clientX/clientY). */
  x: number;
  y: number;
  /** false = sem posição válida (cursor fora da janela, aba sem foco, nunca se moveu). */
  active: boolean;
}

const FINE_POINTER = "(hover: hover) and (pointer: fine)";

export function useHeadPointer(enabled: boolean): MutableRefObject<HeadPointer> {
  const pointer = useRef<HeadPointer>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const p = pointer.current;
    p.active = false;
    if (!enabled || typeof window.matchMedia !== "function") return;

    const root = document.documentElement;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      p.x = e.clientX;
      p.y = e.clientY;
      p.active = true;
    };
    const onLeave = () => {
      p.active = false;
    };
    const onVisibility = () => {
      if (document.hidden) p.active = false;
    };

    let attached = false;
    const attach = () => {
      if (attached) return;
      attached = true;
      window.addEventListener("pointermove", onMove, { passive: true });
      root.addEventListener("mouseleave", onLeave);
      window.addEventListener("blur", onLeave);
      document.addEventListener("visibilitychange", onVisibility);
    };
    const detach = () => {
      if (!attached) return;
      attached = false;
      p.active = false;
      window.removeEventListener("pointermove", onMove);
      root.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };

    const mq = window.matchMedia(FINE_POINTER);
    const sync = () => (mq.matches ? attach() : detach());
    sync();
    mq.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      detach();
    };
  }, [enabled]);

  return pointer;
}
