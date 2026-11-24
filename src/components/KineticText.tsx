import { Fragment } from "react"

/**
 * Texto em palavras recortadas por máscara.
 *
 * Cada palavra vira `.kw` (a janela, com `overflow: clip`) e `.kw-i` (o texto
 * que sobe para dentro dela). O CSS decide o gatilho: guiado pela rolagem
 * (`--p` do `.scrub-item`) nos títulos de seção e na frase de destaque de
 * Sobre; disparo único (`.is-visible`) no título do Contato. O texto continua
 * sendo texto comum, na ordem certa, separado por espaços: leitores de tela,
 * seleção e tradução automática não notam a diferença.
 *
 * `start` desloca o índice da primeira palavra, para encadear trechos que
 * dividem a mesma frase (por exemplo, com um <em> no meio).
 */
export function Words({
  text,
  start = 0,
  trailingSpace = false,
}: {
  text: string
  start?: number
  trailingSpace?: boolean
}) {
  const words = text.trim().split(/\s+/)
  return (
    <>
      {words.map((word, index) => (
        <Fragment key={index}>
          <span className="kw">
            <span
              className="kw-i"
              style={{ "--w": start + index } as React.CSSProperties}
            >
              {word}
            </span>
          </span>
          {(index < words.length - 1 || trailingSpace) && " "}
        </Fragment>
      ))}
    </>
  )
}

/** Quantas palavras tem um trecho (para calcular `start` do trecho seguinte). */
export const wordCount = (text: string) => text.trim().split(/\s+/).length
