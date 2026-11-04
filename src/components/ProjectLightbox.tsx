import { useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

export type LightboxImage = {
  src: string
  alt: string
}

type ProjectLightboxProps = {
  images: LightboxImage[]
  index: number
  title: string
  onIndexChange: (index: number) => void
  onClose: () => void
}

export function ProjectLightbox({
  images,
  index,
  title,
  onIndexChange,
  onClose,
}: ProjectLightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const activeImage = images[index]

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const previousFocus = document.activeElement as HTMLElement | null
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
      if (images.length > 1 && event.key === "ArrowRight") {
        onIndexChange((index + 1) % images.length)
      }
      if (images.length > 1 && event.key === "ArrowLeft") {
        onIndexChange((index - 1 + images.length) % images.length)
      }
      if (event.key === "Tab") {
        const buttons = document.querySelectorAll<HTMLButtonElement>(
          ".lightbox-panel button",
        )
        const first = buttons[0]
        const last = buttons[buttons.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last?.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first?.focus()
        }
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
      previousFocus?.focus()
    }
  }, [images.length, index, onClose, onIndexChange])

  if (!activeImage) return null

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`Visualização de ${title}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="lightbox-panel">
        <div className="lightbox-header">
          <div>
            <span>Captura real do projeto</span>
            <strong>{title}</strong>
          </div>
          <button ref={closeRef} onClick={onClose} aria-label="Fechar imagem">
            <X />
          </button>
        </div>
        <img src={activeImage.src} alt={activeImage.alt} />
        {images.length > 1 && (
          <div className="lightbox-navigation">
            <button
              onClick={() =>
                onIndexChange((index - 1 + images.length) % images.length)
              }
              aria-label="Imagem anterior"
            >
              <ChevronLeft />
            </button>
            <span>
              {index + 1} / {images.length}
            </span>
            <button
              onClick={() => onIndexChange((index + 1) % images.length)}
              aria-label="Próxima imagem"
            >
              <ChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
