import { useEffect, useState } from "react"

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)"

/**
 * Preferência de efeitos visuais (animações de entrada e rolagem,
 * transições). A única fonte é o `prefers-reduced-motion` do sistema, que é
 * acompanhado em tempo real.
 *
 * O resultado vira `data-effects="reduced|full"` no <html>, que o CSS usa para
 * desligar animações e transições. (A galeria de projetos lê a mesma
 * preferência diretamente via media query, ver ProjectsGallery.)
 */
export function useEffectsPreference() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia(REDUCED_QUERY).matches,
  )

  useEffect(() => {
    const query = window.matchMedia(REDUCED_QUERY)
    const onChange = () => setReduced(query.matches)
    onChange()
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.effects = reduced ? "reduced" : "full"
  }, [reduced])

  return { reduced }
}
