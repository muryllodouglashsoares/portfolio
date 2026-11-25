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
import { CopyEmailButton } from "./components/CopyEmailButton"
import { ExternalLink } from "./components/ExternalLink"
import { ContactButton } from "./components/ContactButton"
import { CursorTrail } from "./components/CursorTrail"
import { Hero } from "./components/Hero"
import { Words, wordCount } from "./components/KineticText"
import { SELECT_TECH_EVENT } from "./data/techNetwork"
import { OpenCursor } from "./components/OpenCursor"
import {
  ProjectLightbox,
  type LightboxImage,
} from "./components/ProjectLightbox"
import { ProjectsGallery } from "./components/projects/ProjectsGallery"
import {
  featuredProjects,
  github,
  projectAnchor,
} from "./components/projects/projectsData"
import { SectionSeam } from "./components/SectionSeam"
import { StackExplorer } from "./components/StackExplorer"
import { TechMarquee } from "./components/TechMarquee"
import { Thread } from "./components/Thread"
import { Timeline } from "./components/Timeline"
import { useEffectsPreference } from "./hooks/useEffectsPreference"
import { useScrollReveal } from "./hooks/useScrollReveal"
import { usePageExperience } from "./hooks/usePageExperience"
import { useTimelineTrail } from "./hooks/useTimelineTrail"
import { useScrollDepth } from "./motion/useScrollDepth"
import { useSectionSeams } from "./motion/useSectionSeams"

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

const leadA =
  "Não estou tentando parecer alguém com anos de experiência que não tenho."
const leadB = "Estou mostrando o que consigo construir agora."

/** [tag, destino, tecnologia a selecionar na rede de Engenharia (se for uma)] */
const aboutTags: readonly (readonly [string, string, string?])[] = [
  ["React", "#engenharia", "React"],
  ["TypeScript", "#engenharia", "TypeScript"],
  ["Rust", "#engenharia", "Rust"],
  ["Backend", "#engenharia"],
  ["Robótica", "#robotica"],
]

function SectionHeading({
  label,
  title,
  intro,
  scrub = true,
}: {
  label: string
  title: string
  intro?: string
  /**
   * Revelação guiada pela rolagem (useScrollReveal), reversível: descer revela
   * o título palavra a palavra e subir o recolhe. `false` usa disparo único.
   */
  scrub?: boolean
}) {
  return (
    <div
      className={`section-heading ${scrub ? "scrub-item is-heading" : "reveal-item"}`}
    >
      <div className="section-label">
        <span />
        {label}
      </div>
      <div className="section-heading-copy">
        <h2 style={{ "--wc": wordCount(title) - 1 } as React.CSSProperties}>
          <Words text={title} />
        </h2>
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
  useEffectsPreference()
  useScrollReveal()
  useTimelineTrail()
  useScrollDepth()
  useSectionSeams()

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
        {sectionIds.slice(1).map((id) => (
          <i key={id} data-tick={id} data-reached="false" />
        ))}
      </div>
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
        <SectionSeam kind="light" />

        <section id="sobre" className="section about" data-depth>
          {/* Camadas decorativas: movem-se em velocidades diferentes na rolagem. */}
          <div className="about-deco" aria-hidden="true">
            <span className="about-deco-glow" />
            <span className="about-deco-glyph">M</span>
          </div>
          <div className="container">
            <SectionHeading
              label="01 / Sobre"
              title="Aprender construindo."
            />
            <div className="about-grid">
              <div className="about-lead scrub-item" data-scrub-delay="0.03">
                <p>
                  <Words text={leadA} />{" "}
                  <strong>
                    <Words text={leadB} start={wordCount(leadA)} />
                  </strong>
                </p>
              </div>
              <div className="about-body scrub-item" data-scrub-delay="0.08">
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
                  {aboutTags.map(([tag, href, tech]) => (
                    <a
                      key={tag}
                      href={href}
                      onClick={() => {
                        // Leva ao trecho do portfólio onde o tema aparece e, quando
                        // é uma tecnologia, já a seleciona na rede de Engenharia.
                        if (tech)
                          window.dispatchEvent(
                            new CustomEvent(SELECT_TECH_EVENT, { detail: tech }),
                          )
                      }}
                    >
                      {tag}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="fact-strip scrub-item" data-scrub-delay="0.03">
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

        <SectionSeam kind="word" word="construindo" />

        <section id="projetos" className="section projects-section">
          <div className="container">
            <SectionHeading
              label="02 / Projetos"
              title="Soluções, não apenas telas."
              intro="Projetos principais selecionados pela profundidade técnica, pelo problema resolvido e pelas decisões de engenharia."
            />
          </div>
          <ProjectsGallery
            onOpenShots={(title, images, index) =>
              setLightbox({ title, images, index })
            }
          />
        </section>

        <SectionSeam kind="layers" />

        <section id="engenharia" className="section engineering">
          <TechMarquee />
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

        <SectionSeam kind="rule" />

        <section id="trajetoria" className="section journey">
          <div className="container">
            <SectionHeading
              label="04 / Trajetória"
              title="Evolução em movimento."
              intro="Uma trajetória guiada pela curiosidade, pela prática e pelo aumento progressivo da complexidade."
            />
            <div className="timeline">
              <Timeline />
              <div className="timeline-track" aria-hidden="true">
                <span className="timeline-trail" />
                <span className="timeline-orb" />
              </div>
            </div>
            <div className="robotics-note reveal-item" id="robotica">
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

        <SectionSeam kind="slide" />

        <section id="contato" className="contact">
          <div className="contact-grid" />
          <div className="container contact-inner">
            <div className="contact-copy reveal-item">
              <span className="section-label">05 / Contato</span>
              <h2>
                <Words text="Vamos construir" />
                <br />
                <Words text="algo" start={2} trailingSpace />
                <em>
                  <Words text="relevante?" start={3} />
                </em>
              </h2>
              <p>
                Busco minha primeira oportunidade na área de TI — estágio ou
                posição inicial. Se o meu trabalho combina com o que você
                procura, vamos conversar.
              </p>
              <ContactButton email={email} />
            </div>
            <div className="contact-links reveal-item">
              <ExternalLink href={github} cursorLabel="Visitar">
                <span>
                  <GitBranch />
                  <small>Código e projetos</small>
                  <strong>GitHub</strong>
                </span>
                <ArrowUpRight />
              </ExternalLink>
              <ExternalLink
                href="https://www.linkedin.com/in/muryllo-douglas-henrique-soares-7a8416416/"
                cursorLabel="Visitar"
              >
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
      <Thread />
      <CursorTrail />

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
