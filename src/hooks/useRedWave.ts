import { useEffect, type RefObject } from "react"

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)"

/** Tempo para a frente da onda alcançar o canto mais distante da linha. */
const EXPAND_MS = 1000
/** Tempo total até o vermelho dissipar por completo. */
const TOTAL_MS = 1700
const EASE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)"
/** Diâmetro do pulso em relação ao alcance, para que a frente passe do canto. */
const OVERSHOOT = 2.6

/**
 * Cada linha tem duas ondulações sobrepostas (`.mini-wave > i`). A segunda sai
 * um pouco depois, mais fraca e com outro achatamento e giro, o que quebra a
 * simetria de um círculo perfeito. `peak` é a opacidade máxima da camada.
 */
const RIPPLES = [
  { delay: 0, peak: 1, twist: 18, stretch: 0.9 },
  { delay: 140, peak: 0.55, twist: -26, stretch: 0.78 },
] as const

function play(
  blob: HTMLElement,
  x: number,
  y: number,
  reach: number,
  ripple: (typeof RIPPLES)[number],
) {
  const size = reach * OVERSHOOT
  const half = size / 2
  // Cada interação sorteia o giro e o achatamento: a onda nunca se repete igual.
  const squash = ripple.stretch + Math.random() * 0.18
  const spin = (Math.random() - 0.5) * 60
  const place = `translate(${x - half}px, ${y - half}px)`

  blob.getAnimations().forEach((animation) => animation.cancel())
  blob.style.width = `${size}px`
  blob.style.height = `${size}px`

  // Só transform e opacity animam (compositor); o tamanho é fixo por disparo.
  const spread = blob.animate(
    [
      { transform: `${place} rotate(${spin}deg) scale(0.04, ${0.04 * squash})` },
      {
        transform: `${place} rotate(${spin + ripple.twist}deg) scale(1, ${squash})`,
      },
    ],
    { duration: EXPAND_MS, delay: ripple.delay, easing: EASE_OUT, fill: "both" },
  )
  const fade = blob.animate(
    [
      { opacity: 0 },
      { opacity: ripple.peak, offset: 0.1 },
      { opacity: ripple.peak, offset: 0.5 },
      { opacity: 0 },
    ],
    { duration: TOTAL_MS, delay: ripple.delay, easing: "linear", fill: "both" },
  )

  // Ao terminar, solta a camada gigante e volta ao estado em repouso.
  Promise.all([spread.finished, fade.finished])
    .then(() => {
      spread.cancel()
      fade.cancel()
    })
    .catch(() => {
      /* cancelada por uma nova interação: nada a fazer */
    })
}

/**
 * Onda vermelha nas linhas de `.mini-project` dentro de `listRef`.
 *
 * - nasce exatamente onde o cursor entrou na linha (coordenada medida uma vez
 *   por interação, em pointerenter);
 * - cada linha é independente: o estado fica nos elementos, não no React, e
 *   nada re-renderiza durante o movimento do mouse;
 * - não dispara com toque, nem com prefers-reduced-motion (a camada some via
 *   CSS), nem por foco de teclado, que mantém o contorno desenhado do link.
 */
export function useRedWave(listRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const motion = window.matchMedia(REDUCED_QUERY)

    const teardown = Array.from(
      list.querySelectorAll<HTMLElement>(".mini-project"),
    ).map((row) => {
      const wave = row.querySelector<HTMLElement>(".mini-wave")
      const blobs = wave
        ? Array.from(wave.querySelectorAll<HTMLElement>("i"))
        : []

      const onEnter = (event: PointerEvent) => {
        if (!wave || motion.matches || event.pointerType === "touch") return
        const box = wave.getBoundingClientRect()
        const x = event.clientX - box.left
        const y = event.clientY - box.top
        // Distância do ponto de origem ao canto mais distante da linha.
        const reach = Math.hypot(
          Math.max(x, box.width - x),
          Math.max(y, box.height - y),
        )
        blobs.forEach((blob, index) => {
          const ripple = RIPPLES[index]
          if (ripple) play(blob, x, y, reach, ripple)
        })
      }

      row.addEventListener("pointerenter", onEnter)
      return () => {
        row.removeEventListener("pointerenter", onEnter)
        blobs.forEach((blob) =>
          blob.getAnimations().forEach((animation) => animation.cancel()),
        )
      }
    })

    return () => teardown.forEach((undo) => undo())
  }, [listRef])
}
