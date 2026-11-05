import { useEffect, useMemo } from "react";
import { ROBOT_TUNING, behaviorIds, hasBehavior } from "./robotBehaviors";

/**
 * Seção ativa do robô — um único listener passivo, sem React state.
 *
 * A seção ativa é a que contém uma linha de referência do viewport (ROBOT_TUNING.refLine).
 * Para não alternar nas fronteiras, a troca tem histerese: a linha precisa passar da
 * fronteira por `boundaryBand` (fração do viewport) em qualquer direção. No topo e no fim
 * da página a primeira/última seção são forçadas (a linha de referência nunca as alcançaria).
 *
 * Métricas das seções são medidas só em resize/mudança de layout, nunca a cada scroll.
 * `sample()` é chamado dentro do useFrame e devolve sempre o MESMO objeto (sem alocação).
 */

export interface ScrollSample {
  /** id da seção ativa (já com histerese). */
  sectionId: string;
}

interface Metric {
  id: string;
  top: number;
}

/** Folga (px) para considerar "no topo" / "no fim" da página. */
const EDGE = 4;

export class SectionTracker {
  private metrics: Metric[] = [];
  private idx = 0;
  private y = 0;
  private vh = 1;
  private docHeight = 1;
  private readonly out: ScrollSample = { sectionId: behaviorIds[0] ?? "top" };

  /**
   * Modo "por evento" (reduced motion, sem loop de render): chamado quando a seção muda.
   * Em modo normal fica nulo e a seção é lida no frame via `sample()`.
   */
  listener: ((id: string) => void) | null = null;

  readonly onScroll = () => {
    this.y = window.scrollY;
    if (this.listener) this.notify();
  };

  /** Mede as seções. Só em resize/mudança de layout — nunca a cada evento de scroll. */
  readonly measure = () => {
    this.vh = Math.max(1, window.innerHeight);
    this.y = window.scrollY;
    this.docHeight = document.documentElement.scrollHeight;
    const next: Metric[] = [];
    for (const id of behaviorIds) {
      const el = document.getElementById(id);
      if (!el || !hasBehavior(id)) continue;
      next.push({ id, top: el.getBoundingClientRect().top + window.scrollY });
    }
    this.metrics = next;
    this.idx = Math.min(this.idx, Math.max(0, next.length - 1));
    if (this.listener) this.notify();
  };

  private notify() {
    const before = this.out.sectionId;
    const id = this.sample().sectionId;
    if (id !== before) this.listener?.(id);
  }

  /** Índice "cru" (sem histerese) da seção que contém a linha de referência. */
  private rawIndex(line: number) {
    const { metrics } = this;
    if (this.y <= EDGE) return 0;
    if (this.y + this.vh >= this.docHeight - EDGE) return metrics.length - 1;
    let idx = 0;
    for (let i = 0; i < metrics.length; i++) {
      if (metrics[i]!.top <= line) idx = i;
      else break;
    }
    return idx;
  }

  sample(): ScrollSample {
    const { metrics } = this;
    if (metrics.length === 0) return this.out;

    const line = this.y + this.vh * ROBOT_TUNING.refLine;
    const band = this.vh * ROBOT_TUNING.boundaryBand;
    const raw = this.rawIndex(line);

    if (raw > this.idx) {
      // Descendo: só entra na próxima seção depois de passar da fronteira + banda.
      const atEnd = raw === metrics.length - 1 && this.y + this.vh >= this.docHeight - EDGE;
      if (atEnd || line >= metrics[raw]!.top + band) this.idx = raw;
    } else if (raw < this.idx) {
      // Subindo: só volta depois de recuar além da fronteira da seção atual - banda.
      const atTop = raw === 0 && this.y <= EDGE;
      if (atTop || line <= metrics[this.idx]!.top - band) this.idx = raw;
    }

    this.out.sectionId = metrics[this.idx]!.id;
    return this.out;
  }
}

export function useRobotScroll() {
  const tracker = useMemo(() => new SectionTracker(), []);

  useEffect(() => {
    tracker.measure();
    window.addEventListener("scroll", tracker.onScroll, { passive: true });
    window.addEventListener("resize", tracker.measure, { passive: true });
    // Fontes/imagens/reveals podem mudar a altura da página depois do primeiro paint.
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(tracker.measure) : null;
    ro?.observe(document.body);
    window.addEventListener("load", tracker.measure);
    return () => {
      window.removeEventListener("scroll", tracker.onScroll);
      window.removeEventListener("resize", tracker.measure);
      window.removeEventListener("load", tracker.measure);
      ro?.disconnect();
    };
  }, [tracker]);

  return tracker;
}

export type RobotScroll = ReturnType<typeof useRobotScroll>;
