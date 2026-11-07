import { useEffect, useState, type ReactNode } from "react"
import { flushSync } from "react-dom"
import { ArrowUpRight, ChevronDown, Code2, GitBranch } from "lucide-react"
import { ExternalLink } from "../ExternalLink"
import type { LightboxImage } from "../ProjectLightbox"
import {
  categoryLabels,
  complementaryProjects,
  featuredProjects,
  filterCount,
  filterOrder,
  matchesFilter,
  projectAnchor,
  type FeaturedProject,
  type FilterId,
} from "./projectsData"
import { shotsFor } from "./projectShots"

type Resolved = FeaturedProject & { images: string[]; cover?: string }

const resolved: Resolved[] = featuredProjects.map((project) => {
  const images = shotsFor(project.slug, project.image)
  return { ...project, images, cover: images[0] }
})

const filterLabel = (filter: FilterId) =>
  filter === "all" ? "Todos" : categoryLabels[filter]

/**
 * Moldura da imagem do projeto. Com deploy ativo vira um link para o site
 * (e mostra o cursor "Abrir"); sem deploy, mantém o comportamento de ampliar.
 */
function ImageFrame({
  project,
  zoomable,
  onZoom,
  children,
}: {
  project: Resolved
  zoomable: boolean
  onZoom: () => void
  children: ReactNode
}) {
  if (project.demo) {
    return (
      <a
        className="project-browser project-image-button"
        href={project.demo}
        target="_blank"
        rel="noreferrer"
        data-cursor="open"
        data-cursor-title={project.title}
        aria-label={`Abrir o site de ${project.title} em nova aba`}
      >
        {children}
      </a>
    )
  }
  return (
    <button
      className="project-browser project-image-button"
      type="button"
      aria-label={
        zoomable ? `Ampliar captura do projeto ${project.title}` : undefined
      }
      disabled={!zoomable}
      onClick={() => zoomable && onZoom()}
    >
      {children}
    </button>
  )
}

function ProjectVisual({
  project,
  onZoom,
}: {
  project: Resolved
  onZoom: () => void
}) {
  // loading → shimmer atrás da imagem; error → aviso no lugar da captura.
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading")
  const hasImage = Boolean(project.cover) && state !== "error"

  return (
    <div className="project-visual reveal-item reveal-scale">
      <ImageFrame project={project} zoomable={hasImage} onZoom={onZoom}>
        <div className="browser-bar">
          <div>
            <i />
            <i />
            <i />
          </div>
          <span>{project.title.toLowerCase().replace(/\s+/g, "-")}.app</span>
          <b />
        </div>
        {hasImage ? (
          <img
            src={project.cover}
            alt={`Captura real do projeto ${project.title}`}
            width={1600}
            height={1000}
            loading="lazy"
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
          <span className="project-image-hint">Clique para ampliar</span>
        )}
      </ImageFrame>
      <div className="status-pill">
        <span />
        {project.status}
      </div>
    </div>
  )
}

function ProjectArticle({
  project,
  position,
  visible,
  open,
  onToggle,
  onOpenShots,
}: {
  project: Resolved
  position: number
  visible: boolean
  open: boolean
  onToggle: () => void
  onOpenShots: (title: string, images: LightboxImage[], index: number) => void
}) {
  const anchor = projectAnchor(project.slug)
  const detailsId = `${anchor}-detalhes`
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
      className={`project project-${project.accent} ${
        position % 2 ? "project-reverse" : ""
      }`}
      id={anchor}
      hidden={!visible}
    >
      <div className="project-copy reveal-item">
        <div className="project-topline">
          <span>{project.index}</span>
          <span>{project.eyebrow}</span>
        </div>
        <h3>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <p className="project-detail">{project.detail}</p>
        <ul className="tech-list" aria-label={`Tecnologias de ${project.title}`}>
          {project.tech.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="project-links">
          <button
            type="button"
            className="project-toggle"
            aria-expanded={open}
            aria-controls={detailsId}
            onClick={onToggle}
          >
            {open ? "Ocultar detalhes" : "Ver detalhes"}
            <ChevronDown size={16} aria-hidden="true" />
            <span className="sr-only"> de {project.title}</span>
          </button>
          <ExternalLink href={project.repo}>
            Repositório <GitBranch size={16} />
          </ExternalLink>
          {project.demo && (
            <ExternalLink href={project.demo}>
              Abrir demo <ArrowUpRight size={16} />
            </ExternalLink>
          )}
          {project.demo && project.images.length > 1 && (
            <button type="button" className="link-button" onClick={openShots}>
              Ver capturas ({project.images.length})
            </button>
          )}
        </div>
      </div>
      <ProjectVisual project={project} onZoom={openShots} />
      <div className="project-details" id={detailsId} hidden={!open}>
        <div className="project-details-grid">
          <div className="project-details-block">
            <h4>Problema que resolve</h4>
            <p>{project.problem}</p>
            {project.statusNote && (
              <>
                <h4>Estado atual</h4>
                <p>{project.statusNote}</p>
              </>
            )}
          </div>
          <div className="project-details-block">
            <h4>Funcionalidades implementadas</h4>
            <ul>
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  )
}

