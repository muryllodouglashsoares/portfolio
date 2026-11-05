import { about } from "@/data/portfolio";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";
import { Tag } from "./Tag";
import { AnimatedStat } from "./AnimatedStat";

export function About() {
  return (
    <section id="sobre" className="scroll-mt-24 py-16 sm:py-24 lg:py-32">
      <div className="container-page">
        <Reveal>
          <SectionLabel>{about.label}</SectionLabel>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-10 sm:mt-12 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <h2 className="font-display text-3xl leading-[1.1] font-bold sm:text-4xl lg:text-5xl">
                {about.title[0]}
                <br />
                {about.title[1]}
                <br />
                <span className="text-primary-soft">{about.title[2]}</span>
              </h2>
            </Reveal>

            <div className="mt-6 space-y-4 text-muted-foreground sm:mt-8 sm:space-y-5">
              {about.paragraphs.map((p, i) => (
                <Reveal key={p} delay={i * 70}>
                  <p className="leading-relaxed">{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={120}>
              <ul className="mt-7 flex flex-wrap gap-2 sm:mt-9 sm:gap-2.5">
                {about.tags.map((t) => (
                  <li key={t}>
                    <Tag>{t}</Tag>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="flex flex-col gap-8 self-start sm:gap-10">
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

            <ul className="grid grid-cols-2 gap-3 sm:gap-5">
              {about.stats.map((s, i) => (
                <Reveal as="li" key={s.label} delay={i * 80} variant="scale">
                  <div className="card-hover-lift h-full rounded-2xl border border-border bg-surface p-4 sm:p-7">
                    <AnimatedStat value={s.value} />
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
