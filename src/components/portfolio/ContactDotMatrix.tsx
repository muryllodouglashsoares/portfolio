import { useEffect, useRef, type RefObject } from "react";

type Figure = "idle" | "heart" | "smile";
type Point = [number, number];

interface Dot {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  /** 0..1 — quanto o ponto já faz parte da figura */
  intensity: number;
  /** 0..1 — proximidade animada do cursor */
  light: number;
  /** 0..1 — o ponto sumiu (foi "absorvido" pela figura) */
  hide: number;
  /** 0..1 — presença no brilho aleatório (independe do cursor) */
  twinkle: number;
  twinkleTarget: 0 | 1;
  /** instante (ms do relógio interno) da próxima troca presente/ausente */
  nextToggle: number;
  /** quanto o ponto some quando cada figura está formada */
  heartHide: number;
  smileHide: number;
  heart?: Point;
  smile?: Point;
}

// Poucos pontos por figura: com espaçamento visível entre eles, a silhueta
// aparece pontilhada em vez de parecer uma linha contínua.
const FIGURE_DOTS = 52;
const SMILE_OUTLINE_DOTS = 28;
const SMILE_EYE_DOTS = 3;
const SMILE_MOUTH_DOTS = 18;

// Posição das figuras dentro da seção de contato (proporção da largura/altura)
const HEART_CENTER: Point = [0.34, 0.53];
const SMILE_CENTER: Point = [0.67, 0.5];

// Aparência da matriz
const BASE_ALPHA = 0.3;
const BASE_RADIUS = 0.9;
const FIGURE_ALPHA = 0.9;
const FIGURE_RADIUS = 1.7;

// Região animada ao redor do cursor
const LIGHT_RADIUS = 170;
const LIGHT_ALPHA = 0.85;
const LIGHT_GROW = 0.8;
const LIGHT_PULL = 5;

// O cursor precisa estar perto da figura (fração do tamanho dela) para formá-la.
// A saída é mais folgada que a entrada para não piscar na borda.
const FIGURE_ENTER = 0.6;
const FIGURE_EXIT = 0.85;

// Presença aleatória dos pontos (ms): quanto tempo ficam visíveis / ausentes
const TWINKLE_ON: Point = [2500, 8000];
const TWINKLE_OFF: Point = [1200, 4500];
const TWINKLE_ABSENT_SHARE = 0.25;

