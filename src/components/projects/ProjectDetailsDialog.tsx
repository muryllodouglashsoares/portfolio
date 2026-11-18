import { useEffect, useRef } from "react"
import { X } from "lucide-react"
import type { FeaturedProject } from "./projectsData"

/**
 * "Mais informações" de um projeto: reaproveita os campos já existentes em
 * `projectsData` (problema, funcionalidades, estado atual) que antes apareciam
 * no bloco expansível. Como diálogo, não altera a altura da galeria.
 */
export function ProjectDetailsDialog({
  project,
  onClose,
}: {
  project: FeaturedProject
  onClose: () => void
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const titleId = `${project.slug}-detalhes-titulo`

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const previousFocus = document.activeElement as HTMLElement | null
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
        return
      }
      if (event.key !== "Tab") return
      const focusable =
        panelRef.current?.querySelectorAll<HTMLElement>("button, a[href]") ?? []
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
      previousFocus?.focus({ preventScroll: true })
    }
  }, [onClose])

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="lightbox-panel pd-panel" ref={panelRef}>
        <div className="lightbox-header">
          <div>
            <span>
              {project.index} · {project.eyebrow}
            </span>
            <strong id={titleId}>{project.title}</strong>
          </div>
          <button ref={closeRef} onClick={onClose} aria-label="Fechar detalhes">
            <X />
          </button>
        </div>
        <div className="pd-body" data-accent={project.accent}>
          <p className="pd-lead">{project.detail}</p>
          <div className="pd-grid">
            <div>
              <h4>Problema que resolve</h4>
              <p>{project.problem}</p>
              {project.statusNote && (
                <>
                  <h4>Estado atual</h4>
                  <p>{project.statusNote}</p>
                </>
              )}
              <h4>Tecnologias</h4>
              <ul className="tech-list" aria-label="Tecnologias">
                {project.tech.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Funcionalidades implementadas</h4>
              <ul className="pd-features">
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
