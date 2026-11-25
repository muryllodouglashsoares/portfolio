import { useEffect } from "react"
import { documentTop } from "./geometry"
import { REDUCED_QUERY, watchQuery } from "./prefs"
import { subscribeScroll } from "./scrollBus"

/**
 * Transições entre seções guiadas pela rolagem.
 *
 * Cada `.seam[data-seam]` (ver SectionSeam.tsx) é uma marca de altura zero na
 * fronteira entre duas seções. Conforme ela cruza a janela, o hook grava:
 *   --s  progresso (0 = entrando por baixo, 1 = saiu por cima)
 *   --b  sino de s (0 → 1 → 0), para elementos que aparecem e somem
 *   --d  traçado (0 → 1 entre s = .2 e .7), para linhas que se desenham
 * na própria marca, e ainda:
 *   --leave  = s na seção anterior (ela está saindo)
 *   --arrive = s na seção seguinte (ela está chegando)
 * O CSS (seams.css) converte tudo em transform/opacity. Usa o mesmo barramento
 * de rolagem dos demais efeitos (um listener, um quadro) e só escreve quando o
 * valor muda. Em movimento reduzido não escreve nada: os padrões do CSS
 * (--leave 0, --arrive 1) deixam as seções intactas.
 */
const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const smooth = (p: number) => p * p * (3 - 2 * p)
const round = (v: number) => Math.round(v * 1000) / 1000

type Seam = {
  el: HTMLElement
  prev: HTMLElement | null
  next: HTMLElement | null
  top: number
  last: number
}

export function useSectionSeams(selector = ".seam[data-seam]") {
  useEffect(() => {
    const seams: Seam[] = Array.from(
      document.querySelectorAll<HTMLElement>(selector),
    ).map((el) => ({
      el,
      prev: el.previousElementSibling as HTMLElement | null,
      next: el.nextElementSibling as HTMLElement | null,
      top: 0,
      last: Number.NaN,
    }))
    if (!seams.length) return

    const measure = () => {
      for (const seam of seams) {
        seam.top = documentTop(seam.el)
        seam.last = Number.NaN
      }
    }
    const clear = () => {
      for (const { el, prev, next } of seams) {
        for (const name of ["--s", "--b", "--d"]) el.style.removeProperty(name)
        prev?.style.removeProperty("--leave")
        next?.style.removeProperty("--arrive")
      }
    }

    measure()
    const resize = new ResizeObserver(measure)
    resize.observe(document.body)
    window.addEventListener("load", measure)
    document.fonts?.ready.then(measure).catch(() => {})

    let unsubscribe: (() => void) | null = null
    const stop = watchQuery(REDUCED_QUERY, (reduced) => {
      if (reduced) {
        unsubscribe?.()
        unsubscribe = null
        clear()
      } else if (!unsubscribe) {
        unsubscribe = subscribeScroll(({ y, vh }) => {
          for (const seam of seams) {
            const s = round(smooth(clamp01((y + vh - seam.top) / vh)))
            if (s === seam.last) continue
            seam.last = s
            const { style } = seam.el
            style.setProperty("--s", String(s))
            style.setProperty("--b", String(round(4 * s * (1 - s))))
            style.setProperty("--d", String(round(smooth(clamp01((s - 0.2) / 0.5)))))
            seam.prev?.style.setProperty("--leave", String(s))
            seam.next?.style.setProperty("--arrive", String(s))
          }
        })
      }
    })

    return () => {
      stop()
      unsubscribe?.()
      resize.disconnect()
      window.removeEventListener("load", measure)
      clear()
    }
  }, [selector])
}
