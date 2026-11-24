import { useEffect, type RefObject } from "react"
import { MOTION, intensity } from "./config"
import { CURSOR_FX_QUERY, watchQuery } from "./prefs"

/**
 * Inclinação 3D dos mockups em dois eixos, por delegação: UM listener de
 * `pointermove` no contêiner serve todas as cenas (`selector`).
 *
 * O JavaScript só grava variáveis numa cena por quadro (`--rx`, `--ry` em
 * graus já escalados por `--mi`); a transição de `transform` e o resto são CSS.
 * A sombra usa as mesmas variáveis. Ao sair da cena, as variáveis voltam a 0 e
 * a perspectiva retorna ao neutro. Sem mouse, em tela pequena ou com
 * movimento reduzido, nada é registrado e o mockup fica estático.
 */
export function useTilt(
  rootRef: RefObject<HTMLElement | null>,
  selector = ".pg-scene",
) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    let current: HTMLElement | null = null
    let raf = 0
    let nx = 0
    let ny = 0
    let pending: HTMLElement | null = null

    const reset = (scene: HTMLElement | null) => {
      if (!scene) return
      scene.style.setProperty("--rx", "0")
      scene.style.setProperty("--ry", "0")
      delete scene.dataset.tilt
    }
    const apply = () => {
      raf = 0
      if (!pending) return
      const k = intensity() * MOTION.tiltDeg
      pending.style.setProperty("--rx", (-ny * k).toFixed(2))
      pending.style.setProperty("--ry", (nx * k).toFixed(2))
      pending.dataset.tilt = "on"
    }
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return
      const scene =
        (event.target as Element | null)?.closest?.<HTMLElement>(selector) ?? null
      if (scene !== current) {
        reset(current)
        current = scene
      }
      if (!scene) return
      const box = scene.getBoundingClientRect()
      nx = Math.max(-1, Math.min(1, ((event.clientX - box.left) / box.width) * 2 - 1))
      ny = Math.max(-1, Math.min(1, ((event.clientY - box.top) / box.height) * 2 - 1))
      pending = scene
      if (!raf) raf = requestAnimationFrame(apply)
    }
    const onLeave = () => {
      reset(current)
      current = null
      pending = null
    }

    let attached = false
    const stop = watchQuery(CURSOR_FX_QUERY, (enabled) => {
      if (enabled && !attached) {
        attached = true
        root.addEventListener("pointermove", onMove, { passive: true })
        root.addEventListener("pointerleave", onLeave)
      } else if (!enabled && attached) {
        attached = false
        root.removeEventListener("pointermove", onMove)
        root.removeEventListener("pointerleave", onLeave)
        onLeave()
      }
    })
    return () => {
      stop()
      if (attached) {
        root.removeEventListener("pointermove", onMove)
        root.removeEventListener("pointerleave", onLeave)
      }
      if (raf) cancelAnimationFrame(raf)
      onLeave()
    }
  }, [rootRef, selector])
}
