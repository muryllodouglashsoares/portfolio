import { useEffect, useRef, useState } from "react"
import { Bot, ChevronDown } from "lucide-react"
import { featuredProjects, projectAnchor } from "./projects/projectsData"

/** [fase, título, texto, projetos relacionados (slugs dos principais), marco de robótica?] */
type TimelineItem = readonly [
  phase: string,
  title: string,
  text: string,
  related?: readonly string[],
  robotics?: boolean,
]

const timeline: readonly TimelineItem[] = [
  [
    "Fundamentos",
    "A curiosidade vira código",
    "Primeiros passos em lógica de programação, HTML, CSS e JavaScript.",
  ],
  [
    "Exploração",
    "Do navegador para sistemas completos",
    "Experimentos com Python, React, frameworks e ferramentas de desenvolvimento.",
  ],
  [
    "Construção",
    "Problemas reais, projetos próprios",
    "IFConnect e Tekidu marcam a transição para produtos com autenticação e persistência.",
    ["tekidu"],
  ],
  [
    "Engenharia",
    "Mais profundidade técnica",
    "LexContract, Evidence Finder e GitFlow ampliam o trabalho para APIs, bancos relacionais, Rust, testes e CI/CD.",
    ["lexcontract", "evidence-finder", "gitflow-desktop"],
  ],
  [
    "Agora",
    "Próximo passo",
    "Aprofundando estruturas de dados, arquitetura de software e robótica autônoma.",
    undefined,
    true,
  ],
]

/**
 * Trajetória: cronologia e informações preservadas; a trilha e o marco atual
 * continuam vindo de useTimelineTrail (que lê `.timeline-marker > span`).
 *
 * Marcos interativos: onde há projetos relacionados, o título vira um botão
 * (padrão de acordeão: aria-expanded/aria-controls) que abre, ali mesmo, os
 * dados reais desses projetos (resumo, estado, tecnologias). Um marco aberto
 * por vez; clicar de novo ou Escape fecha. Sem projetos relacionados, o marco
 * é só leitura. O marco que abre recebe um anel breve. O ícone de robótica
 * aparece apenas no marco que fala de robótica ("Agora").
 */
export function Timeline() {
  const [open, setOpen] = useState<number | null>(null)
  const [pulse, setPulse] = useState<number | null>(null)
  const pulseTimer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(pulseTimer.current), [])

  const toggle = (index: number) => {
    const opening = open !== index
    setOpen(opening ? index : null)
    if (opening) {
      setPulse(index)
      window.clearTimeout(pulseTimer.current)
      pulseTimer.current = window.setTimeout(() => setPulse(null), 700)
    }
  }

  return (
    <>
      {timeline.map(([phase, title, text, related, robotics], index) => {
        const projects = related
          ? related
              .map((slug) => featuredProjects.find((p) => p.slug === slug))
              .filter((p): p is (typeof featuredProjects)[number] => Boolean(p))
          : []
        const expandable = projects.length > 0
        const isOpen = open === index
        const panelId = `marco-${index}-detalhes`
        return (
          <article
            className="timeline-item reveal-item"
            key={phase}
            data-open={isOpen}
            data-pulse={pulse === index}
            onKeyDown={(event) => {
              if (event.key === "Escape" && isOpen) {
                setOpen(null)
                event.currentTarget
                  .querySelector<HTMLButtonElement>(".timeline-toggle")
                  ?.focus()
              }
            }}
          >
            <div className="timeline-marker">
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className="timeline-copy">
              <span>{phase}</span>
              <h3>
                {expandable ? (
                  <button
                    type="button"
                    className="timeline-toggle"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(index)}
                  >
                    {title}
                    <ChevronDown size={14} aria-hidden="true" />
                  </button>
                ) : (
                  title
                )}
              </h3>
              <p>{text}</p>
              {robotics && (
                <a className="timeline-bot" href="#robotica">
                  <Bot size={14} aria-hidden="true" />
                  Robótica no IFPB
                </a>
              )}
              {related && (
                <p className="timeline-links">
                  Ver no portfólio:{" "}
                  {related.map((slug, i) => (
                    <span key={slug}>
                      {i > 0 && ", "}
                      <a href={`#${projectAnchor(slug)}`}>
                        {featuredProjects.find((p) => p.slug === slug)?.title ?? slug}
                      </a>
                    </span>
                  ))}
                </p>
              )}
              {expandable && (
                <div
                  className="timeline-more"
                  id={panelId}
                  role="region"
                  aria-label={`Detalhes: ${title}`}
                  hidden={!isOpen}
                >
                  {projects.map((project) => (
                    <div className="timeline-project" key={project.slug}>
                      <strong>{project.title}</strong>
                      <small>
                        {project.eyebrow} · {project.status}
                      </small>
                      <p>{project.description}</p>
                      <ul aria-label={`Tecnologias de ${project.title}`}>
                        {project.tech.map((tech) => (
                          <li key={tech}>{tech}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="timeline-close"
                    onClick={() => toggle(index)}
                  >
                    Fechar detalhes
                  </button>
                </div>
              )}
            </div>
          </article>
        )
      })}
    </>
  )
}
