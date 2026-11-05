/**
 * Configuração do sistema de esferas (Ambient Orbs).
 *
 * Todos os números que definem "como a esfera se comporta" vivem aqui,
 * para que ajustar o movimento não exija mexer no controlador.
 */

export type OrbId = "purple" | "white"
export const ORB_IDS: OrbId[] = ["purple", "white"]

/** Estados derivados do progresso da página (nunca armazenados à parte). */
export type OrbState =
  | "HERO" // esferas dentro das máscaras tipográficas
  | "EXITING_HERO" // emergindo das letras
  | "FOLLOWING_PAGE" // trajetórias independentes
  | "MERGING" // aproximação e sobreposição
  | "FINAL_FORM" // composição abstrata no encerramento

export type SectionKey =
  | "inicio"
  | "sobre"
  | "projetos"
  | "engenharia"
  | "trajetoria"
  | "contato"

/** Ordem vertical das seções — usada para interpolar âncoras. */
export const SECTION_ORDER: SectionKey[] = [
  "inicio",
  "sobre",
  "projetos",
  "engenharia",
  "trajetoria",
  "contato",
]

export const HERO = {
  /** Raio da esfera em relação ao corpo da fonte do nome. */
  radiusEm: 0.43,
  /** Duração (s) de uma travessia completa (M→O e D→S), com easing. */
  sweepSeconds: { purple: 4.9, white: 5.7 } as Record<OrbId, number>,
  /** Ponto de partida na travessia (0 = ponta esquerda: M e D). */
  sweepPhase: { purple: 0, white: 0 } as Record<OrbId, number>,
  /** Espera após `data-ready` (letras entrando) antes de a esfera surgir. */
  introDelay: 1.05,
  introFade: 0.9,
  /** Oscilação vertical (fração do raio) — dá volume ao percurso. */
  bob: 0.055,
  /** Rolagem (fração da altura do Hero) necessária para as esferas saírem. */
  exitDistance: 0.55,
}

/** Aparência quando as esferas flutuam livres (atrás do conteúdo). */
export const FOLLOW = {
  body: { purple: 0.92, white: 0.8 } as Record<OrbId, number>,
  halo: 0,
}

export const MOTION = {
  /** Suavização (s): inércia curta, para seguir a rolagem sem trancos. */
  travelTime: { purple: 0.4, white: 0.6 } as Record<OrbId, number>,
  /** Escala de amplitude em telas estreitas. */
  phoneAmplitude: 0.62,
  /** Raio livre das esferas (px) — [min, fator·vw, max]. */
  radiusDesktop: [54, 0.05, 90] as const,
  radiusPhone: [34, 0.11, 58] as const,
  /** Quanto da página (em alturas de viewport) antes do contato a união começa. */
  mergeLead: 0.95,
}

export type Anchor = {
  /** Posição de repouso, em fração do viewport. */
  x: number
  y: number
  /** Amplitude da deriva orgânica, em fração do viewport. */
  ax: number
  ay: number
  /** Multiplicador de velocidade da deriva. */
  speed: number
}

const a = (x: number, y: number, ax: number, ay: number, speed = 1): Anchor => ({
  x,
  y,
  ax,
  ay,
  speed,
})

/**
 * Âncoras por seção — diretrizes, não trajetórias rígidas: a posição final
 * soma a deriva (Lissajous) e a velocidade de rolagem a esse ponto de repouso.
 */
export const ANCHORS: Record<SectionKey, Record<OrbId, Anchor>> = {
  inicio: { purple: a(0.78, 0.3, 0.05, 0.08), white: a(0.16, 0.66, 0.05, 0.08) },
  sobre: { purple: a(0.9, 0.34, 0.05, 0.12), white: a(0.07, 0.72, 0.05, 0.1) },
  projetos: { purple: a(0.92, 0.46, 0.04, 0.2, 1.15), white: a(0.05, 0.56, 0.04, 0.2, 1.1) },
  engenharia: { purple: a(0.84, 0.28, 0.025, 0.05, 0.6), white: a(0.1, 0.78, 0.025, 0.05, 0.6) },
  trajetoria: { purple: a(0.5, 0.4, 0.03, 0.05, 0.7), white: a(0.4, 0.5, 0.03, 0.05, 0.7) },
  contato: { purple: a(0.66, 0.5, 0.025, 0.05, 0.55), white: a(0.34, 0.54, 0.025, 0.05, 0.55) },
}

/**
 * Trajeto de cada esfera como função PURA da rolagem (u = rolagem / altura do
 * viewport). Sem tempo e sem aleatoriedade: descer percorre o caminho num
 * sentido, subir o percorre de volta, exatamente.
 * x/y em fração do viewport; f* = oscilações por altura de viewport rolada.
 */
export type PathDef = {
  ax: number; fx: number; px: number; ax2: number; fx2: number; px2: number
  ay: number; fy: number; py: number; ay2: number; fy2: number; py2: number
}
export const PATH: Record<OrbId, PathDef> = {
  purple: { ax: 0.36, fx: 0.62, px: 0.4, ax2: 0.09, fx2: 1.7, px2: 1.1, ay: 0.28, fy: 0.9, py: 1.7, ay2: 0.07, fy2: 2.3, py2: 0.3 },
  white: { ax: 0.36, fx: 0.47, px: 3.6, ax2: 0.08, fx2: 1.45, px2: 2.4, ay: 0.27, fy: 0.73, py: 0.2, ay2: 0.08, fy2: 2.7, py2: 1.9 },
}

export const TONE_RGB: Record<OrbId, string> = {
  purple: "189 164 255",
  white: "244 242 248",
}
