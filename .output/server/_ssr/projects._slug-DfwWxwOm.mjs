import { s as statusLabel } from "./projects-BwsLHbzK.mjs";
import { d as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./projects._slug-CbjeirJm.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { i as ArrowUpRight, o as ArrowLeft, r as Github } from "../_libs/lucide-react.mjs";
import { n as Navbar, t as Footer } from "./Footer-C88qrfdM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects._slug-DfwWxwOm.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/workspaces/default/code/src/routes/projects.$slug.tsx?tsr-split=component";
function ProjectDetail() {
	const { project } = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Navbar, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 12,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
				className: "pt-24 pb-16 sm:pt-28 md:pt-36 md:pb-28",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
					className: "container-page",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/",
							hash: "projetos",
							className: "inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, {
								className: "size-3.5",
								"aria-hidden": "true"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 16,
								columnNumber: 13
							}, this), "Voltar aos projetos"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 15,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
							className: "mt-4 max-w-3xl sm:mt-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground sm:tracking-[0.14em]",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											"aria-hidden": "true",
											className: "size-1.5 rounded-full bg-primary"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 22,
											columnNumber: 15
										}, this),
										statusLabel[project.status],
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											"aria-hidden": "true",
											children: "·"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 24,
											columnNumber: 15
										}, this),
										project.categories.join(" / ")
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 21,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
									className: "mt-4 text-3xl font-semibold sm:text-4xl lg:text-5xl",
									children: project.title
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 27,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-5 text-base leading-relaxed text-muted-foreground",
									children: project.longDescription
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 28,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
										href: project.githubUrl,
										target: "_blank",
										rel: "noreferrer noopener",
										className: "inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-border-strong px-4 py-2.5 text-sm font-medium transition-colors hover:bg-card sm:min-h-11",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Github, {
											className: "size-4",
											"aria-hidden": "true"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 34,
											columnNumber: 17
										}, this), "Repositório"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 33,
										columnNumber: 15
									}, this), project.demoUrl ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
										href: project.demoUrl,
										target: "_blank",
										rel: "noreferrer noopener",
										className: "inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:min-h-11",
										children: ["Acessar demo", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowUpRight, {
											className: "size-4",
											"aria-hidden": "true"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 39,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 37,
										columnNumber: 34
									}, this) : null]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 32,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 20,
							columnNumber: 11
						}, this),
						project.image ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-10 overflow-hidden rounded-lg border border-border bg-surface sm:mt-12",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
								src: project.image,
								alt: `Tela principal do projeto ${project.title}`,
								className: "w-full object-cover object-top",
								decoding: "async"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 45,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 44,
							columnNumber: 28
						}, this) : null,
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-10 grid gap-10 sm:mt-14 sm:gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-start",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "min-w-0 space-y-10",
								children: [
									project.problem ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
										className: "text-2xl font-semibold",
										children: "O problema"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 51,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-3 leading-relaxed text-muted-foreground",
										children: project.problem
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 52,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 50,
										columnNumber: 34
									}, this) : null,
									project.solution ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
										className: "text-2xl font-semibold",
										children: "A solução"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 56,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-3 leading-relaxed text-muted-foreground",
										children: project.solution
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 57,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 55,
										columnNumber: 35
									}, this) : null,
									project.architecture?.length ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
										className: "text-2xl font-semibold",
										children: "Arquitetura"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 61,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ol", {
										className: "mt-4 space-y-0",
										children: project.architecture.map((stage, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
											className: "relative flex gap-4 pb-6 last:pb-0",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "flex flex-col items-center",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "grid size-7 shrink-0 place-items-center rounded-full border border-primary/40 bg-surface font-mono text-[0.6875rem] text-primary-soft",
													children: i + 1
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 65,
													columnNumber: 27
												}, this), i < project.architecture.length - 1 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													"aria-hidden": "true",
													className: "mt-1 w-px flex-1 bg-gradient-to-b from-primary/40 to-transparent"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 68,
													columnNumber: 67
												}, this) : null]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 64,
												columnNumber: 25
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
												className: "pt-0.5 text-sm leading-relaxed text-muted-foreground",
												children: stage
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 70,
												columnNumber: 25
											}, this)]
										}, stage, true, {
											fileName: _jsxFileName,
											lineNumber: 63,
											columnNumber: 61
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 62,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 60,
										columnNumber: 47
									}, this) : null,
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
										className: "text-2xl font-semibold",
										children: "O que o projeto faz"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 78,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
										className: "mt-4 space-y-3",
										children: project.features.map((feature) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
											className: "flex gap-3 text-sm leading-relaxed text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												"aria-hidden": "true",
												className: "mt-2 size-1.5 shrink-0 rounded-full bg-primary"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 81,
												columnNumber: 23
											}, this), feature]
										}, feature, true, {
											fileName: _jsxFileName,
											lineNumber: 80,
											columnNumber: 52
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 79,
										columnNumber: 17
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 77,
										columnNumber: 15
									}, this),
									project.challenges?.length ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
										className: "space-y-6",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
											className: "text-2xl font-semibold",
											children: "Desafios técnicos"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 88,
											columnNumber: 19
										}, this), project.challenges.map((challenge) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "rounded-lg border border-border bg-card p-5 sm:p-6",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dl", {
												className: "space-y-3 text-sm leading-relaxed",
												children: [
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", {
														className: "mono-label text-primary-soft",
														children: "Problema"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 92,
														columnNumber: 27
													}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", {
														className: "mt-1 text-muted-foreground",
														children: challenge.problem
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 93,
														columnNumber: 27
													}, this)] }, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 91,
														columnNumber: 25
													}, this),
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", {
														className: "mono-label text-primary-soft",
														children: "Investigação"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 96,
														columnNumber: 27
													}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", {
														className: "mt-1 text-muted-foreground",
														children: challenge.investigation
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 97,
														columnNumber: 27
													}, this)] }, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 95,
														columnNumber: 25
													}, this),
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", {
														className: "mono-label text-primary-soft",
														children: "Solução"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 100,
														columnNumber: 27
													}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", {
														className: "mt-1 text-muted-foreground",
														children: challenge.solution
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 101,
														columnNumber: 27
													}, this)] }, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 99,
														columnNumber: 25
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 90,
												columnNumber: 23
											}, this)
										}, challenge.problem, false, {
											fileName: _jsxFileName,
											lineNumber: 89,
											columnNumber: 56
										}, this))]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 87,
										columnNumber: 45
									}, this) : null,
									project.notes?.length ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
										className: "space-y-6",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
											className: "text-2xl font-semibold",
											children: "Decisões técnicas"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 108,
											columnNumber: 19
										}, this), project.notes.map((note) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "rounded-lg border border-border bg-card p-5 sm:p-6",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
												className: "font-display text-base font-semibold tracking-tight",
												children: note.heading
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 110,
												columnNumber: 23
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
												className: "mt-2 text-sm leading-relaxed text-muted-foreground",
												children: note.body
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 113,
												columnNumber: 23
											}, this)]
										}, note.heading, true, {
											fileName: _jsxFileName,
											lineNumber: 109,
											columnNumber: 46
										}, this))]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 107,
										columnNumber: 40
									}, this) : null,
									project.learned ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
										className: "rounded-lg border border-primary/25 bg-primary/5 p-5 sm:p-6",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
											className: "mono-label text-primary-soft",
											children: "O que este projeto me ensinou"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 120,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "mt-3 leading-relaxed text-muted-foreground",
											children: project.learned
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 121,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 119,
										columnNumber: 34
									}, this) : null
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 49,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
								className: "order-first min-w-0 rounded-lg border border-border bg-surface p-5 sm:p-6 lg:sticky lg:top-28 lg:order-none",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
									className: "mono-label text-primary-soft",
									children: "Tecnologias"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 126,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
									className: "mt-4 flex flex-wrap gap-1.5",
									children: project.technologies.map((tech) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
										className: "rounded border border-border bg-background px-2.5 py-1 font-mono text-xs text-muted-foreground",
										children: tech
									}, tech, false, {
										fileName: _jsxFileName,
										lineNumber: 128,
										columnNumber: 51
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 127,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 125,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 48,
							columnNumber: 11
						}, this),
						project.screenshots?.length ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
							className: "mt-12 sm:mt-16",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "text-2xl font-semibold",
								children: "Telas do projeto"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 136,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-6 grid gap-4 sm:grid-cols-2 sm:gap-6",
								children: project.screenshots.map((shot) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("figure", {
									className: "overflow-hidden rounded-lg border border-border bg-surface",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
										src: shot.src,
										alt: `${project.title} — ${shot.caption}`,
										loading: "lazy",
										className: "w-full object-cover object-top",
										decoding: "async"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 139,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("figcaption", {
										className: "border-t border-border px-4 py-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground",
										children: shot.caption
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 140,
										columnNumber: 21
									}, this)]
								}, shot.src, true, {
									fileName: _jsxFileName,
									lineNumber: 138,
									columnNumber: 50
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 137,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 135,
							columnNumber: 42
						}, this) : null
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 14,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 13,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Footer, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 148,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 11,
		columnNumber: 10
	}, this);
}
//#endregion
export { ProjectDetail as component };
