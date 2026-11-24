/** Barra de navegador do mockup, compartilhada pelo card e pela apresentação ampliada. */
export function BrowserChrome({ title }: { title: string }) {
  return (
    <div className="browser-bar">
      <div>
        <i />
        <i />
        <i />
      </div>
      <span>{title.toLowerCase().replace(/\s+/g, "-")}.app</span>
      <b />
    </div>
  )
}
