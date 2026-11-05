import { ArrowUpRight, Github, MapPin } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { GITHUB_URL } from "@/data/projects";

export function Contact() {
  return (
    <section
      id="contato"
      className="scroll-mt-20 border-t border-border bg-surface py-20 md:py-28"
    >
      <div className="container-page">
        <SectionHeader
          eyebrow="Contato"
          title="Vamos conversar"
          description="Estou aberto a oportunidades de aprendizado, estágio e projetos em que eu possa contribuir e evoluir como desenvolvedor."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Reveal className="h-full">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex h-full flex-col justify-between rounded-lg border border-border bg-background p-6 transition-colors hover:border-border-strong"
            >
              <div>
                <Github className="size-5 text-primary" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">
                  GitHub
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  O caminho mais direto para falar comigo hoje: abra uma issue,
                  comente em um repositório ou acompanhe o que estou construindo.
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-foreground">
                Abrir perfil
                <ArrowUpRight
                  className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </span>
            </a>
          </Reveal>

          <Reveal delay={80} className="h-full">
            <div className="flex h-full flex-col justify-between rounded-lg border border-border bg-background p-6">
              <div>
                <MapPin className="size-5 text-primary" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">
                  Onde estou
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  João Pessoa, Paraíba — estudando no Instituto Federal da Paraíba
                  (IFPB), no Ensino Médio Integrado ao Técnico em Informática.
                </p>
              </div>
              <p className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Aberto a estágio e projetos
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
