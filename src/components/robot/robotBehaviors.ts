/**
 * Comportamento do robô por seção — dados puros (sem three/React).
 *
 * Modelo mental:
 *   scroll ─▶ seção ativa + progresso local (0–1) ─▶ posição na "pista" + marcha (gait)
 *
 * A pista é horizontal: u = 0 é a esquerda (repouso, na margem lateral) e u = 1 a direita.
 * Cada seção descreve, em `stages`, por onde o robô passa enquanto ela é percorrida.
 * A posição inicial de cada seção é o fim da anterior, então o percurso é contínuo e
 * reversível: subir a página desfaz exatamente o caminho.
 *
 * Tudo que é "gosto" (velocidades, ângulos, durações) fica em ROBOT_TUNING.
 */

export type Gait = "idle" | "walk" | "run";

export interface Stage {
  /** Até que progresso local (0–1) este trecho vale. O último trecho vai até 1. */
  until: number;
  /** Posição u ao final do trecho (o início é o fim do trecho anterior). */
  to: number;
  gait: Gait;
}

export interface SectionBehavior {
  /** id do elemento <section> no DOM. */
  id: string;
  stages: readonly Stage[];
  /** Yaw em repouso (graus) no início/fim da seção. 0 = de frente; + = olhando para a direita. */
  restYaw: readonly [number, number];
  /** Oscilação suave do olhar (graus) enquanto parado, ao longo da seção. */
  look?: number;
  /** Desvio de direção (graus) enquanto anda — dá "pequenas mudanças de direção". */
  weave?: number;
  /** Cumprimenta (Wave) ao chegar. */
  greets?: boolean;
}

/** Ordem = ordem no DOM. Os ids vêm de src/routes/index.tsx / components/portfolio/*. */
export const SECTION_BEHAVIORS: readonly SectionBehavior[] = [
  // HERO — parado e discreto; só reage ao primeiro scroll virando levemente para o conteúdo.
  { id: "top", stages: [{ until: 1, to: 0, gait: "idle" }], restYaw: [22, 34] },
  // SOBRE — continua em Idle, "observando" o conteúdo.
  { id: "sobre", stages: [{ until: 1, to: 0, gait: "idle" }], restYaw: [34, 50], look: 7 },
  // STACK — Walking: atravessa a pista conforme a seção é percorrida.
  { id: "stack", stages: [{ until: 1, to: 1, gait: "walk" }], restYaw: [0, 0], weave: 4 },
  // ENGENHARIA — Walking → Running: volta pela pista, cada vez mais rápido.
  {
    id: "engenharia",
    stages: [
      { until: 0.38, to: 0.8, gait: "walk" },
      { until: 1, to: 0.26, gait: "run" },
    ],
    restYaw: [0, 0],
    weave: 6,
  },
  // PROJETOS — Running → Walking → Idle: desacelera e "chega" perto do projeto principal.
  {
    id: "projetos",
    stages: [
      { until: 0.22, to: 0.12, gait: "run" },
      { until: 0.55, to: 0, gait: "walk" },
      { until: 1, to: 0, gait: "idle" },
    ],
    restYaw: [40, 40],
    look: 5,
    weave: 4,
  },
  // TRAJETÓRIA — Walking progressivo, acompanhando a linha do tempo.
  { id: "trajetoria", stages: [{ until: 1, to: 1, gait: "walk" }], restYaw: [0, 0], weave: 10 },
  // GITHUB — repouso do outro lado, olhando de volta para o conteúdo.
  { id: "github", stages: [{ until: 1, to: 1, gait: "idle" }], restYaw: [-30, -24] },
  // CONTATO — Idle → Wave (uma vez por visita) → Idle.
  { id: "contato", stages: [{ until: 1, to: 1, gait: "idle" }], restYaw: [-14, -8], greets: true },
];

