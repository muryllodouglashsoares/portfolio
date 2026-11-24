import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import {
  SELECT_TECH_EVENT,
  networkProjects,
  projectsForTech,
  relatedTechs,
} from "../data/techNetwork"
import { intensity } from "../motion/config"
import { CURSOR_FX_QUERY, watchQuery } from "../motion/prefs"
import { ExternalLink } from "./ExternalLink"

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

type Line = { id: string; d: string }
const NO_LINES: Line[] = []
/** Pulsos simultâneos no máximo (a seleção com mais projetos não vira um painel de luzes). */
const MAX_PULSES = 4
/** Alcance (px) do efeito de proximidade. */
const NEAR_RADIUS = 150

/**
 * Rede de tecnologias: a tabela de tecnologias (os nós) e a coluna de projetos
 * são o conteúdo; as linhas ligam a tecnologia selecionada aos projetos que
 * REALMENTE a usam (fonte única: data/techNetwork.ts, tecnologia → projetos).
 *
 * - O conteúdo funciona sem a visualização: a tabela é a lista alternativa
 *   (teclado, leitor de tela, celular) e cada projeto da coluna diz em texto
 *   se usa a tecnologia ("Usa React"), então nada depende de cor ou de linha.
 * - Selecionado ≠ hover: clique, Enter ou foco SELECIONAM (fundo, sublinhado
 *   e linhas contínuas); passar o mouse só PRÉ-VISUALIZA (linhas tracejadas).
 * - Relacionados (tecnologias que dividem projeto com a selecionada) ganham
 *   destaque secundário; os demais perdem intensidade, sem sumir.
 * - Pulso: um traço de luz percorre cada ligação UMA vez, ao selecionar
 *   (até 4 ao mesmo tempo); nada anima em repouso.
 * - Proximidade: perto do cursor, o nó acende e se desloca ~2px na direção
 *   dele; só dentro da rede, só com mouse e movimento permitido.
 * - Abaixo de 1100px as linhas somem e a coluna de projetos vira um painel
 *   abaixo da tabela, com o mesmo destaque em texto.
 *
 * A seleção vive aqui, e não no App: ela muda a cada passagem do mouse e não
 * deve re-renderizar a página inteira.
 */
