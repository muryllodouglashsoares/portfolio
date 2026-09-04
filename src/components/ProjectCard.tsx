import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Github } from "lucide-react";
import { statusLabel, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

const statusDot: Record<Project["status"], string> = {
  "in-progress": "bg-primary",
  completed: "bg-foreground/60",
  experimental: "bg-muted-foreground/60",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors duration-300 hover:border-border-strong">
      <div className="relative aspect-16/10 overflow-hidden border-b border-border bg-surface">
        {project.image ? (
          <img
            src={project.image}
            alt={`Captura de tela do projeto ${project.title}`}
            loading="lazy"
            className="size-full object-cover object-top opacity-85 transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
          />
        ) : (
          <div className="grid-backdrop flex size-full items-center justify-center">
            <span className="font-display text-3xl font-semibold tracking-tight text-foreground/25">
              {project.title}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold tracking-tight">
            <Link
              to="/projects/$slug"
              params={{ slug: project.id }}
              className="after:absolute after:inset-0 after:content-['']"
            >
              {project.title}
            </Link>
          </h3>
          <span className="mt-1 flex shrink-0 items-center gap-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
            <span
              aria-hidden="true"
              className={cn("size-1.5 rounded-full", statusDot[project.status])}
            />
            {statusLabel[project.status]}
          </span>
        </div>

        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <li
              key={tech}
              className="rounded border border-border px-2 py-0.5 font-mono text-[0.6875rem] text-muted-foreground"
            >
              {tech}
            </li>
          ))}
          {project.technologies.length > 4 ? (
            <li className="px-1 py-0.5 font-mono text-[0.6875rem] text-muted-foreground">
              +{project.technologies.length - 4}
            </li>
          ) : null}
        </ul>

        <div className="relative z-10 mt-5 flex items-center gap-4 border-t border-border pt-4 text-sm">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="size-3.5" aria-hidden="true" />
            Código
          </a>
          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary"
            >
              Demo
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          ) : null}
          <Link
            to="/projects/$slug"
            params={{ slug: project.id }}
            className="ml-auto inline-flex items-center gap-1 text-foreground transition-colors group-hover:text-primary"
          >
            Detalhes
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
