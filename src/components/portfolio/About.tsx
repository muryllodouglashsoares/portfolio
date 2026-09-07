import { about } from "@/data/portfolio";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";
import { Tag } from "./Tag";

export function About() {
  return (
    <section id="sobre" className="scroll-mt-24 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel>{about.label}</SectionLabel>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <h2 className="font-display text-4xl leading-[1.1] font-bold sm:text-5xl">
                {about.title[0]}
                <br />
                {about.title[1]}
                <br />
                <span className="text-primary-soft">{about.title[2]}</span>
              </h2>
            </Reveal>

            <div className="mt-8 space-y-5 text-muted-foreground">
              {about.paragraphs.map((p, i) => (
                <Reveal key={p} delay={i * 70}>
                  <p className="leading-relaxed">{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={120}>
              <ul className="mt-9 flex flex-wrap gap-2.5">
                {about.tags.map((t) => (
                  <li key={t}>
                    <Tag>{t}</Tag>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="flex flex-col gap-10 self-start">
            <Reveal
              delay={60}
              className="relative mx-auto w-full max-w-[220px] sm:max-w-[260px] lg:mx-0 lg:ml-auto"
            >
              {/* halo roxo, no mesmo espírito do Hero */}
              <div
                aria-hidden="true"
                className="absolute inset-6 rounded-full opacity-60 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle at 50% 40%, color-mix(in oklab, var(--primary-bright) 55%, transparent), transparent 70%)",
                }}
              />
              <img
                src={about.illustrationSrc}
                alt={about.illustrationAlt}
                width={720}
                height={717}
                loading="lazy"
                decoding="async"
                className="illustration-float relative w-full drop-shadow-[0_20px_45px_rgba(0,0,0,0.35)]"
              />
            </Reveal>

            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {about.stats.map((s, i) => (
                <Reveal as="li" key={s.label} delay={i * 80}>
                  <div className="h-full rounded-2xl border border-border bg-surface p-7">
                    <p className="font-display text-4xl font-bold text-primary-soft">{s.value}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
