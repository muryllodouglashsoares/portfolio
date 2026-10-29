import { n as getProject } from "./projects-BwsLHbzK.mjs";
import { c as lazyRouteComponent, l as createFileRoute, p as notFound } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects._slug-CbjeirJm.js
var $$splitComponentImporter = () => import("./projects._slug-DfwWxwOm.mjs");
var Route = createFileRoute("/projects/$slug")({
	loader: ({ params }) => {
		const project = getProject(params.slug);
		if (!project) throw notFound();
		return { project };
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "Projeto não encontrado — Muryllo Douglas" }, {
			name: "robots",
			content: "noindex"
		}] };
		const { project } = loaderData;
		const title = `${project.title} — Projeto de Muryllo Douglas`;
		return {
			links: [{
				rel: "canonical",
				href: `https://portfolio-c1u.pages.dev/projects/${project.id}`
			}],
			meta: [
				{ title },
				{
					name: "description",
					content: project.description
				},
				{
					property: "og:title",
					content: title
				},
				{
					property: "og:description",
					content: project.description
				},
				{
					property: "og:type",
					content: "article"
				},
				{
					name: "twitter:card",
					content: "summary_large_image"
				},
				...project.image ? [{
					property: "og:image",
					content: project.image
				}, {
					name: "twitter:image",
					content: project.image
				}] : []
			]
		};
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
