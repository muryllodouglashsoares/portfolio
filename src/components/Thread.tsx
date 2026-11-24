import { useEffect, useRef } from "react"
import { MOTION } from "../motion/config"
import { documentTop } from "../motion/geometry"
import { REDUCED_QUERY, watchQuery } from "../motion/prefs"
import { subscribeScroll } from "../motion/scrollBus"

/**
 * Linha condutora vermelha: o fio que costura a página.
 *
 *   Hero      nasce no indicador de rolagem (o mesmo traço, no centro da base)
 *   Sobre     desce, vira à esquerda numa dobra reta e passa a correr na
 *             margem como guia, com um nó em cada título de seção
 *   Projetos  termina na borda da galeria; lá o traço é a barra do HUD
 *             (pg-bar), que faz o mesmo papel de progresso
 *   Engenharia e Trajetória
 *             retoma depois da galeria, ligando os títulos e o primeiro marco
 *   Contato   converge para o botão principal: o ramo final se fecha nele
 *
 * Nada aqui é conteúdo: é decorativo (aria-hidden), fica na margem e nunca
 * cobre texto. A posição de cada ponto vem do DOM (medida de novo quando o
 * corpo da página muda de tamanho); o traçado é desenhado pela posição de
 * rolagem com `stroke-dashoffset`, e só quando o valor muda. Em movimento
 * reduzido ele aparece inteiro, parado. Abaixo de 700px fica oculto.
 */

const MIN_WIDTH = 700
const CORNER = 22

type Segment = { el: SVGPathElement; len: number; from: number; to: number; last: number }
type Stop = { el: SVGGElement; at: number; on: boolean }

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

