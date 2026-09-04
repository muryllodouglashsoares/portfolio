import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { projects } from "@/data/projects";

const groups: { label: string; items: string[] }[] = [
  {
    label: "Linguagens",
    items: ["TypeScript", "JavaScript", "Python", "HTML5", "CSS3"],
  },
  {
    label: "Front-end",
    items: [
      "React 18 / 19",
      "TanStack Start",
      "React Router",
      "Tailwind CSS",
      "shadcn/ui",
      "Motion / Framer Motion",
      "Vite",
    ],
  },
  {
    label: "Back-end e dados",
    items: [
      "Firebase Auth",
      "Cloud Firestore",
      "Realtime Database",
      "Firestore Rules",
      "Server functions",
    ],
  },
  {
    label: "Qualidade e deploy",
    items: [
      "Vitest",
      "Zod",
      "React Hook Form",
      "Cloudflare Workers",
      "GitHub Pages",
      "GitHub Actions",
    ],
  },
  {
    label: "Outros",
    items: ["LEGO Spike Prime", "Programação em blocos", "Automação com Make"],
  },
];

export function Technologies() {
  const used = new Set(projects.flatMap((p) => p.technologies));

  return (
    <section
      id="tecnologias"
      className="scroll-mt-20 border-t border-border py-20 md:py-28"
    >
      <div className="container-page">
        <SectionHeader
          eyebrow="Stack"
          title="Tecnologias que já usei em projetos"
          description="Sem barras de porcentagem nem níveis inventados — cada item desta lista aparece em pelo menos um projeto publicado."
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group, i) => (
            <Reveal key={group.label} delay={i * 60} className="h-full">
              <div className="h-full bg-background p-6">
                <h3 className="eyebrow">{group.label}</h3>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded border border-border bg-card px-2.5 py-1 font-mono text-xs text-muted-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
          <Reveal delay={300} className="h-full">
            <div className="h-full bg-background p-6">
              <h3 className="eyebrow">Em números reais</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {projects.length} projetos documentados neste portfólio e{" "}
                {used.size} tecnologias diferentes registradas neles.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
