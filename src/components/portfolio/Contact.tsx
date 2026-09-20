import { contact } from "@/data/portfolio";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";
import { useMagnetic } from "@/hooks/use-motion";

export function Contact() {
  const magneticRef = useMagnetic<HTMLAnchorElement>();

  return (
    <section id="contato" className="relative scroll-mt-24 py-16 sm:py-24 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 h-[22rem] w-full max-w-[40rem] -translate-x-1/2 rounded-full opacity-30 blur-[100px] sm:h-[30rem] sm:blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--primary) 55%, transparent), transparent 70%)",
        }}
      />
      <div className="container-page relative">
        <Reveal>
          <SectionLabel>{contact.label}</SectionLabel>
        </Reveal>

        <div className="mx-auto mt-10 max-w-2xl text-center sm:mt-16">
          <Reveal>
            <h2 className="font-display text-3xl leading-[1.1] font-bold sm:text-5xl lg:text-6xl">
              {contact.title[0]}
              <br />
              <span className="text-primary-soft">{contact.title[1]}</span>
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <p className="mx-auto mt-5 max-w-lg leading-relaxed text-muted-foreground sm:mt-7">
              {contact.description}
            </p>
          </Reveal>

          <Reveal delay={140}>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:flex sm:flex-wrap sm:justify-center">
              {contact.actions.map((a) => (
                <a
                  key={a.label}
                  ref={a.primary ? magneticRef : undefined}
                  href={a.href}
                  {...(a.href.startsWith("http")
                    ? { target: "_blank", rel: "noreferrer noopener" }
                    : {})}
                  className={
                    a.primary
                      ? "magnetic btn-press shine-sweep col-span-2 inline-flex min-h-12 items-center justify-center rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-bright sm:col-auto"
                      : "btn-press inline-flex min-h-12 items-center justify-center rounded-xl border border-border-strong bg-surface px-6 py-3.5 text-sm font-medium transition-colors hover:bg-surface-raised"
                  }
                >
                  {a.label}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
