import { engineering } from "@/data/portfolio";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function Engineering() {
  return (
    <section id="engenharia" className="scroll-mt-24 py-16 sm:py-24 lg:py-32">
      <div className="container-page">
        <Reveal>
          <SectionLabel>{engineering.label}</SectionLabel>
        </Reveal>

        <Reveal delay={60}>
          <h2 className="mt-8 max-w-2xl font-display text-3xl font-bold sm:text-4xl lg:text-5xl sm:mt-10">
            {engineering.title}
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">
            {engineering.description}
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5">
          {engineering.groups.map((group, i) => (
            <Reveal key={group.title} delay={i * 80}>
              <div className="card-hover-lift h-full rounded-2xl border border-border bg-surface p-5 sm:p-7">
                <h3 className="mono-label text-primary-soft">{group.title}</h3>
                <ul className="mt-4 space-y-3 sm:mt-5 sm:space-y-3.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary"
                      />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
