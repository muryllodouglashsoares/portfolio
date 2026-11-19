import { useEffect, useRef } from "react"
import { techIcons, type TechIconKey } from "../data/techIcons"

/**
 * Faixa decorativa de ícones acima do título da seção Engenharia.
 *
 * Só entram tecnologias que já aparecem no portfólio (grupos do StackExplorer,
 * mais Python, citado na trajetória e nos projetos complementares), na ordem
 * abaixo, misturando os grupos para a sequência não parecer uma lista por
 * categoria. "Git CLI" usa o ícone do Git; Tesseract OCR não tem ícone oficial
 * disponível e por isso não aparece na faixa (continua na lista de tecnologias).
 *
 * Movimento: puro CSS (translate3d, linear, infinite), da esquerda para a
 * direita. Dois grupos idênticos lado a lado; a trilha anda exatamente a
 * largura de um grupo, então o reinício é invisível. Cada grupo repete a lista
 * duas vezes para sempre ser mais largo que a tela. A única parte em JS é um
 * IntersectionObserver que pausa a animação quando a faixa está fora da tela.
 * É decorativa (aria-hidden): as mesmas tecnologias estão em texto logo abaixo.
 */
const ORDER: readonly TechIconKey[] = [
  "react",
  "nodejs",
  "typescript",
  "postgresql",
  "rust",
  "docker",
  "tailwind",
  "prisma",
  "tauri",
  "vitest",
  "javascript",
  "fastify",
  "firebase",
  "githubactions",
  "tanstack",
  "sqlite",
  "git",
  "playwright",
  "cloudflare",
  "python",
]

const GROUP = [...ORDER, ...ORDER]

export function TechMarquee() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || !("IntersectionObserver" in window)) return
    const observer = new IntersectionObserver(([entry]) => {
      root.dataset.paused = String(!entry.isIntersecting)
    })
    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="tech-marquee" ref={rootRef} aria-hidden="true">
      <div className="tech-marquee-track">
        {[0, 1].map((copy) => (
          <ul className="tech-marquee-group" key={copy}>
            {GROUP.map((key, index) => (
              <li key={index} data-dup={copy > 0 || index >= ORDER.length}>
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d={techIcons[key].path} fill="currentColor" />
                </svg>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
