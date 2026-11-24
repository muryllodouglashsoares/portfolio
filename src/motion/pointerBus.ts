/**
 * Um único listener de movimento do ponteiro (mouse/caneta), agrupado por
 * quadro, para os efeitos que seguem o cursor pela página (botões magnéticos e
 * rastro). Em toque ele nem é registrado.
 *
 * Quem assina recebe a última posição e `inside` (se o ponteiro está dentro da
 * janela). O listener some quando o último assinante sai.
 */
export type PointerFrame = {
  x: number
  y: number
  inside: boolean
  /** Elemento sob o ponteiro no último movimento. */
  target: Element | null
}
type Subscriber = (frame: PointerFrame) => void

const subscribers = new Set<Subscriber>()
const frame: PointerFrame = { x: -1, y: -1, inside: false, target: null }
let raf = 0
let bound = false

const run = () => {
  raf = 0
  subscribers.forEach((subscriber) => subscriber(frame))
}
const schedule = () => {
  if (!raf) raf = window.requestAnimationFrame(run)
}
const onMove = (event: PointerEvent) => {
  if (event.pointerType !== "mouse" && event.pointerType !== "pen") return
  frame.x = event.clientX
  frame.y = event.clientY
  frame.inside = true
  frame.target = event.target instanceof Element ? event.target : null
  schedule()
}
const onLeave = () => {
  frame.inside = false
  schedule()
}

export function subscribePointer(subscriber: Subscriber): () => void {
  subscribers.add(subscriber)
  if (!bound) {
    bound = true
    window.addEventListener("pointermove", onMove, { passive: true })
    document.addEventListener("pointerleave", onLeave)
    window.addEventListener("blur", onLeave)
  }
  return () => {
    subscribers.delete(subscriber)
    if (!subscribers.size && bound) {
      bound = false
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerleave", onLeave)
      window.removeEventListener("blur", onLeave)
      if (raf) window.cancelAnimationFrame(raf)
      raf = 0
    }
  }
}
