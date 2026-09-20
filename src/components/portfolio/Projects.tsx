import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Github } from "lucide-react";

import { projects as projectsCopy } from "@/data/portfolio";
import { featuredProject, otherProjects, statusLabel, type Project } from "@/data/projects";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";
import { Tag } from "./Tag";
import { usePointerChip, useSpotlight } from "@/hooks/use-motion";
import { cn } from "@/lib/utils";

export function Projects() {
  const f = featuredProject;
  const spotlightRef = useSpotlight<HTMLElement>();

  return (
    <section id="projetos" className="scroll-mt-24 py-16 sm:py-24 lg:py-32">
      <div className="container-page">
        <Reveal>
          <SectionLabel>{projectsCopy.label}</SectionLabel>
        </Reveal>

        <Reveal delay={60}>
          <h2 className="mt-8 font-display text-3xl font-bold sm:mt-10 sm:text-4xl lg:text-5xl">
            {projectsCopy.title}
          </h2>
        </Reveal>

        {/* Projeto em destaque */}
        <Reveal delay={100} variant="scale">
          <article
            ref={spotlightRef}
            className="spotlight mt-10 grid grid-cols-1 gap-8 rounded-3xl border border-border bg-surface p-5 transition-colors duration-300 sm:mt-14 sm:gap-10 sm:p-8 lg:grid-cols-2 lg:gap-14 lg:p-10"
          >
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-sm text-muted-foreground">01</span>
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1">
                  <span className="size-1.5 rounded-full bg-primary-soft" aria-hidden="true" />
                  <span className="mono-label text-primary-soft">Featured Project</span>
                </span>
              </div>

              <h3 className="mt-4 font-display text-3xl font-bold sm:mt-5 sm:text-4xl">
                {f.title}
              </h3>
              <p className="mt-3 text-base text-primary-soft sm:text-lg">{f.description}</p>
              <p className="mt-4 leading-relaxed text-muted-foreground sm:mt-5">
                {f.longDescription}
              </p>

              <ul className="mt-5 flex flex-wrap gap-2 sm:mt-6 sm:gap-2.5">
                {f.technologies.map((t) => (
                  <li key={t}>
                    <Tag>{t}</Tag>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
                <Link
                  to="/projects/$slug"
                  params={{ slug: f.id }}
                  className="btn-press shine-sweep group inline-flex min-h-12 items-center justify-center gap-2 sm:min-h-11 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-bright"
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
                  className="btn-press inline-flex min-h-12 items-center justify-center gap-2 sm:min-h-11 rounded-xl border border-border-strong bg-surface-raised px-5 py-3 text-sm font-medium transition-colors hover:bg-accent"
                >
                  <Github className="size-4" aria-hidden="true" />
                  Repositório
                </a>
                {f.demoUrl ? (
                  <a
                    href={f.demoUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="btn-press inline-flex min-h-12 items-center justify-center gap-2 sm:min-h-11 rounded-xl border border-border-strong bg-surface-raised px-5 py-3 text-sm font-medium transition-colors hover:bg-accent"
                  >
                    Abrir aplicação
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            </div>

            <div className="space-y-4 sm:space-y-5">
              {f.problem ? (
                <div className="rounded-2xl border border-border bg-surface-raised/60 p-5 sm:p-6">
                  <h4 className="mono-label text-primary-soft">Problema</h4>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.problem}</p>
                </div>
              ) : null}
              {f.solution ? (
                <div className="rounded-2xl border border-border bg-surface-raised/60 p-5 sm:p-6">
                  <h4 className="mono-label text-primary-soft">Solução</h4>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.solution}</p>
                </div>
              ) : null}
              <div className="rounded-2xl border border-border bg-surface-raised/60 p-5 sm:p-6">
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
        <ul className="mt-4 grid grid-cols-1 gap-4 sm:mt-6 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {otherProjects.map((p, i) => (
            <Reveal as="li" key={p.id} delay={(i % 3) * 80}>
              <ProjectListCard project={p} index={i} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * Card de projeto (fora do destaque). Continua sendo, no fundo, um link normal
 * para a página de detalhes — funciona igual antes com teclado, toque e leitores de tela.
 *
 * Em desktop, com mouse e sem reduced motion, projetos com `demoUrl` ganham um badge
 * "Visualizar" que segue o cursor: como ele se reposiciona exatamente sobre o ponteiro,
 * um clique em qualquer ponto do card enquanto ele está visível abre o link de deploy
 * numa nova aba, em vez de navegar para a página de detalhes.
 */
function ProjectListCard({ project: p, index: i }: { project: Project; index: number }) {
  const { ref, pos, active } = usePointerChip<HTMLDivElement>();
  const showChip = active && Boolean(p.demoUrl);

  return (
    <div ref={ref} className={cn("relative h-full", showChip && "cursor-none")}>
      <Link
        to="/projects/$slug"
        params={{ slug: p.id }}
        className="card-hover-lift group flex h-full flex-col rounded-2xl border border-border bg-surface p-5 sm:p-7"
      >
        <div className="flex items-start justify-between gap-3">
          <span className="font-mono text-sm text-muted-foreground">
            {String(i + 2).padStart(2, "0")}
          </span>
          <Tag>{`${p.categories[0]}`}</Tag>
        </div>
        <h3 className="mt-4 font-display text-xl font-semibold sm:mt-5">{p.title}</h3>
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
          {statusLabel[p.status]}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
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

      {p.demoUrl ? (
        <a
          href={p.demoUrl}
          target="_blank"
          rel="noreferrer noopener"
          aria-hidden="true"
          tabIndex={-1}
          className="pointer-events-none absolute z-20 flex items-center gap-1.5 whitespace-nowrap rounded-full bg-primary px-4 py-2 font-mono text-xs font-medium uppercase tracking-[0.08em] text-primary-foreground shadow-lg transition-[opacity,transform] duration-150 ease-out"
          style={{
            left: pos.x,
            top: pos.y,
            transform: `translate(-50%, -50%) scale(${showChip ? 1 : 0.85})`,
            opacity: showChip ? 1 : 0,
            pointerEvents: showChip ? "auto" : "none",
          }}
        >
          Visualizar
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </a>
      ) : null}
    </div>
  );
}
