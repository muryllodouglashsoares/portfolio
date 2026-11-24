import { useEffect } from "react"
import { documentTop } from "./geometry"
import { REDUCED_QUERY, watchQuery } from "./prefs"
import { subscribeScroll } from "./scrollBus"

/**
 * Profundidade por rolagem: para cada elemento `[data-depth]` grava `--sp`
 * (-1 … 1: a posição do centro da seção em relação ao centro da janela). As
 * camadas decorativas dentro dele multiplicam `--sp` por velocidades
 * diferentes (translate3d no CSS), o que cria profundidade sem JavaScript por
 * camada. Só escreve enquanto a seção está perto da tela e só se o valor mudou;
 * em movimento reduzido não escreve nada (as camadas ficam paradas).
 */
export function useScrollDepth(selector = "[data-depth]") {
  useEffect(() => {
    const roots = Array.from(document.querySelectorAll<HTMLElement>(selector)).map(
      (el) => ({ el, top: 0, height: 0, near: false, last: Number.NaN }),
    )
    if (!roots.length) return

    const measure = () => {
      for (const root of roots) {
        root.top = documentTop(root.el)
        root.height = root.el.offsetHeight
      }
    }
    measure()
    const resize = new ResizeObserver(measure)
    resize.observe(document.body)
    const observers = roots.map((root) => {
      const observer = new IntersectionObserver(
        ([entry]) => (root.near = entry.isIntersecting),
        { rootMargin: "20% 0px 20% 0px" },
      )
      observer.observe(root.el)
      return observer
    })

    let unsubscribe: (() => void) | null = null
    const stop = watchQuery(REDUCED_QUERY, (reduced) => {
      if (reduced) {
        unsubscribe?.()
        unsubscribe = null
        roots.forEach((root) => root.el.style.removeProperty("--sp"))
      } else if (!unsubscribe) {
        unsubscribe = subscribeScroll(({ y, vh }) => {
          for (const root of roots) {
            if (!root.near) continue
            const span = vh / 2 + root.height / 2
            const raw = (y + vh / 2 - (root.top + root.height / 2)) / span
            const value = Math.round(Math.min(1, Math.max(-1, raw)) * 1000) / 1000
            if (value === root.last) continue
            root.last = value
            root.el.style.setProperty("--sp", String(value))
          }
        })
      }
    })

    return () => {
      stop()
      unsubscribe?.()
      resize.disconnect()
      observers.forEach((observer) => observer.disconnect())
    }
  }, [selector])
}
