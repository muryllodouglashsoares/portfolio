import { useEffect, useMemo } from "react";
import { MathUtils } from "three";
import { ROBOT_TUNING, behaviorIds, hasBehavior } from "./robotBehaviors";

/**
 * Modelo de scroll do robô — um único listener passivo, sem React state.
 *
 * Em vez de um progresso global (0–100% da página), cada seção tem o seu progresso local
 * (0–1), medido contra uma linha de referência do viewport. Assim o comportamento não
 * depende da altura total da página, e o fim de uma seção coincide com o início da próxima.
 *
 * `sample(dt)` é chamado dentro do useFrame e devolve sempre o MESMO objeto (sem alocação).
 */

export interface ScrollSample {
  /** id da seção ativa (a que contém a linha de referência). */
  sectionId: string;
  /** Progresso local da seção ativa (0–1). */
  progress: number;
  /** Velocidade do scroll (px/s, com sinal, suavizada). + = descendo. */
  velocity: number;
  scrollY: number;
}

interface Metric {
  id: string;
  top: number;
  height: number;
}

class SectionScroll {
  private metrics: Metric[] = [];
  private y = 0;
  private vh = 1;
  private prevY = 0;
  private vel = 0;
  private started = false;
  private readonly out: ScrollSample = { sectionId: "top", progress: 0, velocity: 0, scrollY: 0 };

  readonly onScroll = () => {
    this.y = window.scrollY;
  };

  /** Mede as seções. Só em resize/mudança de layout — nunca a cada evento de scroll. */
  readonly measure = () => {
    this.vh = Math.max(1, window.innerHeight);
    this.y = window.scrollY;
    const next: Metric[] = [];
    for (const id of behaviorIds) {
      const el = document.getElementById(id);
      if (!el || !hasBehavior(id)) continue;
      const r = el.getBoundingClientRect();
      next.push({ id, top: r.top + window.scrollY, height: Math.max(1, r.height) });
    }
    this.metrics = next;
  };

  sample(dt: number): ScrollSample {
    const out = this.out;
    const { metrics, y, vh } = this;

    if (!this.started) {
      this.prevY = y;
      this.started = true;
    }
    const raw = dt > 0 ? (y - this.prevY) / dt : 0;
    this.prevY = y;
    this.vel = MathUtils.damp(this.vel, raw, 10, dt);
    out.velocity = this.vel;
    out.scrollY = y;

    if (metrics.length === 0) {
      out.sectionId = "top";
      out.progress = 0;
      return out;
    }

    const line = y + vh * ROBOT_TUNING.refLine;
    let idx = 0;
    for (let i = 0; i < metrics.length; i++) {
      if (metrics[i]!.top <= line) idx = i;
      else break;
    }
    const m = metrics[idx]!;
    out.sectionId = m.id;

    if (idx === 0) {
      // A primeira seção começa em 0 quando o scroll está no topo (e não em ~50%).
      const span = Math.max(1, m.height - vh * ROBOT_TUNING.refLine);
      out.progress = MathUtils.clamp(y / span, 0, 1);
    } else {
      out.progress = MathUtils.clamp((line - m.top) / m.height, 0, 1);
    }
    return out;
  }
}

export function useRobotScroll(enabled = true) {
  const tracker = useMemo(() => new SectionScroll(), []);

  useEffect(() => {
    if (!enabled) return;
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
  }, [tracker, enabled]);

  return tracker;
}

export type RobotScroll = ReturnType<typeof useRobotScroll>;
