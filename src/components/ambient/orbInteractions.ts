/**
 * Interações contextuais: elementos reagem à proximidade REAL das esferas.
 *
 * - `rebuild()` mapeia os elementos-alvo (uma vez por mudança de layout) e
 *   guarda suas caixas em coordenadas de documento — nenhuma leitura de
 *   layout acontece durante a animação.
 * - `update()` calcula a distância de cada esfera a cada caixa visível e grava
 *   `--lit` (0..1), `--lx/--ly` e `--tone` só nos elementos que estão dentro
 *   do alcance. O visual vive em ambient-orbs.css (pseudo-elementos e
 *   text-shadow, sem tocar nos estilos/hover existentes).
 */

import { TONE_RGB, type OrbId } from "./orbConfig"

type Kind = "title" | "text" | "card" | "button" | "tag" | "line" | "marker"

/** Seletores por tipo — todos fora do Hero (as letras têm a própria máscara). */
const TARGETS: Array<{ kind: Kind; selector: string }> = [
  { kind: "title", selector: "main .section-heading h2, main .project h3, main .contact-copy h2, main .complementary-heading h3, main .about-lead p" },
  { kind: "text", selector: "main .about-body p, main .project-description, main .contact-copy p, main .project-detail" },
  { kind: "card", selector: "main .project-visual, main .tech-context, main .principles, main .robotics-note" },
  { kind: "button", selector: "main section:not(.hero) .button" },
  { kind: "tag", selector: "main .stack-items button, main .about-tags span, main .tech-list li" },
  { kind: "line", selector: "main .section-heading, main .stack-row, main .mini-project, main .contact-links > a" },
  { kind: "marker", selector: "main .timeline-marker span" },
]

/** Alcance (px, antes de escalar pelo raio da esfera) e força máxima por tipo. */
const REACH: Record<Kind, number> = {
  title: 150,
  text: 105,
  card: 220,
  button: 130,
  tag: 95,
  line: 80,
  marker: 110,
}
const STRENGTH: Record<Kind, number> = {
  title: 0.9,
  text: 0.6,
  card: 1,
  button: 1,
  tag: 1,
  line: 1,
  marker: 1,
}

type Target = {
  el: HTMLElement
  kind: Kind
  left: number
  top: number
  width: number
  height: number
  lit: number
  written: number
}

export type InteractionOrb = { id: OrbId; x: number; y: number; r: number }

const smoothstep = (a: number, b: number, v: number) => {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a || 1)))
  return t * t * (3 - 2 * t)
}

export function createInteractions() {
  let targets: Target[] = []
  const needsLocal = new Set<Kind>(["card", "line"])

  const reset = (t: Target) => {
    t.lit = 0
    t.written = 0
    t.el.style.removeProperty("--lit")
    t.el.style.removeProperty("--lx")
    t.el.style.removeProperty("--ly")
    t.el.style.removeProperty("--tone")
  }

  function rebuild(scrollY: number) {
    targets.forEach((t) => {
      reset(t)
      t.el.removeAttribute("data-orb-kind")
    })
    const seen = new Set<Element>()
    const next: Target[] = []
    for (const { kind, selector } of TARGETS) {
      document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
        if (seen.has(el)) return
        seen.add(el)
        const rect = el.getBoundingClientRect()
        if (!rect.width || !rect.height) return
        el.setAttribute("data-orb-kind", kind)
        next.push({
          el,
          kind,
          left: rect.left + window.scrollX,
          // Linhas divisórias reagem à proximidade da própria borda inferior,
          // não da caixa inteira da linha.
          top: kind === "line" ? rect.bottom + scrollY - 1 : rect.top + scrollY,
          width: rect.width,
          height: kind === "line" ? 1 : rect.height,
          lit: 0,
          written: 0,
        })
      })
    }
    targets = next
  }

  /**
   * @param activity 0..1 — escala geral (zero no Hero e na forma final).
   * @param dt segundos desde a última atualização (suaviza o acender/apagar).
   */
  function update(
    orbs: InteractionOrb[],
    scrollY: number,
    vh: number,
    activity: number,
    dt: number,
  ) {
    const follow = 1 - Math.exp(-dt * 7)
    const margin = 320
    for (const t of targets) {
      const top = t.top - scrollY
      let goal = 0
      let tone: OrbId = "purple"
      let lx = 0
      let ly = 0

      if (activity > 0.01 && top < vh + margin && top + t.height > -margin) {
        const right = t.left + t.width
        const bottom = top + t.height
        for (const orb of orbs) {
          const dx = Math.max(t.left - orb.x, 0, orb.x - right)
          const dy = Math.max(top - orb.y, 0, orb.y - bottom)
          const reach = REACH[t.kind] * (0.7 + orb.r / 200)
          const d = Math.hypot(dx, dy)
          const f = 1 - smoothstep(0, reach, d)
          const lit = f * f * STRENGTH[t.kind] * activity
          if (lit > goal) {
            goal = lit
            tone = orb.id
            lx = Math.min(Math.max(orb.x - t.left, 0), t.width)
            ly = Math.min(Math.max(orb.y - top, 0), t.height)
          }
        }
      }

      if (goal === 0 && t.lit < 0.004) {
        if (t.written !== 0) reset(t)
        continue
      }

      t.lit += (goal - t.lit) * follow
      if (Math.abs(t.lit - t.written) < 0.012 && !(t.lit < 0.004)) {
        // Mesmo sem mudar a intensidade, o ponto de luz acompanha a esfera.
        if (needsLocal.has(t.kind) && t.lit > 0.05) {
          t.el.style.setProperty("--lx", `${lx.toFixed(0)}px`)
          t.el.style.setProperty("--ly", `${ly.toFixed(0)}px`)
        }
        continue
      }
      if (t.lit < 0.004) {
        reset(t)
        continue
      }
      t.written = t.lit
      const s = t.el.style
      s.setProperty("--lit", t.lit.toFixed(3))
      s.setProperty("--tone", TONE_RGB[tone])
      if (needsLocal.has(t.kind)) {
        s.setProperty("--lx", `${lx.toFixed(0)}px`)
        s.setProperty("--ly", `${ly.toFixed(0)}px`)
      }
    }
  }

  function dispose() {
    targets.forEach((t) => {
      reset(t)
      t.el.removeAttribute("data-orb-kind")
    })
    targets = []
  }

  return { rebuild, update, dispose }
}

export type Interactions = ReturnType<typeof createInteractions>
