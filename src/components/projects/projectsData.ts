/**
 * Dados dos projetos exibidos na seção "Projetos".
 *
 * Os campos de cartão (descrição, tecnologias, status, links) vieram do antigo
 * `projectEntries` do App.tsx e não mudaram. `problem`, `features` e
 * `statusNote` alimentam a visualização expandida e foram resumidos de
 * `src/data/projects.ts` (campos "problem" e "features", descritos lá como
 * confirmados no README/código de cada repositório). Nada aqui é plano futuro:
 * o que ainda não existe aparece em `statusNote`.
 */

export const github = "https://github.com/muryllodouglashsoares"

export type CategoryId = "web" | "desktop" | "robotica" | "academico"
export type FilterId = "all" | CategoryId

export const categoryLabels: Record<CategoryId, string> = {
  web: "Web",
  desktop: "Desktop",
  robotica: "Robótica",
  academico: "Acadêmicos",
}

export const filterOrder: FilterId[] = [
  "all",
  "web",
  "desktop",
  "robotica",
  "academico",
]

export type FeaturedProject = {
  slug: string
  index: string
  title: string
  eyebrow: string
  description: string
  detail: string
  tech: string[]
  status: string
  image?: string
  repo: string
  demo?: string
  accent: "violet" | "cyan" | "orange" | "blue"
  categories: CategoryId[]
  problem: string
  features: string[]
  statusNote?: string
}

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "lexcontract",
    index: "01",
    title: "LexContract",
    eyebrow: "Produto em destaque · Web",
    description:
      "Sistema de gestão de contratos jurídicos que centraliza clientes, documentos, pagamentos e auditoria, com isolamento entre escritórios.",
    detail:
      "Um projeto de ponta a ponta: interface, API própria, banco relacional, autorização por papéis, testes e pipeline de entrega.",
    tech: ["React", "TypeScript", "Fastify", "Prisma", "PostgreSQL"],
    status: "Em desenvolvimento",
    image:
      "https://raw.githubusercontent.com/muryllodouglashsoares/law-contract-management/main/docs/screenshots/dashboard.webp",
    repo: `${github}/law-contract-management`,
    demo: "https://law-contract-management.pages.dev/",
    accent: "violet",
    categories: ["web"],
    problem:
      "Pequenos escritórios de advocacia acompanham contratos, cobranças e documentos espalhados entre e-mail, WhatsApp, planilhas e pastas físicas, sem rastreabilidade.",
    features: [
      "Login com JWT e permissões por papel (ADMIN, LAWYER, ASSISTANT) verificadas no backend",
      "Isolamento de dados entre escritórios em toda leitura e escrita",
      "Modelos de contrato com variáveis, criação em etapas e versionamento do conteúdo",
      "Aceite eletrônico por link público de uso único (assinatura eletrônica simples, não ICP-Brasil)",
      "Documentos, parcelas de pagamento, notificações e Web Push",
      "Dashboard, busca global, filtros avançados e histórico de auditoria",
    ],
  },
  {
    slug: "evidence-finder",
    index: "02",
    title: "Evidence Finder",
    eyebrow: "Desktop · Privacidade local",
    description:
      "Aplicação desktop para organizar e pesquisar PDFs, imagens, textos e conversas, com referência à fonte e exportação de evidências.",
    detail:
      "Processamento local, OCR e busca exata, semântica ou híbrida sobre projetos independentes.",
    tech: ["Tauri 2", "Rust", "React", "SQLite FTS5", "Tesseract"],
    status: "Em desenvolvimento",
    image:
      "https://raw.githubusercontent.com/muryllodouglashsoares/evidence-finder/main/docs/screenshots/Dashboard.png",
    repo: `${github}/evidence-finder`,
    accent: "cyan",
    categories: ["desktop"],
    problem:
      "Encontrar uma informação específica em muitas capturas de tela, PDFs e conversas exige abrir arquivo por arquivo, e é difícil provar de onde veio cada trecho.",
    features: [
      "Projetos independentes, cada um com pasta, banco SQLite e índice próprios",
      "Importação de PNG, JPEG, TXT e PDF, com detecção de duplicatas por SHA-256",
      "Extração de texto e OCR local via Tesseract (instalado à parte)",
      "Pesquisa exata (SQLite FTS5), por significado (embeddings locais, com modelo instalado pelo usuário) e híbrida",
      "Exportação dos resultados em relatório PDF e manifest.json, com a fonte verificada por SHA-256",
    ],
    statusNote:
      "Versão 0.1.0, testada em Linux. Validação do fluxo completo no Windows, instalador e release para download ainda estão pendentes.",
  },
  {
    slug: "gitflow-desktop",
    index: "03",
    title: "GitFlow Desktop",
    eyebrow: "Desktop · Developer tool",
    description:
      "Interface desktop para operar repositórios Git locais com branches, revisão de diff, commits seletivos e sincronização segura.",
    detail:
      "O núcleo em Rust executa o Git sem shell e confirma os resultados reais antes de reportar sucesso.",
    tech: ["Tauri", "Rust", "React", "TypeScript", "Git CLI"],
    status: "Em desenvolvimento",
    repo: `${github}/gitflow`,
    accent: "orange",
    categories: ["desktop"],
    problem:
      "Operações do Git pelo terminal exigem comandos precisos, e um descuido pode incluir arquivos indesejados em um commit ou enviar alterações para o destino errado.",
    features: [
      "Leitura do repositório: branch, estado, arquivos alterados e diffs, com preparados e não preparados separados",
      "Listagem, criação e troca de branches, com a troca bloqueada quando há alterações rastreadas",
      "Commit seletivo: só os arquivos marcados entram, com revisão do diff exato",
      "Diagnóstico de sincronização e fetch, pull e push com confirmação do destino",
      "Push sem --force; main e master exigem segunda confirmação, validada também no backend",
    ],
    statusNote:
      "Fases 1 a 3 (leitura, operações locais e sincronização remota) implementadas. Ainda sem instalador: hoje o app roda em modo de desenvolvimento.",
  },
  {
    slug: "tekidu",
    index: "04",
    title: "Tekidu",
    eyebrow: "Plataforma acadêmica · Web",
    description:
      "Plataforma de gestão acadêmica com experiências separadas para administradores, professores, estudantes e responsáveis.",
    detail:
      "Autenticação, dados acadêmicos, regras de acesso testadas e uma experiência mobile dedicada.",
    tech: ["React", "TypeScript", "Firebase Auth", "Firestore", "Vitest"],
    status: "Em desenvolvimento",
    image:
      "https://raw.githubusercontent.com/muryllodouglashsoares/Tekidu/main/docs/screenshots/landing-page.png",
    repo: `${github}/Tekidu`,
    demo: "https://tekidu.pages.dev/",
    accent: "blue",
    categories: ["web", "academico"],
    problem:
      "Informações acadêmicas ficam espalhadas entre planilhas e sistemas separados, sem um lugar único onde estudante, professor e administração enxerguem os mesmos dados.",
    features: [
      "Quatro perfis (administrador, professor, estudante e responsável), cada um com telas e permissões próprias",
      "Firebase Auth: login, primeiro acesso e recuperação de senha",
      "Notas, médias, boletim e frequência por sessão, com exportação em PDF e Excel",
      "Justificativas de falta com documento anexo e mensagens entre professores e estudantes",
      "Interface mobile dedicada, PWA instalável e painel de acessibilidade",
      "Regras de segurança do Firestore com suíte de testes própria (Vitest + Firebase Emulator)",
    ],
  },
]

