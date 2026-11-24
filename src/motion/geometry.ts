/**
 * Posição do elemento no documento usando só o layout (offsetTop/offsetParent).
 * Ao contrário de getBoundingClientRect, ignora `transform`: elementos que
 * entram deslocados por uma revelação não mudam a medida.
 */
export function documentTop(element: HTMLElement) {
  let top = 0
  let node: HTMLElement | null = element
  while (node) {
    top += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }
  return top
}
