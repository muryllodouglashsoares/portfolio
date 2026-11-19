import { useEffect } from "react"

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)"

/** Constante de tempo do suavizador (ms): ~95% do caminho em ~3 × TAU. */
const TAU = 90
/** Distância (px) da esfera ao centro de um marco para o número ceder lugar a ela. */
const CURRENT_RADIUS = 12

/**
 * Esfera e rastro da linha do tempo ("Evolução em movimento").
 *
 * Os cinco marcos ficam sempre alinhados num único eixo (horizontal no
 * desktop, vertical no mobile). Por isso todo o estado é uma só grandeza:
 * a posição `pos` da esfera, em px, ao longo desse eixo.
 *
 * - Geometria: os centros dos marcos são medidos (offsets, imunes às
 *   transformações da revelação) só quando a linha do tempo muda de tamanho.
 *   Nada de coordenadas fixas.
 * - Alvo: calculado a partir de UMA leitura de `getBoundingClientRect` por
 *   quadro. Horizontal: progresso da seção (0 → 1) mapeado entre o primeiro e
 *   o último marco. Vertical: a esfera fica na "linha de leitura" da janela,
 *   limitada ao primeiro e ao último marco.
 * - Reversível por construção: o alvo depende só da posição atual da
 *   rolagem, nunca do sentido nem do histórico. Subir desfaz o rastro.
 * - Fluidez: `pos` segue o alvo com suavização exponencial independente da
 *   taxa de quadros; um único laço rAF roda só enquanto há movimento.
 * - Escrita: apenas `transform` (esfera: translate3d; rastro: scale no eixo).
 *   Classes dos marcos só mudam quando o estado muda.
 * - O listener de rolagem só existe enquanto a linha do tempo está a até
 *   uma tela de distância.
 * - Movimento reduzido: sem suavização; a esfera salta de marco em marco
 *   (o mais próximo do alvo), sem deslizar.
 */
