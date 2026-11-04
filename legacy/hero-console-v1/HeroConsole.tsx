import { useEffect, useState } from "react"

type Tone = "kw" | "str"

/**
 * Conteúdo do painel — todos os dados vêm do próprio portfólio
 * (projetos em App.tsx, disponibilidade e mentalidade do Hero/Sobre).
 */
const SEGMENTS: [text: string, tone?: Tone][] = [
  ["const", "kw"],
  [" developer = {\n  name: "],
  ['"Muryllo Douglas"', "str"],
  [",\n  focus: ["],
  ['"web"', "str"],
  [", "],
  ['"backend"', "str"],
  [", "],
  ['"desktop"', "str"],
  ["],\n  projects: [\n    "],
  ['"LexContract"', "str"],
  [", "],
  ['"Evidence Finder"', "str"],
  [",\n    "],
  ['"GitFlow Desktop"', "str"],
  [",\n  ],\n  mindset: "],
  ['"build to learn"', "str"],
  [",\n  openTo: "],
  ['"estágio"', "str"],
  [",\n};"],
]

const TOTAL = SEGMENTS.reduce((sum, [text]) => sum + text.length, 0)
const CHAR_MS = 9 // ≈ 2 s para o bloco inteiro
const TONE_CLASS: Record<Tone, string> = { kw: "code-purple", str: "code-green" }

export function HeroConsole({ startDelay = 620 }: { startDelay?: number }) {
  const [count, setCount] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? TOTAL : 0,
  )

  useEffect(() => {
    if (count >= TOTAL) return
    let frame = 0
    const timer = window.setTimeout(() => {
      let start = 0
      const tick = (now: number) => {
        if (!start) start = now
        const next = Math.min(TOTAL, Math.floor((now - start) / CHAR_MS))
        setCount(next)
        if (next < TOTAL) frame = window.requestAnimationFrame(tick)
      }
      frame = window.requestAnimationFrame(tick)
    }, startDelay)
    return () => {
      window.clearTimeout(timer)
      window.cancelAnimationFrame(frame)
    }
    // roda uma vez; `count` só é lido para pular a animação em reduced-motion
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDelay])

  let remaining = count
  let caretPlaced = false

  return (
    <div className="hero-console" aria-hidden="true">
      <div className="console-bar">
        <div>
          <i />
          <i />
          <i />
        </div>
        <span>muryllo.ts</span>
      </div>
      <pre>
        <code>
          {SEGMENTS.map(([text, tone], index) => {
            const shown = Math.max(0, Math.min(text.length, remaining))
            remaining -= text.length
            const showCaret = !caretPlaced && count < TOTAL && shown < text.length
            if (showCaret) caretPlaced = true
            return (
              <span key={index} className={tone ? TONE_CLASS[tone] : undefined}>
                {text.slice(0, shown)}
                {showCaret && <i className="code-caret" />}
                <span className="code-pending">{text.slice(shown)}</span>
              </span>
            )
          })}
        </code>
      </pre>
      <div className="console-footer">
        <span>main</span>
        <span>UTF-8</span>
      </div>
    </div>
  )
}
