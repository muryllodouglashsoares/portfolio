import { useEffect, useRef, useState, type RefObject } from "react"

/**
 * Galeria horizontal guiada pela rolagem vertical.
 *
 * O container externo (`outer`) é alto: sua altura é `100svh + (n - 1) · largura`.
 * Dentro dele, o palco (`stage`) fica `sticky` com 100svh. O progresso real da
 * rolagem dentro de `outer` vira `--pg-pos` (0 … n-1, em "projetos") gravado no
 * palco; o CSS faz o resto (translate3d da trilha e as entradas de cada projeto).
 *
 * Custo:
 * - nenhum laço contínuo: só um listener passivo de `scroll`, que agenda UM
 *   requestAnimationFrame por quadro e escreve UMA variável CSS;
 * - o listener só existe enquanto a seção está perto da tela (IntersectionObserver);
 * - o layout (topo e distância rolável) é medido em cache e só é remedido quando
 *   o corpo da página ou a janela mudam de tamanho — nunca a cada quadro.
 *
 * Devolve o índice do projeto ativo (para a navegação) e `goTo`, que rola a
 * página até a posição de um projeto — usado pela navegação, por links
 * `#projeto-…` e por foco via teclado em um projeto fora de vista.
 */
export function useScrollGallery({
  enabled,
  count,
  outerRef,
  stageRef,
  slugAnchors,
}: {
  enabled: boolean
  count: number
  outerRef: RefObject<HTMLElement | null>
  stageRef: RefObject<HTMLElement | null>
  /** ids de âncora (`projeto-slug`) na ordem dos projetos */
  slugAnchors: readonly string[]
}) {
  const [active, setActive] = useState(0)
  const goToRef = useRef<(index: number, behavior?: ScrollBehavior) => void>(
    () => {},
  )

  useEffect(() => {
    const outer = outerRef.current
    const stage = stageRef.current
    if (!enabled || !outer || !stage) return

    const max = Math.max(count - 1, 1)
    let top = 0
    let range = 1
    let lastPos = -1
    let lastIndex = -1
    let frame = 0
    let listening = false

    const measure = () => {
      top = outer.getBoundingClientRect().top + window.scrollY
      range = Math.max(outer.offsetHeight - stage.offsetHeight, 1)
    }

    const apply = () => {
      frame = 0
      const progress = Math.min(Math.max((window.scrollY - top) / range, 0), 1)
      const pos = Math.round(progress * max * 10000) / 10000
      if (pos !== lastPos) {
        lastPos = pos
        stage.style.setProperty("--pg-pos", String(pos))
      }
      const index = Math.round(pos)
      if (index !== lastIndex) {
        lastIndex = index
        setActive(index)
      }
    }

    const request = () => {
      if (!frame) frame = window.requestAnimationFrame(apply)
    }

    const listen = (on: boolean) => {
      if (on === listening) return
      listening = on
      if (on) window.addEventListener("scroll", request, { passive: true })
      else window.removeEventListener("scroll", request)
    }

    const goTo = (index: number, behavior: ScrollBehavior = "auto") => {
      const clamped = Math.min(Math.max(index, 0), count - 1)
      window.scrollTo({ top: top + (clamped / max) * range, behavior })
    }
    goToRef.current = goTo

    // Só escuta a rolagem com a seção perto da tela. Ao sair, aplica uma última
    // vez: um salto longo (âncora) precisa deixar a galeria no estado final.
    const intersection = new IntersectionObserver(
      ([entry]) => {
        measure()
        apply()
        listen(entry.isIntersecting)
      },
      { rootMargin: "25% 0px 25% 0px" },
    )
    intersection.observe(outer)

    const resize = new ResizeObserver(() => {
      measure()
      request()
    })
    resize.observe(document.body)

    // Links para um projeto específico (timeline, seção Engenharia): em vez de
    // rolar até o elemento (que está deslocado pela trilha), vai à posição dele.
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return
      const link = (event.target as Element | null)?.closest?.(
        'a[href^="#projeto-"]',
      )
      const id = link?.getAttribute("href")?.slice(1)
      const index = id ? slugAnchors.indexOf(id) : -1
      if (index < 0) return
      event.preventDefault()
      goTo(index)
      history.replaceState(null, "", `#${id}`)
    }
    document.addEventListener("click", onClick)

    // Foco por teclado em um projeto fora de vista: traz o projeto para a tela
    // (sem isso o navegador só moveria o foco para um item recortado).
    const onFocusIn = (event: FocusEvent) => {
      const panel = (event.target as Element | null)?.closest<HTMLElement>(
        "[data-pg-index]",
      )
      if (!panel) return
      const index = Number(panel.dataset.pgIndex)
      if (Math.abs(lastPos - index) > 0.5) goTo(index, "instant")
    }
    outer.addEventListener("focusin", onFocusIn)

    // Abertura direta em /#projeto-…
    const hashIndex = slugAnchors.indexOf(location.hash.slice(1))
    if (hashIndex >= 0) goTo(hashIndex, "instant")

    return () => {
      listen(false)
      if (frame) window.cancelAnimationFrame(frame)
      intersection.disconnect()
      resize.disconnect()
      document.removeEventListener("click", onClick)
      outer.removeEventListener("focusin", onFocusIn)
      stage.style.removeProperty("--pg-pos")
      goToRef.current = () => {}
    }
  }, [enabled, count, outerRef, stageRef, slugAnchors])

  return { active, goTo: (index: number) => goToRef.current(index) }
}
