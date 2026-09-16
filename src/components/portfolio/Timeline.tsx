import { useRef } from "react";
import { timeline } from "@/data/portfolio";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";
import { useScrollFill } from "@/hooks/use-motion";

export function Timeline() {
  const listRef = useRef<HTMLOListElement | null>(null);
  const progress = useScrollFill(listRef);

  return (
    <section id="trajetoria" className="scroll-mt-24 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel>{timeline.label}</SectionLabel>
        </Reveal>

        <Reveal delay={60}>
          <h2 className="mt-10 font-display text-4xl font-bold sm:text-5xl">{timeline.title}</h2>
        </Reveal>

        <ol ref={listRef} className="relative mt-14 space-y-12">
          {/* trilho estático + linha que se preenche conforme o usuário rola */}
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-4 w-px bg-border-strong"
          />
          <span
            aria-hidden="true"
            className="absolute top-2 left-4 w-px origin-top bg-gradient-to-b from-primary-soft via-primary to-primary/40 transition-transform duration-300 ease-out"
            style={{ height: "calc(100% - 1rem)", transform: `scaleY(${progress})` }}
          />
          {timeline.steps.map((step, i) => (
            <Reveal as="li" key={step.index} delay={i * 70} className="relative pl-16">
              <span
                className={
                  step.current
                    ? "absolute top-0 left-0 grid size-8 animate-pulse place-items-center rounded-full border border-dashed border-primary/60 bg-background font-mono text-xs text-primary-soft"
                    : "absolute top-0 left-0 grid size-8 place-items-center rounded-full border border-primary/50 bg-background font-mono text-xs text-primary-soft"
                }
              >
                {i + 1}
              </span>
              <p className="flex items-center gap-2 font-mono text-xs text-primary-soft">
                {step.index}
                {step.current ? (
                  <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[0.625rem] tracking-wide text-primary-soft">
                    em andamento
                  </span>
                ) : null}
              </p>
              <h3 className="mt-1.5 font-display text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
