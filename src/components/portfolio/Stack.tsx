import { useEffect, useRef, type CSSProperties } from "react";

import { stack } from "@/data/portfolio";
import { techIcons, type TechIconKey } from "@/data/techIcons";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

function smoothstep(value: number) {
  const clamped = Math.min(Math.max(value, 0), 1);
  return clamped * clamped * (3 - 2 * clamped);
}

/**
 * Faixa com as principais tecnologias do card. O SVG é decorativo (aria-hidden); o nome
 * fica em texto para leitores de tela e aparece como rótulo discreto no hover.
 */
function StackIcons({ keys }: { keys: readonly string[] }) {
  const icons = keys.filter((key): key is TechIconKey => key in techIcons).map((k) => techIcons[k]);
  if (icons.length === 0) return null;

  return (
    <ul className="stack-icons" aria-label="Principais tecnologias deste grupo">
      {icons.map((icon) => (
        <li
          key={icon.name}
          className="stack-icon"
          data-label={icon.name}
          style={{ "--icon-color": icon.color } as CSSProperties}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
            <path d={icon.path} />
          </svg>
          <span className="sr-only">{icon.name}</span>
        </li>
      ))}
    </ul>
  );
}

export function Stack() {
  const storyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const story = storyRef.current;
    if (!story) return;

    const cards = Array.from(story.querySelectorAll<HTMLElement>("[data-stack-card]"));
    const desktop = window.matchMedia("(min-width: 48rem) and (min-height: 42rem)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const resetCards = () => {
      story.removeAttribute("data-active");
      cards.forEach((card) => {
        card.style.removeProperty("--stack-card-y");
        card.style.removeProperty("--stack-card-scale");
      });
    };

    const update = () => {
      frame = 0;
      if (!desktop.matches || reducedMotion.matches) {
        resetCards();
        return;
      }

      const storyTop = story.getBoundingClientRect().top + window.scrollY;
      const stepLength = window.innerHeight * 0.85;
      const progress = Math.min(
        Math.max((window.scrollY - storyTop) / stepLength, 0),
        cards.length - 1,
      );

      story.dataset.active = "true";

      cards.forEach((card, index) => {
        const reveal = index === 0 ? 1 : smoothstep(progress - (index - 1));
        const depth = Math.min(Math.max(progress - index, 0), cards.length);
        const entrance = (1 - reveal) * Math.min(window.innerHeight * 0.82, 720);
        const restingOffset = index * 18;

        card.style.setProperty("--stack-card-y", `${entrance + restingOffset - depth * 8}px`);
        card.style.setProperty("--stack-card-scale", `${1 - depth * 0.014}`);
      });
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    desktop.addEventListener("change", requestUpdate);
    reducedMotion.addEventListener("change", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      desktop.removeEventListener("change", requestUpdate);
      reducedMotion.removeEventListener("change", requestUpdate);
      resetCards();
    };
  }, []);

  return (
    <section id="stack" className="scroll-mt-24 pt-16 sm:pt-24 lg:pt-32">
      <div className="container-page">
        <Reveal>
          <SectionLabel>{stack.label}</SectionLabel>
        </Reveal>

        <Reveal delay={60}>
          <h2 className="mt-8 font-display text-3xl font-bold sm:mt-10 sm:text-4xl lg:text-5xl">
            {stack.title}
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">{stack.subtitle}</p>
        </Reveal>
      </div>

      <div ref={storyRef} className="stack-story mt-10 sm:mt-14">
        <div className="stack-story-stage">
          <div className="container-page stack-story-container">
            <div className="stack-card-deck">
              {stack.groups.map((group, index) => (
                <article
                  key={group.title}
                  data-stack-card
                  className="stack-card rounded-2xl border border-border bg-surface"
                  style={{ zIndex: index + 1 } as CSSProperties}
                >
                  <div className="stack-card-heading">
                    <span className="stack-card-index" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="stack-card-title">{group.title}</h3>
                    <span className="stack-card-rule" aria-hidden="true" />
                    <span className="stack-card-count" aria-hidden="true">
                      {group.items.length} {group.items.length === 1 ? "item" : "itens"}
                    </span>
                  </div>

                  <ul className="stack-tech-grid">
                    {group.items.map((item) => (
                      <li key={item.name} className="stack-tech-item">
                        <p className="text-sm font-medium text-foreground">{item.name}</p>
                        {item.note && (
                          <p className="mt-1 font-mono text-xs leading-relaxed text-muted-foreground">
                            {item.note}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>

                  <StackIcons keys={group.icons} />
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