function randomBetween([min, max]: Point) {
  return min + Math.random() * (max - min);
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const t = Math.min(1, Math.max(0, (value - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function heartTargets(width: number, zoneHeight: number, size: number) {
  const cx = width * HEART_CENTER[0];
  const cy = zoneHeight * HEART_CENTER[1];

  return Array.from({ length: FIGURE_DOTS }, (_, index) => {
    const angle = (index / FIGURE_DOTS) * Math.PI * 2;
    const sin = Math.sin(angle);
    const x = 16 * sin * sin * sin;
    const y =
      13 * Math.cos(angle) -
      5 * Math.cos(angle * 2) -
      2 * Math.cos(angle * 3) -
      Math.cos(angle * 4);

    return [cx + (x / 34) * size, cy - (y / 32) * size] as Point;
  });
}

function smileTargets(width: number, zoneHeight: number, size: number) {
  const cx = width * SMILE_CENTER[0];
  const cy = zoneHeight * SMILE_CENTER[1];
  const radius = size * 0.48;
  const targets: Point[] = [];

  for (let index = 0; index < SMILE_OUTLINE_DOTS; index += 1) {
    const angle = (index / SMILE_OUTLINE_DOTS) * Math.PI * 2;
    targets.push([
      cx + Math.cos(angle) * radius,
      cy + Math.sin(angle) * radius,
    ]);
  }

  for (const direction of [-1, 1]) {
    for (let index = 0; index < SMILE_EYE_DOTS; index += 1) {
      const angle = (index / SMILE_EYE_DOTS) * Math.PI * 2;
      targets.push([
        cx + direction * radius * 0.24 + Math.cos(angle) * radius * 0.055,
        cy - radius * 0.15 + Math.sin(angle) * radius * 0.1,
      ]);
    }
  }

  for (let index = 0; index < SMILE_MOUTH_DOTS; index += 1) {
    const angle = Math.PI * (0.12 + (index / (SMILE_MOUTH_DOTS - 1)) * 0.76);
    targets.push([
      cx + Math.cos(angle) * radius * 0.6,
      cy + radius * 0.08 + Math.sin(angle) * radius * 0.52,
    ]);
  }

  return targets;
}

/**
 * Para cada ponto da figura, escolhe o ponto livre da matriz mais próximo.
 * Assim a figura se forma com pontos que já estavam ali perto.
 */
function assignTargets(dots: Dot[], targets: Point[], key: "heart" | "smile") {
  const used = new Set<Dot>();

  for (const [tx, ty] of targets) {
    let best: Dot | null = null;
    let bestDistance = Infinity;

    for (const dot of dots) {
      if (used.has(dot)) continue;
      const distance = (dot.homeX - tx) ** 2 + (dot.homeY - ty) ** 2;
      if (distance < bestDistance) {
        bestDistance = distance;
        best = dot;
      }
    }

    if (best) {
      used.add(best);
      best[key] = [tx, ty];
    }
  }
}

/**
 * @param height     altura total da matriz (seção + rodapé)
 * @param zoneHeight altura da seção de contato, onde as figuras são posicionadas
 */
function buildDots(width: number, height: number, zoneHeight: number) {
  const spacing = Math.max(22, Math.min(30, width / 40));
  const columns = Math.max(2, Math.floor(width / spacing));
  const rows = Math.max(2, Math.floor(height / spacing));
  const offsetX = (width - (columns - 1) * spacing) / 2;
  const offsetY = (height - (rows - 1) * spacing) / 2;
  const dots: Dot[] = [];

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const x = offsetX + column * spacing;
      const y = offsetY + row * spacing;
      dots.push({
        homeX: x,
        homeY: y,
        x,
        y,
        intensity: 0,
        light: 0,
        hide: 0,
        twinkle: 1,
        twinkleTarget: 1,
        nextToggle: 0,
        heartHide: 0,
        smileHide: 0,
      });
    }
  }

  for (const dot of dots) {
    const absent = Math.random() < TWINKLE_ABSENT_SHARE;
    dot.twinkleTarget = absent ? 0 : 1;
    dot.twinkle = dot.twinkleTarget;
    dot.nextToggle = randomBetween(absent ? TWINKLE_OFF : TWINKLE_ON);
  }

  const size = Math.min(width * 0.24, zoneHeight * 0.48, 220);
  assignTargets(dots, heartTargets(width, zoneHeight, size), "heart");
  assignTargets(dots, smileTargets(width, zoneHeight, size), "smile");

  const heartX = width * HEART_CENTER[0];
  const heartY = zoneHeight * HEART_CENTER[1];
  const smileX = width * SMILE_CENTER[0];
  const smileY = zoneHeight * SMILE_CENTER[1];

  // Pontos vizinhos da figura somem, como se tivessem se organizado nela.
  for (const dot of dots) {
    const heartDistance = Math.hypot(dot.homeX - heartX, dot.homeY - heartY);
    const smileDistance = Math.hypot(dot.homeX - smileX, dot.homeY - smileY);

    dot.heartHide = dot.heart
      ? 0
      : 1 - smoothstep(size * 0.62, size * 0.8, heartDistance);
    dot.smileHide = dot.smile
      ? 0
      : 1 - smoothstep(size * 0.55, size * 0.7, smileDistance);
  }

  return { dots, size };
}

export function ContactDotMatrix({
  sectionRef,
}: {
  sectionRef: RefObject<HTMLElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    // A matriz continua pelo rodapé, que vem logo depois do <main>.
    const nextElement = section.closest("main")?.nextElementSibling;
    const footer =
      nextElement instanceof HTMLElement && nextElement.tagName === "FOOTER"
        ? nextElement
        : null;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const isInteractive = () => !reducedMotion.matches && finePointer.matches;

    let dots: Dot[] = [];
    let figureSize = 0;
    let heartCenter: Point = [0, 0];
    let smileCenter: Point = [0, 0];
    let clock = 0;
    let inView = true;
    let figure: Figure = "idle";
    let frame = 0;
    let lastTime = 0;
    let width = 0;
    let height = 0;
    let dotColor = "";
    let figureColor = "";
    let hoverColor = "";
    let pointerInside = false;
    let pointerX = 0;
    let pointerY = 0;
    let lastPointer: { x: number; y: number } | null = null;

    const draw = () => {
      context.clearRect(0, 0, width, height);

      for (const dot of dots) {
        const formed = dot.intensity;
        // Brilho aleatório: pontos da figura e próximos do cursor ficam sempre presentes
        const presence = Math.max(dot.twinkle, dot.light, formed);
        const visible = (1 - dot.hide) * presence;
        if (visible < 0.01 && formed < 0.02) continue;

        const light = dot.light * (1 - formed);
        let x = dot.x;
        let y = dot.y;

        // Puxão leve em direção ao cursor, só na região animada
        if (light > 0.01) {
          const dx = pointerX - x;
          const dy = pointerY - y;
          const distance = Math.hypot(dx, dy) || 1;
          const pull = Math.min(LIGHT_PULL * light, distance);
          x += (dx / distance) * pull;
          y += (dy / distance) * pull;
        }

        const radius =
          BASE_RADIUS +
          (FIGURE_RADIUS - BASE_RADIUS) * formed +
          LIGHT_GROW * light;
        const baseAlpha = (BASE_ALPHA + (LIGHT_ALPHA - BASE_ALPHA) * light) * visible;

        context.beginPath();
        context.fillStyle = formed > 0.02 ? figureColor : dotColor;
        context.globalAlpha = baseAlpha + (FIGURE_ALPHA - baseAlpha) * formed;
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();

        // Camada mais clara por cima nos pontos próximos do cursor
        if (light > 0.02 && hoverColor) {
          context.beginPath();
          context.fillStyle = hoverColor;
          context.globalAlpha = light * 0.55 * visible;
          context.arc(x, y, radius, 0, Math.PI * 2);
          context.fill();
        }
      }

      context.globalAlpha = 1;
    };

    const targetFor = (dot: Dot): Point => {
      if (figure === "heart" && dot.heart) return dot.heart;
      if (figure === "smile" && dot.smile) return dot.smile;
      return [dot.homeX, dot.homeY];
    };

    const animate = (time: number) => {
      const delta = lastTime ? Math.min(40, time - lastTime) : 16;
      lastTime = time;
      const ease = 1 - Math.exp(-delta / 165);
      const lightEase = 1 - Math.exp(-delta / 110);
      const hideEase = 1 - Math.exp(-delta / 220);
      const twinkling = !reducedMotion.matches && inView;
      const twinkleEase = 1 - Math.exp(-delta / 450);
      let unsettled = twinkling;
      if (twinkling) clock += delta;

      for (const dot of dots) {
        if (twinkling) {
          if (clock >= dot.nextToggle) {
            dot.twinkleTarget = dot.twinkleTarget ? 0 : 1;
            dot.nextToggle =
              clock +
              randomBetween(dot.twinkleTarget ? TWINKLE_ON : TWINKLE_OFF);
          }
          dot.twinkle += (dot.twinkleTarget - dot.twinkle) * twinkleEase;
        }

        const [targetX, targetY] = targetFor(dot);
        const inFigure =
          (figure === "heart" && dot.heart) || (figure === "smile" && dot.smile);
        const targetIntensity = inFigure ? 1 : 0;
        const targetHide =
          figure === "heart"
            ? dot.heartHide
            : figure === "smile"
              ? dot.smileHide
              : 0;

        let targetLight = 0;
        if (pointerInside && !inFigure) {
          const distance = Math.hypot(
            dot.homeX - pointerX,
            dot.homeY - pointerY,
          );
          if (distance < LIGHT_RADIUS) {
            targetLight = 1 - smoothstep(0, LIGHT_RADIUS, distance);
          }
        }

        dot.x += (targetX - dot.x) * ease;
        dot.y += (targetY - dot.y) * ease;
        dot.intensity += (targetIntensity - dot.intensity) * ease;
        dot.light += (targetLight - dot.light) * lightEase;
        dot.hide += (targetHide - dot.hide) * hideEase;

        if (
          Math.abs(targetX - dot.x) > 0.05 ||
          Math.abs(targetY - dot.y) > 0.05 ||
          Math.abs(targetIntensity - dot.intensity) > 0.005 ||
          Math.abs(targetLight - dot.light) > 0.005 ||
          Math.abs(targetHide - dot.hide) > 0.005
        ) {
          unsettled = true;
        }
      }

      draw();
      if (unsettled) frame = requestAnimationFrame(animate);
      else {
        frame = 0;
        lastTime = 0;
      }
    };

    const requestDraw = () => {
      if (!frame) frame = requestAnimationFrame(animate);
    };

    const setFigure = (next: Figure) => {
      if (next === figure) return;
      figure = next;
      requestDraw();
    };

    const resetTwinkle = () => {
      for (const dot of dots) {
        dot.twinkle = 1;
        dot.twinkleTarget = 1;
      }
    };

    const resize = () => {
      const sectionRect = section.getBoundingClientRect();
      const footerRect = footer?.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      const zoneHeight = Math.max(1, sectionRect.height);

      width = Math.max(1, sectionRect.width);
      height = footerRect
        ? Math.max(zoneHeight, footerRect.bottom - sectionRect.top)
        : zoneHeight;

      canvas.style.height = `${height}px`;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const styles = getComputedStyle(section);
      dotColor = styles.getPropertyValue("--muted-foreground").trim();
      figureColor = styles.getPropertyValue("--primary-soft").trim();
      hoverColor = styles.getPropertyValue("--foreground").trim();
      const built = buildDots(width, height, zoneHeight);
      dots = built.dots;
      figureSize = built.size;
      heartCenter = [width * HEART_CENTER[0], zoneHeight * HEART_CENTER[1]];
      smileCenter = [width * SMILE_CENTER[0], zoneHeight * SMILE_CENTER[1]];
      clock = 0;
      if (reducedMotion.matches) resetTwinkle();

      if (!isInteractive()) figure = "idle";
      draw();
      requestDraw();
    };

    const leave = () => {
      if (pointerInside) {
        pointerInside = false;
        requestDraw();
      }
      setFigure("idle");
    };

    // Avalia a posição do cursor em relação à matriz inteira (seção + rodapé)
    const evaluatePointer = () => {
      if (!lastPointer || !isInteractive()) {
        leave();
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const localX = lastPointer.x - rect.left;
      const localY = lastPointer.y - rect.top;

      if (localX < 0 || localX > rect.width || localY < 0 || localY > rect.height) {
        leave();
        return;
      }

      pointerInside = true;
      pointerX = localX;
      pointerY = localY;

      // As figuras só se formam com o cursor perto delas
      const heartDistance = Math.hypot(
        pointerX - heartCenter[0],
        pointerY - heartCenter[1],
      );
      const smileDistance = Math.hypot(
        pointerX - smileCenter[0],
        pointerY - smileCenter[1],
      );
      const enter = figureSize * FIGURE_ENTER;
      const exit = figureSize * FIGURE_EXIT;

      if (figure === "heart" && heartDistance < exit) {
        if (smileDistance < enter && smileDistance < heartDistance) {
          setFigure("smile");
        }
      } else if (figure === "smile" && smileDistance < exit) {
        if (heartDistance < enter && heartDistance < smileDistance) {
          setFigure("heart");
        }
      } else if (heartDistance < enter || smileDistance < enter) {
        setFigure(heartDistance <= smileDistance ? "heart" : "smile");
      } else {
        setFigure("idle");
      }

      requestDraw();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      lastPointer = { x: event.clientX, y: event.clientY };
      evaluatePointer();
    };

    const onScroll = () => {
      if (lastPointer) evaluatePointer();
    };

    const onPointerLeave = () => {
      lastPointer = null;
      leave();
    };

    const onMotionChange = () => {
      if (reducedMotion.matches) resetTwinkle();
      disableInteraction();
      requestDraw();
    };

    const disableInteraction = () => {
      if (!isInteractive()) {
        figure = "idle";
        pointerInside = false;
        for (const dot of dots) {
          dot.x = dot.homeX;
          dot.y = dot.homeY;
          dot.intensity = 0;
          dot.light = 0;
          dot.hide = 0;
        }
        draw();
      }
    };

    // Pausa o brilho aleatório quando a matriz está fora da tela
    const visibility = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      inView = entry.isIntersecting;
      if (inView) requestDraw();
    });
    visibility.observe(canvas);

    const observer = new ResizeObserver(resize);
    observer.observe(section);
    if (footer) observer.observe(footer);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("blur", onPointerLeave);
    reducedMotion.addEventListener("change", onMotionChange);
    finePointer.addEventListener("change", disableInteraction);
    resize();

    return () => {
      observer.disconnect();
      visibility.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.removeEventListener(
        "pointerleave",
        onPointerLeave,
      );
      window.removeEventListener("blur", onPointerLeave);
      reducedMotion.removeEventListener("change", onMotionChange);
      finePointer.removeEventListener("change", disableInteraction);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [sectionRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute top-0 left-0 z-0 w-full"
      style={{ height: "100%" }}
    />
  );
}
