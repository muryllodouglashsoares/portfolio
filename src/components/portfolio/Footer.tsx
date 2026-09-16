import { site } from "@/data/portfolio";
import { Reveal } from "./Reveal";

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <Reveal>
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 sm:flex-row sm:items-center sm:gap-6 sm:px-8">
          <a href="/#top" className="font-display text-base font-bold tracking-tight">
            {site.logo}
            <span className="text-primary-soft">.</span>
          </a>
          <p className="text-sm text-muted-foreground">{site.footer}</p>
        </div>
      </Reveal>
    </footer>
  );
}
