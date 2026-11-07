import { useState } from "react"
import { featuredProjects, projectAnchor } from "./projects/projectsData"

const stack = [
  [
    "01",
    "Frontend",
    "Interfaces tipadas, acessíveis e adaptáveis.",
    ["React", "TypeScript", "JavaScript", "Tailwind CSS", "TanStack Start"],
  ],
  [
    "02",
    "Backend & dados",
    "APIs, autorização e modelagem relacional.",
    ["Node.js", "Fastify", "PostgreSQL", "Prisma", "Firebase", "SQLite"],
  ],
  [
    "03",
    "Desktop",
    "Aplicações locais com foco em segurança.",
    ["Rust", "Tauri", "Git CLI", "Tesseract OCR"],
  ],
  [
    "04",
    "Qualidade & entrega",
    "Testes, automação e publicação contínua.",
    ["Vitest", "Playwright", "Docker", "GitHub Actions", "Cloudflare"],
  ],
] as const

/**
 * A seleção vive aqui, e não no App: ela muda a cada passagem do mouse e
 * não deve re-renderizar a página inteira.
 */
export function StackExplorer() {
  const [selectedTech, setSelectedTech] = useState("React")

  const activeTechGroup = stack.find(([, , , items]) =>
    (items as readonly string[]).includes(selectedTech),
  )
  const selectedTechProjects = featuredProjects.filter((project) =>
    project.tech.includes(selectedTech),
  )

  return (
    <>
      <div className="stack-table reveal-item">
        {stack.map(([number, title, note, items]) => (
          <div className="stack-row" key={title}>
            <span className="stack-number">{number}</span>
            <div className="stack-title">
              <h3>{title}</h3>
              <p>{note}</p>
            </div>
            <div className="stack-items" aria-label={`Tecnologias de ${title}`}>
              {items.map((item) => (
                <button
                  key={item}
                  type="button"
                  data-selected={selectedTech === item}
                  aria-pressed={selectedTech === item}
                  onMouseEnter={() => setSelectedTech(item)}
                  onFocus={() => setSelectedTech(item)}
                  onClick={() => setSelectedTech(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="tech-context reveal-item" aria-live="polite">
        <span>Tecnologia selecionada</span>
        <strong>{selectedTech}</strong>
        <p>{activeTechGroup?.[2]}</p>
        <small>
          {selectedTechProjects.length ? (
            <>
              Utilizada em:{" "}
              {selectedTechProjects.map((project, index) => (
                <span key={project.slug}>
                  {index > 0 && ", "}
                  <a href={`#${projectAnchor(project.slug)}`}>{project.title}</a>
                </span>
              ))}
              .
            </>
          ) : (
            "Tecnologia utilizada nos projetos e estudos documentados do portfólio."
          )}
        </small>
      </div>
    </>
  )
}
