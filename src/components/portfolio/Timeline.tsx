import { timeline } from "@/data/portfolio";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function Timeline() {
  return (
    <section id="trajetoria" className="scroll-mt-24 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel>{timeline.label}</SectionLabel>
        </Reveal>

        <Reveal delay={60}>
          <h2 className="mt-10 font-display text-4xl font-bold sm:text-5xl">{timeline.title}</h2>
        </Reveal>

        <ol className="relative mt-14 space-y-12">
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-4 w-px bg-gradient-to-b from-primary/60 via-primary/25 to-transparent"
          />
          {timeline.steps.map((step, i) => (
            <Reveal as="li" key={step.index} delay={i * 70} className="relative pl-16">
              <span className="absolute top-0 left-0 grid size-8 place-items-center rounded-full border border-primary/50 bg-background font-mono text-xs text-primary-soft">
                {i + 1}
              </span>
              <p className="font-mono text-xs text-primary-soft">{step.index}</p>
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
