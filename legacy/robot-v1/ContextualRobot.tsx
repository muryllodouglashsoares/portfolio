import { createElement, useEffect, useRef, useState } from "react"

type RobotSide = "left" | "right"

const sideBySection: Record<string, RobotSide> = {
  inicio: "right",
  sobre: "left",
  projetos: "right",
  engenharia: "left",
  trajetoria: "right",
  contato: "left",
}

export function getRobotSide(section: string): RobotSide {
  return sideBySection[section] ?? "right"
}

export function ContextualRobot({ activeSection }: { activeSection: string }) {
  const targetSide = getRobotSide(activeSection)
  const [side, setSide] = useState<RobotSide>(targetSide)
  const [phase, setPhase] = useState<"idle" | "leaving" | "arriving">("idle")
  const [ghost, setGhost] = useState<{
    side: RobotSide
    src: string
  } | null>(null)
  const sideRef = useRef<RobotSide>(targetSide)
  const viewerRef = useRef<HTMLElement & { toDataURL?: () => string }>(null)

  useEffect(() => {
    const canRender =
      window.matchMedia("(min-width: 601px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!canRender) return

    const loadViewer = () => void import("@google/model-viewer")
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(loadViewer)
    } else {
      globalThis.setTimeout(loadViewer, 600)
    }
  }, [])

  useEffect(() => {
    const previousSide = sideRef.current
    if (targetSide === previousSide) return

    let snapshot = ""
    try {
      snapshot = viewerRef.current?.toDataURL?.() ?? ""
    } catch {
      snapshot = ""
    }

    setGhost({ side: previousSide, src: snapshot })
    setPhase("leaving")

    const moveTimer = window.setTimeout(() => {
      sideRef.current = targetSide
      setSide(targetSide)
      setPhase("arriving")
    }, 220)
    const finishTimer = window.setTimeout(() => {
      setPhase("idle")
      setGhost(null)
    }, 720)

    return () => {
      window.clearTimeout(moveTimer)
      window.clearTimeout(finishTimer)
    }
  }, [targetSide])

  return (
    <>
      {ghost && (
        <div className={`robot-ghost robot-${ghost.side}`} aria-hidden="true">
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
        className={`robot-wrap robot-${side} robot-${phase}`}
        aria-label="Robô 3D interativo, elemento visual do portfólio"
      >
        {createElement("model-viewer", {
          ref: viewerRef,
          src: "/robot.glb",
          alt: "Robô 3D do portfólio de Muryllo",
          autoplay: true,
          "camera-orbit": "18deg 82deg 3.2m",
          "camera-target": "0m 1m 0m",
          "interaction-prompt": "none",
          "disable-zoom": true,
          "shadow-intensity": "0",
          loading: "lazy",
        })}
        <span className="robot-dot" />
      </aside>
    </>
  )
}
