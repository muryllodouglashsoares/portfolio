import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Github } from "lucide-react";

import { projects as projectsCopy } from "@/data/portfolio";
import { featuredProject, otherProjects, statusLabel } from "@/data/projects";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";
import { Tag } from "./Tag";
import { useSpotlight } from "@/hooks/use-motion";

export function Projects() {
  const f = featuredProject;
  const spotlightRef = useSpotlight<HTMLElement>();

  return (
    <section id="projetos" className="scroll-mt-24 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel>{projectsCopy.label}</SectionLabel>
        </Reveal>

        <Reveal delay={60}>
          <h2 className="mt-10 font-display text-4xl font-bold sm:text-5xl">
            {projectsCopy.title}
          </h2>
        </Reveal>

        {/* Projeto em destaque */}
        <Reveal delay={100} variant="scale">
          <article
            ref={spotlightRef}
            className="spotlight mt-14 grid grid-cols-1 gap-10 rounded-3xl border border-border bg-surface p-7 transition-colors duration-300 sm:p-10 lg:grid-cols-2 lg:gap-14"
          >
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-sm text-muted-foreground">01</span>
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1">
                  <span className="size-1.5 rounded-full bg-primary-soft" aria-hidden="true" />
                  <span className="mono-label text-primary-soft">Featured Project</span>
                </span>
              </div>

              <h3 className="mt-5 font-display text-4xl font-bold">{f.title}</h3>
              <p className="mt-3 text-lg text-primary-soft">{f.description}</p>
              <p className="mt-5 leading-relaxed text-muted-foreground">{f.longDescription}</p>

              <ul className="mt-6 flex flex-wrap gap-2.5">
                {f.technologies.map((t) => (
                  <li key={t}>
                    <Tag>{t}</Tag>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/projects/$slug"
                  params={{ slug: f.id }}
                  className="btn-press shine-sweep group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-bright"
                >
                  Ver detalhes técnicos
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
                <a
                  href={f.githubUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-press inline-flex items-center gap-2 rounded-xl border border-border-strong bg-surface-raised px-5 py-3 text-sm font-medium transition-colors hover:bg-accent"
                >
                  <Github className="size-4" aria-hidden="true" />
                  Repositório
                </a>
                {f.demoUrl ? (
                  <a
                    href={f.demoUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="btn-press inline-flex items-center gap-2 rounded-xl border border-border-strong bg-surface-raised px-5 py-3 text-sm font-medium transition-colors hover:bg-accent"
                  >
                    Abrir aplicação
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            </div>

            <div className="space-y-5">
              {f.problem ? (
                <div className="rounded-2xl border border-border bg-surface-raised/60 p-6">
                  <h4 className="mono-label text-primary-soft">Problema</h4>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.problem}</p>
                </div>
              ) : null}
              {f.solution ? (
                <div className="rounded-2xl border border-border bg-surface-raised/60 p-6">
                  <h4 className="mono-label text-primary-soft">Solução</h4>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.solution}</p>
                </div>
              ) : null}
              <div className="rounded-2xl border border-border bg-surface-raised/60 p-6">
                <h4 className="mono-label text-primary-soft">Destaques</h4>
                <ul className="mt-3 space-y-2">
                  {f.features.slice(0, 4).map((h) => (
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
          {otherProjects.map((p, i) => (
            <Reveal as="li" key={p.id} delay={(i % 3) * 80}>
              <Link
                to="/projects/$slug"
                params={{ slug: p.id }}
                className="card-hover-lift group flex h-full flex-col rounded-2xl border border-border bg-surface p-7"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="font-mono text-sm text-muted-foreground">
                    {String(i + 2).padStart(2, "0")}
                  </span>
                  <Tag>{`${p.categories[0]}`}</Tag>
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
                  {statusLabel[p.status]}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                  {p.technologies.slice(0, 5).map((t) => (
                    <li key={t}>
                      <Tag>{t}</Tag>
                    </li>
                  ))}
                </ul>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary-soft">
                  Ver detalhes técnicos
                  <ArrowRight
                    className="size-3.5 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
