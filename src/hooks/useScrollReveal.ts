import { useLayoutEffect } from "react"

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)"

/** Faixa de rolagem (fração da altura da janela) em que a revelação acontece. */
const SPAN = 0.3
/** Onde a revelação começa: o topo do elemento a 96% da altura da janela. */
const START = 0.96

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
/** smoothstep: começa e termina suave, sem arranque brusco. */
const ease = (p: number) => p * p * (3 - 2 * p)

/** Posição do elemento no documento, ignorando transform (usa só o layout). */
function documentTop(element: HTMLElement) {
  let top = 0
  let node: HTMLElement | null = element
  while (node) {
    top += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }
  return top
}

/**
 * Revelação progressiva guiada pela rolagem.
 *
 * Cada elemento `.scrub-item` recebe `--p` (0 → 1) calculado direto da posição
 * de rolagem, então descer revela e subir esconde de novo, sem animação
 * independente disparada ao entrar na tela. O CSS converte `--p` em opacidade,
 * desfoque e um pequeno deslocamento vertical (ver `.scrub-item`).
 *
 * Desempenho:
 * - um único listener passivo de scroll, processado em requestAnimationFrame;
 * - a posição de cada elemento é medida só quando o layout muda
 *   (ResizeObserver/resize), nunca a cada quadro, e sem ler transform, o que
 *   evitaria um laço de realimentação entre o deslocamento e a medida;
 * - nada passa pelo estado do React; só `--p` é escrito, e só se mudou.
 *
 * `data-scrub-delay` (fração da janela) atrasa o início de um elemento, o que
 * escalona elementos que ficam na mesma altura (texto de abertura × corpo).
 * Com prefers-reduced-motion nada é escrito e o CSS mostra tudo pronto.
 */
export function useScrollReveal(selector = ".scrub-item") {
  useLayoutEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>(selector))
    if (!items.length) return

    const motion = window.matchMedia(REDUCED_QUERY)
    const delays = items.map((el) => Number(el.dataset.scrubDelay ?? 0) || 0)
    const tops = new Array<number>(items.length).fill(0)
    const written = new Array<number>(items.length).fill(-1)
    let frame = 0
    let lastScroll = -1
    let lastHeight = -1
    let bodyHeight = -1

    const measure = () => {
      items.forEach((el, i) => {
        tops[i] = documentTop(el)
      })
      lastScroll = -1
    }

    const clear = () => {
      items.forEach((el, i) => {
        el.style.removeProperty("--p")
        delete el.dataset.scrub
        written[i] = -1
      })
    }

    const update = () => {
      frame = 0
      const scrollY = window.scrollY
      const height = window.innerHeight
      if (scrollY === lastScroll && height === lastHeight) return
      lastScroll = scrollY
      lastHeight = height

      items.forEach((el, i) => {
        const top = tops[i] - scrollY
        const progress = clamp01(
          (height * (START - delays[i]) - top) / (height * SPAN),
        )
        const value = Math.round(ease(progress) * 1000) / 1000
        if (value === written[i]) return
        written[i] = value
        el.style.setProperty("--p", String(value))
        // "done" desliga o filtro: sem desfoque residual e sem camada extra.
        el.dataset.scrub = value >= 1 ? "done" : "live"
      })
    }

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    const remeasure = () => {
      measure()
      requestUpdate()
    }

    let enabled = false
    const enable = () => {
      if (enabled) return
      enabled = true
      measure()
      update()
      window.addEventListener("scroll", requestUpdate, { passive: true })
      window.addEventListener("resize", remeasure)
      resizeObserver.observe(document.body)
    }
    const disable = () => {
      if (!enabled) return
      enabled = false
      window.removeEventListener("scroll", requestUpdate)
      window.removeEventListener("resize", remeasure)
      resizeObserver.disconnect()
      if (frame) window.cancelAnimationFrame(frame)
      frame = 0
      clear()
    }

    // Só refaz a medida quando a altura do corpo muda (fontes, filtros,
    // detalhes expandidos), não a cada quadro.
    const resizeObserver = new ResizeObserver(() => {
      const height = document.body.offsetHeight
      if (height === bodyHeight) return
      bodyHeight = height
      remeasure()
    })

    const sync = () => (motion.matches ? disable() : enable())
    sync()
    motion.addEventListener("change", sync)

    return () => {
      motion.removeEventListener("change", sync)
      disable()
    }
  }, [selector])
}
