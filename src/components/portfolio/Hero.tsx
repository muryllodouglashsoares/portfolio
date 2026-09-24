import { hero } from "@/data/portfolio";
import { Reveal } from "./Reveal";
import { useMagnetic } from "@/hooks/use-motion";

/*
 * Céu da foto (hero-sunset-portrait.jpg): as bordas esquerda/direita são um degradê vertical
 * limpo, então basta reproduzi-lo em CSS para prolongar a foto para fora do quadro. Cada ponto
 * é a cor média das bordas naquela altura (% da altura da foto). Ao trocar a foto, amostre de
 * novo — o fundo do Hero é derivado dela, e não o contrário.
 */
const PORTRAIT_SKY = [
  "#3C2C5F 0%",
  "#442F65 8%",
  "#4C3168 16%",
  "#52346C 24%",
  "#5C376E 32%",
  "#68396F 40%",
  "#713D6E 48%",
  "#7B4070 55%",
  "#7B3F69 60%",
  "#793F63 64%",
  "#402640 68%",
  "#1C1320 72%",
  "#0C0A0D 76%",
  "var(--background) 100%",
].join(", ");

// Esmaece a extensão do céu, dos dois lados, de forma gradual
const SKY_FEATHER =
  "linear-gradient(to right, transparent 4%, rgb(0 0 0 / 0.08) 12%, rgb(0 0 0 / 0.3) 20%, rgb(0 0 0 / 0.65) 28%, rgb(0 0 0 / 0.92) 34%, black 40%, black 60%, rgb(0 0 0 / 0.92) 66%, rgb(0 0 0 / 0.65) 72%, rgb(0 0 0 / 0.3) 80%, rgb(0 0 0 / 0.08) 88%, transparent 96%)";

