import { useEffect, useRef } from "react"

/**
 * Cursor contextual. Dois estados, ambos lidos de atributos do elemento (nada
 * de seletores frágeis) e só para mouse/caneta:
 * - `data-cursor="open"`: o cartão abaixo, que substitui o cursor nativo;
 * - `data-cursor-label="Explorar"`: um rótulo curto ao lado do cursor nativo,
 *   que continua visível (não esconde nada). O texto diz a ação real do
 *   elemento: Explorar, Ampliar, Visitar, Repositório.
 *
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
  const tagRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const pill = pillRef.current
    const titleEl = titleRef.current
    const urlEl = urlRef.current
    const tag = tagRef.current
    if (!pill || !titleEl || !urlEl || !tag) return
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)")
    if (!fine.matches) return

    const root = document.documentElement
    root.classList.add("has-open-cursor")
    let visible = false
    let current: Element | null = null
    let halfW = 100
    let halfH = 30
    let tagVisible = false
    let tagText = ""
    const setVisible = (next: boolean) => {
      if (next === visible) return
      visible = next
      pill.dataset.visible = String(next)
    }
    const setTag = (text: string | null) => {
      const next = text !== null
      if (text !== null && text !== tagText) {
        tagText = text
        tag.textContent = text
      }
      if (next === tagVisible) return
      tagVisible = next
      tag.dataset.visible = String(next)
    }
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return
      const target = event.target as Element | null
      const hit = target?.closest?.('[data-cursor="open"]') ?? null
      if (!hit) {
        setVisible(false)
        const labelled = target?.closest?.("[data-cursor-label]")
        const text = labelled?.getAttribute("data-cursor-label")
        // O rótulo fica à direita e abaixo do ponteiro; vira à esquerda perto da borda.
        if (text) {
          const flip = event.clientX > window.innerWidth - 150
          tag.style.transform = `translate3d(${event.clientX + (flip ? -16 : 18)}px, ${event.clientY + 20}px, 0)${flip ? " translateX(-100%)" : ""}`
          setTag(text)
        } else setTag(null)
        return
      }
      setTag(null)
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
      setTag(null)
    }

    // Um clique abre algo (diálogo, nova aba): o rótulo sai e só volta com o próximo movimento.
    const onDown = () => setTag(null)
    document.addEventListener("pointerdown", onDown, { passive: true })
    document.addEventListener("pointermove", onMove, { passive: true })
    document.addEventListener("pointerleave", hide)
    window.addEventListener("blur", hide)
    window.addEventListener("scroll", hide, { passive: true })
    return () => {
      root.classList.remove("has-open-cursor")
      document.removeEventListener("pointerdown", onDown)
      document.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerleave", hide)
      window.removeEventListener("blur", hide)
      window.removeEventListener("scroll", hide)
    }
  }, [])

  return (
    <>
    <div ref={tagRef} className="cursor-tag" data-visible="false" aria-hidden="true" />
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
    </>
  )
}
