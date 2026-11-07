import type { ReactNode } from "react"

/**
 * Link que abre em nova aba. O aviso fica só para leitores de tela: o ícone
 * de seta que os links externos já exibem continua sendo o indicador visual.
 */
export function ExternalLink({
  href,
  children,
  className = "",
  onClick,
}: {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
}) {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={onClick}
    >
      {children}
      <span className="sr-only"> (abre em nova aba)</span>
    </a>
  )
}
