/**
 * Configuração do robô NODE-01. Tudo que muda posição, tempo ou câmera fica aqui,
 * para que novos posicionamentos sejam só ajustes de dados.
 */

export type RobotSide = "left" | "right"

/** Lado do robô em cada seção (ids de `sectionIds` em App.tsx). */
export const ROBOT_SECTION_SIDES: Record<string, RobotSide> = {
  inicio: "right",
  sobre: "left",
  projetos: "right",
  engenharia: "left",
  trajetoria: "right",
  contato: "left",
}

/** No Hero o robô aparece maior; nas demais seções fica compacto no canto. */
export const ROBOT_HERO_SECTION = "inicio"

/** Elemento do Hero (HeroStage) que reserva o lugar do robô na composição. */
export const HERO_ROBOT_SLOT_ID = "hero-robot-slot"

export function getRobotSide(section: string): RobotSide {
  return ROBOT_SECTION_SIDES[section] ?? "right"
}

export type RobotPlacement = { side: RobotSide; compact: boolean }

export function getRobotPlacement(section: string): RobotPlacement {
  return {
    side: getRobotSide(section),
    compact: section !== ROBOT_HERO_SECTION,
  }
}

export function samePlacement(a: RobotPlacement, b: RobotPlacement) {
  return a.side === b.side && a.compact === b.compact
}

export const ROBOT_MODEL_URL = `${import.meta.env.BASE_URL}models/node-bot.glb`

/** O robô olha para o centro da página: à direita gira para a esquerda e vice-versa. */
export const ROBOT_CAMERA_ORBIT: Record<RobotSide, string> = {
  right: "22deg 80deg 108%",
  left: "-22deg 80deg 108%",
}

/** Nomes e durações (ms) dos clips embutidos em node-bot.glb. */
export const ROBOT_CLIPS = {
  idle: "Idle",
  arrive: "Arrive",
  scan: "Scan",
} as const
export type RobotOneShotClip = typeof ROBOT_CLIPS.arrive | typeof ROBOT_CLIPS.scan
export const ROBOT_CLIP_MS: Record<RobotOneShotClip, number> = {
  Arrive: 1400,
  Scan: 3000,
}

export const ROBOT_TIMING = {
  /** Tempo mínimo desde o carregamento da página para o robô surgir (depois dos textos do Hero). */
  entryAfterMs: 760,
  /** Fade-out no ponto de origem antes de trocar de lado. */
  leaveMs: 260,
  /** Fade-in no destino. */
  arriveMs: 700,
  /** Duração da silhueta translúcida deixada na origem. */
  ghostMs: 1000,
  /** Intervalo entre olhadas de repouso (clip Scan). */
  scanMinMs: 14000,
  scanMaxMs: 22000,
}
