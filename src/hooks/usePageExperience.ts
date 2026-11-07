import { useEffect, useState } from "react"

type PageExperience = {
  activeSection: string
  showBackToTop: boolean
}

/**
 * Estado de orientação da página: seção ativa, botão "voltar ao topo",
 * barra de leitura e linha do tempo.
 *
 * Nenhuma leitura de layout acontece a cada quadro de rolagem:
 * - a seção ativa vem de um IntersectionObserver com uma faixa fina a 38% da
 *   altura da janela (a seção que cruza a faixa é a ativa);
 * - a altura rolável é medida só quando o corpo da página muda de tamanho;
 * - o retângulo da linha do tempo só é lido enquanto ela está perto da tela;
 * - o Hero avisa o CSS (`data-hero`) quando sai de vista, para pausar as
 *   animações decorativas infinitas dele.
 */
export function usePageExperience(sectionIds: string[]): PageExperience {
  const [experience, setExperience] = useState<PageExperience>({
    activeSection: "inicio",
    showBackToTop: false,
  })

  useEffect(() => {
    const doc = document.documentElement
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))
    const progressEl = document.querySelector<HTMLElement>(".reading-progress")
    const timelineSection = document.getElementById("trajetoria")
    const timelineEl = timelineSection?.querySelector<HTMLElement>(".timeline")
    const heroEl = document.getElementById("inicio")

    let frame = 0
    let scrollRange = Math.max(doc.scrollHeight - window.innerHeight, 0)
    let timelineNear = false
    let lastProgress = -1
    let lastTimeline = -1

    const setTimeline = (value: number) => {
      const rounded = Number(value.toFixed(4))
      if (rounded === lastTimeline) return
      lastTimeline = rounded
      timelineEl?.style.setProperty("--timeline-progress", String(rounded))
    }

    const update = () => {
      frame = 0
      const scrollY = window.scrollY

      // Variáveis gravadas só nos elementos que as usam: no :root elas
      // invalidariam o estilo da página inteira a cada quadro de rolagem.
      const progress = scrollRange > 0 ? Math.min(scrollY / scrollRange, 1) : 0
      const rounded = Number(progress.toFixed(4))
      if (rounded !== lastProgress) {
        lastProgress = rounded
        progressEl?.style.setProperty("--reading-progress", String(rounded))
      }

      if (timelineNear && timelineSection) {
        const rect = timelineSection.getBoundingClientRect()
        const start = window.innerHeight * 0.75
        const distance = Math.max(rect.height + window.innerHeight * 0.25, 1)
        setTimeline(Math.min(1, Math.max(0, (start - rect.top) / distance)))
      }

      const showBackToTop = scrollY > 760
      setExperience((current) =>
        current.showBackToTop === showBackToTop
          ? current
          : { ...current, showBackToTop },
      )
    }

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    // Seção ativa: a última, na ordem do documento, que cruza a faixa.
    const crossing = new Set<string>()
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) crossing.add(entry.target.id)
          else crossing.delete(entry.target.id)
        }
        let next: string | null = null
        for (const section of sections) {
          if (crossing.has(section.id)) next = section.id
        }
        // Sem seção na faixa (ex.: rodapé): mantém a anterior.
        if (!next) return
        const id = next
        setExperience((current) =>
          current.activeSection === id ? current : { ...current, activeSection: id },
        )
      },
      { rootMargin: "-38% 0px -61% 0px", threshold: 0 },
    )
    sections.forEach((section) => sectionObserver.observe(section))

    // Linha do tempo: lê o retângulo só enquanto está a até uma tela de distância.
    const timelineObserver = timelineSection
      ? new IntersectionObserver(
          ([entry]) => {
            timelineNear = entry.isIntersecting
            if (timelineNear) {
              requestUpdate()
            } else {
              // Fora de vista: já passou (cheia) ou ainda não chegou (vazia).
              setTimeline(entry.boundingClientRect.top < 0 ? 1 : 0)
            }
          },
          { rootMargin: "100% 0px 100% 0px", threshold: 0 },
        )
      : null
    if (timelineSection) timelineObserver?.observe(timelineSection)

    // Hero fora de vista: o CSS pausa o brilho e a seta que animam sem parar.
    const heroObserver = heroEl
      ? new IntersectionObserver(
          ([entry]) => {
            doc.dataset.hero = entry.isIntersecting ? "visible" : "away"
          },
          { threshold: 0 },
        )
      : null
    if (heroEl) heroObserver?.observe(heroEl)

    // Altura rolável: remedida só quando o corpo muda de tamanho (filtros,
    // detalhes expandidos, fontes) ou a janela é redimensionada.
    const bodyObserver = new ResizeObserver(() => {
      scrollRange = Math.max(doc.scrollHeight - window.innerHeight, 0)
      requestUpdate()
    })
    bodyObserver.observe(document.body)

    const onResize = () => {
      scrollRange = Math.max(doc.scrollHeight - window.innerHeight, 0)
      requestUpdate()
    }

    update()
    window.addEventListener("scroll", requestUpdate, { passive: true })
    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("scroll", requestUpdate)
      window.removeEventListener("resize", onResize)
      if (frame) window.cancelAnimationFrame(frame)
      sectionObserver.disconnect()
      timelineObserver?.disconnect()
      heroObserver?.disconnect()
      bodyObserver.disconnect()
      delete doc.dataset.hero
    }
  }, [sectionIds])

  return experience
}
