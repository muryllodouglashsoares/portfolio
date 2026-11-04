import { useEffect, useRef, useState } from "react"
import {
  ArrowUp,
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  GitBranch,
  Mail,
  Menu,
  X,
} from "lucide-react"
import { Hero } from "./components/Hero"
import { OpenCursor } from "./components/OpenCursor"
import {
  ProjectLightbox,
  type LightboxImage,
} from "./components/ProjectLightbox"
import { usePageExperience } from "./hooks/usePageExperience"

const links = [
  ["Sobre", "#sobre"],
  ["Projetos", "#projetos"],
  ["Engenharia", "#engenharia"],
  ["Trajetória", "#trajetoria"],
  ["Contato", "#contato"],
]
const github = "https://github.com/muryllodouglashsoares"
const sectionIds = [
  "inicio",
  "sobre",
  "projetos",
  "engenharia",
  "trajetoria",
  "contato",
]

const projects = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
]

const complementary = [
  [
    "IFConnect",
    "Plataforma acadêmica",
    "JavaScript · Firebase",
    `${github}/plataforma-comunicacao`,
  ],
  [
    "Savora",
    "Experiência web",
    "React · TanStack Start",
    `${github}/savora-landing-page`,
  ],
  [
    "FORJA",
    "Produto conceitual",
    "React · TypeScript · Zod",
    `${github}/gym-landing-page`,
  ],
  [
    "Mini Olimpíada",
    "Robótica educacional",
    "Python · LEGO Spike",
    `${github}/mini-robotics-competition`,
  ],
]

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

const timeline = [
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
  ],
  [
    "Engenharia",
    "Mais profundidade técnica",
    "LexContract, Evidence Finder e GitFlow ampliam o trabalho para APIs, bancos relacionais, Rust, testes e CI/CD.",
  ],
  [
    "Agora",
    "Próximo passo",
    "Aprofundando estruturas de dados, arquitetura de software e robótica autônoma.",
  ],
]

const projectAnchor = (title: string) =>
  `projeto-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`

function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

type ProjectData = (typeof projects)[number]

/**
 * Moldura da imagem do projeto. Com deploy ativo vira um link para o site
 * (e mostra o cursor "Abrir"); sem deploy, mantém o comportamento de ampliar.
 */
function ImageFrame({
  project,
  onZoom,
  children,
}: {
  project: ProjectData
  onZoom: (image: string) => void
  children: React.ReactNode
}) {
  if (project.demo) {
    return (
      <a
        className="project-browser project-image-button"
        href={project.demo}
        target="_blank"
        rel="noreferrer"
        data-cursor="open"
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
        project.image ? `Ampliar captura do projeto ${project.title}` : undefined
      }
      disabled={!project.image}
      onClick={() => project.image && onZoom(project.image)}
    >
      {children}
    </button>
  )
}