export function StackExplorer() {
  const [selectedTech, setSelectedTech] = useState("React")
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)
  const [lines, setLines] = useState<{ selected: Line[]; hover: Line[] }>({
    selected: NO_LINES,
    hover: NO_LINES,
  })
  const netRef = useRef<HTMLDivElement>(null)
  const techRefs = useRef(new Map<string, HTMLButtonElement>())
  const dotRefs = useRef(new Map<string, HTMLElement>())

  const activeTechGroup = stack.find(([, , , items]) =>
    (items as readonly string[]).includes(selectedTech),
  )
  const selectedProjects = projectsForTech(selectedTech)
  const relatedIds = new Set(selectedProjects.map((project) => project.id))
  const relatedStack = new Set(relatedTechs(selectedTech))

  // Os eventos de Sobre (tags) selecionam uma tecnologia daqui.
  useEffect(() => {
    const onSelect = (event: Event) => {
      const tech = (event as CustomEvent<string>).detail
      if (techRefs.current.has(tech)) setSelectedTech(tech)
    }
    window.addEventListener(SELECT_TECH_EVENT, onSelect)
    return () => window.removeEventListener(SELECT_TECH_EVENT, onSelect)
  }, [])

  // Geometria das linhas: medida do DOM (da borda direita do nó à borda
  // esquerda do ponto do projeto), refeita quando a seleção ou o tamanho mudam.
  const measure = useCallback(() => {
    const net = netRef.current
    if (!net) return
    if (getComputedStyle(net).getPropertyValue("--net-lines").trim() !== "on") {
      setLines((current) =>
        current.selected === NO_LINES && current.hover === NO_LINES
          ? current
          : { selected: NO_LINES, hover: NO_LINES },
      )
      return
    }
    const box = net.getBoundingClientRect()
    const build = (tech: string | null): Line[] => {
      const node = tech ? techRefs.current.get(tech) : undefined
      if (!tech || !node) return NO_LINES
      const a = node.getBoundingClientRect()
      const x1 = a.right - box.left
      const y1 = a.top + a.height / 2 - box.top
      const out: Line[] = []
      for (const project of projectsForTech(tech)) {
        const dot = dotRefs.current.get(project.id)
        if (!dot) continue
        const b = dot.getBoundingClientRect()
        const x2 = b.left - box.left
        const y2 = b.top + b.height / 2 - box.top
        const pull = Math.max((x2 - x1) * 0.55, 24)
        out.push({
          id: project.id,
          d: `M${x1.toFixed(1)} ${y1.toFixed(1)}C${(x1 + pull).toFixed(1)} ${y1.toFixed(1)} ${(x2 - pull).toFixed(1)} ${y2.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`,
        })
      }
      return out
    }
    setLines({
      selected: build(selectedTech),
      hover: hoveredTech && hoveredTech !== selectedTech ? build(hoveredTech) : NO_LINES,
    })
  }, [selectedTech, hoveredTech])

  useLayoutEffect(measure, [measure])
  useEffect(() => {
    const net = netRef.current
    if (!net) return
    const observer = new ResizeObserver(measure)
    observer.observe(net)
    document.fonts?.ready.then(measure).catch(() => {})
    return () => observer.disconnect()
  }, [measure])

  // Efeito de proximidade, restrito à rede: um listener, um quadro por vez.
  useEffect(() => {
    const net = netRef.current
    if (!net) return
    let raf = 0
    let px = 0
    let py = 0
    const last = new Map<HTMLElement, string>()

    const flush = () => {
      raf = 0
      const k = intensity()
      const nodes = Array.from(techRefs.current.values())
      const boxes = nodes.map((node) => node.getBoundingClientRect()) // leituras
      nodes.forEach((node, i) => {
        // escritas
        const box = boxes[i]
        const dx = px - (box.left + box.width / 2)
        const dy = py - (box.top + box.height / 2)
        const dist = Math.hypot(dx, dy)
        const near = Math.max(0, 1 - dist / NEAR_RADIUS) * k
        const nx = dist ? (dx / dist) * near : 0
        const ny = dist ? (dy / dist) * near : 0
        const key = `${near.toFixed(2)}|${nx.toFixed(2)}|${ny.toFixed(2)}`
        if (last.get(node) === key) return
        last.set(node, key)
        node.style.setProperty("--near", near.toFixed(2))
        node.style.setProperty("--nx", nx.toFixed(2))
        node.style.setProperty("--ny", ny.toFixed(2))
      })
    }
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return
      px = event.clientX
      py = event.clientY
      if (!raf) raf = requestAnimationFrame(flush)
    }
    const onLeave = () => {
      px = py = -9999
      if (!raf) raf = requestAnimationFrame(flush)
    }
    let attached = false
    const stop = watchQuery(CURSOR_FX_QUERY, (enabled) => {
      if (enabled && !attached) {
        attached = true
        net.addEventListener("pointermove", onMove, { passive: true })
        net.addEventListener("pointerleave", onLeave)
      } else if (!enabled && attached) {
        attached = false
        net.removeEventListener("pointermove", onMove)
        net.removeEventListener("pointerleave", onLeave)
        onLeave()
      }
    })
    return () => {
      stop()
      net.removeEventListener("pointermove", onMove)
      net.removeEventListener("pointerleave", onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div className="net reveal-item" ref={netRef}>
        <svg className="net-lines" aria-hidden="true" focusable="false">
          {lines.hover.map((line) => (
            <path key={`h-${hoveredTech}-${line.id}`} className="net-line net-line-hover" d={line.d} />
          ))}
          {lines.selected.map((line) => (
            <path
              key={`s-${selectedTech}-${line.id}`}
              className="net-line net-line-selected"
              d={line.d}
              pathLength={1}
            />
          ))}
          {lines.selected.slice(0, MAX_PULSES).map((line) => (
            <path
              key={`p-${selectedTech}-${line.id}`}
              className="net-pulse"
              d={line.d}
              pathLength={1}
            />
          ))}
        </svg>

        <div className="stack-table">
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
                    ref={(node) => {
                      if (node) techRefs.current.set(item, node)
                      else techRefs.current.delete(item)
                    }}
                    type="button"
                    data-selected={selectedTech === item}
                    data-rel={
                      selectedTech === item ? undefined : String(relatedStack.has(item))
                    }
                    aria-pressed={selectedTech === item}
                    onMouseEnter={() => setHoveredTech(item)}
                    onMouseLeave={() => setHoveredTech(null)}
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

        <ol
          className="net-projects"
          aria-label={`Projetos do portfólio. Destacados: os que usam ${selectedTech}`}
        >
          {networkProjects.map((project) => {
            const uses = relatedIds.has(project.id)
            return (
              <li key={project.id} data-related={uses}>
                <span
                  className="net-dot"
                  aria-hidden="true"
                  ref={(node) => {
                    if (node) dotRefs.current.set(project.id, node)
                    else dotRefs.current.delete(project.id)
                  }}
                />
                {project.external ? (
                  <ExternalLink href={project.href} className="net-link" cursorLabel="Repositório">
                    {project.title}
                  </ExternalLink>
                ) : (
                  <a href={project.href} className="net-link">
                    {project.title}
                  </a>
                )}
                <small>
                  {uses
                    ? `Usa ${selectedTech}`
                    : project.kind === "principal"
                      ? "Projeto principal"
                      : "Projeto complementar"}
                </small>
              </li>
            )
          })}
        </ol>
      </div>

      <div className="tech-context reveal-item" aria-live="polite">
        <span>Tecnologia selecionada</span>
        <strong>{selectedTech}</strong>
        <p>{activeTechGroup?.[2]}</p>
        <small>
          {selectedProjects.length ? (
            <>
              Utilizada em:{" "}
              {selectedProjects.map((project, index) => (
                <span key={project.id}>
                  {index > 0 && ", "}
                  {project.external ? (
                    <a href={project.href} target="_blank" rel="noreferrer">
                      {project.title}
                      <span className="sr-only"> (abre em nova aba)</span>
                    </a>
                  ) : (
                    <a href={project.href}>{project.title}</a>
                  )}
                </span>
              ))}
              .{" "}
              <span className="tech-context-count">
                {selectedProjects.length} de {networkProjects.length} projetos.
              </span>
            </>
          ) : (
            "Tecnologia utilizada nos projetos e estudos documentados do portfólio."
          )}
        </small>
      </div>
    </>
  )
}
