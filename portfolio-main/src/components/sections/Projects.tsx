import { useMemo, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { categories, otherProjects } from "@/data/projects";
import { cn } from "@/lib/utils";

export function Projects() {
  const [active, setActive] = useState<string>("Todos");

  const filters = useMemo(() => ["Todos", ...categories], []);
  const visible = useMemo(
    () =>
      active === "Todos"
        ? otherProjects
        : otherProjects.filter((p) =>
            p.categories.includes(active as (typeof categories)[number]),
          ),
    [active],
  );

  return (
    <section
      id="projetos"
      className="scroll-mt-20 border-t border-border bg-surface py-20 md:py-28"
    >
      <div className="container-page">
        <SectionHeader
          eyebrow="Projetos"
          title="Outros projetos"
          description="Tudo o que está aqui existe de verdade: código público no GitHub e, quando há, demo no ar."
        />

        <Reveal className="mt-8 flex flex-wrap gap-2" delay={60}>
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              aria-pressed={active === filter}
              className={cn(
                "rounded-md border px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] transition-colors",
                active === filter
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border text-muted-foreground hover:border-border-strong hover:text-foreground",
              )}
            >
              {filter}
            </button>
          ))}
        </Reveal>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, i) => (
            <Reveal key={project.id} delay={i * 60}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
