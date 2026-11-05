import illustration from "@/assets/muryllo-illustration.png";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";

const paragraphs = [
  "Sou estudante de Informática no IFPB, cursando o Ensino Médio Integrado ao Técnico, e desenvolvedor em formação.",
  "Minha trajetória é construída através da curiosidade e da prática. Gosto de aprender novas tecnologias e transformar esse aprendizado em projetos que funcionam de verdade.",
  "Tenho interesse em desenvolvimento de software, aplicações web, automação, robótica e soluções digitais.",
  "Hoje meu foco é construir projetos cada vez mais completos e desenvolver uma base sólida como programador.",
];

export function About() {
  return (
    <section id="sobre" className="scroll-mt-20 border-t border-border py-20 md:py-28">
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <div className="relative mx-auto max-w-xs lg:max-w-sm">
              <div
                aria-hidden="true"
                className="grid-backdrop absolute inset-0 translate-x-4 translate-y-4 border border-border"
              />
              <img
                src={illustration}
                alt="Ilustração editorial de Muryllo Douglas"
                width={1024}
                height={1024}
                loading="lazy"
                className="relative w-full"
              />
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <SectionHeader eyebrow="Sobre mim" title="Quem está construindo" />
            <div className="mt-6 space-y-4">
              {paragraphs.map((text, i) => (
                <Reveal key={text} delay={i * 70}>
                  <p className="max-w-xl leading-relaxed text-muted-foreground">
                    {text}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={200}>
              <dl className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
                {[
                  { term: "Instituição", value: "IFPB" },
                  { term: "Curso", value: "Técnico em Informática" },
                  { term: "Base", value: "João Pessoa, PB" },
                ].map((item) => (
                  <div key={item.term} className="bg-card p-4">
                    <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground">
                      {item.term}
                    </dt>
                    <dd className="mt-1.5 text-sm font-medium">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
