export function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="mono-label whitespace-nowrap text-primary-soft">
        <span className="text-primary-soft/60">// </span>
        {children}
      </span>
      <span className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
    </div>
  );
}
