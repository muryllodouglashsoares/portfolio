import { useEffect, useRef, useState } from "react"
import "./ambient-orbs.css"
import { createOrbController } from "./orbController"

function useReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window === "undefined"
      ? false
      : window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  )
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = () => setReduced(query.matches)
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])
  return reduced
}

/**
 * Camada fixa com as duas esferas. Fica ACIMA dos fundos das seções e ABAIXO
 * do texto (ver z-index em ambient-orbs.css): decorativa, sem eventos, sem
 * participar do fluxo do documento.
 */
export function AmbientOrbs({ sectionIds }: { sectionIds: string[] }) {
  const reduced = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const controller = createOrbController({
      root,
      sectionIds,
      reducedMotion: reduced,
    })
    return () => controller.destroy()
  }, [sectionIds, reduced])

  return (
    <div
      ref={rootRef}
      className="ambient-orbs"
      data-state="HERO"
      aria-hidden="true"
    >
      {(["purple", "white"] as const).map((tone) => (
        <div className="orb" data-orb={tone} data-orb-tone={tone} key={tone}>
          <span className="orb-halo" />
          <span className="orb-body" />
        </div>
      ))}
    </div>
  )
}

/**
 * Ícones do encerramento — traço único por ícone (pathLength=1), para que o
 * "desenhar" seja só animar o stroke-dashoffset conforme a rolagem.
 */
const UNITS = [
  { tone: "purple", side: -1, k: -1.5, arc: -64, icon: "cursor" },
  { tone: "white", side: 1, k: -0.5, arc: -48, icon: "chip" },
  { tone: "purple", side: -1, k: 0.5, arc: 70, icon: "code" },
  { tone: "white", side: 1, k: 1.5, arc: 52, icon: "nodes" },
] as const

function Glyph({ icon }: { icon: (typeof UNITS)[number]["icon"] }) {
  return (
    <svg className="af-glyph" viewBox="0 0 100 100" focusable="false">
      {icon === "cursor" && (
        <>
          <path className="fl" d="M26 12 L26 80 L44 64 L56 88 L68 82 L56 59 L80 59 Z" />
          <path className="ln" pathLength="1" d="M26 12 L26 80 L44 64 L56 88 L68 82 L56 59 L80 59 Z" />
        </>
      )}
      {icon === "chip" && (
        <>
          <rect className="fl" x="42" y="42" width="16" height="16" rx="2" />
          <path
            className="ln"
            pathLength="1"
            d="M36 30 H64 A6 6 0 0 1 70 36 V64 A6 6 0 0 1 64 70 H36 A6 6 0 0 1 30 64 V36 A6 6 0 0 1 36 30 Z M40 30 V14 M50 30 V14 M60 30 V14 M40 70 V86 M50 70 V86 M60 70 V86 M30 40 H14 M30 50 H14 M30 60 H14 M70 40 H86 M70 50 H86 M70 60 H86"
          />
        </>
      )}
      {icon === "code" && (
        <path className="ln" pathLength="1" d="M36 30 L14 50 L36 70 M64 30 L86 50 L64 70 M56 22 L44 78" />
      )}
      {icon === "nodes" && (
        <>
          <circle className="fl" cx="28" cy="22" r="7" />
          <circle className="fl" cx="28" cy="78" r="7" />
          <circle className="fl" cx="72" cy="40" r="7" />
          <path
            className="ln"
            pathLength="1"
            d="M35 22 A7 7 0 1 1 21 22 A7 7 0 1 1 35 22 M28 29 V71 M35 78 A7 7 0 1 1 21 78 A7 7 0 1 1 35 78 M28 60 C28 46 72 58 72 47 M79 40 A7 7 0 1 1 65 40 A7 7 0 1 1 79 40"
          />
        </>
      )}
    </svg>
  )
}

/**
 * Região decorativa de encerramento (dentro do Contato, sem texto). Começa
 * com quatro discos sobrepostos exatamente onde as duas esferas flutuantes
 * chegam; depois eles se separam, viajam e viram ícones (ver CSS, seção 3).
 */
export function AmbientFinalForm() {
  return (
    <div className="ambient-final" data-orb-final aria-hidden="true">
      <div className="af-stage">
        <span className="af-marker" data-orb-final-sphere="purple" style={{ "--side": -1 } as React.CSSProperties} />
        <span className="af-marker" data-orb-final-sphere="white" style={{ "--side": 1 } as React.CSSProperties} />
        {UNITS.map((u) => (
          <span
            className="af-unit"
            data-orb-tone={u.tone}
            key={u.icon}
            style={{ "--side": u.side, "--k": u.k, "--arc": `${u.arc}px` } as React.CSSProperties}
          >
            <span className="af-disc" />
            <Glyph icon={u.icon} />
          </span>
        ))}
      </div>
    </div>
  )
}
