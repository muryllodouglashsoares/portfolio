import { useEffect, useRef, useState } from "react"
import {
  ArrowUp,
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  GitBranch,
  Mail,
  Menu,
  Sparkles,
  X,
} from "lucide-react"
import { AmbientFinalForm, AmbientOrbs } from "./components/ambient/AmbientOrbs"
import { CopyEmailButton } from "./components/CopyEmailButton"
import { ExternalLink } from "./components/ExternalLink"
import { Hero } from "./components/Hero"
import { OpenCursor } from "./components/OpenCursor"
import {
  ProjectLightbox,
  type LightboxImage,
} from "./components/ProjectLightbox"
import { ProjectsExplorer } from "./components/projects/ProjectsExplorer"
import {
  featuredProjects,
  github,
  projectAnchor,
} from "./components/projects/projectsData"
import { StackExplorer } from "./components/StackExplorer"
import { useEffectsPreference } from "./hooks/useEffectsPreference"
import { usePageExperience } from "./hooks/usePageExperience"

const links = [
  ["Sobre", "#sobre"],
  ["Projetos", "#projetos"],
  ["Engenharia", "#engenharia"],
  ["Trajetória", "#trajetoria"],
  ["Contato", "#contato"],
]
const email = "muryllodouglash.soares@gmail.com"
const sectionIds = [
  "inicio",
  "sobre",
  "projetos",
  "engenharia",
  "trajetoria",
  "contato",
]

/** [fase, título, texto, projetos relacionados (slugs dos principais)] */
type TimelineItem = readonly [
  phase: string,
  title: string,
  text: string,
  related?: readonly string[],
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
  ],
]

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
  const [lightbox, setLightbox] = useState<{
    title: string
    images: LightboxImage[]
    index: number
  } | null>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const mobileNavRef = useRef<HTMLElement>(null)
  const { activeSection, showBackToTop } = usePageExperience(sectionIds)
  const effects = useEffectsPreference()

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
      <AmbientOrbs sectionIds={sectionIds} reduced={effects.reduced} />
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <header className="navbar">
        <a href="#inicio" className="brand" aria-label="Muryllo, início">
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
          <button
            type="button"
            className="icon-link effects-toggle"
            aria-pressed={effects.reduced}
            aria-disabled={effects.locked}
            title={
              effects.locked
                ? "Experiência simplificada ativada pela preferência de movimento reduzido do sistema"
                : effects.reduced
                  ? "Experiência simplificada ativada. Clique para voltar aos efeitos visuais"
                  : "Reduzir efeitos visuais (esferas e animações)"
            }
            onClick={() => !effects.locked && effects.toggle()}
          >
            <Sparkles size={18} aria-hidden="true" />
            <span className="sr-only">
              Experiência simplificada
              {effects.locked
                ? " (ativada pela preferência de movimento reduzido do sistema)"
                : ""}
            </span>
          </button>
          <a href={`mailto:${email}`} className="nav-cta">
            Vamos conversar <ArrowUpRight size={16} />
          </a>
          <button
            ref={menuButtonRef}
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <nav
            ref={mobileNavRef}
            id="menu-mobile"
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
            <ExternalLink href={github} onClick={() => setMenuOpen(false)}>
              <span aria-hidden="true">
                <ArrowUpRight size={14} />
              </span>
              GitHub
            </ExternalLink>
          </nav>
        )}
      </header>

      <main id="conteudo" tabIndex={-1}>
        <Hero />

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
            <ProjectsExplorer
              onOpenShots={(title, images, index) =>
                setLightbox({ title, images, index })
              }
            />
          </div>
        </section>

        <section id="engenharia" className="section engineering">
          <div className="container">
            <SectionHeading
              label="03 / Engenharia"
              title="Tecnologia com contexto."
              intro="Ferramentas que já utilizei em projetos, organizadas pelo papel que cumprem — não como uma coleção de logotipos."
            />
            <StackExplorer />
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
              {timeline.map(([year, title, text, related], index) => (
                <article className="timeline-item reveal-item" key={year}>
                  <div className="timeline-marker">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="timeline-copy">
                    <span>{year}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                    {related && (
                      <p className="timeline-links">
                        Ver no portfólio:{" "}
                        {related.map((slug, i) => (
                          <span key={slug}>
                            {i > 0 && ", "}
                            <a href={`#${projectAnchor(slug)}`}>
                              {featuredProjects.find((p) => p.slug === slug)
                                ?.title ?? slug}
                            </a>
                          </span>
                        ))}
                      </p>
                    )}
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
          <AmbientFinalForm />
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
                href={`mailto:${email}`}
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
              <div className="contact-email">
                <a href={`mailto:${email}`}>
                  <span>
                    <Mail />
                    <small>Contato direto</small>
                    <strong>{email}</strong>
                  </span>
                  <ArrowUpRight />
                </a>
                <CopyEmailButton email={email} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <a href="#inicio" className="brand">
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
        aria-hidden={!showBackToTop}
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
