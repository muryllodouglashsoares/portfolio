import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/use-motion";
import { ScrollProgress } from "./ScrollProgress";

const sectionIds = nav.map((item) => item.href.replace("/#", ""));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "border-b border-border bg-background/80 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <ScrollProgress />
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="/#top" className="shrink-0 font-display text-base font-bold tracking-tight">
          {site.logo}
          <span className="text-primary-soft">.</span>
        </a>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => {
              const id = item.href.replace("/#", "");
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    data-active={activeSection === id}
                    className={cn(
                      "nav-link text-sm transition-colors",
                      activeSection === id
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-press rounded-lg border border-border-strong bg-surface px-4 py-2 text-sm transition-colors hover:bg-surface-raised"
          >
            GitHub
          </a>
          <a
            href="/#contato"
            className="btn-press rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-bright"
          >
            Contato
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          className="btn-press grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-border-strong bg-surface lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl lg:hidden">
          <nav aria-label="Navegação móvel" className="mx-auto max-w-6xl px-5 py-4 sm:px-8">
            <ul className="flex flex-col">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-base text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex gap-3">
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-press flex-1 rounded-lg border border-border-strong bg-surface px-4 py-3 text-center text-sm"
              >
                GitHub
              </a>
              <a
                href="/#contato"
                onClick={() => setOpen(false)}
                className="btn-press flex-1 rounded-lg bg-primary px-4 py-3 text-center text-sm font-medium text-primary-foreground"
              >
                Contato
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
