import type { ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms */
  delay?: number;
  /**
   * Lista fechada de tags: o `ElementType` "solto" resolve para `never` quando o
   * @react-three/fiber amplia os elementos intrínsecos do JSX.
   */
  as?: "div" | "li" | "section" | "article" | "span" | "p";
}

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const El = Tag as "div";

  return (
    <El
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn("reveal", visible && "reveal-in", className)}
    >
      {children}
    </El>
  );
}