export function Thread() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const shell = root?.parentElement
    if (!root || !shell) return
    const svg = root.querySelector<SVGSVGElement>("svg")!
    const pick = <T extends Element>(selector: string) =>
      root.querySelector<T>(selector)!
    const q = (selector: string) =>
      document.querySelector<HTMLElement>(selector)

    const lines = {
      down: pick<SVGPathElement>('[data-seg="down"]'),
      turn: pick<SVGPathElement>('[data-seg="turn"]'),
      guide: pick<SVGPathElement>('[data-seg="guide"]'),
      after: pick<SVGPathElement>('[data-seg="after"]'),
      hook: pick<SVGPathElement>('[data-seg="hook"]'),
      pulse: pick<SVGPathElement>('[data-seg="pulse"]'),
    }
    const stopEls = Array.from(
      root.querySelectorAll<SVGGElement>("[data-stop]"),
    )

    let segments: Segment[] = []
    let stops: Stop[] = []
    let ctaAt = Infinity
    let active = false
    let reduced = false
    let converged = false
    let lastP = -1
    let maxScroll = 0

    const place = (g: SVGGElement, x: number, y: number, tickTo?: number) => {
      g.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)})`)
      const tick = g.querySelector("line")
      if (tick) {
        if (tickTo !== undefined && tickTo - x > 6) {
          tick.setAttribute("x2", (tickTo - x).toFixed(1))
          tick.removeAttribute("data-off")
        } else tick.setAttribute("data-off", "")
      }
    }

    const measure = () => {
      active = window.innerWidth >= MIN_WIDTH
      root.hidden = !active
      maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0)
      if (!active) return

      const hero = q("#inicio")
      const sobre = q("#sobre .section-label")
      const gallery = q(".pg-outer")
      const container = q("#sobre .container")
      const button = q(".contact-button")
      if (!hero || !sobre || !gallery || !container || !button) {
        root.hidden = true
        active = false
        return
      }

      const vw = document.documentElement.clientWidth
      const containerLeft = container.getBoundingClientRect().left
      const gx = Math.round(Math.min(Math.max(containerLeft - 28, 10), 72))
      const cx = Math.round(vw / 2)
      const heroBottom = documentTop(hero) + hero.offsetHeight
      const y0 = heroBottom - 64
      const yTurn = heroBottom + 44
      const galleryTop = documentTop(gallery)
      const galleryBottom = galleryTop + gallery.offsetHeight
      const labelY = (el: HTMLElement) => documentTop(el) + el.offsetHeight / 2
      const labelX = (el: HTMLElement) => el.getBoundingClientRect().left
      const ctaY = Math.round(documentTop(button) + button.offsetHeight / 2)
      const hookTo = Math.round(button.getBoundingClientRect().left - 18)
      // Trecho horizontal: a "dobra" gasta esta folga de rolagem a mais.
      const slack = Math.min(260, Math.max(140, (cx - gx) * 0.35))

      svg.setAttribute("height", String(shell.offsetHeight))
      svg.setAttribute("width", String(vw))

      lines.down.setAttribute("d", `M${cx} ${y0}V${yTurn - CORNER}`)
      lines.turn.setAttribute(
        "d",
        `M${cx} ${yTurn - CORNER}Q${cx} ${yTurn} ${cx - CORNER} ${yTurn}H${gx + CORNER}Q${gx} ${yTurn} ${gx} ${yTurn + CORNER}`,
      )
      lines.guide.setAttribute("d", `M${gx} ${yTurn + CORNER}V${galleryTop}`)
      lines.after.setAttribute("d", `M${gx} ${galleryBottom}V${ctaY}`)
      lines.pulse.setAttribute("d", `M${gx} ${galleryBottom}V${ctaY}`)
      lines.hook.setAttribute("d", `M${gx} ${ctaY}H${hookTo}`)

      const seg = (
        el: SVGPathElement,
        from: number,
        to: number,
      ): Segment => {
        const len = el.getTotalLength()
        el.style.strokeDasharray = `${len} ${len}`
        return { el, len, from, to, last: -1 }
      }
      const turnFrom = yTurn - CORNER
      segments = [
        seg(lines.down, y0, yTurn - CORNER),
        seg(lines.turn, turnFrom, yTurn + slack),
        seg(lines.guide, yTurn + slack, galleryTop + slack),
        seg(lines.after, galleryBottom, ctaY),
      ]
      const hookLen = Math.round(lines.hook.getTotalLength())
      lines.hook.style.strokeDasharray = `${hookLen}px`
      root.style.setProperty("--thread-hook", `${hookLen}px`)
      root.style.setProperty(
        "--thread-len",
        `${Math.round(lines.pulse.getTotalLength())}px`,
      )

      // Nós: cada um liga um ponto da margem a um elemento real da página.
      type Spec = [string, HTMLElement | null, number, "tick" | "dot"]
      const specs: Spec[] = [
        ["sobre", q("#sobre .section-label"), slack, "tick"],
        ["projetos", q("#projetos .section-label"), slack, "tick"],
        ["cap-before", null, slack, "dot"],
        ["complementar", q("#projetos .complementary-heading .section-label"), 0, "tick"],
        ["engenharia", q("#engenharia .section-label"), 0, "tick"],
        ["trajetoria", q("#trajetoria .section-label"), 0, "tick"],
        ["marco", q("#trajetoria .timeline-marker > span"), 0, "tick"],
        ["contato", q("#contato .section-label"), 0, "tick"],
      ]
      stops = []
      for (const g of stopEls) {
        const spec = specs.find(([name]) => name === g.dataset.stop)
        if (!spec) continue
        const [name, el, offset] = spec
        let y: number
        let tickTo: number | undefined
        if (name === "cap-before") y = galleryTop
        else if (el) {
          y = labelY(el)
          tickTo = labelX(el) - 8
        } else continue
        place(g, gx, y, tickTo)
        stops.push({ el: g, at: y + offset, on: false })
      }
      const focus = pick<SVGGElement>("[data-focus]")
      focus.setAttribute("transform", `translate(${hookTo} ${ctaY})`)
      ctaAt = ctaY

      lastP = -1
      paint(readingAt(window.scrollY, window.innerHeight))
    }

    // Ponto de leitura: ~62% da janela; nos últimos 80% de uma janela de
    // rolagem ele desce até a borda inferior, para que a linha chegue ao fim
    // (botão de Contato) mesmo quando a página acaba antes de 62%.
    const readingAt = (y: number, vh: number) => {
      const tail = Math.min(Math.max((y - (maxScroll - vh * 0.8)) / (vh * 0.8), 0), 1)
      return y + vh * (MOTION.readingLine + (1 - MOTION.readingLine) * tail)
    }

    const paint = (reading: number) => {
      if (!active) return
      if (reduced) reading = Number.POSITIVE_INFINITY
      if (reading === lastP) return
      lastP = reading
      for (const segment of segments) {
        const fraction = clamp01((reading - segment.from) / (segment.to - segment.from))
        const offset = Math.round(segment.len * (1 - fraction) * 2) / 2
        if (offset !== segment.last) {
          segment.last = offset
          segment.el.style.strokeDashoffset = String(offset)
        }
      }
      for (const stop of stops) {
        const on = reading >= stop.at
        if (on !== stop.on) {
          stop.on = on
          stop.el.dataset.on = String(on)
        }
      }
      // Convergência (uma execução): a ponta da linha chegou ao botão principal.
      if (!converged && reading >= ctaAt) {
        converged = true
        root.dataset.converged = "true"
        // O CSS do Contato e do rodapé lê o mesmo marco, em uma única execução.
        document.documentElement.dataset.converged = "true"
      }
    }

    const unsubscribeScroll = subscribeScroll(({ y, vh }) => paint(readingAt(y, vh)))
    const resize = new ResizeObserver(measure)
    resize.observe(document.body)
    const unwatch = watchQuery(REDUCED_QUERY, (matches) => {
      reduced = matches
      root.dataset.static = String(matches)
      lastP = -1
      measure()
    })
    // A fonte do Hero e as imagens mudam a altura depois da primeira medida.
    document.fonts?.ready.then(measure).catch(() => {})
    window.addEventListener("load", measure)

    return () => {
      unsubscribeScroll()
      resize.disconnect()
      unwatch()
      window.removeEventListener("load", measure)
      delete root.dataset.converged
      delete document.documentElement.dataset.converged
    }
  }, [])

  const node = (name: string, tick = true) => (
    <g className="thread-stop" data-stop={name} data-on="false">
      {tick && <line x1="0" y1="0" x2="0" y2="0" data-off="" />}
      <circle r="3.5" />
    </g>
  )

  return (
    <div ref={rootRef} className="thread" aria-hidden="true" data-converged="false" hidden>
      <svg focusable="false">
        <g className="thread-lines">
          <path data-seg="down" />
          <path data-seg="turn" />
          <path data-seg="guide" />
          <path data-seg="after" />
          <path data-seg="hook" />
          <path data-seg="pulse" />
        </g>
        {node("sobre")}
        {node("projetos")}
        {node("cap-before", false)}
        {node("complementar")}
        {node("engenharia")}
        {node("trajetoria")}
        {node("marco")}
        {node("contato")}
        <g className="thread-focus" data-focus>
          <circle className="thread-focus-ring" r="3.5" />
          <circle className="thread-focus-dot" r="3.5" />
        </g>
      </svg>
    </div>
  )
}
