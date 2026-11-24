import { useEffect, useRef } from "react"
import { MOTION } from "../motion/config"
import { CURSOR_FX_QUERY, watchQuery } from "../motion/prefs"
import { subscribePointer } from "../motion/pointerBus"

/**
 * Rastro do cursor: quatro pontos pequenos que seguem o ponteiro com atraso.
 *
 * - Só nas áreas marcadas com `data-trail` (Hero e palco de Projetos), nunca
 *   sobre links, botões ou o cartão do cursor contextual.
 * - Só mouse em tela de desktop e sem movimento reduzido; em outros casos o
 *   componente não registra nada.
 * - Usa o barramento de ponteiro compartilhado (um listener para o site).
 *   O laço de quadros roda só enquanto os pontos ainda estão se movendo e
 *   os pontos somem depois de `idleMs` parado. É puramente decorativo: dá
 *   para removê-lo sem afetar nenhuma função.
 */
const TRAIL_BLOCKERS = "a, button, input, textarea, select, [data-cursor], [data-cursor-label]"

export function CursorTrail() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const dots = Array.from(root.children) as HTMLElement[]
    const pos = dots.map(() => ({ x: 0, y: 0 }))
    let tx = 0
    let ty = 0
    let raf = 0
    let on = false
    let hideTimer = 0
    let unsubscribe: (() => void) | null = null

    const show = (next: boolean) => {
      if (next === on) return
      on = next
      root.dataset.on = String(next)
    }
    const tick = () => {
      raf = 0
      let moving = false
      dots.forEach((dot, i) => {
        const lead = i === 0 ? { x: tx, y: ty } : pos[i - 1]
        const k = 0.34 - i * 0.06
        pos[i].x += (lead.x - pos[i].x) * k
        pos[i].y += (lead.y - pos[i].y) * k
        if (Math.abs(lead.x - pos[i].x) > 0.3 || Math.abs(lead.y - pos[i].y) > 0.3) moving = true
        dot.style.transform = `translate3d(${pos[i].x.toFixed(1)}px, ${pos[i].y.toFixed(1)}px, 0)`
      })
      if (moving) raf = requestAnimationFrame(tick)
    }

    const start = () =>
      subscribePointer(({ x, y, inside, target }) => {
        const inArea = inside && target?.closest("[data-trail]") && !target.closest(TRAIL_BLOCKERS)
        if (!inArea) {
          window.clearTimeout(hideTimer)
          show(false)
          return
        }
        if (!on) pos.forEach((p) => ((p.x = x), (p.y = y))) // nasce no cursor
        tx = x
        ty = y
        show(true)
        window.clearTimeout(hideTimer)
        hideTimer = window.setTimeout(() => show(false), MOTION.trail.idleMs)
        if (!raf) raf = requestAnimationFrame(tick)
      })

    const stop = watchQuery(CURSOR_FX_QUERY, (enabled) => {
      if (enabled && !unsubscribe) unsubscribe = start()
      if (!enabled && unsubscribe) {
        unsubscribe()
        unsubscribe = null
        show(false)
      }
    })
    return () => {
      stop()
      unsubscribe?.()
      window.clearTimeout(hideTimer)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={rootRef} className="cursor-trail" data-on="false" aria-hidden="true">
      {Array.from({ length: MOTION.trail.dots }, (_, i) => (
        <span key={i} style={{ "--i": i } as React.CSSProperties} />
      ))}
    </div>
  )
}
