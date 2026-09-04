import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";

const stages = [
  {
    id: "01",
    key: "LEARN",
    title: "Fundamentos",
    body: "Fundamentos de programação e descoberta de diferentes áreas da tecnologia.",
  },
  {
    id: "02",
    key: "EXPLORE",
    title: "Exploração",
    body: "Exploração de linguagens, ferramentas e projetos experimentais.",
  },
  {
    id: "03",
    key: "BUILD",
    title: "Construção",
    body: "Criação de aplicações e projetos mais completos, do zero ao funcionamento.",
  },
  {
    id: "04",
    key: "SHIP",
    title: "Publicação",
    body: "Projetos com interfaces, funcionalidades, bancos de dados e deploy.",
  },
  {
    id: "05",
    key: "EVOLVE",
    title: "Evolução",
    body: "Aprofundamento contínuo e desenvolvimento de projetos maiores.",
  },
];

export function Journey() {
  return (
    <section className="border-t border-border py-20 md:py-28">
      <div className="container-page">
        <SectionHeader
          eyebrow="Minha jornada"
          title="Evoluindo através de projetos"
          description="Uma trajetória em construção, medida por etapas — não por anos de experiência."
        />

        <ol className="mt-14 relative">
          <div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[0.4375rem] w-px bg-border md:left-[calc(4.5rem+0.4375rem)]"
          />
          {stages.map((stage, i) => (
            <Reveal key={stage.id} delay={i * 90} as="li">
              <div className="group relative flex gap-6 pb-10 last:pb-0 md:gap-10">
                <span className="hidden w-[4.5rem] shrink-0 pt-0.5 text-right font-mono text-xs tracking-[0.2em] text-muted-foreground md:block">
                  {stage.id}
                </span>
                <span
                  aria-hidden="true"
                  className="relative z-10 mt-1.5 size-3.5 shrink-0 rounded-full border border-border-strong bg-background transition-colors duration-300 group-hover:border-primary group-hover:bg-primary"
                />
                <div className="pb-1">
                  <p className="font-mono text-[0.6875rem] tracking-[0.24em] text-primary">
                    <span className="md:hidden">{stage.id} · </span>
                    {stage.key}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold tracking-tight sm:text-2xl">
                    {stage.title}
                  </h3>
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
                    {stage.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
