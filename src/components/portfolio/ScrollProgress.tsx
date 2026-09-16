import { useScrollProgress } from "@/hooks/use-motion";

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div className="scroll-progress-track" aria-hidden="true">
      <div className="scroll-progress-bar" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}
