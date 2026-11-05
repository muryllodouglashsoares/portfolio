import { Blocks, Compass, Rocket, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";

const blocks = [
  {
    icon: Blocks,
    title: "Projetos reais",
    body: "Transformando conhecimento em aplicações práticas, com código publicado e no ar.",
  },
  {
    icon: Compass,
    title: "Exploração",
    body: "Experimentando tecnologias, ferramentas e diferentes áreas da programação.",
  },
  {
    icon: TrendingUp,
    title: "Evolução",
    body: "Cada projeto representa uma nova etapa da minha jornada como desenvolvedor.",
  },
  {
    icon: Rocket,
    title: "Tecnologia com propósito",
    body: "Buscando usar software para criar soluções úteis, não apenas demonstrações.",
  },
];

export function Building() {
  return (
    <section className="border-t border-border bg-surface py-20 md:py-28">
      <div className="container-page">
        <SectionHeader
          eyebrow="Foco atual"
          title="O que estou construindo"
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {blocks.map((block, i) => (
            <Reveal key={block.title} delay={i * 80}>
              <div className="group h-full bg-background p-6 transition-colors duration-300 hover:bg-card">
                <block.icon
                  className="size-5 text-primary"
                  aria-hidden="true"
                  strokeWidth={1.5}
                />
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">
                  {block.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {block.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
