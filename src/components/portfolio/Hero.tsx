import { hero } from "@/data/portfolio";
import { Reveal } from "./Reveal";
import { useMagnetic } from "@/hooks/use-motion";

export function Hero() {
  const magneticRef = useMagnetic<HTMLAnchorElement>();

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 lg:pt-48 lg:pb-32">
      {/* céu do pôr do sol da foto, esticado como fundo de toda a tela inicial */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #34254E 0%, #4B3168 20%, #6B3B72 40%, #5A2F58 58%, #241729 78%, var(--background) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 78% 34%, #F9B35D, transparent 60%), radial-gradient(ellipse 70% 60% at 78% 30%, #C6598F, transparent 70%)",
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

      {/* halo ambiente — reforço extra próximo dos elementos gráficos */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] h-[42rem] w-[42rem] rounded-full opacity-30 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--primary) 55%, transparent), transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="relative">
          {/* painel com blur atrás do bloco de texto, para manter a leitura sobre o céu colorido */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-8 -inset-y-14 -z-10 backdrop-blur-2xl"
            style={{
              WebkitMaskImage:
                "radial-gradient(ellipse 78% 82% at 38% 50%, black 45%, transparent 100%)",
              maskImage: "radial-gradient(ellipse 78% 82% at 38% 50%, black 45%, transparent 100%)",
              background: "color-mix(in oklab, var(--background) 38%, transparent)",
            }}
          />
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
              <span className="size-1.5 rounded-full bg-primary-soft" aria-hidden="true" />
              <span className="mono-label text-primary-soft">{hero.badge}</span>
            </span>
          </Reveal>

          <Reveal delay={90} variant="mask">
            <h1 className="mt-8 font-display text-[2.75rem] leading-[1.05] font-bold sm:text-6xl">
              {hero.greeting}
              <br />
              <span className="text-primary-soft">{hero.name}</span>
            </h1>
          </Reveal>

          <Reveal delay={220} variant="mask">
            <p className="mt-5 font-display text-2xl leading-tight font-semibold text-muted-foreground sm:text-[2rem]">
              {hero.subtitle[0]}
              <br />
              <span className="text-foreground">{hero.subtitle[1]}</span>
            </p>
          </Reveal>

          <Reveal delay={380}>
            <p className="mt-7 max-w-lg leading-relaxed text-muted-foreground">
              {hero.description}
            </p>
          </Reveal>

          <Reveal delay={520}>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                ref={magneticRef}
                href={hero.primaryCta.href}
                className="magnetic btn-press shine-sweep rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-bright"
              >
                {hero.primaryCta.label}
              </a>
              <a
                href={hero.secondaryCta.href}
                className="btn-press rounded-xl border border-border-strong bg-surface px-6 py-3.5 text-sm font-medium transition-colors hover:bg-surface-raised"
              >
                {hero.secondaryCta.label}
              </a>
            </div>
          </Reveal>

          <Reveal delay={620}>
            <div className="mt-14">
              <p className="mono-label text-muted-foreground">{hero.techLabel}</p>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {hero.tech.map((t, i) => (
                  <Reveal as="li" key={t} delay={40 + i * 40}>
                    <span className="tech-tile block rounded-lg border border-border-strong bg-surface px-3 py-1.5 font-mono text-xs text-muted-foreground">
                      {t}
                    </span>
                  </Reveal>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={260} variant="scale" className="relative mx-auto w-full max-w-md lg:max-w-none">
          {/* halo do pôr do sol atrás do retrato — cada camada reproduz a tonalidade
              da região correspondente na própria foto (índigo no topo, magenta no
              meio, dourado onde fica o sol), como se o céu vazasse para fora do quadro */}
          <div
            aria-hidden="true"
            className="absolute -inset-10 rounded-[3rem] opacity-60 blur-3xl"
            style={{
              background: "radial-gradient(ellipse at 50% 18%, #4B3374, transparent 62%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute -inset-8 rounded-[3rem] opacity-70 blur-3xl"
            style={{
              background: "radial-gradient(circle at 50% 32%, #F9B35D, transparent 55%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute -inset-10 rounded-[3rem] opacity-55 blur-3xl"
            style={{
              background: "radial-gradient(ellipse at 50% 68%, #8B3F80, transparent 65%)",
            }}
          />

          {/* fotografia + chips flutuam juntos, num ciclo longo e quase imperceptível */}
          <div className="portrait-float relative">
            <div className="relative aspect-[4/5]">
              {hero.portraitSrc ? (
                <>
                  <img
                    src={hero.portraitSrc}
                    alt={hero.portraitAlt}
                    className="size-full object-cover object-top"
                    style={{
                      filter: "contrast(0.82) brightness(0.92) saturate(0.88)",
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
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      mixBlendMode: "soft-light",
                      background:
                        "linear-gradient(to bottom, #4B3168 0%, #6B3B72 35%, #5A2F58 65%, #241729 100%)",
                      maskImage:
                        "linear-gradient(to right, transparent 0%, black 22%, black 78%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 16%, black 68%, transparent 100%)",
                      WebkitMaskImage:
                        "linear-gradient(to right, transparent 0%, black 22%, black 78%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 16%, black 68%, transparent 100%)",
                      maskComposite: "intersect",
                      WebkitMaskComposite: "source-in, source-over",
                    }}
                  />
                </>
              ) : (
                <div className="flex size-full flex-col items-center justify-center gap-3 rounded-3xl border border-border-strong bg-surface p-8 text-center">
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
          </div>
        </Reveal>
      </div>

      {/* indicador de scroll — sugere que há mais conteúdo abaixo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center sm:flex"
      >
        <div className="flex flex-col items-center gap-3 opacity-70">
          <span className="mono-label text-muted-foreground">scroll</span>
          <span className="scroll-indicator-line" />
        </div>
      </div>
    </section>
  );
}
