/**
 * Configuração do sistema de esferas (Ambient Orbs).
 *
 * Todos os números que definem "como a esfera se comporta" vivem aqui,
 * para que ajustar o movimento não exija mexer no controlador.
 */

export type OrbId = "red" | "white"
export const ORB_IDS: OrbId[] = ["red", "white"]

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
  sweepSeconds: { red: 4.9, white: 5.7 } as Record<OrbId, number>,
  /** Ponto de partida na travessia (0 = ponta esquerda: M e D). */
  sweepPhase: { red: 0, white: 0 } as Record<OrbId, number>,
  /** Espera após `data-ready` (letras entrando) antes de a esfera surgir. */
  introDelay: 1.05,
  introFade: 0.9,
  /** Oscilação vertical (fração do raio) — dá volume ao percurso. */
  bob: 0.055,
  /** Suavização (s) com a esfera nas letras: curta o bastante para acompanhar a travessia, longa o bastante para nunca haver salto. */
  followTime: 0.05,
  /** Rolagem (fração da altura do Hero) necessária para as esferas saírem. */
  exitDistance: 0.55,
}

/**
 * Saída do Hero: cada esfera faz um percurso próprio, contínuo, que a leva do
 * nome até a parte baixa da tela antes de se fundir à trajetória livre (PATH).
 *
 * Tudo em função da rolagem, medida em alturas de viewport (u = rolagem / vh):
 *  - 0 → release: a esfera ainda acompanha as letras (a carona na rolagem se
 *    dissipa) e vai se soltando;
 *  - 0 → span: percurso Hero → waypoint (queda em arco, com leve balanço);
 *  - join[0] → join[1]: a trajetória própria se funde à trajetória livre.
 * A esfera branca começa um pouco depois (delay), como se seguisse a roxa.
 */
export const DESCENT = {
  release: 0.22,
  span: 1.15,
  join: [0.75, 1.9] as const,
  delay: { red: 0, white: 0.2 } as Record<OrbId, number>,
  /** Ponto de chegada do percurso, em fração do viewport. */
  waypoint: {
    red: { x: 0.84, y: 0.7 },
    white: { x: 0.14, y: 0.86 },
  } as Record<OrbId, { x: number; y: number }>,
  /** Balanço lateral máximo do arco (fração da largura; sinal = lado). */
  swing: { red: 0.07, white: -0.06 } as Record<OrbId, number>,
  /** >1 faz a queda acelerar no começo e assentar no fim. */
  gravity: 1.35,
}

/** Aparência quando as esferas flutuam livres (atrás do conteúdo). */
export const FOLLOW = {
  body: { red: 0.92, white: 0.8 } as Record<OrbId, number>,
  halo: 0,
}

export const MOTION = {
  /** Suavização (s): inércia curta, para seguir a rolagem sem trancos. */
  travelTime: { red: 0.4, white: 0.6 } as Record<OrbId, number>,
  /** Escala de amplitude em telas estreitas. */
  phoneAmplitude: 0.62,
  /** Raio livre das esferas (px) — [min, fator·vw, max]. */
  radiusDesktop: [54, 0.05, 90] as const,
  radiusPhone: [34, 0.11, 58] as const,
  /** Quanto da página (em alturas de viewport) antes do contato a união começa. */
  mergeLead: 1.75,
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
  inicio: { red: a(0.78, 0.3, 0.05, 0.08), white: a(0.16, 0.66, 0.05, 0.08) },
  sobre: { red: a(0.9, 0.34, 0.05, 0.12), white: a(0.07, 0.72, 0.05, 0.1) },
  projetos: { red: a(0.92, 0.46, 0.04, 0.2, 1.15), white: a(0.05, 0.56, 0.04, 0.2, 1.1) },
  engenharia: { red: a(0.84, 0.28, 0.025, 0.05, 0.6), white: a(0.1, 0.78, 0.025, 0.05, 0.6) },
  trajetoria: { red: a(0.5, 0.4, 0.03, 0.05, 0.7), white: a(0.4, 0.5, 0.03, 0.05, 0.7) },
  contato: { red: a(0.66, 0.5, 0.025, 0.05, 0.55), white: a(0.34, 0.54, 0.025, 0.05, 0.55) },
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
  red: { ax: 0.36, fx: 0.62, px: 0.4, ax2: 0.09, fx2: 1.7, px2: 1.1, ay: 0.28, fy: 0.9, py: 1.7, ay2: 0.07, fy2: 2.3, py2: 0.3 },
  white: { ax: 0.36, fx: 0.47, px: 3.6, ax2: 0.08, fx2: 1.45, px2: 2.4, ay: 0.27, fy: 0.73, py: 0.2, ay2: 0.08, fy2: 2.7, py2: 1.9 },
}

export const TONE_RGB: Record<OrbId, string> = {
  red: "229 57 53",
  white: "245 245 245",
}

/**
 * Modos de movimento (data-motion no container):
 *  scrolling → esferas seguem a rolagem; nenhuma animação secundária.
 *  idle      → rolagem parada: animações secundárias (CSS, só transform/opacity).
 *  paused    → aba em segundo plano: tudo suspenso.
 */
export type OrbMotion = "scrolling" | "idle" | "paused"

/** Tempo sem eventos de rolagem (ms) para considerar o scroll parado. */
export const IDLE_DELAY_MS = 220

/**
 * Legibilidade: opacidade mínima da esfera quando sobreposta a texto
 * (1 = sem texto por perto). A esfera clara é a que mais compete com o texto.
 */
export const LEGIBILITY = {
  minOpacity: { red: 0.24, white: 0.14 } as Record<OrbId, number>,
  /** Em telas estreitas o texto ocupa quase toda a largura: atenua mais. */
  phoneFactor: 0.8,
}
