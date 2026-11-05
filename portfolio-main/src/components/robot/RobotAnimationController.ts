import { AnimationAction, AnimationClip, AnimationMixer, LoopRepeat, type Object3D } from "three";

import { CLIP_NAMES, type ClipKey } from "./robotBehaviors";

/**
 * Controlador de animação do robô (evolução do AnimationController do robot-lab).
 *
 *  - Um único AnimationMixer; uma AnimationAction por clipe (criadas uma vez).
 *  - Os pesos são controlados aqui (crossfade próprio) e o mixer nunca avança sozinho:
 *    cada clipe tem o tempo definido explicitamente e o mixer só "avalia a pose"
 *    (`update(0)`), como no scrub validado no laboratório. Resultado: a pose é reescrita
 *    por inteiro a cada frame, o que permite compor a cabeça por cima sem acumular rotação.
 *  - `idle` fica em loop; os demais clipes são pontuais: tocam uma vez e avisam o fim.
 *  - Só existem clipes de repouso/gesto — não há marcha, então nada se desloca.
 */

type Mode = "loop" | "once";

/** "RobotArmature|Robot_ThumbsUp" -> "thumbsup" */
const shortName = (n: string) => (n.split("|").pop() ?? n).replace(/^Robot_/i, "").toLowerCase();

interface Track {
  key: ClipKey;
  action: AnimationAction;
  duration: number;
  mode: Mode;
  /** Peso "bruto" 0–1 que anda em direção a `target`. */
  w: number;
  target: number;
  time: number;
  finished: boolean;
}

const smooth = (x: number) => x * x * (3 - 2 * x);

export class RobotAnimationController {
  private mixer: AnimationMixer;
  private tracks = new Map<ClipKey, Track>();
  private fadeSeconds = 0.35;

  constructor(root: Object3D, clips: AnimationClip[]) {
    this.mixer = new AnimationMixer(root);
    const byName = new Map(clips.map((c) => [shortName(c.name), c]));

    (Object.keys(CLIP_NAMES) as ClipKey[]).forEach((key) => {
      const clip = byName.get(CLIP_NAMES[key]);
      if (!clip) {
        if (import.meta.env.DEV) console.warn(`[robot] clipe ausente no GLB: "${CLIP_NAMES[key]}"`);
        return;
      }
      const action = this.mixer.clipAction(clip);
      action.setLoop(LoopRepeat, Infinity);
      action.weight = 0;
      action.play();
      this.tracks.set(key, {
        key,
        action,
        duration: clip.duration,
        mode: key === "idle" ? "loop" : "once",
        w: 0,
        target: 0,
        time: 0,
        finished: false,
      });
    });

    // Começa em Idle (soma dos pesos = 1 desde o primeiro frame).
    const idle = this.tracks.get("idle");
    if (idle) idle.w = idle.target = 1;
  }

  has(key: ClipKey) {
    return this.tracks.has(key);
  }

  /** Crossfade para `key` em `seconds`. Sem efeito se o clipe não existir. */
  fadeTo(key: ClipKey, seconds: number) {
    if (!this.tracks.has(key)) return;
    this.fadeSeconds = Math.max(0.01, seconds);
    this.tracks.forEach((t) => {
      t.target = t.key === key ? 1 : 0;
    });
  }

  /** Toca um clipe pontual do início, com crossfade. */
  playOnce(key: ClipKey, seconds: number) {
    const t = this.tracks.get(key);
    if (!t) return;
    t.time = 0;
    t.finished = false;
    this.fadeTo(key, seconds);
  }

  /** Segundos que faltam para o clipe pontual terminar (0 se já terminou ou não existe). */
  remaining(key: ClipKey) {
    const t = this.tracks.get(key);
    return !t || t.finished ? 0 : Math.max(0, t.duration - t.time);
  }

  /** Pose fixa (reduced motion): só `key`, no instante `time` do clipe. */
  setStatic(key: ClipKey, time: number) {
    this.tracks.forEach((t) => {
      t.w = t.target = t.key === key ? 1 : 0;
      if (t.key === key) t.time = time % t.duration;
    });
    this.apply(0, true);
  }

  update(dt: number) {
    this.apply(dt, false);
  }

  private apply(dt: number, frozen: boolean) {
    const step = dt / this.fadeSeconds;
    let sum = 0;

    this.tracks.forEach((t) => {
      if (!frozen) {
        t.w = t.w < t.target ? Math.min(t.target, t.w + step) : Math.max(t.target, t.w - step);
      }
      sum += smooth(t.w);
    });
    const norm = sum > 0 ? 1 / sum : 0; // soma = 1: sem vazar a pose de bind

    this.tracks.forEach((t) => {
      const eff = smooth(t.w);
      t.action.weight = eff * norm;
      if (eff <= 0) return;

      if (!frozen) {
        if (t.mode === "loop") {
          t.time = (t.time + dt) % t.duration;
        } else if (!t.finished) {
          t.time += dt;
          if (t.time >= t.duration) {
            t.time = t.duration - 1e-3;
            t.finished = true;
          }
        }
      }
      t.action.time = t.time;
    });

    this.mixer.update(0); // só avalia a pose; o tempo é nosso
  }

  dispose() {
    this.mixer.stopAllAction();
    this.tracks.clear();
  }
}
