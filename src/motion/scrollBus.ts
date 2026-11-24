/**
 * Um único listener de rolagem, processado em requestAnimationFrame, para os
 * recursos de movimento que precisam acompanhar a posição da página (linha
 * condutora, parallax de seções, indicador de progresso).
 *
 * O listener só existe enquanto há assinantes e os quadros são agrupados:
 * vários assinantes custam um evento e um quadro, não um de cada.
 */
export type ScrollFrame = { y: number; vh: number }
type Subscriber = (frame: ScrollFrame) => void

const subscribers = new Set<Subscriber>()
const frame: ScrollFrame = { y: 0, vh: 0 }
let raf = 0
let bound = false

const run = () => {
  raf = 0
  frame.y = window.scrollY
  frame.vh = window.innerHeight
  subscribers.forEach((subscriber) => subscriber(frame))
}

/** Agenda um quadro (use depois que a geometria da página mudar). */
export function requestScrollFrame() {
  if (!raf) raf = window.requestAnimationFrame(run)
}

export function subscribeScroll(subscriber: Subscriber): () => void {
  subscribers.add(subscriber)
  if (!bound) {
    bound = true
    window.addEventListener("scroll", requestScrollFrame, { passive: true })
    window.addEventListener("resize", requestScrollFrame)
  }
  requestScrollFrame()
  return () => {
    subscribers.delete(subscriber)
    if (!subscribers.size && bound) {
      bound = false
      window.removeEventListener("scroll", requestScrollFrame)
      window.removeEventListener("resize", requestScrollFrame)
      if (raf) window.cancelAnimationFrame(raf)
      raf = 0
    }
  }
}
