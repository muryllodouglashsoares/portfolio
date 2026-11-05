import { useEffect, useRef, useState } from "react"
import "./ambient-orbs.css"
import { createOrbController } from "./orbController"

/** Partículas da composição final: posição, tamanho, deriva e ritmo. */
const PARTICLES = [
  { x: "22%", y: "58%", s: 3, mx: "10px", my: "-22px", t: 9, d: 0 },
  { x: "31%", y: "30%", s: 2, mx: "-8px", my: "-16px", t: 11, d: 1.2 },
  { x: "41%", y: "72%", s: 2, mx: "6px", my: "-26px", t: 10, d: 2.4 },
  { x: "47%", y: "18%", s: 3, mx: "12px", my: "-12px", t: 12, d: 0.6 },
  { x: "53%", y: "80%", s: 2, mx: "-10px", my: "-20px", t: 9.5, d: 3.1 },
  { x: "59%", y: "26%", s: 2, mx: "8px", my: "-18px", t: 11.5, d: 1.8 },
  { x: "66%", y: "64%", s: 3, mx: "-12px", my: "-24px", t: 10.5, d: 4.2 },
  { x: "74%", y: "40%", s: 2, mx: "10px", my: "-14px", t: 12.5, d: 2.9 },
  { x: "80%", y: "70%", s: 2, mx: "-6px", my: "-22px", t: 9, d: 5.1 },
  { x: "27%", y: "44%", s: 2, mx: "9px", my: "-18px", t: 13, d: 3.6 },
  { x: "70%", y: "20%", s: 2, mx: "-9px", my: "-12px", t: 10, d: 0.9 },
  { x: "37%", y: "86%", s: 2, mx: "7px", my: "-16px", t: 11, d: 4.6 },
]

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
 * Região decorativa de encerramento (dentro do Contato, sem texto): as duas
 * esferas sobrepostas, núcleo luminoso, contornos orgânicos, anéis e
 * partículas. As esferas daqui são do mesmo desenho das flutuantes, então a
 * passagem de uma para a outra é imperceptível.
 */
export function AmbientFinalForm() {
  return (
    <div className="ambient-final" data-orb-final aria-hidden="true">
      <div className="af-stage">
        <svg
          className="af-field af-breathe"
          viewBox="0 0 900 378"
          preserveAspectRatio="xMidYMid meet"
          focusable="false"
        >
          <defs>
            <filter id="af-warp" x="-20%" y="-30%" width="140%" height="160%">
              <feTurbulence type="fractalNoise" baseFrequency="0.009 0.014" numOctaves="2" seed="7" result="n" />
              <feDisplacementMap in="SourceGraphic" in2="n" scale="58" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
          {/* Contornos deformados de forma orgânica (filtro estático). */}
          <g filter="url(#af-warp)">
            <ellipse className="af-contour" cx="450" cy="189" rx="228" ry="126" />
            <ellipse className="af-contour" cx="450" cy="189" rx="296" ry="158" opacity="0.55" />
          </g>
          {/* Anéis em perspectiva — profundidade. */}
          <g transform="translate(0 0)">
            <ellipse className="af-ring af-ring-a" cx="450" cy="190" rx="250" ry="64" />
            <ellipse className="af-ring af-ring-b" cx="450" cy="190" rx="206" ry="150" opacity="0.7" />
          </g>
        </svg>

        <span className="orb af-sphere" data-orb-final-sphere="purple" data-orb-tone="purple">
          <span className="orb-halo" />
          <span className="orb-body" />
        </span>
        <span className="orb af-sphere" data-orb-final-sphere="white" data-orb-tone="white">
          <span className="orb-halo" />
          <span className="orb-body" />
        </span>
        <span className="af-overlap" />

        {PARTICLES.map((p, i) => (
          <i
            className="af-particle"
            key={i}
            style={
              {
                "--x": p.x,
                "--y": p.y,
                "--s": `${p.s}px`,
                "--mx": p.mx,
                "--my": p.my,
                "--t": `${p.t}s`,
                "--d": `${p.d}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  )
}
