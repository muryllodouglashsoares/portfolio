import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { ArrowDown, ArrowDownRight, Compass } from "lucide-react"

const FIRST_WORD = "MURYLLO"
const SECOND_WORD = "DOUGLAS"

/**
 * Deslocamento de DOUGLAS em relação a MURYLLO.
 *
 * - `anchor`: índice da letra de MURYLLO sob a qual DOUGLAS começa
 *   (0 = M … 6 = O final).
 * - `scale`: tamanho de DOUGLAS em relação a MURYLLO (1 = mesmo corpo).
 *
 * O corpo da fonte é calculado para que a composição inteira (a maior entre
 * a largura de MURYLLO e `deslocamento + largura de DOUGLAS`) ocupe
 * exatamente a largura disponível — sem cortes e sem rolagem horizontal,
 * seja qual for a fonte que estiver carregada.
 */
type Stagger = { anchor: number; scale: number }

const STAGGER_DESKTOP: Stagger = { anchor: 6, scale: 1 } // começa sob o "O"
const STAGGER_TABLET: Stagger = { anchor: 5, scale: 1 } // começa sob o 2º "L"
const STAGGER_PHONE: Stagger = { anchor: 3, scale: 1 } // começa sob o "Y"

function pickStagger(): Stagger {
  if (window.matchMedia("(max-width: 600px)").matches) return STAGGER_PHONE
  if (window.matchMedia("(max-width: 899px)").matches) return STAGGER_TABLET
  return STAGGER_DESKTOP
}

const letterStyle = (index: number) =>
  ({ "--n": index }) as React.CSSProperties

const delay = (ms: number) => ({ "--d": ms }) as React.CSSProperties

/** Mede a composição e grava `--name-size` / `--name-offset` no <h1>. */
function useFittedName(onReady: () => void) {
  const rootRef = useRef<HTMLHeadingElement>(null)
  const firstRef = useRef<HTMLSpanElement>(null)
  const secondRef = useRef<HTMLSpanElement>(null)
  const onReadyRef = useRef(onReady)
  onReadyRef.current = onReady

  useLayoutEffect(() => {
    const root = rootRef.current
    const first = firstRef.current
    const second = secondRef.current
    if (!root || !first || !second) return

    let lastWidth = -1
    let disposed = false

    const fit = () => {
      const available = root.clientWidth
      if (!available) return
      lastWidth = available

      const { anchor, scale } = pickStagger()
      // Medição numa escala de referência (100px): as proporções não mudam.
      root.style.setProperty("--name-size", "100px")
      root.style.setProperty("--name-scale", String(scale))
      root.style.setProperty("--name-offset", "0px")

      const firstWidth = first.getBoundingClientRect().width
      const secondWidth = second.getBoundingClientRect().width
      const anchorLetter = first.children[anchor] as HTMLElement | undefined
      const offset = anchorLetter?.offsetLeft ?? 0

      const total = Math.max(firstWidth, offset + secondWidth)
      if (!total) return
      const size = (available / total) * 100

      root.style.setProperty("--name-size", `${size.toFixed(2)}px`)
      root.style.setProperty(
        "--name-offset",
        `${((offset * size) / 100).toFixed(2)}px`,
      )
    }

    fit()

    const observer = new ResizeObserver(() => {
      // Só refaz o ajuste quando a largura muda (a altura muda junto com o corpo).
      if (root.clientWidth !== lastWidth) fit()
    })
    observer.observe(root)

    // A animação só começa com a fonte de exibição já carregada, para que o
    // nome não "salte" de tamanho no meio da entrada.
    const fonts = document.fonts
    const fontLoaded: Promise<unknown> = fonts?.load
      ? fonts.load("700 1em \"Clash Display\"").catch(() => undefined)
      : Promise.resolve()
    const timeout = new Promise((resolve) => window.setTimeout(resolve, 1600))
    void Promise.race([fontLoaded, timeout]).then(() => {
      if (disposed) return
      fit()
      onReadyRef.current()
    })

    const refit = () => fit()
    fonts?.addEventListener?.("loadingdone", refit)

    return () => {
      disposed = true
      observer.disconnect()
      fonts?.removeEventListener?.("loadingdone", refit)
    }
  }, [])

  return { rootRef, firstRef, secondRef }
}

function Letters({ text }: { text: string }) {
  return (
    <>
      {Array.from(text).map((letter, index) => (
        <span
          className="name-letter"
          style={letterStyle(index)}
          data-char={letter}
          key={index}
        >
          {letter}
        </span>
      ))}
    </>
  )
}

export function Hero() {
  const [ready, setReady] = useState(false)
  const { rootRef, firstRef, secondRef } = useFittedName(() => setReady(true))

  // Sem JS para observar a fonte (ex.: navegador muito antigo) o conteúdo
  // continua acessível: o hook sempre dispara `onReady` pelo timeout.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReady(true)
    }
  }, [])

  return (
    <section
      id="inicio"
      className="hero"
      aria-labelledby="hero-title"
      data-ready={ready}
    >
      <div className="hero-grid" />
      <div className="hero-glow" />
      <div className="hero-glow hero-glow-alt" />

      <div className="hero-inner">
        <div className="hero-name-wrap">
          <h1
            id="hero-title"
            className="hero-name"
            ref={rootRef}
            aria-label="Muryllo Douglas"
          >
            <span className="name-line">
              <span
                className="name-word name-word-first"
                ref={firstRef}
                data-orb-word="purple"
                data-orb-tone="purple"
                aria-hidden="true"
              >
                <Letters text={FIRST_WORD} />
              </span>
            </span>
            <span className="name-line">
              <span
                className="name-word name-word-second"
                ref={secondRef}
                data-orb-word="white"
                data-orb-tone="white"
                aria-hidden="true"
              >
                <Letters text={SECOND_WORD} />
              </span>
            </span>
          </h1>
        </div>

        <div className="hero-info">
          <div className="hero-info-head">
            <p className="hero-kicker hero-rise" style={delay(760)}>
              Estudante — Desenvolvedor de software
            </p>
            <div className="availability hero-rise" style={delay(960)}>
              <span />
              Disponível para estágio e oportunidades iniciais
            </div>
          </div>

          <div className="hero-info-body">
            <p className="hero-description hero-rise" style={delay(860)}>
              Sou estudante do Técnico em Informática no IFPB. Construo
              aplicações web, soluções backend e ferramentas desktop, explorando
              diferentes tecnologias para resolver problemas reais.
            </p>
            <div className="hero-actions hero-rise" style={delay(1060)}>
              <a className="button button-primary" href="#projetos">
                Explorar projetos <ArrowDownRight size={18} />
              </a>
              <a className="button button-secondary" href="#trajetoria">
                <Compass size={18} aria-hidden="true" />
                Conhecer minha trajetória
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-meta hero-rise" style={delay(1200)}>
        <span className="hero-meta-place">PB · Brasil</span>
        <span className="hero-meta-line" />
        <a className="hero-scroll" href="#sobre">
          Explore meu trabalho
          <ArrowDown size={13} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
