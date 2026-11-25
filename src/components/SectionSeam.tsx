/**
 * Marca de transição entre duas seções (altura zero, decorativa).
 * Os efeitos vivem em motion/seams.css e são guiados por useSectionSeams.
 *
 *   light   halo vermelho que atravessa a fronteira (Hero → Sobre)
 *   word    palavra contornada que cruza a fronteira (Sobre → Projetos)
 *   layers  sombra + traço de borda (Projetos → Engenharia)
 *   rule    traço que percorre a borda (Engenharia → Trajetória)
 *   slide   traço que desliza lateralmente (Trajetória → Contato)
 */
export type SeamKind = "light" | "word" | "layers" | "rule" | "slide"

export function SectionSeam({ kind, word }: { kind: SeamKind; word?: string }) {
  return (
    <div className="seam" data-seam={kind} aria-hidden="true">
      {kind === "light" && <span className="seam-glow" />}
      {kind === "word" && <span className="seam-word">{word}</span>}
      {kind === "layers" && <span className="seam-shade" />}
      {kind !== "light" && kind !== "word" && (
        <div className="container seam-inner">
          <span className="seam-rule" />
        </div>
      )}
    </div>
  )
}
