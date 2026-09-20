import { useEffect, useRef, useState } from "react";
import { useCountUp } from "@/hooks/use-motion";

/**
 * Anima números como "6+" e "25+" com um count-up curto quando entram no
 * viewport. Valores não numéricos (ex.: "∞") são exibidos como estão —
 * sem tentar forçar uma contagem que não faz sentido.
 */
export function AnimatedStat({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  const ref = useRef<HTMLParagraphElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match) return;
    if (typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [match]);

  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const count = useCountUp(target, active);

  return (
    <p ref={ref} className="font-display text-3xl font-bold text-primary-soft sm:text-4xl">
      {match ? `${count}${suffix}` : value}
    </p>
  );
}
