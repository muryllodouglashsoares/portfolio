import { ArrowDown, ArrowUpRight } from "lucide-react";
import heroPhoto from "@/assets/muryllo-hero-photo.jpg";
import { GITHUB_URL } from "@/data/projects";

const markers = ["IFPB", "DEVELOPMENT", "PROJECTS", "TECHNOLOGY"];

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div
        aria-hidden="true"
        className="grid-backdrop pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(75%_60%_at_50%_0%,black,transparent)]"
      />

      <div className="container-page relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <p className="eyebrow flex flex-wrap items-center gap-2">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />
              Estudante de Informática
              <span aria-hidden="true" className="text-border-strong">
                •
              </span>
              Developer in progress
            </p>

            <h1 className="mt-6 font-display text-[2.6rem] leading-[1.03] font-semibold sm:text-6xl lg:text-[4.25rem]">
              Transformando
              <br />
              aprendizado em
              <br />
              <span className="relative inline-block">
                projetos reais
                <span aria-hidden="true" className="absolute inset-x-0 -bottom-1 h-px bg-primary" />
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Sou estudante de Informática e desenvolvedor em formação. Exploro tecnologias,
              construo projetos e transformo aprendizado em experiência prática.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#projetos"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5"
              >
                Explorar projetos
                <ArrowDown className="size-4" aria-hidden="true" />
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
              >
                GitHub
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Editorial photo composition */}
          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <span
              aria-hidden="true"
              className="absolute -top-6 -left-2 z-20 font-mono text-[0.625rem] tracking-[0.3em] text-muted-foreground lg:-left-10"
            >
              BUILD
            </span>
            <span
              aria-hidden="true"
              className="absolute top-1/2 -right-2 z-20 hidden -translate-y-1/2 rotate-90 font-mono text-[0.625rem] tracking-[0.3em] text-muted-foreground lg:-right-8 lg:block"
            >
              LEARN
            </span>
            <span
              aria-hidden="true"
              className="absolute -bottom-6 left-0 z-20 font-mono text-[0.625rem] tracking-[0.3em] text-primary"
            >
              EVOLVE
            </span>

            <div className="relative">
              <div aria-hidden="true" className="absolute -inset-3 border border-border" />
              <div className="relative aspect-4/5 overflow-hidden bg-surface">
                <img
                  src={heroPhoto}
                  alt="Muryllo Douglas"
                  width={614}
                  height={768}
                  fetchPriority="high"
                  className="size-full object-cover object-top"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-t from-background via-background/25 to-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        <ul className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border pt-6 md:mt-20">
          {markers.map((marker) => (
            <li
              key={marker}
              className="font-mono text-[0.6875rem] tracking-[0.22em] text-muted-foreground"
            >
              {marker}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
