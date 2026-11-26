/** Tecnologias organizadas por categoria (conteúdo estático, sem estado). */
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

export function StackExplorer() {
  return (
    <div className="stack-table reveal-item">
      {stack.map(([number, title, note, items]) => (
        <div className="stack-row" key={title}>
          <span className="stack-number">{number}</span>
          <div className="stack-title">
            <h3>{title}</h3>
            <p>{note}</p>
          </div>
          <ul className="stack-items" aria-label={`Tecnologias de ${title}`}>
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
