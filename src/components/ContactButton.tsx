import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Mail } from "lucide-react"
import { useMagnetic } from "../motion/useMagnetic"

/**
 * Botão principal do Contato.
 *
 * - É um link `mailto:` comum: funciona sem JavaScript, por teclado e por
 *   toque, e a navegação não espera nenhuma animação.
 * - Reaproveita o mesmo hook magnético do Hero (nada de segunda implementação).
 * - Ao ativar, mostra um estado breve de "abrindo" (varredura e seta) e avisa
 *   leitores de tela; o estado volta sozinho.
 */
export function ContactButton({ email }: { email: string }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const timer = useRef(0)
  const [opening, setOpening] = useState(false)
  useMagnetic(ref)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  return (
    <>
      <a
        ref={ref}
        className="button button-primary contact-button"
        href={`mailto:${email}`}
        data-state={opening ? "opening" : "idle"}
        onClick={() => {
          setOpening(true)
          window.clearTimeout(timer.current)
          timer.current = window.setTimeout(() => setOpening(false), 1800)
        }}
      >
        <span className="mag-inner">
          <Mail size={18} aria-hidden="true" />
          Entrar em contato <ArrowUpRight size={18} aria-hidden="true" />
        </span>
      </a>
      <span className="sr-only" role="status">
        {opening ? "Abrindo seu aplicativo de e-mail" : ""}
      </span>
    </>
  )
}
