import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Sistema de motion do portfólio.
 *
 * Todos os hooks aqui:
 * - respeitam `prefers-reduced-motion`;
 * - usam apenas `transform`/`opacity` para animar (sem layout thrashing);
 * - usam `requestAnimationFrame` para trabalho ligado a scroll/pointer;
 * - se desligam sozinhos em touch/dispositivos sem hover fino, quando fizer sentido.
 */

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

function useFinePointer() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setFine(mq.matches);
    const handler = (e: MediaQueryListEvent) => setFine(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return fine;
}

/** Progresso de leitura da página (0–1), para a barra fina no topo. */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return progress;
}

/** Qual seção (por id) está ativa no viewport — para destacar o item da navbar. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");
  const key = ids.join(",");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const elements = key
      .split(",")
      .filter(Boolean)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0, 0.2, 0.5, 0.8, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return active;
}

/** Contagem numérica suave, disparada externamente por `active` (ex.: quando entra no viewport). */
export function useCountUp(target: number, active: boolean, duration = 900) {
  const [value, setValue] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setValue(target);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration, reduced]);

  return value;
}

/** Progresso de preenchimento (0–1) usado na linha vertical da Trajetória. */
export function useScrollFill(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      setProgress(1);
      return;
    }
    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const anchor = window.innerHeight * 0.62;
      const total = rect.height + anchor;
      const passed = anchor - rect.top;
      setProgress(Math.max(0, Math.min(1, total > 0 ? passed / total : 0)));
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, reduced]);

  return progress;
}

/** Efeito magnético sutil para CTAs — só em desktop com ponteiro fino e sem reduced motion. */
export function useMagnetic<T extends HTMLElement>(strength = 0.28, maxOffset = 9) {
  const ref = useRef<T | null>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !fine || reduced) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      const x = Math.max(-maxOffset, Math.min(maxOffset, relX * maxOffset * 2 * strength));
      const y = Math.max(-maxOffset, Math.min(maxOffset, relY * maxOffset * 2 * strength));
      el.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)`;
    };
    const onLeave = () => {
      el.style.transform = "";
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.style.transform = "";
    };
  }, [fine, reduced, strength, maxOffset]);

  return ref;
}

/** Spotlight que segue o cursor dentro de um card (ex.: projeto em destaque). Desktop apenas. */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !fine || reduced) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--spot-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
      el.style.setProperty("--spot-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
    };

    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, [fine, reduced]);

  return ref;
}
