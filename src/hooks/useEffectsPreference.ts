import { useCallback, useEffect, useState } from "react"

const STORAGE_KEY = "portfolio:effects"
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)"

type Stored = "reduced" | "full"

function readStored(): Stored | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    return value === "reduced" || value === "full" ? value : null
  } catch {
    return null
  }
}

/**
 * Preferência de efeitos visuais (esferas, animações de entrada e rolagem,
 * transições). Duas fontes, nesta ordem de prioridade:
 *
 * 1. `prefers-reduced-motion` do sistema — sempre vence e trava o botão;
 * 2. a escolha do visitante no botão da barra de navegação (guardada em
 *    localStorage; se o armazenamento estiver bloqueado, vale só na sessão).
 *
 * O resultado vira `data-effects="reduced|full"` no <html>, que o CSS usa para
 * desligar animações e transições; `reduced` também desliga o sistema de
 * esferas (ver AmbientOrbs).
 */
export function useEffectsPreference() {
  const [system, setSystem] = useState(
    () => window.matchMedia(REDUCED_QUERY).matches,
  )
  const [stored, setStored] = useState<Stored | null>(readStored)

  useEffect(() => {
    const query = window.matchMedia(REDUCED_QUERY)
    const onChange = () => setSystem(query.matches)
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])

  const reduced = system || stored === "reduced"

  useEffect(() => {
    document.documentElement.dataset.effects = reduced ? "reduced" : "full"
  }, [reduced])

  const toggle = useCallback(() => {
    const next: Stored = stored === "reduced" ? "full" : "reduced"
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* sem armazenamento: a escolha vale até recarregar */
    }
    setStored(next)
  }, [stored])

  return { reduced, locked: system, toggle }
}
