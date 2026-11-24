/**
 * Parâmetros de movimento usados pelo JavaScript.
 *
 * O CSS tem a contraparte em `:root` (`--mi`, `--dur-*`, `--ease-*`,
 * `--dist-*`, `--tilt`, em index.css). A intensidade global `--mi` (0 a 1) é
 * lida daqui, então reduzir ou desligar o movimento é uma mudança em um lugar
 * só: `--mi: 0` zera deslocamentos de CSS e de JS ao mesmo tempo.
 */

/** Intensidade global atual (0 = sem movimento, 1 = padrão). */
export function intensity(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--mi")
  const value = Number.parseFloat(raw)
  return Number.isFinite(value) ? Math.min(Math.max(value, 0), 1) : 1
}

export const MOTION = {
  /** Deslocamento máximo (px) das camadas do Hero em resposta ao cursor. */
  heroMain: { x: 4, y: 2.5 },
  heroGhost: { x: -6, y: -4 },
  /** Fração do caminho percorrida por quadro na interpolação do cursor. */
  follow: 0.08,
  /** A luz do Hero segue mais devagar que as camadas. */
  lightFollow: 0.055,
  /** Inclinação máxima (graus) dos mockups de projeto. */
  tiltDeg: 5,
  /** Botões magnéticos: fração do deslocamento do ponteiro e teto em px. */
  magnet: { pull: 0.32, max: 9, inner: 0.55 },
  /** Rastro do cursor: nº de pontos e tempo parado até sumir (ms). */
  trail: { dots: 4, idleMs: 700 },
  /** Faixa de leitura (fração da janela) em que a linha condutora é desenhada. */
  readingLine: 0.62,
} as const
