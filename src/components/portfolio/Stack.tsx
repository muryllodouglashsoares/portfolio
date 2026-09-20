import { stack } from "@/data/portfolio";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function Stack() {
  return (
    <section id="stack" className="scroll-mt-24 py-16 sm:py-24 lg:py-32">
      <div className="container-page">
        <Reveal>
          <SectionLabel>{stack.label}</SectionLabel>
        </Reveal>

        <Reveal delay={60}>
          <h2 className="mt-8 font-display text-3xl font-bold sm:text-4xl lg:text-5xl sm:mt-10">
            {stack.title}
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">{stack.subtitle}</p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {stack.groups.map((group, i) => (
            <Reveal key={group.title} delay={i * 80}>
              <div className="card-hover-lift h-full rounded-2xl border border-border bg-surface p-5 sm:p-6">
                <h3 className="mono-label text-primary-soft">{group.title}</h3>
                <ul className="mt-4 space-y-3 sm:mt-5 sm:space-y-4">
                  {group.items.map((item) => (
                    <li key={item.name} className="tech-tile -mx-2 rounded-lg px-2 py-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      {item.note && (
                        <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                          {item.note}
                        </p>
                      )}
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
