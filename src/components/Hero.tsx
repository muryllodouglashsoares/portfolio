import { useEffect, useRef, useState } from "react"
import { preload } from "react-dom"
import portrait from "../assets/muryllo-hero-editorial.webp"
import portraitSmall from "../assets/muryllo-hero-editorial-820.webp"
import antonUrl from "../assets/fonts/anton-subset.woff"
import { useHeroParallax, useHeroSweep } from "../hooks/useHeroTypography"

/**
 * Cada letra é posicionada nas coordenadas da arte de referência (grade de
 * 1672×941): `x` é a origem do glifo em u e `sx` o ajuste horizontal fino para
 * casar a largura de cada letra com o desenho original. Assim os contornos do
 * retrato (que cruzam o rosto) e as letras atrás da cabeça ficam alinhados.
 */
const LETTERS = [
  { char: "M", x: 108.1, sx: 0.994 },
  { char: "U", x: 411.3, sx: 1 },
  { char: "R", x: 597.2, sx: 0.989 },
  { char: "Y", x: 881.8, sx: 1.057 },
  { char: "L", x: 1064.3, sx: 0.986 },
  { char: "L", x: 1224.3, sx: 0.986 },
  { char: "O", x: 1374.5, sx: 0.958 },
] as const
const PORTRAIT_SRCSET = `${portraitSmall} 820w, ${portrait} 1230w`
const PORTRAIT_SIZES = "(max-width: 700px) 84vw, 74vw"

const letterStyle = (index: number) =>
  ({
    "--n": index,
    "--x": LETTERS[index].x,
    "--sx": LETTERS[index].sx,
  }) as React.CSSProperties

const delay = (ms: number) => ({ "--d": ms }) as React.CSSProperties

/**
 * Uma camada da palavra. As camadas branca e vermelha têm exatamente a mesma
 * geometria e a mesma animação; a vermelha é apenas recortada com `clip-path`
 * a partir do centro do rosto. Assim a cor muda "dentro" das letras, sem duas
 * palavras e sem corte entre letras.
 *
 * Duas camadas decorativas reaproveitam a mesma geometria (todas `aria-hidden`;
 * o nome acessível continua sendo só o <h1> .sr-only):
 * - "ghost": a mesma palavra apenas em contorno, atrás das letras sólidas;
 * - "sweep": a mesma palavra em vermelho luminoso, visível só dentro de uma
 *   máscara em faixa que atravessa as letras (reflexo de luz).
 */
function WordLayer({
  tone,
  ref,
}: {
  tone: "white" | "red" | "ghost" | "sweep"
  ref?: React.Ref<HTMLDivElement>
}) {
  return (
    <div
      ref={ref}
      className={`hero-word hero-word-${tone}`}
      aria-hidden="true"
    >
      <div className="hero-word-text">
        {LETTERS.map(({ char }, index) => (
          <span className="hero-glyph" style={letterStyle(index)} key={index}>
            <span className="hero-letter">{char}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export function Hero() {
  const [fontReady, setFontReady] = useState(false)
  const [imageReady, setImageReady] = useState(false)
  const [timedOut, setTimedOut] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const mainDepthRef = useRef<HTMLDivElement>(null)
  const ghostDepthRef = useRef<HTMLDivElement>(null)
  const sweepRef = useRef<HTMLDivElement>(null)

  // O retrato é o elemento principal: carrega com prioridade máxima. A fonte
  // também é pré-carregada, porque a palavra só entra com ela disponível.
  preload(portrait, {
    as: "image",
    fetchPriority: "high",
    imageSrcSet: PORTRAIT_SRCSET,
    imageSizes: PORTRAIT_SIZES,
  })
  preload(antonUrl, { as: "font", type: "font/woff", crossOrigin: "anonymous" })

  useEffect(() => {
    if (imageRef.current?.complete) setImageReady(true)

    // Sem JS para observar fonte/imagem, o conteúdo continua acessível: o
    // timeout garante que a animação (ou o estado final) sempre aconteça.
    const timeout = window.setTimeout(() => setTimedOut(true), 2200)
    const fonts = document.fonts
    if (fonts?.load) {
      fonts
        .load('400 100px "Hero Anton"', "MURYLLO")
        .then(() => setFontReady(true))
        .catch(() => setFontReady(true))
    } else {
      setFontReady(true)
    }
    return () => window.clearTimeout(timeout)
  }, [])

  const ready = (fontReady && imageReady) || timedOut

  // Parallax do mouse (desktop) e reflexo de luz ocasional: ver o hook.
  useHeroParallax(sectionRef, mainDepthRef, ghostDepthRef)
  useHeroSweep(sectionRef, sweepRef, ready)

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="hero"
      aria-labelledby="hero-title"
      data-ready={ready}
    >
      <div className="hero-stage hero-inner">
        <h1 id="hero-title" className="sr-only">
          Muryllo — Estudante de Informática e desenvolvedor em formação
        </h1>
        <div className="hero-depth hero-depth-ghost" ref={ghostDepthRef}>
          <WordLayer tone="ghost" />
        </div>
        <div className="hero-depth hero-depth-main" ref={mainDepthRef}>
          <WordLayer tone="white" />
          <WordLayer tone="red" />
          <WordLayer tone="sweep" ref={sweepRef} />
        </div>
        <img
          ref={imageRef}
          className="hero-portrait"
          src={portrait}
          srcSet={PORTRAIT_SRCSET}
          sizes={PORTRAIT_SIZES}
          width={1230}
          height={941}
          alt="Retrato de Muryllo: jovem de óculos sem armação e camiseta preta, olhando para a câmera, em estúdio escuro com luz vermelha lateral."
          fetchPriority="high"
          decoding="async"
          onLoad={() => setImageReady(true)}
        />
      </div>

      <p className="hero-corner hero-tl hero-rise" style={delay(900)}>
        Desenvolvedor em formação
      </p>
      <a
        className="hero-corner hero-tr hero-arrow hero-rise"
        style={delay(1000)}
        href="#projetos"
        aria-label="Explorar projetos"
      >
        <svg viewBox="0 0 116 16" aria-hidden="true" focusable="false">
          <path d="M0 8h114.5M106.5 1l8 7-8 7" />
        </svg>
      </a>
      <div className="hero-corner hero-bl hero-rise" style={delay(1100)}>
        <p>Estudante de Informática</p>
        <p className="hero-status">
          <span aria-hidden="true" />
          Disponível para estágio
        </p>
      </div>
      <p className="hero-corner hero-br hero-rise" style={delay(1200)}>
        Brasil · Paraíba
      </p>
    </section>
  )
}
