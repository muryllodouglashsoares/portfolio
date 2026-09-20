import { site } from "@/data/portfolio";
import { Reveal } from "./Reveal";

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <Reveal>
        <div className="container-page flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-6">
          <a
            href="/#top"
            className="inline-flex min-h-11 items-center self-start lg:min-h-0 font-display text-base font-bold tracking-tight sm:self-auto"
          >
            {site.logo}
            <span className="text-primary-soft">.</span>
          </a>
          <p className="text-sm text-muted-foreground">{site.footer}</p>
        </div>
      </Reveal>
    </footer>
  );
}
