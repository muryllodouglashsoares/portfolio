import { cn } from "@/lib/utils";

export function Tag({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cn(
        "rounded-md border border-primary/25 bg-primary/10 px-2.5 py-1 font-mono text-xs text-primary-soft",
        className,
      )}
    >
      {children}
    </span>
  );
}
