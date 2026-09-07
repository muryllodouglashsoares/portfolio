import { hero } from "@/data/portfolio";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 lg:pt-48 lg:pb-32">
      {/* halo ambiente */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] h-[42rem] w-[42rem] rounded-full opacity-40 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--primary) 55%, transparent), transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
              <span className="size-1.5 rounded-full bg-primary-soft" aria-hidden="true" />
              <span className="mono-label text-primary-soft">{hero.badge}</span>
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-8 font-display text-[2.75rem] leading-[1.05] font-bold sm:text-6xl">
              {hero.greeting}
              <br />
              <span className="text-primary-soft">{hero.name}</span>
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-5 font-display text-2xl leading-tight font-semibold text-muted-foreground sm:text-[2rem]">
              {hero.subtitle[0]}
              <br />
              <span className="text-foreground">{hero.subtitle[1]}</span>
            </p>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-7 max-w-lg leading-relaxed text-muted-foreground">
              {hero.description}
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href={hero.primaryCta.href}
                className="rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-bright"
              >
                {hero.primaryCta.label}
              </a>
              <a
                href={hero.secondaryCta.href}
                className="rounded-xl border border-border-strong bg-surface px-6 py-3.5 text-sm font-medium transition-colors hover:bg-surface-raised"
              >
                {hero.secondaryCta.label}
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-14">
              <p className="mono-label text-muted-foreground">{hero.techLabel}</p>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {hero.tech.map((t) => (
                  <li
                    key={t}
                    className="rounded-lg border border-border-strong bg-surface px-3 py-1.5 font-mono text-xs text-muted-foreground"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={180} className="relative mx-auto w-full max-w-md lg:max-w-none">
          {/* símbolo/halo roxo atrás do retrato */}
          <div
            aria-hidden="true"
            className="absolute inset-6 rounded-full opacity-70 blur-3xl"
            style={{
              background:
                "radial-gradient(circle at 50% 45%, color-mix(in oklab, var(--primary-bright) 60%, transparent), transparent 68%)",
            }}
          />

          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border-strong bg-surface">
            {hero.portraitSrc ? (
              <img
                src={hero.portraitSrc}
                alt={hero.portraitAlt}
                className="size-full object-cover object-top"
                width={1024}
                height={1280}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />

            ) : (
              <div className="flex size-full flex-col items-center justify-center gap-3 p-8 text-center">
                <span className="mono-label text-primary-soft">retrato editorial</span>
                <p className="max-w-[16rem] text-sm text-muted-foreground">
                  Placeholder do Hero. Substitua definindo{" "}
                  <code className="font-mono text-foreground">portraitSrc</code> em{" "}
                  <code className="font-mono text-foreground">src/data/portfolio.ts</code>.
                </p>
              </div>
            )}
          </div>

          <div className="absolute top-[14%] -left-3 rounded-lg border border-border-strong bg-background/90 px-3 py-2 font-mono text-xs backdrop-blur sm:-left-6">
            <span className="text-primary-soft">const </span>
            <span>dev</span>
            <span className="text-muted-foreground"> = </span>
            <span className="text-primary-soft">&quot;muryllo&quot;</span>
          </div>

          <div className="absolute right-0 bottom-[10%] flex items-center gap-2 rounded-lg border border-border-strong bg-background/90 px-3 py-2 font-mono text-xs backdrop-blur sm:-right-6">
            <span className="size-1.5 rounded-full bg-online" aria-hidden="true" />
            {hero.statusChip}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
