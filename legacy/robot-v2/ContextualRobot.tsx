import { createElement, useCallback, useEffect, useRef, useState } from "react"
import {
  HERO_ROBOT_SLOT_ID,
  ROBOT_CAMERA_ORBIT,
  ROBOT_CLIPS,
  ROBOT_CLIP_MS,
  ROBOT_MODEL_URL,
  ROBOT_TIMING,
  getRobotPlacement,
  samePlacement,
  type RobotOneShotClip,
  type RobotPlacement,
} from "./robotConfig"

export { getRobotSide } from "./robotConfig"

type Phase = "idle" | "leaving" | "arriving"

/** Subconjunto da API do <model-viewer> usada aqui. */
type RobotViewer = HTMLElement & {
  animationName?: string
  loaded?: boolean
  play?: (options?: { repetitions?: number }) => void
  pause?: () => void
  toDataURL?: (type?: string, quality?: number) => string
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches,
  )
  useEffect(() => {
    const media = window.matchMedia(query)
    const update = () => setMatches(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [query])
  return matches
}

/** Dispositivos modestos: o robô é exibido, mas sem loop contínuo de animação. */
function detectLowPower() {
  const nav = navigator as Navigator & { deviceMemory?: number }
  const cores = nav.hardwareConcurrency ?? 8
  const memory = nav.deviceMemory ?? 8
  const coarse = window.matchMedia("(pointer: coarse)").matches
  return cores <= 2 || memory <= 2 || (coarse && cores <= 4)
}

const placementClass = (p: RobotPlacement) =>
  `robot-${p.side}${p.compact ? " robot-compact" : " robot-hero"}`

/** Telas pequenas só recebem o robô dentro do Hero (CSS o oculta nas demais seções). */
function allowsMobileRobot() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  return !connection?.saveData
}

/**
 * No Hero o robô é uma peça da composição: acompanha o espaço reservado por
 * `HeroStage` (posição/tamanho em CSS vars) enquanto a seção está ativa.
 * Fora do Hero as variáveis ficam congeladas, o que mantém a silhueta de
 * transição no lugar de origem.
 */
