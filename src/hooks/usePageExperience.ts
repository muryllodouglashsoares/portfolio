import { useEffect, useState } from "react"

type PageExperience = {
  activeSection: string
  showBackToTop: boolean
}

export function usePageExperience(sectionIds: string[]): PageExperience {
  const [experience, setExperience] = useState<PageExperience>({
    activeSection: "inicio",
    showBackToTop: false,
  })

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))
    let frame = 0

    const update = () => {
      const scrollRange =
        document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollRange > 0 ? window.scrollY / scrollRange : 0
      const viewportAnchor = window.innerHeight * 0.38
      let activeSection = sections[0]?.id ?? "inicio"

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= viewportAnchor) {
          activeSection = section.id
        }
      }

      const timeline = document.getElementById("trajetoria")
      let timelineProgress = 0
      if (timeline) {
        const rect = timeline.getBoundingClientRect()
        const start = window.innerHeight * 0.75
        const distance = Math.max(rect.height + window.innerHeight * 0.25, 1)
        timelineProgress = Math.min(
          1,
          Math.max(0, (start - rect.top) / distance),
        )
      }

      document.documentElement.style.setProperty(
        "--reading-progress",
        String(progress),
      )
      document.documentElement.style.setProperty(
        "--timeline-progress",
        String(timelineProgress),
      )

      setExperience((current) => {
        const next = {
          activeSection,
          showBackToTop: window.scrollY > 760,
        }

        if (
          current.activeSection === next.activeSection &&
          current.showBackToTop === next.showBackToTop
        ) {
          return current
        }
        return next
      })
      frame = 0
    }

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", requestUpdate, { passive: true })
    window.addEventListener("resize", requestUpdate)

    return () => {
      window.removeEventListener("scroll", requestUpdate)
      window.removeEventListener("resize", requestUpdate)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [sectionIds])

  return experience
}
