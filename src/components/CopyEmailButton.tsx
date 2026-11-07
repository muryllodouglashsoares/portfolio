import { useEffect, useRef, useState } from "react"
import { Check, Copy } from "lucide-react"

type Status = "idle" | "copied" | "error"

/** Plano B para navegadores/contextos sem `navigator.clipboard`. */
function legacyCopy(text: string) {
  const field = document.createElement("textarea")
  field.value = text
  field.setAttribute("readonly", "")
  field.style.position = "fixed"
  field.style.opacity = "0"
  document.body.appendChild(field)
  field.select()
  try {
    return document.execCommand("copy")
  } catch {
    return false
  } finally {
    field.remove()
  }
}

/**
 * Copia o e-mail e confirma na própria interface (ícone + texto) e para
 * leitores de tela (região `status`). Se a cópia falhar, o texto avisa e o
 * endereço continua visível e selecionável ao lado.
 */
export function CopyEmailButton({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>("idle")
  const timer = useRef(0)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = async () => {
    let ok = false
    try {
      await navigator.clipboard.writeText(email)
      ok = true
    } catch {
      ok = legacyCopy(email)
    }
    setStatus(ok ? "copied" : "error")
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setStatus("idle"), 2600)
  }

  const label =
    status === "copied"
      ? "Copiado"
      : status === "error"
        ? "Falhou — copie manualmente"
        : "Copiar"

  return (
    <>
      <button
        type="button"
        className="copy-button"
        data-status={status}
        onClick={copy}
        aria-label="Copiar endereço de e-mail"
      >
        {status === "copied" ? (
          <Check size={16} aria-hidden="true" />
        ) : (
          <Copy size={16} aria-hidden="true" />
        )}
        <span aria-hidden="true">{label}</span>
      </button>
      <span className="sr-only" role="status">
        {status === "copied"
          ? "E-mail copiado para a área de transferência."
          : status === "error"
            ? "Não foi possível copiar. Selecione o endereço manualmente."
            : ""}
      </span>
    </>
  )
}
