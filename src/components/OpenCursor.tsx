import { useEffect, useRef } from "react"

/**
 * Cursor "Abrir": enquanto o ponteiro está sobre um elemento com
 * `data-cursor="open"`, o cursor nativo some e uma pílula branca o substitui.
 * Só existe para ponteiro fino com hover (mouse/trackpad); em touch e para
 * teclado o link funciona normalmente, sem a pílula.
 * Um único listener; a posição é gravada direto no evento (uma escrita de
 * `transform`), então a pílula nunca fica atrás do mouse.
 */
export function OpenCursor() {
  const pillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const pill = pillRef.current
    if (!pill) return
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)")
    if (!fine.matches) return

    const root = document.documentElement
    root.classList.add("has-open-cursor")
    let visible = false
    const setVisible = (next: boolean) => {
      if (next === visible) return
      visible = next
      pill.dataset.visible = String(next)
    }
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return
      const target = event.target as Element | null
      const hit = target?.closest?.('[data-cursor="open"]')
      if (!hit) {
        setVisible(false)
        return
      }
      pill.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`
      setVisible(true)
    }
    const hide = () => setVisible(false)

    document.addEventListener("pointermove", onMove, { passive: true })
    document.addEventListener("pointerleave", hide)
    window.addEventListener("blur", hide)
    window.addEventListener("scroll", hide, { passive: true })
    return () => {
      root.classList.remove("has-open-cursor")
      document.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerleave", hide)
      window.removeEventListener("blur", hide)
      window.removeEventListener("scroll", hide)
    }
  }, [])

  return (
    <div ref={pillRef} className="open-cursor" data-visible="false" aria-hidden="true">
      Abrir
    </div>
  )
}
