import { ArrowUpRight, Github } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { GITHUB_URL, GITHUB_USER, projects } from "@/data/projects";

export function GitHubSection() {
  return (
    <section className="border-t border-border py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <div className="grid-backdrop overflow-hidden rounded-lg border border-border bg-surface">
            <div className="grid gap-8 p-8 md:grid-cols-[1.4fr_1fr] md:items-center md:p-12">
              <div>
                <p className="eyebrow flex items-center gap-3">
                  <span aria-hidden="true" className="inline-block h-px w-6 bg-primary" />
                  GitHub
                </p>
                <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                  Todo o código está público
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                  Nada aqui é apenas descrição: os {projects.length} projetos deste
                  portfólio têm repositório aberto, com README, histórico de commits
                  e, em vários casos, demo publicada.
                </p>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <Github className="size-4" aria-hidden="true" />
                  Ver perfil no GitHub
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </div>

              <div className="rounded-lg border border-border bg-background p-6">
                <p className="font-mono text-xs text-muted-foreground">
                  github.com/
                  <span className="text-foreground">{GITHUB_USER}</span>
                </p>
                <dl className="mt-6 space-y-4">
                  <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
                    <dt className="text-sm text-muted-foreground">
                      Projetos no portfólio
                    </dt>
                    <dd className="font-display text-xl font-semibold">
                      {projects.length}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
                    <dt className="text-sm text-muted-foreground">Com demo no ar</dt>
                    <dd className="font-display text-xl font-semibold">
                      {projects.filter((p) => p.demoUrl).length}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-sm text-muted-foreground">
                      Em desenvolvimento
                    </dt>
                    <dd className="font-display text-xl font-semibold">
                      {projects.filter((p) => p.status === "in-progress").length}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
