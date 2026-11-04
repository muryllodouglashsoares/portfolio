import { useEffect, useRef } from "react"
import { ArrowUpRight } from "lucide-react"
import { HERO_ROBOT_SLOT_ID } from "./robot/robotConfig"

export type HeroStageItem = {
  /** id da âncora do projeto na seção Projetos */
  anchor: string
  title: string
  kind: string
  /** Screenshot real do repositório (a mesma usada na seção Projetos). */
  image: string
  /** Deploy ativo: quando existe, o cartão abre o site em vez de rolar até o projeto. */
  demo?: string
}

/**
 * Lado direito do Hero: referências reais aos projetos em diferentes
 * profundidades, com um espaço reservado (`#hero-robot-slot`) onde o
 * ContextualRobot — a única instância 3D do site — se posiciona.
 *
 * O parallax é um único listener de ponteiro que escreve `--px/--py`;
 * cada cartão decide quanto se move pela sua profundidade em CSS.
 */
export function HeroStage({ items }: { items: HeroStageItem[] }) {
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stage = stageRef.current
    const hero = stage?.closest("section")
    if (!stage || !hero) return
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)")
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (!canHover.matches || reduced.matches) return

    let frame = 0
    let x = 0
    let y = 0
    const apply = () => {
      frame = 0
      stage.style.setProperty("--px", x.toFixed(3))
      stage.style.setProperty("--py", y.toFixed(3))
    }
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(apply)
    }
    const onMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect()
      const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2
      x = Math.max(-1, Math.min(1, nx))
      y = Math.max(-1, Math.min(1, ny))
      schedule()
    }
    const onLeave = () => {
      x = 0
      y = 0
      schedule()
    }

    hero.addEventListener("pointermove", onMove, { passive: true })
    hero.addEventListener("pointerleave", onLeave)
    return () => {
      hero.removeEventListener("pointermove", onMove)
      hero.removeEventListener("pointerleave", onLeave)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="hero-stage" ref={stageRef}>
      <div className="stage-floor" aria-hidden="true" />
      {items.slice(0, 3).map((item, index) => (
        <a
          key={item.anchor}
          className={`stage-card stage-card-${index + 1}`}
          style={{ "--i": 7 + index } as React.CSSProperties}
          {...(item.demo
            ? {
                href: item.demo,
                target: "_blank",
                rel: "noreferrer",
                "data-cursor": "open",
                "aria-label": `Abrir o site de ${item.title} em nova aba`,
              }
            : {
                href: `#${item.anchor}`,
                "aria-label": `${item.title}: ver na seção de projetos`,
              })}
        >
          <span className="stage-card-body">
            <img
              src={item.image}
              alt=""
              decoding="async"
              draggable={false}
              onError={(event) => {
                event.currentTarget.style.visibility = "hidden"
              }}
            />
            <span className="stage-card-caption">
              <b>{item.title}</b>
              <small>{item.kind}</small>
              <ArrowUpRight size={13} aria-hidden="true" />
            </span>
          </span>
        </a>
      ))}
      <div id={HERO_ROBOT_SLOT_ID} className="stage-robot-slot" aria-hidden="true" />
    </div>
  )
}
