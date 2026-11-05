import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/use-motion";
import { ScrollProgress } from "./ScrollProgress";

const sectionIds = nav.map((item) => item.href.replace("/#", ""));
const MOBILE_MENU_ID = "menu-movel";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Com o menu aberto: Esc fecha (devolvendo o foco ao botão) e, ao girar/ampliar a tela
  // até o layout desktop (lg, onde o menu móvel some), o estado é resetado.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onChange);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onChange);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        open
          ? "border-b border-border bg-background/95 backdrop-blur-xl"
          : scrolled
            ? "border-b border-border bg-background/80 backdrop-blur-xl"
            : "bg-transparent",
      )}
    >
      <ScrollProgress />
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <a
          href="/#top"
          className="inline-flex min-h-11 shrink-0 items-center font-display text-base font-bold tracking-tight"
        >
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
                      "nav-link text-sm transition-colors before:absolute before:-inset-x-2 before:-inset-y-3.5",
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
            className="btn-press relative rounded-lg border border-border-strong bg-surface px-4 py-2 text-sm transition-colors before:absolute before:inset-x-0 before:-inset-y-1.5 hover:bg-surface-raised"
          >
            GitHub
          </a>
          <a
            href="/#contato"
            className="btn-press relative rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors before:absolute before:inset-x-0 before:-inset-y-1.5 hover:bg-primary-bright"
          >
            Contato
          </a>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls={open ? MOBILE_MENU_ID : undefined}
          className="btn-press grid size-11 shrink-0 place-items-center rounded-lg border border-border-strong bg-surface lg:hidden"
        >
          {open ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {open && (
        <div
          id={MOBILE_MENU_ID}
          className="max-h-[calc(100dvh-4rem)] animate-in overflow-y-auto overscroll-contain border-t border-border duration-200 fade-in slide-in-from-top-2 lg:hidden"
        >
          <nav aria-label="Navegação móvel" className="container-page py-4">
            <ul className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 items-center text-base text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => setOpen(false)}
                className="btn-press inline-flex min-h-12 items-center justify-center rounded-lg border border-border-strong bg-surface px-4 text-sm"
              >
                GitHub
              </a>
              <a
                href="/#contato"
                onClick={() => setOpen(false)}
                className="btn-press inline-flex min-h-12 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground"
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
