import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { ArrowUpRight, GitBranch, X } from "lucide-react"
import { ExternalLink } from "../ExternalLink"
import { prefersReducedMotion } from "../../motion/prefs"
import { BrowserChrome } from "./BrowserChrome"
import type { FeaturedProject } from "./projectsData"

const OPEN_MS = 380
const CLOSE_MS = 220
const EASE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)"
const EASE_IN = "cubic-bezier(0.7, 0, 0.84, 0)"

/**
 * Apresentação ampliada de um projeto ("Mais informações"): reaproveita os
 * campos já existentes em `projectsData` (problema, funcionalidades, estado
 * atual, tecnologias, links) e mostra a MESMA captura do card.
 *
 * Continuidade: a captura sai do retângulo do card (`origin`, medido no
 * clique) e se acomoda no painel (FLIP: escala uniforme + translação, só
 * `transform`). Fechar pelo botão ou pelo fundo faz o caminho inverso; Escape
 * fecha na hora, sem esperar animação. O foco volta ao botão de origem e, como
 * a rolagem do fundo só fica travada enquanto o diálogo existe, o visitante
 * retorna ao mesmo ponto da galeria.
 */
export function ProjectDetailsDialog({
  project,
  cover,
  origin,
  onClose,
}: {
  project: FeaturedProject
  cover?: string
  origin: DOMRect | null
  onClose: () => void
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const figureRef = useRef<HTMLElement>(null)
  const closing = useRef(false)
  const [imageOk, setImageOk] = useState(Boolean(cover))
  const titleId = `${project.slug}-detalhes-titulo`

  // Entrada: a captura voa do card até o painel.
  useLayoutEffect(() => {
    const figure = figureRef.current
    if (!figure || !origin || prefersReducedMotion()) return
    const to = figure.getBoundingClientRect()
    if (!to.width) return
    const scale = origin.width / to.width
    const dx = origin.left - to.left
    const dy = origin.top - to.top
    const animation = figure.animate(
      [
        { transform: `translate(${dx}px, ${dy}px) scale(${scale})` },
        { transform: "none" },
      ],
      { duration: OPEN_MS, easing: EASE_OUT, fill: "backwards" },
    )
    return () => animation.cancel()
  }, [origin])

  // Saída animada (botão e fundo). Escape não passa por aqui.
  const requestClose = () => {
    if (closing.current) return
    closing.current = true
    const figure = figureRef.current
    const panel = panelRef.current
    if (!figure || !origin || !panel || prefersReducedMotion()) {
      onClose()
      return
    }
    const from = figure.getBoundingClientRect()
    const scale = origin.width / from.width
    const out = figure.animate(
      [
        { transform: "none" },
        {
          transform: `translate(${origin.left - from.left}px, ${origin.top - from.top}px) scale(${scale})`,
        },
      ],
      { duration: CLOSE_MS, easing: EASE_IN, fill: "forwards" },
    )
    panel.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: CLOSE_MS,
      easing: EASE_IN,
      fill: "forwards",
    })
    out.finished.then(onClose, onClose)
  }

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
        if (event.target === event.currentTarget) requestClose()
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
          <button ref={closeRef} onClick={requestClose} aria-label="Fechar detalhes">
            <X />
          </button>
        </div>
        <div className="pd-body" data-accent={project.accent}>
          <div className="pd-hero" data-has-image={imageOk}>
            {imageOk && cover && (
              <figure className="pd-shot" ref={figureRef}>
                <BrowserChrome title={project.title} />
                <img
                  src={cover}
                  alt={`Captura real do projeto ${project.title}`}
                  onError={() => setImageOk(false)}
                />
              </figure>
            )}
            <div className="pd-intro">
              <p className="pd-lead">{project.detail}</p>
              <p className="pd-status">
                <span aria-hidden="true" />
                {project.status}
              </p>
              <div className="pd-links">
                {project.demo && (
                  <ExternalLink
                    href={project.demo}
                    className="button button-primary pg-btn"
                  >
                    Demonstração <ArrowUpRight size={16} />
                  </ExternalLink>
                )}
                <ExternalLink
                  href={project.repo}
                  className="button button-secondary pg-btn"
                >
                  <GitBranch size={16} aria-hidden="true" />
                  GitHub
                </ExternalLink>
              </div>
            </div>
          </div>
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