export const ROBOT_TUNING = {
  /** Linha de referência do viewport (fração da altura) usada para achar a seção ativa. */
  refLine: 0.6,

  /** Suavização da posição (maior = mais colada ao scroll) e teto de velocidade (pista/s). */
  positionLambda: 7,
  maxLaneSpeed: 1.6,

  /** Limiares de movimento em fração da altura do robô por segundo (histerese). */
  startSpeed: 0.28,
  stopSpeed: 0.09,
  /** Tempo parado antes de virar Idle, e permanência mínima em uma marcha (s). */
  stopDelay: 0.25,
  minGaitHold: 0.3,
  /** Acima disso (alturas do robô/s) o Walking vira Running mesmo em trecho "walk". */
  forceRunSpeed: 7,

  /** Cadência de pernas (ciclos/s) = velocidade / (altura × stride), limitada a [min, max]. */
  walk: { stride: 2.4, minRate: 0.55, maxRate: 2.0, yaw: 68, pitch: 2 },
  run: { stride: 3.4, minRate: 0.9, maxRate: 2.5, yaw: 76, pitch: 6 },

  /** Crossfades (s). */
  fade: { toIdle: 0.4, toWalk: 0.35, walkRun: 0.4, toWave: 0.25, waveToIdle: 0.45 },

  /** Wave: tempo parado na seção antes de acenar (s). */
  greetDelay: 0.7,

  /** Reação sutil à direção do scroll enquanto parado (graus) e balanço do Idle (graus). */
  scrollReactionYaw: 9,
  idleSway: 2.5,

  /** Opacidade mínima do robô quando está inteiro sobre o conteúdo (1 = na margem livre). */
  minOpacityOverContent: 0.7,

  /** Suavização angular (yaw). */
  yawLambdaMoving: 8,
  yawLambdaResting: 4.5,
} as const;

/* ------------------------------------------------------------------ *
 *  Avaliação (pura)
 * ------------------------------------------------------------------ */

export interface BehaviorSample {
  /** Posição alvo na pista (0–1). */
  u: number;
  /** Marcha "de estilo" do trecho atual (a marcha real também depende do movimento). */
  gait: Gait;
  /** Yaw de repouso (graus), já com a oscilação de olhar. */
  restYaw: number;
  /** Desvio de direção ao andar (graus). */
  weaveYaw: number;
}

const START_U = 0;

interface Resolved extends SectionBehavior {
  startU: number;
}

const RESOLVED: readonly Resolved[] = (() => {
  let u = START_U;
  return SECTION_BEHAVIORS.map((b) => {
    const r: Resolved = { ...b, startU: u };
    const last = b.stages[b.stages.length - 1];
    if (last) u = last.to;
    return r;
  });
})();

const byId = new Map(RESOLVED.map((r) => [r.id, r]));

export const hasBehavior = (id: string) => byId.has(id);
export const behaviorIds = SECTION_BEHAVIORS.map((b) => b.id);

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);

/** Escreve em `out` (sem alocar) o alvo do robô para a seção `id` no progresso local `p`. */
export function evaluateBehavior(id: string, p: number, out: BehaviorSample): BehaviorSample {
  const b = byId.get(id);
  if (!b) {
    out.u = START_U;
    out.gait = "idle";
    out.restYaw = 0;
    out.weaveYaw = 0;
    return out;
  }
  p = clamp01(p);

  let from = 0;
  let u0 = b.startU;
  let stage = b.stages[b.stages.length - 1]!;
  let u = stage.to;
  for (let i = 0; i < b.stages.length; i++) {
    const s = b.stages[i]!;
    if (p <= s.until || i === b.stages.length - 1) {
      const span = Math.max(1e-6, s.until - from);
      u = u0 + (s.to - u0) * clamp01((p - from) / span);
      stage = s;
      break;
    }
    from = s.until;
    u0 = s.to;
  }

  out.u = u;
  out.gait = stage.gait;
  out.restYaw =
    b.restYaw[0] + (b.restYaw[1] - b.restYaw[0]) * p + (b.look ?? 0) * Math.sin(p * Math.PI * 2);
  out.weaveYaw = (b.weave ?? 0) * Math.sin(p * Math.PI * 3);
  return out;
}

export const greetsIn = (id: string) => byId.get(id)?.greets === true;
