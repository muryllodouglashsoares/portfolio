/**
 * Capturas locais dos projetos.
 *
 * Basta colocar as imagens em `src/assets/projects/<slug>/` (slugs em
 * `featuredProjects`). `cover.*` vira a imagem do card; as demais entram na
 * galeria, em ordem alfabética (use 01-, 02-… para controlar a ordem).
 * Sem imagens locais, usa a captura remota (`image`) ou o aviso.
 */
const localShots = import.meta.glob(
  "../../assets/projects/*/*.{png,jpg,jpeg,webp,avif}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>

const PREFIX = "../../assets/projects/"

export function shotsFor(slug: string, fallback?: string): string[] {
  const local = Object.entries(localShots)
    .filter(([path]) => path.startsWith(`${PREFIX}${slug}/`))
    .map(([path, url]) => ({ name: path.split("/").pop() ?? "", url }))
    .sort((a, b) => {
      const aCover = a.name.toLowerCase().startsWith("cover") ? 0 : 1
      const bCover = b.name.toLowerCase().startsWith("cover") ? 0 : 1
      return aCover - bCover || a.name.localeCompare(b.name, "pt-BR")
    })
    .map((shot) => shot.url)
  if (local.length) return local
  return fallback ? [fallback] : []
}