export function useTimelineTrail() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".timeline")
    const trail = root?.querySelector<HTMLElement>(".timeline-trail")
    const orb = root?.querySelector<HTMLElement>(".timeline-orb")
    const markers = root
      ? Array.from(
          root.querySelectorAll<HTMLElement>(".timeline-marker > span"),
        )
      : []
    if (!root || !trail || !orb || markers.length < 2) return

    const reducedQuery = window.matchMedia(REDUCED_QUERY)

    // Geometria (px, relativa à linha do tempo). Preenchida por measure().
    let vertical = false
    let centers: number[] = [] // centro de cada marco ao longo do eixo
    let cross = 0 // coordenada fixa no eixo perpendicular
    let orbRadius = 6

    let current = 0
    let goal = 0
    let frame = 0
    let last = 0
    let near = false
    const reached = markers.map(() => false)
    const active = markers.map(() => false)

    const offsetWithin = (el: HTMLElement) => {
      let x = 0
      let y = 0
      let node: HTMLElement | null = el
      while (node && node !== root) {
        x += node.offsetLeft
        y += node.offsetTop
        node = node.offsetParent as HTMLElement | null
      }
      return { x, y }
    }

    const snap = (pos: number) =>
      centers.reduce(
        (best, c) => (Math.abs(c - pos) < Math.abs(best - pos) ? c : best),
        centers[0],
      )

    const apply = (pos: number) => {
      const start = centers[0]
      const length = centers[centers.length - 1] - start
      const fraction = length > 0 ? (pos - start) / length : 0

      if (vertical) {
        trail.style.transform = `scaleY(${fraction})`
        orb.style.transform = `translate3d(${cross - orbRadius}px, ${pos - orbRadius}px, 0)`
      } else {
        trail.style.transform = `scaleX(${fraction})`
        orb.style.transform = `translate3d(${pos - orbRadius}px, ${cross - orbRadius}px, 0)`
      }

      markers.forEach((marker, i) => {
        const isReached = pos >= centers[i] - 0.5
        if (isReached !== reached[i]) {
          reached[i] = isReached
          marker.classList.toggle("is-reached", isReached)
        }
        const isActive = Math.abs(pos - centers[i]) < CURRENT_RADIUS
        if (isActive !== active[i]) {
          active[i] = isActive
          marker.classList.toggle("is-current", isActive)
        }
      })
    }

    /** Posição-alvo da esfera para a rolagem atual (1 leitura de layout). */
    const targetPosition = () => {
      const first = centers[0]
      const lastCenter = centers[centers.length - 1]
      const { top } = root.getBoundingClientRect()
      const vh = window.innerHeight

      if (vertical) {
        // A esfera acompanha a linha de leitura da janela.
        return Math.min(lastCenter, Math.max(first, vh * 0.62 - top))
      }
      // Início: topo da linha em 80% da janela. Fim: depois de ~55% da altura.
      const span = Math.max(vh * 0.55, 320)
      const t = Math.min(1, Math.max(0, (vh * 0.8 - top) / span))
      return first + t * (lastCenter - first)
    }

    const tick = (now: number) => {
      frame = 0
      const target = targetPosition()
      goal = reducedQuery.matches ? snap(target) : target

      if (reducedQuery.matches) {
        current = goal
      } else {
        const dt = last ? Math.min(now - last, 64) : 16
        current += (goal - current) * (1 - Math.exp(-dt / TAU))
        if (Math.abs(goal - current) < 0.2) current = goal
      }
      last = now
      apply(current)

      if (current !== goal) frame = requestAnimationFrame(tick)
      else last = 0
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const measure = () => {
      const points = markers.map((marker) => {
        const { x, y } = offsetWithin(marker)
        return {
          x: x + marker.offsetWidth / 2,
          y: y + marker.offsetHeight / 2,
        }
      })
      const first = points[0]
      const end = points[points.length - 1]
      vertical = Math.abs(end.y - first.y) > Math.abs(end.x - first.x)
      centers = points.map((p) => (vertical ? p.y : p.x))
      cross = vertical ? first.x : first.y
      orbRadius = orb.offsetWidth / 2

      const length = centers[centers.length - 1] - centers[0]
      root.dataset.axis = vertical ? "y" : "x"
      if (vertical) {
        trail.style.left = `${cross - 1}px`
        trail.style.top = `${centers[0]}px`
        trail.style.width = "2px"
        trail.style.height = `${length}px`
      } else {
        trail.style.left = `${centers[0]}px`
        trail.style.top = `${cross - 1}px`
        trail.style.width = `${length}px`
        trail.style.height = "2px"
      }

      // Geometria nova: reposiciona direto, sem deslizar de coordenadas antigas.
      const target = targetPosition()
      goal = reducedQuery.matches ? snap(target) : target
      current = goal
      apply(current)
    }

    const resizeObserver = new ResizeObserver(() => {
      measure()
      if (near) schedule()
    })
    resizeObserver.observe(root)

    // Só escuta a rolagem enquanto a linha do tempo está perto da tela.
    const nearObserver = new IntersectionObserver(
      ([entry]) => {
        near = entry.isIntersecting
        if (near) {
          window.addEventListener("scroll", schedule, { passive: true })
          schedule()
        } else {
          window.removeEventListener("scroll", schedule)
          if (frame) cancelAnimationFrame(frame)
          frame = 0
          last = 0
          // Fora de vista: já passou (completa) ou ainda não chegou (no início).
          current = goal =
            entry.boundingClientRect.top < 0
              ? centers[centers.length - 1]
              : centers[0]
          apply(current)
        }
      },
      { rootMargin: "100% 0px 100% 0px", threshold: 0 },
    )
    nearObserver.observe(root)

    const onReducedChange = () => schedule()
    reducedQuery.addEventListener("change", onReducedChange)

    measure()

    return () => {
      window.removeEventListener("scroll", schedule)
      reducedQuery.removeEventListener("change", onReducedChange)
      if (frame) cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      nearObserver.disconnect()
      markers.forEach((marker) =>
        marker.classList.remove("is-reached", "is-current"),
      )
      trail.style.transform = ""
      orb.style.transform = ""
      delete root.dataset.axis
    }
  }, [])
}
