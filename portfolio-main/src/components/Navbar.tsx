import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { GITHUB_URL } from "@/data/projects";

const links = [
  { label: "Início", href: "/#inicio" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Projetos", href: "/#projetos" },
  { label: "Tecnologias", href: "/#tecnologias" },
  { label: "Contato", href: "/#contato" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <Link
          to="/"
          className="group flex items-baseline gap-2 font-display text-sm font-semibold tracking-tight"
          aria-label="Muryllo Douglas — início"
        >
          <span className="text-foreground">MD</span>
          <span className="text-primary transition-opacity group-hover:opacity-70">
            .
          </span>
          <span className="hidden text-xs font-normal text-muted-foreground sm:inline">
            Muryllo Douglas
          </span>
        </Link>

        <nav aria-label="Navegação principal" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative text-sm text-muted-foreground transition-colors hover:text-foreground after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="hidden items-center gap-1.5 rounded-md border border-border px-3.5 py-2 text-sm text-foreground transition-colors hover:border-primary hover:text-primary md:inline-flex"
          >
            GitHub
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="inline-flex size-10 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:border-border-strong md:hidden"
          >
            {open ? (
              <X className="size-4" aria-hidden="true" />
            ) : (
              <Menu className="size-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-background md:hidden">
          <nav aria-label="Navegação mobile" className="container-page py-4">
            <ul className="flex flex-col">
              {links.map((link) => (
                <li key={link.href} className="border-b border-border/60 last:border-0">
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-3.5 font-display text-lg text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-5 inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-border px-4 py-3 text-sm"
            >
              GitHub
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
