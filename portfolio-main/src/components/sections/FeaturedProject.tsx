import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Github } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { featuredProject, statusLabel } from "@/data/projects";

export function FeaturedProject() {
  const p = featuredProject;

  return (
    <section
      id="destaque"
      className="scroll-mt-20 border-t border-border py-20 md:py-28"
    >
      <div className="container-page">
        <SectionHeader
          eyebrow="Projeto em destaque"
          title={p.title}
          description={p.longDescription}
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <Reveal className="order-2 lg:order-1">
            <div className="overflow-hidden rounded-lg border border-border bg-surface">
              {p.image ? (
                <img
                  src={p.image}
                  alt={`Tela principal da plataforma ${p.title}`}
                  loading="lazy"
                  className="w-full object-cover object-top"
                />
              ) : null}
            </div>

            {p.screenshots?.length ? (
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {p.screenshots.slice(0, 3).map((shot) => (
                  <figure
                    key={shot.src}
                    className="overflow-hidden rounded border border-border bg-surface"
                  >
                    <img
                      src={shot.src}
                      alt={`${p.title} — ${shot.caption}`}
                      loading="lazy"
                      className="aspect-16/10 w-full object-cover object-top opacity-85"
                    />
                    <figcaption className="border-t border-border px-2.5 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
                      {shot.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : null}
          </Reveal>

          <Reveal delay={80} className="order-1 lg:order-2">
            <p className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-primary"
              />
              {statusLabel[p.status]}
            </p>

            {p.problem ? (
              <div className="mt-6">
                <h3 className="font-display text-base font-semibold">O problema</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.problem}
                </p>
              </div>
            ) : null}

            {p.solution ? (
              <div className="mt-6">
                <h3 className="font-display text-base font-semibold">A solução</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.solution}
                </p>
              </div>
            ) : null}

            <ul className="mt-6 flex flex-wrap gap-1.5">
              {p.technologies.map((tech) => (
                <li
                  key={tech}
                  className="rounded border border-border px-2 py-0.5 font-mono text-[0.6875rem] text-muted-foreground"
                >
                  {tech}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/projects/$slug"
                params={{ slug: p.id }}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Ver detalhes
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
              {p.demoUrl ? (
                <a
                  href={p.demoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-md border border-border-strong px-4 py-2.5 text-sm font-medium transition-colors hover:bg-card"
                >
                  Acessar demo
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              ) : null}
              <a
                href={p.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 px-1 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Github className="size-4" aria-hidden="true" />
                Código
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