function SectionHeading({
  label,
  title,
  intro,
}: {
  label: string
  title: string
  intro?: string
}) {
  return (
    <div className="section-heading reveal-item">
      <div className="section-label">
        <span />
        {label}
      </div>
      <div className="section-heading-copy">
        <h2>{title}</h2>
        {intro && <p>{intro}</p>}
      </div>
    </div>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedTech, setSelectedTech] = useState("React")
  const [lightbox, setLightbox] = useState<{
    title: string
    images: LightboxImage[]
    index: number
  } | null>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const mobileNavRef = useRef<HTMLElement>(null)
  const { activeSection, showBackToTop } = usePageExperience(sectionIds)

  const activeTechGroup = stack.find(([, , , items]) =>
    (items as readonly string[]).includes(selectedTech),
  )
  const selectedTechProjects = projects
    .filter((project) => project.tech.includes(selectedTech))
    .map((project) => project.title)

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    const elements = document.querySelectorAll(".reveal-item")
    if (!("IntersectionObserver" in window) || reducedMotion) {
      elements.forEach((element) => element.classList.add("is-visible"))
      return
    }

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        }),
      { threshold: 0.1 },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const firstLink = mobileNavRef.current?.querySelector("a")
    firstLink?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
        return
      }

      if (event.key !== "Tab") return
      const focusable = [
        ...(mobileNavRef.current?.querySelectorAll<HTMLAnchorElement>("a") ??
          []),
        menuButtonRef.current,
      ].filter(Boolean) as HTMLElement[]
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
    }
  }, [menuOpen])

  return (
    <div className="site-shell">
      <div className="reading-progress" aria-hidden="true">
        <span />
      </div>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <header className="navbar">
        <a href="#" className="brand" aria-label="Muryllo, início">
          <span className="brand-mark">M</span>
          <span>muryllo.dev</span>
        </a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {links.map(([label, href]) => (
            <a
              href={href}
              key={href}
              data-active={activeSection === href.slice(1)}
              aria-current={
                activeSection === href.slice(1) ? "location" : undefined
              }
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <ExternalLink href={github} className="icon-link desktop-only">
            <GitBranch size={18} />
            <span className="sr-only">GitHub</span>
          </ExternalLink>
          <a href="mailto:muryllodouglash.soares@gmail.com" className="nav-cta">
            Vamos conversar <ArrowUpRight size={16} />
          </a>
          <button
            ref={menuButtonRef}
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <nav
            ref={mobileNavRef}
            className="mobile-nav"
            aria-label="Navegação mobile"
          >
            {links.map(([label, href], index) => (
              <a
                href={href}
                key={href}
                data-active={activeSection === href.slice(1)}
                aria-current={
                  activeSection === href.slice(1) ? "location" : undefined
                }
                onClick={() => setMenuOpen(false)}
              >
                <span>0{index + 1}</span>
                {label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main id="conteudo">
        <Hero github={github} />

        <section id="sobre" className="section about">
          <div className="container">
            <SectionHeading label="01 / Sobre" title="Aprender construindo." />
            <div className="about-grid">
              <div className="about-lead reveal-item">
                <p>
                  Não estou tentando parecer alguém com anos de experiência que
                  não tenho.
                  <strong>
                    {" "}
                    Estou mostrando o que consigo construir agora.
                  </strong>
                </p>
              </div>
              <div className="about-body reveal-item">
                <p>
                  Sou estudante do Ensino Médio Integrado ao Técnico em
                  Informática no IFPB — Campus Itaporanga e desenvolvedor em
                  formação. Construo projetos próprios porque acredito que a
                  melhor forma de aprender é fazendo.
                </p>
                <p>
                  Meu foco é desenvolvimento web e engenharia de software. Tenho
                  ampliado os projetos do front-end para APIs, bancos
                  relacionais, autorização, testes e, recentemente, aplicações
                  desktop em Rust.
                </p>
                <div className="about-tags">
                  {["React", "TypeScript", "Rust", "Backend", "Robótica"].map(
                    (tag) => (
                      <span key={tag}>{tag}</span>
                    ),
                  )}
                </div>
              </div>
            </div>
            <div className="fact-strip reveal-item">
              <div>
                <span className="fact-value">IFPB</span>
                <span>Técnico em Informática</span>
              </div>
              <div>
                <span className="fact-value">Web + Desktop</span>
                <span>Áreas de construção</span>
              </div>
              <div>
                <span className="fact-value">Ponta a ponta</span>
                <span>Da interface ao banco</span>
              </div>
            </div>
          </div>
        </section>

        <section id="projetos" className="section projects-section">
          <div className="container">
            <SectionHeading
              label="02 / Projetos"
              title="Soluções, não apenas telas."
              intro="Projetos principais selecionados pela profundidade técnica, pelo problema resolvido e pelas decisões de engenharia."
            />
            <div className="project-list">
              {projects.map((project, index) => (
                <article
                  className={`project project-${project.accent} ${
                    index % 2 ? "project-reverse" : ""
                  }`}
                  id={projectAnchor(project.title)}
                  key={project.title}
                >
                  <div className="project-copy reveal-item">
                    <div className="project-topline">
                      <span>{project.index}</span>
                      <span>{project.eyebrow}</span>
                    </div>
                    <h3>{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    <p className="project-detail">{project.detail}</p>
                    <ul
                      className="tech-list"
                      aria-label={`Tecnologias de ${project.title}`}
                    >
                      {project.tech.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <div className="project-links">
                      <ExternalLink href={project.repo}>
                        Repositório <GitBranch size={16} />
                      </ExternalLink>
                      {project.demo && (
                        <ExternalLink href={project.demo}>
                          Abrir demo <ArrowUpRight size={16} />
                        </ExternalLink>
                      )}
                    </div>
                  </div>
                  <div className="project-visual reveal-item reveal-scale">
                    <ImageFrame
                      project={project}
                      onZoom={(image) =>
                        setLightbox({
                          title: project.title,
                          images: [
                            {
                              src: image,
                              alt: `Captura real do projeto ${project.title}`,
                            },
                          ],
                          index: 0,
                        })
                      }
                    >
                      <div className="browser-bar">
                        <div>
                          <i />
                          <i />
                          <i />
                        </div>
                        <span>
                          {project.title.toLowerCase().replace(/\s+/g, "-")}.app
                        </span>
                        <b />
                      </div>
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={`Captura real do projeto ${project.title}`}
                        />
                      ) : (
                        <div className="image-placeholder">
                          <Code2 />
                          <span>Captura real será adicionada</span>
                          <small>
                            O projeto já está disponível no repositório
                          </small>
                        </div>
                      )}
                      {project.image && !project.demo && (
                        <span className="project-image-hint">
                          Clique para ampliar
                        </span>
                      )}
                    </ImageFrame>
                    <div className="status-pill">
                      <span />
                      {project.status}
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="complementary">
              <div className="complementary-heading reveal-item">
                <div>
                  <span className="section-label">Projetos complementares</span>
                  <h3>Outros experimentos e entregas</h3>
                </div>
                <p>
                  Projetos que documentam a evolução em web, produto e robótica.
                </p>
              </div>
              <div className="complementary-list reveal-item">
                {complementary.map((project, index) => (
                  <ExternalLink
                    href={project[3]}
                    className="mini-project"
                    key={project[0]}
                  >
                    <span className="mini-index">0{index + 1}</span>
                    <span>
                      <strong>{project[0]}</strong>
                      <small>{project[1]}</small>
                    </span>
                    <span className="mini-stack">{project[2]}</span>
                    <ArrowUpRight />
                  </ExternalLink>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="engenharia" className="section engineering">
          <div className="container">
            <SectionHeading
              label="03 / Engenharia"
              title="Tecnologia com contexto."
              intro="Ferramentas que já utilizei em projetos, organizadas pelo papel que cumprem — não como uma coleção de logotipos."
            />
            <div className="stack-table reveal-item">
              {stack.map(([number, title, note, items]) => (
                <div className="stack-row" key={title}>
                  <span className="stack-number">{number}</span>
                  <div className="stack-title">
                    <h3>{title}</h3>
                    <p>{note}</p>
                  </div>
                  <div
                    className="stack-items"
                    aria-label={`Tecnologias de ${title}`}
                  >
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
                {selectedTechProjects.length
                  ? `Utilizada em: ${selectedTechProjects.join(", ")}.`
                  : "Tecnologia utilizada nos projetos e estudos documentados do portfólio."}
              </small>
            </div>
            <div className="principles reveal-item">
              <span>Princípios de trabalho</span>
              <p>Interfaces claras</p>
              <i />
              <p>Dados bem modelados</p>
              <i />
              <p>Permissões no servidor</p>
              <i />
              <p>Testes onde importam</p>
            </div>
          </div>
        </section>

        <section id="trajetoria" className="section journey">
          <div className="container">
            <SectionHeading
              label="04 / Trajetória"
              title="Evolução em movimento."
              intro="Uma trajetória guiada pela curiosidade, pela prática e pelo aumento progressivo da complexidade."
            />
            <div className="timeline">
              {timeline.map(([year, title, text], index) => (
                <article className="timeline-item reveal-item" key={year}>
                  <div className="timeline-marker">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="timeline-copy">
                    <span>{year}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="robotics-note reveal-item">
              <div className="robotics-icon">
                <Code2 />
              </div>
              <div>
                <span>Além da tela</span>
                <h3>Robótica no IFPB</h3>
              </div>
              <p>
                Participação na Mini Olimpíada de Robótica com um seguidor de
                linha em LEGO Spike Prime, programado em blocos e Python.
              </p>
              <ExternalLink href={`${github}/mini-robotics-competition`}>
                Ver registro <ArrowUpRight size={16} />
              </ExternalLink>
            </div>
          </div>
        </section>

        <section id="contato" className="contact">
          <div className="contact-grid" />
          <div className="container contact-inner">
            <div className="contact-copy reveal-item">
              <span className="section-label">05 / Contato</span>
              <h2>
                Vamos construir
                <br />
                algo <em>relevante?</em>
              </h2>
              <p>
                Busco minha primeira oportunidade na área de TI — estágio ou
                posição inicial. Se o meu trabalho combina com o que você
                procura, vamos conversar.
              </p>
              <a
                className="button button-primary contact-button"
                href="mailto:muryllodouglash.soares@gmail.com"
              >
                <Mail size={18} />
                Entrar em contato <ArrowUpRight size={18} />
              </a>
            </div>
            <div className="contact-links reveal-item">
              <ExternalLink href={github}>
                <span>
                  <GitBranch />
                  <small>Código e projetos</small>
                  <strong>GitHub</strong>
                </span>
                <ArrowUpRight />
              </ExternalLink>
              <ExternalLink href="https://www.linkedin.com/in/muryllo-douglas-henrique-soares-7a8416416/">
                <span>
                  <BriefcaseBusiness />
                  <small>Perfil profissional</small>
                  <strong>LinkedIn</strong>
                </span>
                <ArrowUpRight />
              </ExternalLink>
              <a href="mailto:muryllodouglash.soares@gmail.com">
                <span>
                  <Mail />
                  <small>Contato direto</small>
                  <strong>E-mail</strong>
                </span>
                <ArrowUpRight />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <a href="#" className="brand">
            <span className="brand-mark">M</span>
            <span>muryllo.dev</span>
          </a>
          <p>Projetado e desenvolvido com atenção aos detalhes.</p>
          <span>© 2026 Muryllo Douglas</span>
        </div>
      </footer>
      <button
        className="back-to-top"
        data-visible={showBackToTop}
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
              .matches
              ? "auto"
              : "smooth",
          })
        }
        aria-label="Voltar ao início"
        tabIndex={showBackToTop ? 0 : -1}
      >
        <ArrowUp />
      </button>
      <OpenCursor />
      {lightbox && (
        <ProjectLightbox
          title={lightbox.title}
          images={lightbox.images}
          index={lightbox.index}
          onIndexChange={(index) =>
            setLightbox((current) => (current ? { ...current, index } : null))
          }
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  )
}