export function ProjectsExplorer({
  onOpenShots,
}: {
  onOpenShots: (title: string, images: LightboxImage[], index: number) => void
}) {
  const [filter, setFilter] = useState<FilterId>("all")
  const [openSlugs, setOpenSlugs] = useState<ReadonlySet<string>>(new Set())

  // Um link para um projeto que o filtro escondeu (ex.: "Utilizada em: …" na
  // seção Engenharia) limpa o filtro e só então rola até ele.
  useEffect(() => {
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
      const target = id ? document.getElementById(id) : null
      if (!id || !target?.hidden) return
      event.preventDefault()
      flushSync(() => setFilter("all"))
      target.scrollIntoView({ block: "start" })
      history.replaceState(null, "", `#${id}`)
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  const toggle = (slug: string) =>
    setOpenSlugs((current) => {
      const next = new Set(current)
      if (!next.delete(slug)) next.add(slug)
      return next
    })

  const total = filterCount(filter)
  const visibleFeatured = resolved.filter((p) =>
    matchesFilter(p.categories, filter),
  )
  const visibleComplementary = complementaryProjects.filter((p) =>
    matchesFilter(p.categories, filter),
  )

  return (
    <>
      <div className="projects-toolbar reveal-item">
        <div
          className="filter-group"
          role="group"
          aria-label="Filtrar projetos por categoria"
        >
          {filterOrder.map((id) => (
            <button
              key={id}
              type="button"
              className="filter-chip"
              aria-pressed={filter === id}
              onClick={() => setFilter(id)}
            >
              {filterLabel(id)}
              <span className="filter-count" aria-hidden="true">
                {filterCount(id)}
              </span>
            </button>
          ))}
        </div>
        <p className="projects-count" role="status">
          {total} {total === 1 ? "projeto" : "projetos"}
          {filter !== "all" && ` em ${filterLabel(filter)}`}
        </p>
      </div>

      <div className="project-list">
        {visibleFeatured.length === 0 && (
          <p className="projects-empty">
            Nenhum projeto principal nesta categoria.
            {visibleComplementary.length > 0 &&
              " Veja os projetos complementares logo abaixo."}
          </p>
        )}
        {resolved.map((project) => {
          const visible = matchesFilter(project.categories, filter)
          return (
            <ProjectArticle
              key={project.slug}
              project={project}
              position={visible ? visibleFeatured.indexOf(project) : 0}
              visible={visible}
              open={openSlugs.has(project.slug)}
              onToggle={() => toggle(project.slug)}
              onOpenShots={onOpenShots}
            />
          )
        })}
      </div>

      <div className="complementary" hidden={visibleComplementary.length === 0}>
        <div className="complementary-heading reveal-item">
          <div>
            <span className="section-label">Projetos complementares</span>
            <h3>Outros experimentos e entregas</h3>
          </div>
          <p>Projetos que documentam a evolução em web, produto e robótica.</p>
        </div>
        <div className="complementary-list reveal-item">
          {visibleComplementary.map((project, index) => (
            <ExternalLink
              href={project.href}
              className="mini-project"
              key={project.name}
            >
              <span className="mini-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>
                <strong>{project.name}</strong>
                <small>{project.kind}</small>
              </span>
              <span className="mini-stack">{project.stack}</span>
              <ArrowUpRight aria-hidden="true" />
            </ExternalLink>
          ))}
        </div>
      </div>
    </>
  )
}
