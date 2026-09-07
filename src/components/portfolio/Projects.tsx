import { projects } from "@/data/portfolio";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";
import { Tag } from "./Tag";

export function Projects() {
  const f = projects.featured;

  return (
    <section id="projetos" className="scroll-mt-24 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel>{projects.label}</SectionLabel>
        </Reveal>

        <Reveal delay={60}>
          <h2 className="mt-10 font-display text-4xl font-bold sm:text-5xl">{projects.title}</h2>
        </Reveal>

        {/* Projeto em destaque */}
        <Reveal delay={100}>
          <article className="mt-14 grid grid-cols-1 gap-10 rounded-3xl border border-border bg-surface p-7 sm:p-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-sm text-muted-foreground">{f.index}</span>
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1">
                  <span className="size-1.5 rounded-full bg-primary-soft" aria-hidden="true" />
                  <span className="mono-label text-primary-soft">{f.badge}</span>
                </span>
              </div>

              <h3 className="mt-5 font-display text-4xl font-bold">{f.name}</h3>
              <p className="mt-3 text-lg text-primary-soft">{f.tagline}</p>
              <p className="mt-5 leading-relaxed text-muted-foreground">{f.description}</p>

              <ul className="mt-6 flex flex-wrap gap-2.5">
                {f.tags.map((t) => (
                  <li key={t}>
                    <Tag>{t}</Tag>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={f.primaryCta.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-bright"
                >
                  {f.primaryCta.label}
                </a>
                <a
                  href={f.secondaryCta.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded-xl border border-border-strong bg-surface-raised px-5 py-3 text-sm font-medium transition-colors hover:bg-accent"
                >
                  {f.secondaryCta.label}
                </a>
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-2xl border border-border bg-surface-raised/60 p-6">
                <h4 className="mono-label text-primary-soft">Problema</h4>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.problem}</p>
              </div>
              <div className="rounded-2xl border border-border bg-surface-raised/60 p-6">
                <h4 className="mono-label text-primary-soft">Solução</h4>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.solution}</p>
              </div>
              <div className="rounded-2xl border border-border bg-surface-raised/60 p-6">
                <h4 className="mono-label text-primary-soft">Destaques</h4>
                <ul className="mt-3 space-y-2">
                  {f.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-sm text-muted-foreground">
                      <span className="text-primary-soft" aria-hidden="true">
                        →
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </Reveal>

        {/* Demais projetos */}
        <ul className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.items.map((p, i) => (
            <Reveal as="li" key={p.name} delay={(i % 3) * 80}>
              <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-7 transition-colors hover:border-primary/40">
                <div className="flex items-start justify-between gap-3">
                  <span className="font-mono text-sm text-muted-foreground">{p.index}</span>
                  <Tag>{p.kind}</Tag>
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">{p.name}</h3>
                <p className="mt-2 text-sm text-primary-soft">{p.tagline}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                  {p.tags.map((t) => (
                    <li key={t}>
                      <Tag>{t}</Tag>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
