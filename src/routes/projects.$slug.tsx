import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getProject, statusLabel } from "@/data/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Projeto não encontrado — Muryllo Douglas" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { project } = loaderData;
    const title = `${project.title} — Projeto de Muryllo Douglas`;
    return {
      meta: [
        { title },
        { name: "description", content: project.description },
        { property: "og:title", content: title },
        { property: "og:description", content: project.description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(project.image
          ? [
              { property: "og:image", content: project.image },
              { name: "twitter:image", content: project.image },
            ]
          : []),
      ],
    };
  },
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20 md:pt-36 md:pb-28">
        <article className="container-page">
          <Link
            to="/"
            hash="projetos"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Voltar aos projetos
          </Link>

          <header className="mt-8 max-w-3xl">
            <p className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />
              {statusLabel[project.status]}
              <span aria-hidden="true">·</span>
              {project.categories.join(" / ")}
            </p>
            <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {project.longDescription}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-md border border-border-strong px-4 py-2.5 text-sm font-medium transition-colors hover:bg-card"
              >
                <Github className="size-4" aria-hidden="true" />
                Repositório
              </a>
              {project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Acessar demo
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              ) : null}
            </div>
          </header>

          {project.image ? (
            <div className="mt-12 overflow-hidden rounded-lg border border-border bg-surface">
              <img
                src={project.image}
                alt={`Tela principal do projeto ${project.title}`}
                className="w-full object-cover object-top"
              />
            </div>
          ) : null}

          <div className="mt-14 grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-start">
            <div className="space-y-10">
              {project.problem ? (
                <section>
                  <h2 className="text-2xl font-semibold">O problema</h2>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {project.problem}
                  </p>
                </section>
              ) : null}

              {project.solution ? (
                <section>
                  <h2 className="text-2xl font-semibold">A solução</h2>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {project.solution}
                  </p>
                </section>
              ) : null}

              <section>
                <h2 className="text-2xl font-semibold">O que o projeto faz</h2>
                <ul className="mt-4 space-y-3">
                  {project.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>

              {project.notes?.length ? (
                <section className="space-y-6">
                  <h2 className="text-2xl font-semibold">Decisões e aprendizados</h2>
                  {project.notes.map((note) => (
                    <div
                      key={note.heading}
                      className="rounded-lg border border-border bg-card p-6"
                    >
                      <h3 className="font-display text-base font-semibold tracking-tight">
                        {note.heading}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {note.body}
                      </p>
                    </div>
                  ))}
                </section>
              ) : null}
            </div>

            <aside className="rounded-lg border border-border bg-surface p-6 lg:sticky lg:top-28">
              <h2 className="eyebrow">Tecnologias</h2>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="rounded border border-border bg-background px-2.5 py-1 font-mono text-xs text-muted-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </aside>
          </div>

          {project.screenshots?.length ? (
            <section className="mt-16">
              <h2 className="text-2xl font-semibold">Telas do projeto</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {project.screenshots.map((shot) => (
                  <figure
                    key={shot.src}
                    className="overflow-hidden rounded-lg border border-border bg-surface"
                  >
                    <img
                      src={shot.src}
                      alt={`${project.title} — ${shot.caption}`}
                      loading="lazy"
                      className="w-full object-cover object-top"
                    />
                    <figcaption className="border-t border-border px-4 py-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground">
                      {shot.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          ) : null}
        </article>
      </main>
      <Footer />
    </div>
  );
}
