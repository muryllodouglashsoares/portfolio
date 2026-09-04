import { Bot, GraduationCap, Palette, Users } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";

const items = [
  {
    icon: GraduationCap,
    title: "Ensino Médio Integrado",
    body: "Concilio as disciplinas do ensino médio com a formação técnica em Informática no IFPB — estudar e construir acontecem ao mesmo tempo.",
  },
  {
    icon: Bot,
    title: "Robótica educacional",
    body: "Participei da Mini Olimpíada de Robótica do IFPB, montando e programando um robô seguidor de linha em blocos e em Python.",
  },
  {
    icon: Users,
    title: "Trabalho em equipe",
    body: "Projetos acadêmicos me ensinaram a dividir tarefas, revisar o trabalho dos outros e defender decisões técnicas.",
  },
  {
    icon: Palette,
    title: "Interface e detalhe",
    body: "Gosto da parte visual: tipografia, espaçamento, animação discreta e acessibilidade fazem parte de como eu construo.",
  },
];

export function BeyondCode() {
  return (
    <section className="border-t border-border bg-surface py-20 md:py-28">
      <div className="container-page">
        <SectionHeader
          eyebrow="Além do código"
          title="O que também faz parte do caminho"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 70} className="h-full">
              <div className="flex h-full gap-4 rounded-lg border border-border bg-background p-6">
                <item.icon
                  className="mt-0.5 size-5 shrink-0 text-primary"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-display text-base font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
