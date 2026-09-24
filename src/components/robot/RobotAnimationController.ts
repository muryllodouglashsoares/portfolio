import { AnimationAction, AnimationClip, AnimationMixer, LoopRepeat, type Object3D } from "three";

/**
 * Controlador de animação do robô (evolução do AnimationController do robot-lab).
 *
 * Diferenças em relação ao laboratório:
 *  - Os pesos são controlados aqui (crossfade próprio) em vez de `crossFadeTo`. O mixer
 *    nunca avança sozinho: cada clipe tem o tempo definido explicitamente e o mixer só
 *    "avalia a pose" (`update(0)`), como no scrub validado no laboratório. Isso permite
 *    misturar, no mesmo frame, clipes ligados ao scroll e clipes livres, com crossfade.
 *  - Walking/Running compartilham uma única fase (0–1) que avança conforme o robô se move
 *    (scrub por deslocamento): pára quando o scroll pára, e o crossfade entre os dois
 *    acontece sempre em fase, sem "escorregar" as pernas.
 *  - Um clipe pontual (Wave) toca uma vez e avisa quando terminou.
 */

export type ClipKey = "idle" | "walk" | "run" | "wave";

const CLIP_LABEL: Record<ClipKey, string> = {
  idle: "idle",
  walk: "walking",
  run: "running",
  wave: "wave",
};

type Mode = "loop" | "phase" | "once";
const MODE: Record<ClipKey, Mode> = { idle: "loop", walk: "phase", run: "phase", wave: "once" };

/** "RobotArmature|Robot_Dance" -> "dance" */
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
  private phase = 0;
  private _current: ClipKey = "idle";

  constructor(root: Object3D, clips: AnimationClip[]) {
    this.mixer = new AnimationMixer(root);
    const byName = new Map(clips.map((c) => [shortName(c.name), c]));
    (Object.keys(CLIP_LABEL) as ClipKey[]).forEach((key) => {
      const clip = byName.get(CLIP_LABEL[key]);
      if (!clip) return;
      const action = this.mixer.clipAction(clip);
      action.setLoop(LoopRepeat, Infinity);
      action.weight = 0;
      action.play();
      this.tracks.set(key, {
        key,
        action,
        duration: clip.duration,
        mode: MODE[key],
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

  get current() {
    return this._current;
  }

  has(key: ClipKey) {
    return this.tracks.has(key);
  }

  /** Crossfade para `key` em `seconds`. Sem efeito se o clipe não existir. */
  fadeTo(key: ClipKey, seconds: number) {
    if (!this.tracks.has(key)) return;
    this._current = key;
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

  /** O clipe pontual chegou ao fim? */
  isFinished(key: ClipKey) {
    return this.tracks.get(key)?.finished ?? true;
  }

  /** Avança a fase de Walking/Running em `cyclesPerSecond` (scrub por deslocamento). */
  advanceLocomotion(cyclesPerSecond: number, dt: number) {
    this.phase = (this.phase + cyclesPerSecond * dt) % 1;
  }

  /** Pose fixa (reduced motion): só `key`, no instante `time` do clipe. */
  setStatic(key: ClipKey, time: number) {
    this.tracks.forEach((t) => {
      t.w = t.target = t.key === key ? 1 : 0;
      if (t.key === key) t.time = time % t.duration;
    });
    this._current = key;
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
        if (t.mode === "phase") {
          t.time = this.phase * t.duration;
        } else if (t.mode === "loop") {
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
