/**
 * Preferências de movimento e de ponteiro, consultadas em um só lugar.
 *
 * Os hooks e componentes do portfólio importam estas consultas em vez de
 * repetir `matchMedia(...)` com strings próprias. O CSS espelha a mesma
 * decisão com `@media (prefers-reduced-motion)` e `html[data-effects]`.
 */
export const REDUCED_QUERY = "(prefers-reduced-motion: reduce)"
export const MOTION_QUERY = "(prefers-reduced-motion: no-preference)"
/** Mouse/trackpad: ponteiro preciso e com hover. */
export const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)"
/** Efeitos de cursor: ponteiro preciso, tela de desktop e movimento permitido. */
export const CURSOR_FX_QUERY = `${FINE_POINTER_QUERY} and (min-width: 768px) and ${MOTION_QUERY}`

/**
 * Observa uma media query: chama `onChange` agora e a cada mudança.
 * Devolve a função que cancela a observação.
 */
export function watchQuery(
  query: string,
  onChange: (matches: boolean) => void,
): () => void {
  const list = window.matchMedia(query)
  const handler = () => onChange(list.matches)
  handler()
  list.addEventListener("change", handler)
  return () => list.removeEventListener("change", handler)
}

export const prefersReducedMotion = () => window.matchMedia(REDUCED_QUERY).matches
