import { contact } from "@/data/portfolio";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function Contact() {
  return (
    <section id="contato" className="relative scroll-mt-24 py-24 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 h-[30rem] w-[40rem] -translate-x-1/2 rounded-full opacity-30 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--primary) 55%, transparent), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel>{contact.label}</SectionLabel>
        </Reveal>

        <div className="mx-auto mt-16 max-w-2xl text-center">
          <Reveal>
            <h2 className="font-display text-4xl leading-[1.1] font-bold sm:text-6xl">
              {contact.title[0]}
              <br />
              <span className="text-primary-soft">{contact.title[1]}</span>
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <p className="mx-auto mt-7 max-w-lg leading-relaxed text-muted-foreground">
              {contact.description}
            </p>
          </Reveal>

          <Reveal delay={140}>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {contact.actions.map((a) => (
                <a
                  key={a.label}
                  href={a.href}
                  {...(a.href.startsWith("http")
                    ? { target: "_blank", rel: "noreferrer noopener" }
                    : {})}
                  className={
                    a.primary
                      ? "rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-bright"
                      : "rounded-xl border border-border-strong bg-surface px-6 py-3.5 text-sm font-medium transition-colors hover:bg-surface-raised"
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
