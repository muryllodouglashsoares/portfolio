import { engineering } from "@/data/portfolio";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function Engineering() {
  return (
    <section id="engenharia" className="scroll-mt-24 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel>{engineering.label}</SectionLabel>
        </Reveal>

        <Reveal delay={60}>
          <h2 className="mt-10 max-w-2xl font-display text-4xl font-bold sm:text-5xl">
            {engineering.title}
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">
            {engineering.description}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {engineering.groups.map((group, i) => (
            <Reveal key={group.title} delay={i * 80}>
              <div className="h-full rounded-2xl border border-border bg-surface p-6 sm:p-7">
                <h3 className="mono-label text-primary-soft">{group.title}</h3>
                <ul className="mt-5 space-y-3.5">
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