function useHeroSlot(active: boolean) {
  useEffect(() => {
    if (!active) return
    const root = document.documentElement
    let frame = 0
    const measure = () => {
      frame = 0
      const slot = document.getElementById(HERO_ROBOT_SLOT_ID)
      if (!slot) return
      const rect = slot.getBoundingClientRect()
      root.style.setProperty("--hr-x", `${rect.left.toFixed(1)}px`)
      root.style.setProperty("--hr-y", `${rect.top.toFixed(1)}px`)
      root.style.setProperty("--hr-w", `${rect.width.toFixed(1)}px`)
      root.style.setProperty("--hr-h", `${rect.height.toFixed(1)}px`)
    }
    const request = () => {
      if (!frame) frame = window.requestAnimationFrame(measure)
    }
    measure()
    window.addEventListener("scroll", request, { passive: true })
    window.addEventListener("resize", request)
    const slot = document.getElementById(HERO_ROBOT_SLOT_ID)
    const observer = slot && "ResizeObserver" in window ? new ResizeObserver(request) : null
    if (slot) observer?.observe(slot)
    return () => {
      window.removeEventListener("scroll", request)
      window.removeEventListener("resize", request)
      observer?.disconnect()
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [active])
}

export function ContextualRobot({ activeSection }: { activeSection: string }) {
  const target = getRobotPlacement(activeSection)
  const wide = useMediaQuery("(min-width: 601px)")
  const [mobileAllowed] = useState(allowsMobileRobot)
  const enabled = wide || mobileAllowed
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
  const [lowPower] = useState(detectLowPower)
  const lite = reducedMotion || lowPower

  useHeroSlot(!target.compact && enabled)

  const [placement, setPlacement] = useState<RobotPlacement>(target)
  const [phase, setPhase] = useState<Phase>("idle")
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const [ghost, setGhost] = useState<{ placement: RobotPlacement; src: string } | null>(null)

  const viewerRef = useRef<RobotViewer>(null)
  const placementRef = useRef(placement)
  const readyRef = useRef(false)
  const phaseRef = useRef<Phase>("idle")
  const liteRef = useRef(lite)
  const reducedRef = useRef(reducedMotion)
  const clipTimer = useRef(0)

  liteRef.current = lite
  reducedRef.current = reducedMotion
  phaseRef.current = phase

  /* ── Reprodução de clips (um único loop controlado por aqui) ── */
  const settle = useCallback(() => {
    const viewer = viewerRef.current
    if (!viewer?.play) return
    if (liteRef.current) {
      viewer.pause?.()
      return
    }
    viewer.animationName = ROBOT_CLIPS.idle
    viewer.play({ repetitions: Infinity })
  }, [])

  const playClip = useCallback(
    (clip: RobotOneShotClip) => {
      const viewer = viewerRef.current
      if (!viewer?.play || reducedRef.current) return
      window.clearTimeout(clipTimer.current)
      viewer.animationName = clip
      viewer.play({ repetitions: 1 })
      clipTimer.current = window.setTimeout(settle, ROBOT_CLIP_MS[clip] + 120)
    },
    [settle],
  )

  /* ── Carrega a biblioteca do viewer só quando necessário (≥ 601px) ── */
  useEffect(() => {
    if (!enabled) return
    const load = () => void import("@google/model-viewer").catch(() => setFailed(true))
    if ("requestIdleCallback" in window) {
      const handle = window.requestIdleCallback(load, { timeout: 1500 })
      return () => window.cancelIdleCallback(handle)
    }
    // `globalThis`: no ramo sem requestIdleCallback o TS estreita `window` para never
    const handle = globalThis.setTimeout(load, 600)
    return () => globalThis.clearTimeout(handle)
  }, [enabled])

  /* ── Eventos do modelo: surge depois do painel de código ── */
  useEffect(() => {
    const viewer = viewerRef.current
    if (!viewer) return
    let revealTimer = 0

    const reveal = () => {
      const wait = Math.max(0, ROBOT_TIMING.entryAfterMs - performance.now())
      revealTimer = window.setTimeout(() => {
        readyRef.current = true
        setReady(true)
        playClip(ROBOT_CLIPS.arrive)
      }, wait)
    }
    const onError = () => setFailed(true)

    viewer.addEventListener("load", reveal)
    viewer.addEventListener("error", onError)
    if (viewer.loaded) reveal()

    return () => {
      viewer.removeEventListener("load", reveal)
      viewer.removeEventListener("error", onError)
      window.clearTimeout(revealTimer)
      window.clearTimeout(clipTimer.current)
      readyRef.current = false
      setReady(false)
    }
  }, [enabled, failed, playClip])

  /* ── Preferências de movimento mudando em tempo de execução ── */
  useEffect(() => {
    if (!ready) return
    if (lite) viewerRef.current?.pause?.()
    else settle()
  }, [lite, ready, settle])

  /* ── Olhada de repouso ocasional (nunca em reduced-motion / baixa potência) ── */
  useEffect(() => {
    if (!ready || lite) return
    let timer = 0
    const arm = () => {
      const { scanMinMs, scanMaxMs } = ROBOT_TIMING
      timer = window.setTimeout(
        () => {
          if (document.visibilityState === "visible" && phaseRef.current === "idle") {
            playClip(ROBOT_CLIPS.scan)
          }
          arm()
        },
        scanMinMs + Math.random() * (scanMaxMs - scanMinMs),
      )
    }
    arm()
    return () => window.clearTimeout(timer)
  }, [ready, lite, playClip])

  /* ── Mudança de seção: sai de um canto, reaparece no outro ── */
  useEffect(() => {
    const previous = placementRef.current
    if (samePlacement(previous, target)) {
      setPhase("idle")
      setGhost(null)
      return
    }

    // Antes de aparecer pela primeira vez, ou sem movimento: posiciona direto.
    if (!readyRef.current || reducedRef.current) {
      placementRef.current = target
      setPlacement(target)
      return
    }

    let src = ""
    try {
      src = viewerRef.current?.toDataURL?.() ?? ""
    } catch {
      src = ""
    }
    setGhost({ placement: previous, src })
    setPhase("leaving")

    const { leaveMs, arriveMs, ghostMs } = ROBOT_TIMING
    const move = window.setTimeout(() => {
      placementRef.current = target
      setPlacement(target)
      setPhase("arriving")
      playClip(ROBOT_CLIPS.arrive)
    }, leaveMs)
    const settleTimer = window.setTimeout(() => setPhase("idle"), leaveMs + arriveMs)
    const clearGhost = window.setTimeout(() => setGhost(null), ghostMs)

    return () => {
      window.clearTimeout(move)
      window.clearTimeout(settleTimer)
      window.clearTimeout(clearGhost)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target.side, target.compact, playClip])

  if (!enabled || failed) return null

  return (
    <>
      {ghost && (
        <div className={`robot-ghost ${placementClass(ghost.placement)}`} aria-hidden="true">
          {ghost.src ? (
            <img src={ghost.src} alt="" />
          ) : (
            <span className="robot-ghost-fallback">
              <i />
              <b />
            </span>
          )}
        </div>
      )}
      <aside
        className={`robot-wrap ${placementClass(placement)} robot-${phase}${ready ? " is-ready" : ""}`}
        aria-hidden="true"
      >
        <span className="robot-shadow" />
        {createElement("model-viewer", {
          ref: viewerRef,
          src: ROBOT_MODEL_URL,
          alt: "",
          "camera-orbit": ROBOT_CAMERA_ORBIT[placement.side],
          "field-of-view": "30deg",
          "environment-image": "neutral",
          exposure: "1.05",
          "shadow-intensity": "0",
          "animation-crossfade-duration": "350",
          "interaction-prompt": "none",
          "disable-zoom": true,
          "disable-pan": true,
          "disable-tap": true,
          reveal: "auto",
          loading: "eager",
        })}
      </aside>
    </>
  )
}
