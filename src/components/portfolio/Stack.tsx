import { stack } from "@/data/portfolio";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function Stack() {
  return (
    <section id="stack" className="scroll-mt-24 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel>{stack.label}</SectionLabel>
        </Reveal>

        <Reveal delay={60}>
          <h2 className="mt-10 font-display text-4xl font-bold sm:text-5xl">{stack.title}</h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stack.groups.map((group, i) => (
            <Reveal key={group.title} delay={i * 80}>
              <div className="h-full rounded-2xl border border-border bg-surface p-6">
                <h3 className="mono-label text-primary-soft">{group.title}</h3>
                <ul className="mt-5 space-y-4">
                  {group.items.map((item) => (
                    <li key={item.name}>
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
