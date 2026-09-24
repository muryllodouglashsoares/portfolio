/**
 * Layout do robô em pixels — puro, calculado a partir do viewport.
 *
 * O robô vive numa faixa fixa na base da tela. A "pista" (u = 0…1) vai do centro do robô
 * na margem esquerda até o centro dele na margem direita. No desktop essas margens são as
 * laterais livres ao lado do container do portfólio (72rem), então o robô em repouso
 * não fica sobre texto, cards ou botões. Em telas menores não há margem: o robô encolhe,
 * se recolhe para o canto inferior direito e anda menos.
 */

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
  /** Centro do robô (px) em u = 0 e u = 1. */
  xLeft: number;
  xRight: number;
  /** Metade da largura do robô com braços (px) e faixa horizontal ocupada pelo conteúdo (px). */
  halfWidth: number;
  contentLeft: number;
  contentRight: number;
  /** Layout compacto (mobile): menos movimento e menos rotação. */
  compact: boolean;
  /** Fator de intensidade dos ângulos (1 = desktop). */
  motion: number;
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
  const robotPx = compact ? 92 : tablet ? 122 : desktopPx;
  const zoom = robotPx / 2;
  const halfWidth = robotPx * 0.3; // com braços, o robô tem ~0,6 da própria altura
  const bottomPad = compact ? 6 : 10;
  const canvasHeight = Math.round(robotPx * 1.14 + bottomPad + 6);

  let xLeft: number;
  let xRight: number;
  if (compact) {
    xRight = width - halfWidth - 8;
    xLeft = xRight - width * 0.3;
  } else {
    // Centraliza o robô na margem livre ao lado do container quando ela existe.
    xLeft = clamp(contentLeft / 2, halfWidth + 10, 150);
    xRight = width - xLeft;
  }

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
    motion: compact ? 0.6 : tablet ? 0.85 : 1,
  };
}

/** Centro x (px) do robô para a posição u da pista. */
export const laneX = (l: RobotLayout, u: number) => l.xLeft + (l.xRight - l.xLeft) * u;

/** Quanto do robô (0–1) está sobre a área de conteúdo, dado o centro x (px). */
export function contentOverlap(l: RobotLayout, xCenter: number) {
  const left = Math.max(xCenter - l.halfWidth, l.contentLeft);
  const right = Math.min(xCenter + l.halfWidth, l.contentRight);
  return Math.min(1, Math.max(0, (right - left) / (2 * l.halfWidth)));
}

/** Mesma comparação de valor entre layouts (evita re-render sem mudança real). */
export const sameLayout = (a: RobotLayout, b: RobotLayout) =>
  a.width === b.width &&
  a.robotPx === b.robotPx &&
  a.canvasHeight === b.canvasHeight &&
  a.xLeft === b.xLeft &&
  a.xRight === b.xRight;
