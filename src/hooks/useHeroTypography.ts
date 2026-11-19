import { useEffect, type RefObject } from "react"

/**
 * Efeitos tipográficos do Hero que precisam de JS. O restante (revelação e
 * ghost typography) é CSS puro em index.css.
 *
 * Nenhum dos dois usa estado do React: o parallax escreve `transform`
 * diretamente em duas camadas e o sweep apenas liga/desliga um atributo
 * `data-run` que dispara uma animação CSS.
 */

/** Mouse real, tela grande e sem movimento reduzido. Celular/tablet = estático. */
const PARALLAX_QUERY =
  "(hover: hover) and (pointer: fine) and (min-width: 768px) and (prefers-reduced-motion: no-preference)"
const MOTION_QUERY = "(prefers-reduced-motion: no-preference)"

/** Deslocamento máximo (px) de cada camada. Direções opostas criam profundidade. */
const MAIN_SHIFT = { x: 4, y: 2.5 }
const GHOST_SHIFT = { x: -6, y: -4 }
/** Fração do caminho percorrida por quadro (interpolação suave). */
const FOLLOW = 0.08
const EPSILON = 0.001

export function useHeroParallax(
  sectionRef: RefObject<HTMLElement | null>,
  mainRef: RefObject<HTMLElement | null>,
  ghostRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const section = sectionRef.current
    const main = mainRef.current
    const ghost = ghostRef.current
    if (!section || !main || !ghost) return

    const query = window.matchMedia(PARALLAX_QUERY)
    let attached = false
    let raf = 0
    let vw = window.innerWidth
    let vh = window.innerHeight
    // alvo (pointer) e posição atual, ambos normalizados em -1…1
    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0

    const paint = () => {
      main.style.transform = `translate3d(${(cx * MAIN_SHIFT.x).toFixed(2)}px, ${(cy * MAIN_SHIFT.y).toFixed(2)}px, 0)`
      ghost.style.transform = `translate3d(${(cx * GHOST_SHIFT.x).toFixed(2)}px, ${(cy * GHOST_SHIFT.y).toFixed(2)}px, 0)`
    }

    // O loop só existe enquanto há movimento a interpolar; ao assentar, para.
    const tick = () => {
      cx += (tx - cx) * FOLLOW
      cy += (ty - cy) * FOLLOW
      const settled = Math.abs(tx - cx) < EPSILON && Math.abs(ty - cy) < EPSILON
      if (settled) {
        cx = tx
        cy = ty
      }
      paint()
      if (settled) {
        raf = 0
        if (tx === 0 && ty === 0) delete section.dataset.parallax
        return
      }
      raf = requestAnimationFrame(tick)
    }
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }

    // Normaliza pela janela (sem ler layout a cada movimento).
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return
      tx = Math.max(-1, Math.min(1, (event.clientX / vw) * 2 - 1))
      ty = Math.max(-1, Math.min(1, (event.clientY / vh) * 2 - 1))
      section.dataset.parallax = "on" // liga will-change só durante a interação
      kick()
    }
    const onLeave = () => {
      tx = 0
      ty = 0
      kick()
    }
    const onResize = () => {
      vw = window.innerWidth
      vh = window.innerHeight
    }

    const attach = () => {
      if (attached) return
      attached = true
      section.addEventListener("pointermove", onMove, { passive: true })
      section.addEventListener("pointerleave", onLeave)
      window.addEventListener("resize", onResize, { passive: true })
    }
    const detach = () => {
      if (!attached) return
      attached = false
      section.removeEventListener("pointermove", onMove)
      section.removeEventListener("pointerleave", onLeave)
      window.removeEventListener("resize", onResize)
      cancelAnimationFrame(raf)
      raf = 0
      tx = ty = cx = cy = 0
      main.style.transform = ""
      ghost.style.transform = ""
      delete section.dataset.parallax
    }
    const sync = () => (query.matches ? attach() : detach())

    sync()
    query.addEventListener("change", sync)
    return () => {
      query.removeEventListener("change", sync)
      detach()
    }
  }, [sectionRef, mainRef, ghostRef])
}

/** Intervalo entre reflexos: raro o bastante para não virar repetição. */
const SWEEP_FIRST_DELAY = 2000 // depois que a revelação termina (~1,7 s)
const SWEEP_MIN_GAP = 11000
const SWEEP_MAX_GAP = 17000

export function useHeroSweep(
  sectionRef: RefObject<HTMLElement | null>,
  sweepRef: RefObject<HTMLElement | null>,
  ready: boolean,
) {
  useEffect(() => {
    const section = sectionRef.current
    const sweep = sweepRef.current
    if (!ready || !section || !sweep) return

    const motion = window.matchMedia(MOTION_QUERY)
    let timer = 0
    let running = false
    let visible = true

    const schedule = (ms: number) => {
      window.clearTimeout(timer)
      timer = window.setTimeout(run, ms)
    }
    const run = () => {
      timer = 0
      // Fora da tela ou aba oculta: não roda; o observador retoma depois.
      if (!visible || document.hidden || !motion.matches) return
      running = true
      sweep.dataset.run = "true"
    }
    const onEnd = (event: AnimationEvent) => {
      if (event.target !== sweep) return
      delete sweep.dataset.run
      running = false
      schedule(SWEEP_MIN_GAP + Math.random() * (SWEEP_MAX_GAP - SWEEP_MIN_GAP))
    }
    const resume = () => {
      if (visible && !document.hidden && !running && !timer) schedule(2500)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) resume()
        else {
          window.clearTimeout(timer)
          timer = 0
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(section)
    sweep.addEventListener("animationend", onEnd)
    document.addEventListener("visibilitychange", resume)
    schedule(SWEEP_FIRST_DELAY)

    return () => {
      window.clearTimeout(timer)
      observer.disconnect()
      sweep.removeEventListener("animationend", onEnd)
      document.removeEventListener("visibilitychange", resume)
      delete sweep.dataset.run
    }
  }, [sectionRef, sweepRef, ready])
}
