/**
 * Configuração do robô — dados puros (sem three/React). É AQUI que se ajusta o comportamento.
 *
 *   scroll ─▶ seção ativa ─▶ lado de repouso (esquerda/direita) + animação pontual (clipe do GLB)
 *
 * O robô fica parado num dos dois cantos inferiores. Quando a seção ativa pede outro lado,
 * ele some (fade), troca de canto enquanto está invisível e reaparece (fade). Nunca anda.
 */

export type Side = "left" | "right";

/**
 * Clipes usados. A chave é o nome interno; o valor é o nome real no GLB, sem o prefixo
 * "RobotArmature|Robot_" e em minúsculas (ex.: "RobotArmature|Robot_ThumbsUp" -> "thumbsup").
 *
 * Só entram clipes que (1) existem no GLB original e (2) animam o osso "Head" — requisito
 * para a cabeça poder ser composta por cima do clipe sem acumular rotação.
 * Clipes de deslocamento (Walking, Running, Jump…) ficam de fora de propósito.
 */
export const CLIP_NAMES = {
  idle: "idle",
  yes: "yes",
  thumbsUp: "thumbsup",
  wave: "wave",
} as const;

export type ClipKey = keyof typeof CLIP_NAMES;

export interface SectionBehavior {
  /** id do elemento <section> no DOM (ver src/components/portfolio/*). */
  id: string;
  /** Canto de repouso enquanto esta seção está ativa. */
  side: Side;
  /** Animação pontual tocada quando a seção se torna ativa. Sem `clip`, o robô só fica em Idle. */
  clip?: Exclude<ClipKey, "idle">;
  /** Intervalo mínimo (s) entre duas reações NESTA seção. Padrão: ROBOT_TUNING.defaultCooldown. */
  cooldown?: number;
}

/** Ordem = ordem no DOM. */
export const SECTION_BEHAVIORS: readonly SectionBehavior[] = [
  { id: "top", side: "left" },
  { id: "sobre", side: "left", clip: "yes" }, // aceno de atenção discreto
  { id: "stack", side: "right", clip: "thumbsUp" }, // reação leve
  { id: "projetos", side: "left", clip: "yes" }, // interesse
  { id: "trajetoria", side: "right" }, // só observa
  { id: "github", side: "right" },
  { id: "contato", side: "left", clip: "wave", cooldown: 25 }, // saudação (a mais rara)
];

export const ROBOT_TUNING = {
  /** Linha de referência do viewport (fração da altura) usada para achar a seção ativa. */
  refLine: 0.6,
  /** Histerese: a linha precisa passar da fronteira por esta fração da altura do viewport. */
  boundaryBand: 0.06,

  /** Troca de lado: o lado desejado precisa ficar estável por `sideDwell` (s)... */
  sideDwell: 0.25,
  /** ...e passar `minSwapGap` (s) desde a última troca. */
  minSwapGap: 1.2,
  /** Duração (s) do desaparecimento, do intervalo invisível e do reaparecimento. */
  fade: { out: 0.35, hold: 0.1, in: 0.5 },
  /** A posição só muda quando a opacidade (já suavizada) fica abaixo disto. */
  swapAtOpacity: 0.02,

  /** Animações: seção estável por `clipDelay` (s) e robô visível por `clipSettle` (s) antes de tocar. */
  clipDelay: 0.5,
  clipSettle: 0.3,
  defaultCooldown: 12,
  /** Crossfades (s) do clipe pontual. */
  clipFade: { in: 0.3, out: 0.4 },

  /** Giro do corpo (graus) em direção ao conteúdo: esquerda olha p/ direita (+) e vice-versa. */
  restYaw: 24,

  /** Cabeça: limites relativos ao corpo (graus) e suavização. */
  head: {
    maxYaw: 50,
    maxUp: 24,
    maxDown: 16,
    /** Distância virtual (px) do mapeamento atan: quanto menor, mais a cabeça "reage". */
    reach: 520,
    pitchRatio: 0.6,
    /** Maior = mais colada ao cursor. */
    follow: 7,
    /** Volta ao repouso (cursor fora da janela). */
    release: 3,
  },
} as const;

const byId = new Map(SECTION_BEHAVIORS.map((b) => [b.id, b]));

export const behaviorIds = SECTION_BEHAVIORS.map((b) => b.id);
export const hasBehavior = (id: string) => byId.has(id);
export const behaviorOf = (id: string) => byId.get(id);

/** Lado de repouso de uma seção (desconhecida = esquerda, como o `top`). */
export const sideOf = (id: string): Side => byId.get(id)?.side ?? "left";
