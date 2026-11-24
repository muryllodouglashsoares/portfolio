import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ArrowUpRight, Code2, GitBranch, Info } from "lucide-react"
import { ExternalLink } from "../ExternalLink"
import type { LightboxImage } from "../ProjectLightbox"
import { useRedWave } from "../../hooks/useRedWave"
import { useScrollGallery } from "../../hooks/useScrollGallery"
import { REDUCED_QUERY } from "../../motion/prefs"
import { useTilt } from "../../motion/useTilt"
import { BrowserChrome } from "./BrowserChrome"
import { ProjectDetailsDialog } from "./ProjectDetailsDialog"
import {
  complementaryProjects,
  featuredProjects,
  projectAnchor,
  type FeaturedProject,
} from "./projectsData"
import { shotsFor } from "./projectShots"

type Resolved = FeaturedProject & { images: string[]; cover?: string }

const resolved: Resolved[] = featuredProjects.map((project) => {
  const images = shotsFor(project.slug, project.image)
  return { ...project, images, cover: images[0] }
})
const anchors = resolved.map((p) => projectAnchor(p.slug))
const pad = (n: number) => String(n).padStart(2, "0")

/**
 * Galeria horizontal só quando há espaço e o visitante aceita movimento.
 * Caso contrário (celular, janela muito baixa, prefers-reduced-motion) os
 * projetos ficam em sequência vertical, sem sticky e sem capturar a rolagem.
 */
const SCROLL_MODE_QUERY =
  "(min-width: 768px) and (min-height: 480px) and (prefers-reduced-motion: no-preference)"

function useGalleryMode() {
  const [mode, setMode] = useState<"scroll" | "stacked">(() =>
    window.matchMedia(SCROLL_MODE_QUERY).matches ? "scroll" : "stacked",
  )
  useEffect(() => {
    const query = window.matchMedia(SCROLL_MODE_QUERY)
    const onChange = () => setMode(query.matches ? "scroll" : "stacked")
    onChange()
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])
  return mode
}

/**
 * Imagem do projeto. Com deploy vira link para o site (mantendo o cursor
 * "Abrir" de OpenCursor); sem deploy, amplia a captura. O espaço é reservado
 * pelo aspect-ratio, então a imagem não causa layout shift.
 */
function ProjectShot({
  project,
  index,
  onZoom,
}: {
  project: Resolved
  index: number
  onZoom: () => void
}) {
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading")
  const hasImage = Boolean(project.cover) && state !== "error"

  const content = (
    <>
      <BrowserChrome title={project.title} />
      {hasImage ? (
        <img
          src={project.cover}
          alt={`Captura real do projeto ${project.title}`}
          width={1600}
          height={1000}
          loading={index < 2 ? "eager" : "lazy"}
          decoding="async"
          data-state={state}
          onLoad={() => setState("loaded")}
          onError={() => setState("error")}
        />
      ) : (
        <div className="image-placeholder">
          <Code2 />
          <span>
            {state === "error"
              ? "Não foi possível carregar a captura"
              : "Captura real será adicionada"}
          </span>
          <small>O projeto já está disponível no repositório</small>
        </div>
      )}
      {hasImage && !project.demo && (
        <span className="pg-hint">Clique para ampliar</span>
      )}
    </>
  )

  /*
   * Cena do mockup (3.1 e 3.2): planos separados em profundidade.
   *   fundo   · moldura deslocada, atrás da captura
   *   meio    · a captura (única parte que recebe clique)
   *   frente  · numeração e marcas de canto, fora da área da captura
   * Só a captura é conteúdo; o resto é decorativo (aria-hidden). A inclinação
   * vem de useTilt (variáveis --rx/--ry); a máscara de entrada fica em
   * `.pg-shot-mask`, separada, para o recorte não cortar a inclinação.
   */
  return (
    <div className="pg-shot">
      <div className="pg-scene">
        <span className="pg-shadow" aria-hidden="true" />
        <div className="pg-tilt">
          <span className="pg-plane" aria-hidden="true" />
          <div className="pg-shot-mask">
            {project.demo ? (
              <a
                className="pg-frame pg-frame-action"
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                data-cursor="open"
                data-cursor-title={project.title}
                data-cursor-url={project.demo}
                aria-label={`Abrir o site de ${project.title} em nova aba`}
              >
                {content}
              </a>
            ) : (
              <button
                className="pg-frame pg-frame-action"
                type="button"
                disabled={!hasImage}
                aria-label={
                  hasImage ? `Ampliar captura do projeto ${project.title}` : undefined
                }
                data-cursor-label={hasImage ? "Ampliar" : undefined}
                onClick={onZoom}
              >
                {content}
              </button>
            )}
          </div>
          <span className="pg-tag" aria-hidden="true">
            {project.index}
          </span>
          <span className="pg-corners" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
        </div>
      </div>
    </div>
  )
}

