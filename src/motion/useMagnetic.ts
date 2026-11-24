import { useEffect, type RefObject } from "react"
import { MOTION, intensity } from "./config"
import { CURSOR_FX_QUERY, watchQuery } from "./prefs"
import { subscribePointer, type PointerFrame } from "./pointerBus"

/**
 * Botão magnético: o elemento se desloca poucos pixels em direção ao ponteiro
 * quando ele chega perto, e volta ao centro ao sair.
 *
 * - Um único componente de movimento para o site inteiro (Hero e Contato). Não
 *   se aplica a links em geral.
 * - Só existe com mouse/trackpad, tela de desktop e movimento permitido; em
 *   toque e em movimento reduzido o botão é um botão comum.
 * - Só `transform`: o layout, a área de clique e os vizinhos não mudam. O
 *   centro de referência desconta o deslocamento atual, então o botão não
 *   "foge" do ponteiro.
 * - `moveSelf: false` desloca só o conteúdo interno (`.mag-inner`); serve para
 *   elementos cujo próprio `transform` já é usado por uma animação de entrada.
 * - O laço de quadros roda só enquanto há movimento a interpolar.
 * - Foco e clique não dependem disso: `:focus-visible` e `:active` são CSS.
 */
export function useMagnetic<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { moveSelf = true }: { moveSelf?: boolean } = {},
) {
  useEffect(() => {
    const el = ref.current
    const inner = el?.querySelector<HTMLElement>(".mag-inner") ?? null
    const target = moveSelf ? el : inner
    if (!el || !target) return

    let x = 0
    let y = 0
    let tx = 0
    let ty = 0
    let raf = 0
    let visible = false
    let unsubscribe: (() => void) | null = null

    const paint = () => {
      target.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`
      if (moveSelf && inner) {
        const k = MOTION.magnet.inner
        inner.style.transform = `translate3d(${(x * k).toFixed(2)}px, ${(y * k).toFixed(2)}px, 0)`
      }
    }
    const tick = () => {
      x += (tx - x) * 0.2
      y += (ty - y) * 0.2
      const settled = Math.abs(tx - x) < 0.05 && Math.abs(ty - y) < 0.05
      if (settled) {
        x = tx
        y = ty
      }
      paint()
      if (settled) {
        raf = 0
        el.dataset.magnet = tx === 0 && ty === 0 ? "off" : "on"
        if (tx === 0 && ty === 0) {
          target.style.willChange = ""
          if (moveSelf && inner) inner.style.willChange = ""
        }
        return
      }
      raf = requestAnimationFrame(tick)
    }
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const onPointer = ({ x: px, y: py, inside }: PointerFrame) => {
      let nx = 0
      let ny = 0
      if (visible && inside) {
        const box = el.getBoundingClientRect()
        const cx = box.left + box.width / 2 - (moveSelf ? x : 0)
        const cy = box.top + box.height / 2 - (moveSelf ? y : 0)
        const reachX = box.width / 2 + 56
        const reachY = box.height / 2 + 56
        const dx = px - cx
        const dy = py - cy
        if (Math.abs(dx) < reachX && Math.abs(dy) < reachY) {
          const { pull, max } = MOTION.magnet
          const k = intensity()
          nx = Math.max(-max, Math.min(max, dx * pull)) * k
          ny = Math.max(-max, Math.min(max, dy * pull)) * k
        }
      }
      if (nx !== 0 || ny !== 0) target.style.willChange = "transform"
      tx = nx
      ty = ny
      kick()
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (!visible) {
        tx = ty = 0
        kick()
      }
    })
    observer.observe(el)

    const stop = watchQuery(CURSOR_FX_QUERY, (enabled) => {
      if (enabled && !unsubscribe) unsubscribe = subscribePointer(onPointer)
      if (!enabled && unsubscribe) {
        unsubscribe()
        unsubscribe = null
        if (raf) cancelAnimationFrame(raf)
        raf = 0
        x = y = tx = ty = 0
        target.style.transform = ""
        if (inner) inner.style.transform = ""
      }
    })

    return () => {
      stop()
      observer.disconnect()
      unsubscribe?.()
      if (raf) cancelAnimationFrame(raf)
      target.style.transform = ""
      target.style.willChange = ""
      if (inner) inner.style.transform = ""
    }
  }, [ref, moveSelf])
}
