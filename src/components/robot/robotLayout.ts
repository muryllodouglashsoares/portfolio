/**
 * Layout do robô em pixels — puro, calculado a partir do viewport.
 *
 * O robô vive numa faixa fixa na base da tela e só ocupa dois pontos de repouso: o centro
 * da margem esquerda ou da direita. No desktop essas margens são as laterais livres ao
 * lado do container do portfólio (72rem), então o robô em repouso não fica sobre texto,
 * cards ou botões. Em telas mais estreitas a margem some: o robô encolhe e fica
 * levemente translúcido onde sobrepõe conteúdo. No celular não existe margem segura,
 * então ele é ocultado (ver ROBOT_SHOW_ON_MOBILE).
 */

import type { Side } from "./robotBehaviors";

/** Celulares (< 640px) não têm margem livre: por padrão o robô é ocultado para não cobrir texto. */
export const ROBOT_SHOW_ON_MOBILE = false;

/** Abaixo disso (ou landscape baixo) o conteúdo tem prioridade total. */
export const ROBOT_VIEWPORT_QUERY = ROBOT_SHOW_ON_MOBILE
  ? "(min-width: 340px) and (min-height: 481px)"
  : "(min-width: 640px) and (min-height: 481px)";

export interface RobotLayout {
  /** Largura do viewport (px). */
  width: number;
  /** Altura do robô em px (o modelo tem 2 unidades de altura). */
  robotPx: number;
  /** Altura da faixa/canvas (px). */
  canvasHeight: number;
  /** px por unidade de mundo (câmera ortográfica). */
  zoom: number;
  /** Espaço entre o pé do robô e a base da faixa (px). */
  bottomPad: number;
  /** Centro do robô (px) nos dois pontos de repouso. */
  xLeft: number;
  xRight: number;
  /** Metade da largura do robô com braços (px) e faixa horizontal ocupada pelo conteúdo (px). */
  halfWidth: number;
  contentLeft: number;
  contentRight: number;
  /** Celular. */
  compact: boolean;
  /** false = não renderizar (sem espaço seguro). */
  visible: boolean;
  /** Fator de intensidade dos ângulos (1 = desktop). */
  motion: number;
  /** Opacidade mínima quando o robô está inteiro sobre o conteúdo (1 = sempre opaco). */
  overContentOpacity: number;
}

/** Mesma largura do `container-page` (72rem) + padding lateral máximo (2rem). */
const CONTAINER = 1152;
const CONTAINER_PADDING = 32;

const clamp = (x: number, a: number, b: number) => Math.min(b, Math.max(a, x));

export function computeLayout(width: number, height: number): RobotLayout {
  const compact = width < 640;
  const tablet = !compact && width < 1024;

  const contentLeft = compact ? 16 : Math.max(0, (width - CONTAINER) / 2) + CONTAINER_PADDING;
  // No desktop o robô cabe na margem livre ao lado do container: em telas mais estreitas
  // (onde a margem encolhe) ele diminui, até um mínimo, em vez de invadir o conteúdo.
  const fitToGutter = Math.floor((contentLeft - 14) / 0.6);
  const desktopPx = Math.min(Math.round(clamp(height * 0.2, 140, 176)), Math.max(120, fitToGutter));
  const robotPx = compact ? 80 : tablet ? 104 : desktopPx;
  const zoom = robotPx / 2;
  const halfWidth = robotPx * 0.3; // com braços, o robô tem ~0,6 da própria altura
  const bottomPad = compact ? 6 : 10;
  const canvasHeight = Math.round(robotPx * 1.14 + bottomPad + 6);

  // Centraliza o robô na margem livre ao lado do container quando ela existe.
  const xLeft = compact ? halfWidth + 8 : clamp(contentLeft / 2, halfWidth + 10, 150);
  const xRight = width - xLeft;

  return {
    width,
    robotPx,
    canvasHeight,
    zoom,
    bottomPad,
    xLeft,
    xRight,
    halfWidth,
    contentLeft,
    contentRight: width - contentLeft,
    compact,
    visible: !compact || ROBOT_SHOW_ON_MOBILE,
    motion: compact ? 0.6 : tablet ? 0.85 : 1,
    overContentOpacity: compact ? 0.5 : tablet ? 0.6 : 0.7,
  };
}

/** Centro x (px) do robô no ponto de repouso do lado `side`. */
export const restX = (l: RobotLayout, side: Side) => (side === "left" ? l.xLeft : l.xRight);

/** Quanto do robô (0–1) está sobre a área de conteúdo, dado o centro x (px). */
export function contentOverlap(l: RobotLayout, xCenter: number) {
  const left = Math.max(xCenter - l.halfWidth, l.contentLeft);
  const right = Math.min(xCenter + l.halfWidth, l.contentRight);
  return Math.min(1, Math.max(0, (right - left) / (2 * l.halfWidth)));
}

/** Fator de opacidade (0–1) do ponto de repouso: translúcido só se sobrepõe o conteúdo. */
export const restOpacity = (l: RobotLayout, side: Side) =>
  1 - contentOverlap(l, restX(l, side)) * (1 - l.overContentOpacity);

/** Mesma comparação de valor entre layouts (evita re-render sem mudança real). */
export const sameLayout = (a: RobotLayout, b: RobotLayout) =>
  a.width === b.width &&
  a.robotPx === b.robotPx &&
  a.canvasHeight === b.canvasHeight &&
  a.xLeft === b.xLeft &&
  a.xRight === b.xRight &&
  a.visible === b.visible;
