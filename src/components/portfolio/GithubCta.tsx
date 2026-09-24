import { githubSection } from "@/data/portfolio";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function GithubCta() {
  return (
    <section id="github" className="py-8 sm:py-12 lg:py-20">
      <div className="container-page">
        <Reveal>
          <div className="card-hover-lift relative overflow-hidden rounded-3xl border border-border bg-surface p-6 sm:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full opacity-40 blur-[100px]"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in oklab, var(--primary) 60%, transparent), transparent 70%)",
              }}
            />
            <div className="relative grid grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <SectionLabel>{githubSection.label}</SectionLabel>
                <h2 className="mt-4 font-display text-2xl font-bold sm:mt-5 sm:text-4xl">
                  {githubSection.title}
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {githubSection.description[0]}
                  <br className="hidden sm:block" /> {githubSection.description[1]}
                </p>
              </div>
              <a
                href={githubSection.cta.href}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-press shine-sweep inline-flex min-h-12 items-center justify-center rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-bright sm:justify-self-start lg:justify-self-end"
              >
                {githubSection.cta.label}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
