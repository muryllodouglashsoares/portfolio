import { useEffect, useRef, type RefObject } from "react";

type Figure = "idle" | "heart" | "smile";

interface Dot {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  intensity: number;
  heart?: [number, number];
  smile?: [number, number];
}

const FIGURE_DOTS = 144;

function heartTargets(width: number, height: number, size: number) {
  const cx = width * 0.34;
  const cy = height * 0.53;

  return Array.from({ length: FIGURE_DOTS }, (_, index) => {
    const angle = (index / FIGURE_DOTS) * Math.PI * 2;
    const sin = Math.sin(angle);
    const x = 16 * sin * sin * sin;
    const y =
      13 * Math.cos(angle) -
      5 * Math.cos(angle * 2) -
      2 * Math.cos(angle * 3) -
      Math.cos(angle * 4);

    return [cx + (x / 34) * size, cy - (y / 32) * size] as [number, number];
  });
}

function smileTargets(width: number, height: number, size: number) {
  const cx = width * 0.67;
  const cy = height * 0.5;
  const radius = size * 0.48;
  const targets: Array<[number, number]> = [];

  for (let index = 0; index < 84; index += 1) {
    const angle = (index / 84) * Math.PI * 2;
    targets.push([
      cx + Math.cos(angle) * radius,
      cy + Math.sin(angle) * radius,
    ]);
  }

  for (const direction of [-1, 1]) {
    for (let index = 0; index < 10; index += 1) {
      const angle = (index / 10) * Math.PI * 2;
      targets.push([
        cx + direction * radius * 0.24 + Math.cos(angle) * radius * 0.055,
        cy - radius * 0.15 + Math.sin(angle) * radius * 0.1,
      ]);
    }
  }

  for (let index = 0; index < 40; index += 1) {
    const angle = Math.PI * (0.12 + (index / 39) * 0.76);
    targets.push([
      cx + Math.cos(angle) * radius * 0.6,
      cy + radius * 0.08 + Math.sin(angle) * radius * 0.52,
    ]);
  }

  return targets;
}

function buildDots(width: number, height: number) {
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
      dots.push({ homeX: x, homeY: y, x, y, intensity: 0 });
    }
  }

  const size = Math.min(width * 0.24, height * 0.48, 220);
  const heart = heartTargets(width, height, size);
  const smile = smileTargets(width, height, size);
  const pool = [...dots]
    .sort((a, b) => {
      const aDistance = Math.hypot(a.homeX - width / 2, a.homeY - height / 2);
      const bDistance = Math.hypot(b.homeX - width / 2, b.homeY - height / 2);
      return aDistance - bDistance;
    })
    .slice(0, Math.min(FIGURE_DOTS, dots.length));

  pool.forEach((dot, index) => {
    dot.heart = heart[index];
    dot.smile = smile[index];
  });

  return dots;
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

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let dots: Dot[] = [];
    let figure: Figure = "idle";
    let frame = 0;
    let lastTime = 0;
    let width = 0;
    let height = 0;
    let dotColor = "";
    let figureColor = "";

    const draw = () => {
      context.clearRect(0, 0, width, height);

      for (const dot of dots) {
        context.beginPath();
        context.fillStyle = dot.intensity > 0.02 ? figureColor : dotColor;
        context.globalAlpha = 0.11 + dot.intensity * 0.22;
        context.arc(dot.x, dot.y, 1 + dot.intensity * 0.45, 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 1;
    };

    const targetFor = (dot: Dot): [number, number] => {
      if (figure === "heart" && dot.heart) return dot.heart;
      if (figure === "smile" && dot.smile) return dot.smile;
      return [dot.homeX, dot.homeY];
    };

    const animate = (time: number) => {
      const delta = lastTime ? Math.min(40, time - lastTime) : 16;
      lastTime = time;
      const ease = 1 - Math.exp(-delta / 165);
      let unsettled = false;

      for (const dot of dots) {
        const [targetX, targetY] = targetFor(dot);
        const targetIntensity =
          figure !== "idle" && (dot.heart || dot.smile) ? 1 : 0;
        dot.x += (targetX - dot.x) * ease;
        dot.y += (targetY - dot.y) * ease;
        dot.intensity += (targetIntensity - dot.intensity) * ease;

        if (
          Math.abs(targetX - dot.x) > 0.05 ||
          Math.abs(targetY - dot.y) > 0.05 ||
          Math.abs(targetIntensity - dot.intensity) > 0.005
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

    const resize = () => {
      const rect = section.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const styles = getComputedStyle(section);
      dotColor = styles.getPropertyValue("--muted-foreground").trim();
      figureColor = styles.getPropertyValue("--primary-soft").trim();
      dots = buildDots(width, height);

      if (reducedMotion.matches || !finePointer.matches) figure = "idle";
      draw();
      if (figure !== "idle") requestDraw();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (reducedMotion.matches || !finePointer.matches) return;
      const rect = section.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      if (y < 0.12 || y > 0.9) {
        setFigure("idle");
      } else if (figure === "heart") {
        if (x > 0.56) setFigure("smile");
      } else if (figure === "smile") {
        if (x < 0.44) setFigure("heart");
      } else {
        setFigure(x < 0.5 ? "heart" : "smile");
      }
    };

    const onPointerLeave = () => setFigure("idle");

    const disableInteraction = () => {
      if (reducedMotion.matches || !finePointer.matches) {
        figure = "idle";
        for (const dot of dots) {
          dot.x = dot.homeX;
          dot.y = dot.homeY;
          dot.intensity = 0;
        }
        draw();
      }
    };

    const observer = new ResizeObserver(resize);
    observer.observe(section);
    section.addEventListener("pointermove", onPointerMove, { passive: true });
    section.addEventListener("pointerleave", onPointerLeave);
    reducedMotion.addEventListener("change", disableInteraction);
    finePointer.addEventListener("change", disableInteraction);
    resize();

    return () => {
      observer.disconnect();
      section.removeEventListener("pointermove", onPointerMove);
      section.removeEventListener("pointerleave", onPointerLeave);
      reducedMotion.removeEventListener("change", disableInteraction);
      finePointer.removeEventListener("change", disableInteraction);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [sectionRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 size-full"
    />
  );
}