export function Hero() {
  const magneticRef = useMagnetic<HTMLAnchorElement>();

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-20 short:max-lg:pt-24 short:max-lg:pb-12 lg:pt-48 lg:pb-32"
    >
      {/* céu de fundo da seção */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #2F2248 0%, #38285A 22%, #452C60 38%, #4E2F62 52%, #45274F 62%, #21162A 76%, var(--background) 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, transparent 55%, var(--background) 92%)",
        }}
      />

      {/* halo ambiente */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-[-25%] size-[24rem] rounded-full opacity-30 blur-[80px] sm:-top-40 sm:right-[-10%] sm:size-[42rem] sm:blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--primary) 55%, transparent), transparent 70%)",
        }}
      />

      <div className="container-page relative isolate grid grid-cols-1 items-center gap-y-10 sm:gap-y-14 lg:grid-cols-[1.05fr_0.95fr] lg:grid-rows-[1fr_auto_auto_1fr] lg:gap-x-16 lg:gap-y-0">
        <div className="relative lg:col-start-1 lg:row-start-2">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
              <span className="size-1.5 rounded-full bg-primary-soft" aria-hidden="true" />
              <span className="mono-label text-primary-soft">{hero.badge}</span>
            </span>
          </Reveal>

          <Reveal delay={90} variant="mask">
            <h1 className="mt-6 font-display text-hero-title leading-[1.05] font-bold sm:mt-8">
              {hero.greeting}
              <br />
              <span className="text-primary-soft">{hero.name}</span>
            </h1>
          </Reveal>

          <Reveal delay={220} variant="mask">
            <p className="mt-4 font-display text-hero-subtitle leading-tight font-semibold text-muted-foreground sm:mt-5">
              {hero.subtitle[0]}
              <br />
              <span className="text-foreground">{hero.subtitle[1]}</span>
            </p>
          </Reveal>

          <Reveal delay={380}>
            <p className="mt-5 max-w-lg leading-relaxed text-muted-foreground sm:mt-7">
              {hero.description}
            </p>
          </Reveal>

          <Reveal delay={520}>
            <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:gap-4">
              <a
                ref={magneticRef}
                href={hero.primaryCta.href}
                className="magnetic btn-press shine-sweep inline-flex min-h-12 items-center justify-center rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-bright"
              >
                {hero.primaryCta.label}
              </a>

              <a
                href={hero.secondaryCta.href}
                className="btn-press inline-flex min-h-12 items-center justify-center rounded-xl border border-border-strong bg-surface px-6 py-3.5 text-sm font-medium transition-colors hover:bg-surface-raised"
              >
                {hero.secondaryCta.label}
              </a>
            </div>
          </Reveal>
        </div>

        <div className="relative mx-auto w-full max-w-[20rem] sm:max-w-md lg:col-start-2 lg:row-span-4 lg:row-start-1 lg:max-w-none">
          {/* prolongamento do céu da foto */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-y-[100vh] -inset-x-[70%] -z-20"
            style={{ WebkitMaskImage: SKY_FEATHER, maskImage: SKY_FEATHER }}
          >
            <div
              className="absolute inset-x-0 top-0 h-[100vh]"
              style={{ background: "linear-gradient(to top, #3C2C5F, #2F2248)" }}
            />

            <div
              className="absolute inset-x-0 top-[100vh] bottom-[100vh]"
              style={{ background: `linear-gradient(to bottom, ${PORTRAIT_SKY})` }}
            />

            <div className="absolute inset-x-0 bottom-0 h-[100vh] bg-background" />
          </div>

          {/* brilho do sol */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[29%] left-[53%] -z-10 size-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F9B35D] opacity-25 blur-3xl"
          />

          <Reveal delay={260} variant="scale" className="relative">
            {/* fotografia + chips flutuam juntos */}
            <div className="portrait-float relative">
              <div className="relative aspect-[4/5]">
                {hero.portraitSrc ? (
                  <>
                    <img
                      src={hero.portraitSrc}
                      alt={hero.portraitAlt}
                      className="size-full object-cover object-top"
                      style={{
                        maskImage:
                          "linear-gradient(to right, transparent 0%, black 22%, black 78%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 16%, black 68%, transparent 100%)",
                        WebkitMaskImage:
                          "linear-gradient(to right, transparent 0%, black 22%, black 78%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 16%, black 68%, transparent 100%)",
                        maskComposite: "intersect",
                        WebkitMaskComposite: "source-in, source-over",
                      }}
                      width={1024}
                      height={1280}
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                    />
                  </>
                ) : (
                  <div className="flex size-full flex-col items-center justify-center gap-3 rounded-3xl border border-border-strong bg-surface p-8 text-center">
                    <span className="mono-label text-primary-soft">
                      retrato editorial
                    </span>
                    <p className="max-w-[16rem] text-sm text-muted-foreground">
                      Placeholder do Hero. Substitua definindo{" "}
                      <code className="font-mono text-foreground">portraitSrc</code>{" "}
                      em{" "}
                      <code className="font-mono text-foreground">
                        src/data/portfolio.ts
                      </code>.
                    </p>
                  </div>
                )}
              </div>

              <div className="absolute top-[12%] -left-2 rounded-lg border border-border-strong bg-background/90 px-2.5 py-1.5 font-mono text-[0.6875rem] backdrop-blur sm:top-[14%] sm:-left-6 sm:px-3 sm:py-2 sm:text-xs">
                <span className="text-primary-soft">const </span>
                <span>dev</span>
                <span className="text-muted-foreground"> = </span>
                <span className="text-primary-soft">&quot;muryllo&quot;</span>
              </div>

              <div className="absolute right-0 bottom-[10%] flex items-center gap-2 rounded-lg border border-border-strong bg-background/90 px-2.5 py-1.5 font-mono text-[0.6875rem] backdrop-blur sm:-right-6 sm:px-3 sm:py-2 sm:text-xs">
                <span className="size-1.5 rounded-full bg-online" aria-hidden="true" />
                {hero.statusChip}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal
          delay={620}
          className="lg:col-start-1 lg:row-start-3 lg:mt-14 max-lg:delay-0!"
        >
          <p className="mono-label text-muted-foreground">{hero.techLabel}</p>

          <ul className="mt-4 flex flex-wrap gap-2 sm:gap-2.5">
            {hero.tech.map((t, i) => (
              <Reveal as="li" key={t} delay={40 + i * 40}>
                <span className="tech-tile block rounded-lg border border-border-strong bg-surface px-3 py-1.5 font-mono text-xs text-muted-foreground">
                  {t}
                </span>
              </Reveal>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* indicador de scroll */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center lg:flex"
      >
        <div className="flex flex-col items-center gap-3 opacity-70">
          <span className="mono-label text-muted-foreground">scroll</span>
          <span className="scroll-indicator-line" />
        </div>
      </div>
    </section>
  );
}
