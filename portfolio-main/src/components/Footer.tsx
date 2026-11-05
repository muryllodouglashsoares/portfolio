import { Link } from "@tanstack/react-router";
import { GITHUB_URL } from "@/data/projects";

const steps = ["BUILD", "LEARN", "EVOLVE"];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-page py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-2xl font-semibold tracking-tight">
              Muryllo Douglas
            </p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Estudante de Informática no IFPB e desenvolvedor em formação.
              João Pessoa, PB.
            </p>
          </div>

          <ul className="flex flex-wrap items-center gap-x-3 gap-y-2">
            {steps.map((step, i) => (
              <li key={step} className="flex items-center gap-3">
                <span className="font-mono text-[0.6875rem] tracking-[0.22em] text-muted-foreground">
                  {step}
                </span>
                {i < steps.length - 1 ? (
                  <span aria-hidden="true" className="h-px w-5 bg-border" />
                ) : null}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Muryllo Douglas Henrique Soares</p>
          <div className="flex items-center gap-5">
            <Link to="/" className="transition-colors hover:text-foreground">
              Início
            </Link>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="transition-colors hover:text-foreground"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
