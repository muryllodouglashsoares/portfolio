import {
  complementaryProjects,
  featuredProjects,
  projectAnchor,
} from "../components/projects/projectsData"

/** Evento que seleciona uma tecnologia na rede de Engenharia (ex.: tags de Sobre). */
export const SELECT_TECH_EVENT = "portfolio:select-tech"

export type NetworkProject = {
  id: string
  title: string
  /** Âncora interna (projetos principais) ou repositório (complementares). */
  href: string
  external: boolean
  kind: "principal" | "complementar"
}

const COMPLEMENTARY_IDS: Record<string, string> = {
  IFConnect: "ifconnect",
  Savora: "savora",
  FORJA: "forja",
  "Mini Olimpíada": "mini-olimpiada",
}

/** Os projetos que aparecem na página, na ordem em que aparecem. */
export const networkProjects: readonly NetworkProject[] = [
  ...featuredProjects.map((p) => ({
    id: p.slug,
    title: p.title,
    href: `#${projectAnchor(p.slug)}`,
    external: false,
    kind: "principal" as const,
  })),
  ...complementaryProjects.map((p) => ({
    id: COMPLEMENTARY_IDS[p.name] ?? p.name.toLowerCase(),
    title: p.name,
    href: p.href,
    external: true,
    kind: "complementar" as const,
  })),
]

/**
 * FONTE ÚNICA das relações tecnologia → projetos da rede.
 *
 * Cada linha é explícita e vem das listas de tecnologias confirmadas em
 * `src/data/projects.ts` (README/código de cada repositório) e dos cartões de
 * `projectsData.ts`. Nada é inferido: o que está aqui aparece na rede; o que
 * não está (por exemplo, Docker em projetos além do LexContract) não existe.
 * Nomes de produtos da mesma ferramenta foram agrupados na tecnologia do
 * StackExplorer: Firebase = Firebase Auth/Firestore/Realtime Database;
 * SQLite = SQLite FTS5; Tauri = Tauri 2; Tesseract OCR = Tesseract.
 */
export const TECH_TO_PROJECTS: Readonly<Record<string, readonly string[]>> = {
  React: ["lexcontract", "evidence-finder", "gitflow-desktop", "tekidu", "savora", "forja"],
  TypeScript: ["lexcontract", "evidence-finder", "gitflow-desktop", "tekidu", "savora", "forja"],
  JavaScript: ["ifconnect"],
  "Tailwind CSS": ["lexcontract", "gitflow-desktop", "tekidu", "savora", "forja"],
  "TanStack Start": ["savora", "forja"],
  "Node.js": ["lexcontract"],
  Fastify: ["lexcontract"],
  PostgreSQL: ["lexcontract"],
  Prisma: ["lexcontract"],
  Firebase: ["tekidu", "ifconnect"],
  SQLite: ["evidence-finder"],
  Rust: ["evidence-finder", "gitflow-desktop"],
  Tauri: ["evidence-finder", "gitflow-desktop"],
  "Git CLI": ["gitflow-desktop"],
  "Tesseract OCR": ["evidence-finder"],
  Vitest: ["lexcontract", "evidence-finder", "gitflow-desktop", "tekidu"],
  Playwright: ["lexcontract"],
  Docker: ["lexcontract"],
  "GitHub Actions": ["lexcontract"],
  Cloudflare: ["lexcontract", "tekidu", "savora"],
}

const byId = new Map(networkProjects.map((project) => [project.id, project]))

/** Projetos (na ordem da página) que usam a tecnologia. */
export function projectsForTech(tech: string): NetworkProject[] {
  const ids = TECH_TO_PROJECTS[tech] ?? []
  return networkProjects.filter((project) => ids.includes(project.id))
}

/** Tecnologias que compartilham ao menos um projeto com `tech` (sem ela mesma). */
export function relatedTechs(tech: string): string[] {
  const mine = new Set(TECH_TO_PROJECTS[tech] ?? [])
  return Object.entries(TECH_TO_PROJECTS)
    .filter(
      ([other, ids]) => other !== tech && ids.some((id) => mine.has(id)),
    )
    .map(([other]) => other)
}

if (import.meta.env?.DEV) {
  for (const [tech, ids] of Object.entries(TECH_TO_PROJECTS))
    for (const id of ids)
      if (!byId.has(id)) console.warn(`techNetwork: "${tech}" cita projeto inexistente "${id}"`)
}
