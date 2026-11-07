import { useEffect, useRef } from "react"

/**
 * Pop-up "Abrir site": enquanto o ponteiro está sobre um elemento com
 * `data-cursor="open"`, o cursor nativo some e um cartão compacto o substitui,
 * mostrando o nome da aplicação (`data-cursor-title`) e o endereço do deploy
 * (`data-cursor-url`). Só existe para ponteiro fino com hover (mouse/trackpad);
 * em touch e para teclado o link funciona normalmente, sem o cartão.
 * Um único listener; a posição é gravada direto no evento (uma escrita de
 * `transform`). Texto e largura só são atualizados quando o alvo muda.
 */
const EDGE = 12 // distância mínima (px) entre o cartão e a borda da tela

function hostOf(url: string | undefined) {
  if (!url) return ""
  try {
    return new URL(url).host
  } catch {
    return url
  }
}

export function OpenCursor() {
  const pillRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLSpanElement>(null)
  const urlRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const pill = pillRef.current
    const titleEl = titleRef.current
    const urlEl = urlRef.current
    if (!pill || !titleEl || !urlEl) return
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)")
    if (!fine.matches) return

    const root = document.documentElement
    root.classList.add("has-open-cursor")
    let visible = false
    let current: Element | null = null
    let halfW = 100
    let halfH = 30
    const setVisible = (next: boolean) => {
      if (next === visible) return
      visible = next
      pill.dataset.visible = String(next)
    }
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return
      const target = event.target as Element | null
      const hit = target?.closest?.('[data-cursor="open"]') ?? null
      if (!hit) {
        setVisible(false)
        return
      }
      if (hit !== current) {
        current = hit
        titleEl.textContent = hit.getAttribute("data-cursor-title") ?? "Abrir site"
        urlEl.textContent = hostOf(hit.getAttribute("href") ?? undefined)
        halfW = pill.offsetWidth / 2
        halfH = pill.offsetHeight / 2
      }
      // Mantém o cartão inteiro dentro da janela (importante em telas estreitas).
      const x = Math.min(Math.max(event.clientX, halfW + EDGE), window.innerWidth - halfW - EDGE)
      const y = Math.min(Math.max(event.clientY, halfH + EDGE), window.innerHeight - halfH - EDGE)
      pill.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      setVisible(true)
    }
    const hide = () => {
      current = null
      setVisible(false)
    }

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
      <span className="open-cursor-icon">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" focusable="false">
          <path d="M7 17 17 7M8 7h9v9" />
        </svg>
      </span>
      <span className="open-cursor-text">
        <span className="open-cursor-label">Abrir site</span>
        <span ref={titleRef} className="open-cursor-title" />
        <span ref={urlRef} className="open-cursor-url" />
      </span>
    </div>
  )
}