function ProjectPanel({
  project,
  position,
  total,
  onOpenShots,
  onOpenDetails,
}: {
  project: Resolved
  position: number
  total: number
  onOpenShots: (title: string, images: LightboxImage[], index: number) => void
  onOpenDetails: () => void
}) {
  const openShots = () =>
    onOpenShots(
      project.title,
      project.images.map((src, i) => ({
        src,
        alt: `Captura ${i + 1} do projeto ${project.title}`,
      })),
      0,
    )

  return (
    <article
      className="pg-panel"
      id={projectAnchor(project.slug)}
      data-pg-index={position}
      data-accent={project.accent}
      style={{ "--i": position } as React.CSSProperties}
      aria-label={`Projeto ${position + 1} de ${total}: ${project.title}`}
    >
      <ProjectShot project={project} index={position} onZoom={openShots} />
      <div className="pg-copy">
        <p className="pg-topline" style={{ "--k": 0 } as React.CSSProperties}>
          <span>
            {project.index} / {pad(total)}
          </span>
          <span>{project.eyebrow}</span>
        </p>
        <h3 className="pg-title" style={{ "--k": 1 } as React.CSSProperties}>
          {project.title}
        </h3>
        <p className="pg-status" style={{ "--k": 2 } as React.CSSProperties}>
          <span aria-hidden="true" />
          {project.status}
        </p>
        <p className="pg-desc" style={{ "--k": 3 } as React.CSSProperties}>
          {project.description}
        </p>
        <ul
          className="tech-list pg-tech"
          aria-label={`Tecnologias de ${project.title}`}
          style={{ "--k": 4 } as React.CSSProperties}
        >
          {project.tech.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="pg-actions" style={{ "--k": 5 } as React.CSSProperties}>
          {project.demo && (
            <ExternalLink
              href={project.demo}
              className="button button-primary pg-btn"
              cursorLabel="Visitar"
            >
              Demonstração <ArrowUpRight size={16} />
            </ExternalLink>
          )}
          <button
            type="button"
            className="button button-secondary pg-btn"
            onClick={onOpenDetails}
            aria-haspopup="dialog"
            data-cursor-label="Explorar"
          >
            <Info size={16} aria-hidden="true" />
            Mais informações
            <span className="sr-only"> sobre {project.title}</span>
          </button>
          <ExternalLink
            href={project.repo}
            className="button button-secondary pg-btn pg-btn-icon"
            cursorLabel="Repositório"
          >
            <GitBranch size={16} aria-hidden="true" />
            <span className="pg-btn-label">GitHub</span>
            <span className="sr-only"> de {project.title}</span>
          </ExternalLink>
          {project.demo && project.images.length > 1 && (
            <button type="button" className="link-button" onClick={openShots}>
              Ver capturas ({project.images.length})
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

export function ProjectsGallery({
  onOpenShots,
}: {
  onOpenShots: (title: string, images: LightboxImage[], index: number) => void
}) {
  const mode = useGalleryMode()
  const outerRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const complementaryRef = useRef<HTMLDivElement>(null)
  const pgRef = useRef<HTMLDivElement>(null)
  const [detailsSlug, setDetailsSlug] = useState<string | null>(null)
  const [origin, setOrigin] = useState<DOMRect | null>(null)
  const total = resolved.length
  useRedWave(complementaryRef)
  useTilt(pgRef)
  const slugAnchors = useMemo(() => anchors, [])

  const { active, goTo } = useScrollGallery({
    enabled: mode === "scroll",
    count: total,
    outerRef,
    stageRef,
    slugAnchors,
  })

  const closeDetails = useCallback(() => setDetailsSlug(null), [])
  const detailsProject = resolved.find((p) => p.slug === detailsSlug)

  // Um único estado de projeto selecionado. A origem da animação é a captura
  // do próprio card, medida no momento do clique.
  const openDetails = (slug: string) => {
    const frame = document.querySelector(`#${projectAnchor(slug)} .pg-frame`)
    setOrigin(frame ? frame.getBoundingClientRect() : null)
    setDetailsSlug(slug)
  }

  // 3.3  Revelação por máscara no modo em sequência (celular, movimento
  // reduzido não entra): uma vez por entrada na tela. Sem JS, sem
  // IntersectionObserver ou em movimento reduzido, a captura já aparece inteira.
  useEffect(() => {
    if (mode !== "stacked" || !("IntersectionObserver" in window)) return
    if (window.matchMedia(REDUCED_QUERY).matches) return
    const masks = Array.from(
      pgRef.current?.querySelectorAll<HTMLElement>(".pg-shot-mask") ?? [],
    )
    masks.forEach((mask) => (mask.dataset.reveal = "pending"))
    // Observa o contêiner (a própria máscara está recortada e não "intersecta").
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const mask = entry.target.querySelector<HTMLElement>(".pg-shot-mask")
          if (mask) mask.dataset.reveal = "done"
          observer.unobserve(entry.target)
        }),
      { threshold: 0.15 },
    )
    masks.forEach((mask) => {
      const shot = mask.closest(".pg-shot")
      if (shot) observer.observe(shot)
    })
    return () => {
      observer.disconnect()
      masks.forEach((mask) => delete mask.dataset.reveal)
    }
  }, [mode])

  // 3.6  Setas Esquerda/Direita movem o projeto ativo a partir do HUD.
  const onHudKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0
    if (!step) return
    event.preventDefault()
    const next = Math.min(Math.max(active + step, 0), total - 1)
    goTo(next)
    event.currentTarget
      .querySelectorAll<HTMLButtonElement>("button")
      [next]?.focus({ preventScroll: true })
  }

  return (
    <>
      <div
        className="pg"
        ref={pgRef}
        data-mode={mode}
        style={{ "--n": total, "--m": total - 1 } as React.CSSProperties}
      >
        <div className="pg-outer" ref={outerRef}>
          <div
            className="pg-stage"
            data-trail
            ref={stageRef}
            role="region"
            aria-label="Galeria de projetos"
          >
            <div className="pg-track">
              {resolved.map((project, position) => (
                <ProjectPanel
                  key={project.slug}
                  project={project}
                  position={position}
                  total={total}
                  onOpenShots={onOpenShots}
                  onOpenDetails={() => openDetails(project.slug)}
                />
              ))}
            </div>
            {mode === "scroll" && (
              <nav className="pg-hud" aria-label="Projetos" onKeyDown={onHudKeyDown}>
                <ol>
                  {resolved.map((project, i) => (
                    <li key={project.slug}>
                      <button
                        type="button"
                        aria-current={active === i ? "true" : undefined}
                        onClick={() => goTo(i)}
                      >
                        <span>{project.index}</span>
                        <span className="pg-hud-name">{project.title}</span>
                        <span className="sr-only">
                          Ir para o projeto {project.title}
                        </span>
                      </button>
                    </li>
                  ))}
                </ol>
                <div className="pg-bar" aria-hidden="true">
                  <i />
                  {resolved.map((project, i) => (
                    <b
                      key={project.slug}
                      style={{ "--k": i } as React.CSSProperties}
                      data-reached={active >= i}
                    />
                  ))}
                </div>
                <span className="pg-count" aria-hidden="true">
                  {pad(active + 1)} / {pad(total)}
                </span>
                {/* Posição para leitores de tela, anunciada só quando muda. */}
                <p className="sr-only" role="status">
                  Projeto {active + 1} de {total}: {resolved[active]?.title}
                </p>
              </nav>
            )}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="complementary">
          <div className="complementary-heading reveal-item">
            <div>
              <span className="section-label">Projetos complementares</span>
              <h3>Outros experimentos e entregas</h3>
            </div>
            <p>Projetos que documentam a evolução em web, produto e robótica.</p>
          </div>
          <div className="complementary-list reveal-item" ref={complementaryRef}>
            {complementaryProjects.map((project, index) => (
              <ExternalLink
                href={project.href}
                className="mini-project"
                cursorLabel="Repositório"
                key={project.name}
              >
                <span className="mini-index">{pad(index + 1)}</span>
                <span>
                  <strong>{project.name}</strong>
                  <small>{project.kind}</small>
                </span>
                <span className="mini-stack">{project.stack}</span>
                <ArrowUpRight className="mini-arrow" aria-hidden="true" />
                {/* Onda vermelha sob o conteúdo, nascida no cursor (useRedWave). */}
                <span className="mini-wave" aria-hidden="true">
                  <i />
                  <i />
                </span>
                {/* Contorno desenhado no hover/foco (ver .mini-outline no CSS). */}
                <svg className="mini-outline" aria-hidden="true" focusable="false">
                  <rect
                    x=".5"
                    y=".5"
                    width="100%"
                    height="100%"
                    rx="6"
                    pathLength={1}
                  />
                </svg>
              </ExternalLink>
            ))}
          </div>
        </div>
      </div>

      {detailsProject && (
        <ProjectDetailsDialog
          project={detailsProject}
          cover={detailsProject.cover}
          origin={origin}
          onClose={closeDetails}
        />
      )}
    </>
  )
}