export type ComplementaryProject = {
  name: string
  kind: string
  stack: string
  href: string
  categories: CategoryId[]
}

export const complementaryProjects: ComplementaryProject[] = [
  {
    name: "IFConnect",
    kind: "Plataforma acadêmica",
    stack: "JavaScript · Firebase",
    href: `${github}/plataforma-comunicacao`,
    categories: ["web", "academico"],
  },
  {
    name: "Savora",
    kind: "Experiência web",
    stack: "React · TanStack Start",
    href: `${github}/savora-landing-page`,
    categories: ["web"],
  },
  {
    name: "FORJA",
    kind: "Produto conceitual",
    stack: "React · TypeScript · Zod",
    href: `${github}/gym-landing-page`,
    categories: ["web"],
  },
  {
    name: "Mini Olimpíada",
    kind: "Robótica educacional",
    stack: "Python · LEGO Spike",
    href: `${github}/mini-robotics-competition`,
    categories: ["robotica", "academico"],
  },
]

/** Id da âncora de um projeto principal (ex.: `projeto-lexcontract`). */
export const projectAnchor = (slug: string) => `projeto-${slug}`

export const matchesFilter = (
  categories: readonly CategoryId[],
  filter: FilterId,
) => filter === "all" || categories.includes(filter)

export const filterCount = (filter: FilterId) =>
  featuredProjects.filter((p) => matchesFilter(p.categories, filter)).length +
  complementaryProjects.filter((p) => matchesFilter(p.categories, filter))
    .length
