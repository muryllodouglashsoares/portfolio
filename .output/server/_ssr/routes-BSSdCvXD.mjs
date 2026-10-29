import { n as __toESM } from "../_runtime.mjs";
import { a as principalProjects, i as otherProjects, n as getProject, s as statusLabel, t as featuredProject } from "./projects-BwsLHbzK.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { d as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as ArrowRight, i as ArrowUpRight, r as Github } from "../_libs/lucide-react.mjs";
import { _ as useSpotlight, a as cn, c as hero, d as timeline, f as useCountUp, g as useScrollFill, h as useReducedMotion, i as about, l as projects, m as usePointerChip, n as Navbar, o as contact, p as useMagnetic, r as Reveal, s as githubSection, t as Footer, u as stack } from "./Footer-C88qrfdM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BSSdCvXD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$11 = "/workspaces/default/code/src/components/portfolio/Hero.tsx";
var PORTRAIT_SKY = [
	"#3C2C5F 0%",
	"#442F65 8%",
	"#4C3168 16%",
	"#52346C 24%",
	"#5C376E 32%",
	"#68396F 40%",
	"#713D6E 48%",
	"#7B4070 55%",
	"#7B3F69 60%",
	"#793F63 64%",
	"#402640 68%",
	"#1C1320 72%",
	"#0C0A0D 76%",
	"var(--background) 100%"
].join(", ");
var SKY_FEATHER = "linear-gradient(to right, transparent 4%, rgb(0 0 0 / 0.08) 12%, rgb(0 0 0 / 0.3) 20%, rgb(0 0 0 / 0.65) 28%, rgb(0 0 0 / 0.92) 34%, black 40%, black 60%, rgb(0 0 0 / 0.92) 66%, rgb(0 0 0 / 0.65) 72%, rgb(0 0 0 / 0.3) 80%, rgb(0 0 0 / 0.08) 88%, transparent 96%)";
function Hero() {
	const magneticRef = useMagnetic();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		id: "top",
		className: "relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-20 short:max-lg:pt-24 short:max-lg:pb-12 lg:pt-48 lg:pb-32",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				"aria-hidden": "true",
				className: "pointer-events-none absolute inset-0",
				style: { background: "linear-gradient(to bottom, #2F2248 0%, #38285A 22%, #452C60 38%, #4E2F62 52%, #45274F 62%, #21162A 76%, var(--background) 100%)" }
			}, void 0, false, {
				fileName: _jsxFileName$11,
				lineNumber: 41,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				"aria-hidden": "true",
				className: "pointer-events-none absolute inset-0 opacity-80",
				style: { background: "linear-gradient(to bottom, transparent 0%, transparent 55%, var(--background) 92%)" }
			}, void 0, false, {
				fileName: _jsxFileName$11,
				lineNumber: 50,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				"aria-hidden": "true",
				className: "pointer-events-none absolute -top-24 right-[-25%] size-[24rem] rounded-full opacity-30 blur-[80px] sm:-top-40 sm:right-[-10%] sm:size-[42rem] sm:blur-[120px]",
				style: { background: "radial-gradient(circle, color-mix(in oklab, var(--primary) 55%, transparent), transparent 70%)" }
			}, void 0, false, {
				fileName: _jsxFileName$11,
				lineNumber: 60,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "container-page relative isolate grid grid-cols-1 items-center gap-y-10 sm:gap-y-14 lg:grid-cols-[1.05fr_0.95fr] lg:grid-rows-[1fr_auto_auto_1fr] lg:gap-x-16 lg:gap-y-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "relative lg:col-start-1 lg:row-start-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "size-1.5 rounded-full bg-primary-soft",
									"aria-hidden": "true"
								}, void 0, false, {
									fileName: _jsxFileName$11,
									lineNumber: 73,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "mono-label text-primary-soft",
									children: hero.badge
								}, void 0, false, {
									fileName: _jsxFileName$11,
									lineNumber: 74,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$11,
								lineNumber: 72,
								columnNumber: 13
							}, this) }, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 71,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
								delay: 90,
								variant: "mask",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
									className: "mt-6 font-display text-hero-title leading-[1.05] font-bold sm:mt-8",
									children: [
										hero.greeting,
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
											fileName: _jsxFileName$11,
											lineNumber: 81,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-primary-soft",
											children: hero.name
										}, void 0, false, {
											fileName: _jsxFileName$11,
											lineNumber: 82,
											columnNumber: 15
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$11,
									lineNumber: 79,
									columnNumber: 13
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 78,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
								delay: 220,
								variant: "mask",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-4 font-display text-hero-subtitle leading-tight font-semibold text-muted-foreground sm:mt-5",
									children: [
										hero.subtitle[0],
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
											fileName: _jsxFileName$11,
											lineNumber: 89,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-foreground",
											children: hero.subtitle[1]
										}, void 0, false, {
											fileName: _jsxFileName$11,
											lineNumber: 90,
											columnNumber: 15
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$11,
									lineNumber: 87,
									columnNumber: 13
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 86,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
								delay: 380,
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-5 max-w-lg leading-relaxed text-muted-foreground sm:mt-7",
									children: hero.description
								}, void 0, false, {
									fileName: _jsxFileName$11,
									lineNumber: 95,
									columnNumber: 13
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 94,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
								delay: 520,
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
										ref: magneticRef,
										href: hero.primaryCta.href,
										className: "magnetic btn-press shine-sweep inline-flex min-h-12 items-center justify-center rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-bright",
										children: hero.primaryCta.label
									}, void 0, false, {
										fileName: _jsxFileName$11,
										lineNumber: 102,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
										href: hero.secondaryCta.href,
										className: "btn-press inline-flex min-h-12 items-center justify-center rounded-xl border border-border-strong bg-surface px-6 py-3.5 text-sm font-medium transition-colors hover:bg-surface-raised",
										children: hero.secondaryCta.label
									}, void 0, false, {
										fileName: _jsxFileName$11,
										lineNumber: 110,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$11,
									lineNumber: 101,
									columnNumber: 13
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 100,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$11,
						lineNumber: 70,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "relative mx-auto w-full max-w-[20rem] sm:max-w-md lg:col-start-2 lg:row-span-4 lg:row-start-1 lg:max-w-none",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								"aria-hidden": "true",
								className: "pointer-events-none absolute -inset-y-[100vh] -inset-x-[70%] -z-20",
								style: {
									WebkitMaskImage: SKY_FEATHER,
									maskImage: SKY_FEATHER
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "absolute inset-x-0 top-0 h-[100vh]",
										style: { background: "linear-gradient(to top, #3C2C5F, #2F2248)" }
									}, void 0, false, {
										fileName: _jsxFileName$11,
										lineNumber: 127,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "absolute inset-x-0 top-[100vh] bottom-[100vh]",
										style: { background: `linear-gradient(to bottom, ${PORTRAIT_SKY})` }
									}, void 0, false, {
										fileName: _jsxFileName$11,
										lineNumber: 132,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-x-0 bottom-0 h-[100vh] bg-background" }, void 0, false, {
										fileName: _jsxFileName$11,
										lineNumber: 137,
										columnNumber: 13
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$11,
								lineNumber: 122,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								"aria-hidden": "true",
								className: "pointer-events-none absolute top-[29%] left-[53%] -z-10 size-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F9B35D] opacity-25 blur-3xl"
							}, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 141,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
								delay: 260,
								variant: "scale",
								className: "relative",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "portrait-float relative",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "relative aspect-[4/5]",
											children: hero.portraitSrc ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
												src: hero.portraitSrc,
												alt: hero.portraitAlt,
												className: "size-full object-cover object-top",
												style: {
													maskImage: "linear-gradient(to right, transparent 0%, black 22%, black 78%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 16%, black 68%, transparent 100%)",
													WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 22%, black 78%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 16%, black 68%, transparent 100%)",
													maskComposite: "intersect",
													WebkitMaskComposite: "source-in, source-over"
												},
												width: 1024,
												height: 1280,
												loading: "eager",
												fetchPriority: "high",
												decoding: "async"
											}, void 0, false, {
												fileName: _jsxFileName$11,
												lineNumber: 152,
												columnNumber: 21
											}, this) }, void 0, false, {
												fileName: _jsxFileName$11,
												lineNumber: 151,
												columnNumber: 19
											}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "flex size-full flex-col items-center justify-center gap-3 rounded-3xl border border-border-strong bg-surface p-8 text-center",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "mono-label text-primary-soft",
													children: "retrato editorial"
												}, void 0, false, {
													fileName: _jsxFileName$11,
													lineNumber: 173,
													columnNumber: 21
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
													className: "max-w-[16rem] text-sm text-muted-foreground",
													children: [
														"Placeholder do Hero. Substitua definindo",
														" ",
														/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("code", {
															className: "font-mono text-foreground",
															children: "portraitSrc"
														}, void 0, false, {
															fileName: _jsxFileName$11,
															lineNumber: 176,
															columnNumber: 23
														}, this),
														" em",
														" ",
														/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("code", {
															className: "font-mono text-foreground",
															children: "src/data/portfolio.ts"
														}, void 0, false, {
															fileName: _jsxFileName$11,
															lineNumber: 177,
															columnNumber: 23
														}, this),
														"."
													]
												}, void 0, true, {
													fileName: _jsxFileName$11,
													lineNumber: 174,
													columnNumber: 21
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$11,
												lineNumber: 172,
												columnNumber: 19
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$11,
											lineNumber: 149,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "absolute top-[12%] -left-2 rounded-lg border border-border-strong bg-background/90 px-2.5 py-1.5 font-mono text-[0.6875rem] backdrop-blur sm:top-[14%] sm:-left-6 sm:px-3 sm:py-2 sm:text-xs",
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "text-primary-soft",
													children: "const "
												}, void 0, false, {
													fileName: _jsxFileName$11,
													lineNumber: 184,
													columnNumber: 17
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "dev" }, void 0, false, {
													fileName: _jsxFileName$11,
													lineNumber: 185,
													columnNumber: 17
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "text-muted-foreground",
													children: " = "
												}, void 0, false, {
													fileName: _jsxFileName$11,
													lineNumber: 186,
													columnNumber: 17
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "text-primary-soft",
													children: "\"muryllo\""
												}, void 0, false, {
													fileName: _jsxFileName$11,
													lineNumber: 187,
													columnNumber: 17
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName$11,
											lineNumber: 183,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "absolute right-0 bottom-[10%] flex items-center gap-2 rounded-lg border border-border-strong bg-background/90 px-2.5 py-1.5 font-mono text-[0.6875rem] backdrop-blur sm:-right-6 sm:px-3 sm:py-2 sm:text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "size-1.5 rounded-full bg-online",
												"aria-hidden": "true"
											}, void 0, false, {
												fileName: _jsxFileName$11,
												lineNumber: 191,
												columnNumber: 17
											}, this), hero.statusChip]
										}, void 0, true, {
											fileName: _jsxFileName$11,
											lineNumber: 190,
											columnNumber: 15
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$11,
									lineNumber: 148,
									columnNumber: 13
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 146,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$11,
						lineNumber: 120,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
						delay: 620,
						className: "lg:col-start-1 lg:row-start-3 lg:mt-14 max-lg:delay-0!",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mono-label text-muted-foreground",
							children: hero.techLabel
						}, void 0, false, {
							fileName: _jsxFileName$11,
							lineNumber: 199,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
							className: "mt-4 flex flex-wrap gap-2 sm:gap-2.5",
							children: hero.tech.map((t, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
								as: "li",
								delay: 40 + i * 40,
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "tech-tile block rounded-lg border border-border-strong bg-surface px-3 py-1.5 font-mono text-xs text-muted-foreground",
									children: t
								}, void 0, false, {
									fileName: _jsxFileName$11,
									lineNumber: 204,
									columnNumber: 17
								}, this)
							}, t, false, {
								fileName: _jsxFileName$11,
								lineNumber: 203,
								columnNumber: 15
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName$11,
							lineNumber: 201,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$11,
						lineNumber: 198,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$11,
				lineNumber: 69,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				"aria-hidden": "true",
				className: "pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center lg:flex",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-col items-center gap-3 opacity-70",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "mono-label text-muted-foreground",
						children: "scroll"
					}, void 0, false, {
						fileName: _jsxFileName$11,
						lineNumber: 219,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "scroll-indicator-line" }, void 0, false, {
						fileName: _jsxFileName$11,
						lineNumber: 220,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$11,
					lineNumber: 218,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$11,
				lineNumber: 214,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$11,
		lineNumber: 36,
		columnNumber: 5
	}, this);
}
var _jsxFileName$10 = "/workspaces/default/code/src/components/portfolio/SectionLabel.tsx";
function SectionLabel({ children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex items-center gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "mono-label whitespace-nowrap text-primary-soft",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "text-primary-soft/60",
				children: "// "
			}, void 0, false, {
				fileName: _jsxFileName$10,
				lineNumber: 5,
				columnNumber: 9
			}, this), children]
		}, void 0, true, {
			fileName: _jsxFileName$10,
			lineNumber: 4,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" }, void 0, false, {
			fileName: _jsxFileName$10,
			lineNumber: 8,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$10,
		lineNumber: 3,
		columnNumber: 5
	}, this);
}
var _jsxFileName$9 = "/workspaces/default/code/src/components/portfolio/Tag.tsx";
function Tag({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
		className: cn("rounded-md border border-primary/25 bg-primary/10 px-2.5 py-1 font-mono text-xs text-primary-soft", className),
		children
	}, void 0, false, {
		fileName: _jsxFileName$9,
		lineNumber: 5,
		columnNumber: 5
	}, this);
}
var _jsxFileName$8 = "/workspaces/default/code/src/components/portfolio/AnimatedStat.tsx";
/**
* Anima números como "6+" e "25+" com um count-up curto quando entram no
* viewport. Valores não numéricos (ex.: "∞") são exibidos como estão —
* sem tentar forçar uma contagem que não faz sentido.
*/
function AnimatedStat({ value }) {
	const match = value.match(/^(\d+)(.*)$/);
	const ref = (0, import_react.useRef)(null);
	const [active, setActive] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el || !match) return;
		if (typeof IntersectionObserver === "undefined") {
			setActive(true);
			return;
		}
		const observer = new IntersectionObserver((entries) => {
			for (const entry of entries) if (entry.isIntersecting) {
				setActive(true);
				observer.disconnect();
			}
		}, { threshold: .4 });
		observer.observe(el);
		return () => observer.disconnect();
	}, [match]);
	const target = match ? Number(match[1]) : 0;
	const suffix = match ? match[2] : "";
	const count = useCountUp(target, active);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
		ref,
		className: "font-display text-3xl font-bold text-primary-soft sm:text-4xl",
		children: match ? `${count}${suffix}` : value
	}, void 0, false, {
		fileName: _jsxFileName$8,
		lineNumber: 41,
		columnNumber: 5
	}, this);
}
var _jsxFileName$7 = "/workspaces/default/code/src/components/portfolio/About.tsx";
function About() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		id: "sobre",
		className: "scroll-mt-24 py-16 sm:py-24 lg:py-32",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "container-page",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionLabel, { children: about.label }, void 0, false, {
				fileName: _jsxFileName$7,
				lineNumber: 12,
				columnNumber: 11
			}, this) }, void 0, false, {
				fileName: _jsxFileName$7,
				lineNumber: 11,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-10 grid grid-cols-1 gap-10 sm:mt-12 sm:gap-12 lg:grid-cols-2 lg:gap-16",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "font-display text-3xl leading-[1.1] font-bold sm:text-4xl lg:text-5xl",
						children: [
							about.title[0],
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 20,
								columnNumber: 17
							}, this),
							about.title[1],
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 22,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-primary-soft",
								children: about.title[2]
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 23,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 18,
						columnNumber: 15
					}, this) }, void 0, false, {
						fileName: _jsxFileName$7,
						lineNumber: 17,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-6 space-y-4 text-muted-foreground sm:mt-8 sm:space-y-5",
						children: about.paragraphs.map((p, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
							delay: i * 70,
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "leading-relaxed",
								children: p
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 30,
								columnNumber: 19
							}, this)
						}, p, false, {
							fileName: _jsxFileName$7,
							lineNumber: 29,
							columnNumber: 17
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName$7,
						lineNumber: 27,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
						delay: 120,
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
							className: "mt-7 flex flex-wrap gap-2 sm:mt-9 sm:gap-2.5",
							children: about.tags.map((t) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tag, { children: t }, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 39,
								columnNumber: 21
							}, this) }, t, false, {
								fileName: _jsxFileName$7,
								lineNumber: 38,
								columnNumber: 19
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 36,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$7,
						lineNumber: 35,
						columnNumber: 13
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName$7,
					lineNumber: 16,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-col gap-8 self-start sm:gap-10",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
						delay: 60,
						className: "relative mx-auto w-full max-w-[220px] sm:max-w-[260px] lg:mx-0 lg:ml-auto",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							"aria-hidden": "true",
							className: "absolute inset-6 rounded-full opacity-60 blur-3xl",
							style: { background: "radial-gradient(circle at 50% 40%, color-mix(in oklab, var(--primary-bright) 55%, transparent), transparent 70%)" }
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 52,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
							src: about.illustrationSrc,
							alt: about.illustrationAlt,
							width: 720,
							height: 717,
							loading: "lazy",
							decoding: "async",
							className: "illustration-float relative w-full drop-shadow-[0_20px_45px_rgba(0,0,0,0.35)]"
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 60,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 47,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
						className: "grid grid-cols-2 gap-3 sm:gap-5",
						children: about.stats.map((s, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
							as: "li",
							delay: i * 80,
							variant: "scale",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "card-hover-lift h-full rounded-2xl border border-border bg-surface p-4 sm:p-7",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AnimatedStat, { value: s.value }, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 75,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-2 text-sm text-muted-foreground",
									children: s.label
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 76,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$7,
								lineNumber: 74,
								columnNumber: 19
							}, this)
						}, s.label, false, {
							fileName: _jsxFileName$7,
							lineNumber: 73,
							columnNumber: 17
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName$7,
						lineNumber: 71,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$7,
					lineNumber: 46,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$7,
				lineNumber: 15,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$7,
			lineNumber: 10,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$7,
		lineNumber: 9,
		columnNumber: 5
	}, this);
}
var techIcons = {
	javascript: {
		name: "JavaScript",
		color: "#F7DF1E",
		path: "M0 0h24v24H0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179z"
	},
	typescript: {
		name: "TypeScript",
		color: "#3B8EDB",
		path: "M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75q.918 0 1.627.111a6.4 6.4 0 0 1 1.306.34v2.458a4 4 0 0 0-.643-.361 5 5 0 0 0-.717-.26 5.5 5.5 0 0 0-1.426-.2q-.45 0-.819.086a2.1 2.1 0 0 0-.623.242q-.254.156-.393.374a.9.9 0 0 0-.14.49q0 .294.156.529.156.234.443.444c.287.21.423.276.696.41q.41.203.926.416.705.296 1.266.628.561.333.963.753.402.418.614.957.213.538.214 1.253 0 .986-.373 1.656a3.03 3.03 0 0 1-1.012 1.085 4.4 4.4 0 0 1-1.487.596q-.85.18-1.79.18a10 10 0 0 1-1.84-.164 5.5 5.5 0 0 1-1.512-.493v-2.63a5.03 5.03 0 0 0 3.237 1.2q.5 0 .872-.09.373-.09.623-.25.249-.162.373-.38a1.02 1.02 0 0 0-.074-1.089 2.1 2.1 0 0 0-.537-.5 5.6 5.6 0 0 0-.807-.444 28 28 0 0 0-1.007-.436q-1.377-.575-2.053-1.405t-.676-2.005q0-.92.369-1.582.368-.662 1.004-1.089a4.5 4.5 0 0 1 1.47-.629 7.5 7.5 0 0 1 1.77-.201m-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"
	},
	react: {
		name: "React",
		color: "#61DAFB",
		path: "M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236m2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38a2.17 2.17 0 0 0-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44a23.5 23.5 0 0 0-3.107-.534A24 24 0 0 0 12.769 4.7c1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442a23 23 0 0 0-3.113.538 15 15 0 0 1-.254-1.42c-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05q.684.704 1.36 1.564c-.44-.02-.89-.034-1.345-.034q-.691-.001-1.36.034c.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093q.61.874 1.183 1.86.557.961 1.018 1.946c-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87a25.6 25.6 0 0 1-4.412.005 27 27 0 0 1-1.183-1.86q-.557-.961-1.018-1.946a25 25 0 0 1 1.013-1.954c.38-.66.773-1.286 1.18-1.868A25 25 0 0 1 12 8.098zm-3.635.254c-.24.377-.48.763-.704 1.16q-.336.585-.635 1.174c-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0q1.044.153 2.006.387c-.18.632-.405 1.282-.66 1.933a25.952 25.952 0 0 0-1.345-2.32zm3.063.675q.727.226 1.375.498c1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493a24 24 0 0 0-1.1-2.98c.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98a23 23 0 0 0-1.086 2.964c-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474s1.12-1.742 2.852-2.476c.42-.18.88-.342 1.356-.494m11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39a26 26 0 0 0 1.341-2.338zm-9.945.02c.2.392.41.783.64 1.175q.345.586.705 1.143a22 22 0 0 1-2.006-.386c.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295a1.2 1.2 0 0 1-.553-.132c-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64q.661.032 1.345.034.691.001 1.36-.034c-.44.572-.895 1.095-1.345 1.565q-.684-.706-1.36-1.565"
	},
	tailwind: {
		name: "Tailwind CSS",
		color: "#38BDF8",
		path: "M12.001 4.8q-4.8 0-6 4.8 1.8-2.4 4.2-1.8c.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12q4.8 0 6-4.8-1.8 2.4-4.2 1.8c-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8m-6 7.2q-4.8 0-6 4.8 1.8-2.4 4.2-1.8c.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576q4.8 0 6-4.8-1.8 2.4-4.2 1.8c-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12"
	},
	tanstack: {
		name: "TanStack Start",
		color: "#E5E7EB",
		path: "M11.078.042c.316-.042.65-.014.97-.014 1.181 0 2.341.184 3.472.532a12.3 12.3 0 0 1 3.973 2.086 11.9 11.9 0 0 1 3.432 4.33c1.446 3.15 1.436 6.97-.046 10.107-.958 2.029-2.495 3.727-4.356 4.965-1.518 1.01-3.293 1.629-5.1 1.848-2.298.279-4.784-.129-6.85-1.188-3.88-1.99-6.518-5.994-6.57-10.382-.01-.846.003-1.697.17-2.534.273-1.365.748-2.683 1.463-3.88a12 12 0 0 1 2.966-3.36A12.3 12.3 0 0 1 9.357.3a12 12 0 0 1 1.255-.2l.133-.016zM7.064 19.99c-.535.057-1.098.154-1.557.454.103.025.222 0 .33 0 .258 0 .52-.01.778.002.647.028 1.32.131 1.945.303.8.22 1.505.65 2.275.942.813.307 1.622.402 2.484.402.435 0 .866-.001 1.287-.12-.22-.117-.534-.095-.778-.144a11 11 0 0 1-1.556-.416 12 12 0 0 1-1.093-.467l-.23-.108a15 15 0 0 0-1.012-.44c-.905-.343-1.908-.512-2.873-.408m.808-2.274c-1.059 0-2.13.187-3.083.667q-.346.177-.659.41c-.063.046-.175.106-.199.188s.061.151.11.204c.238-.127.464-.261.718-.357 1.64-.624 3.63-.493 5.268.078.817.285 1.569.712 2.365 1.046.89.374 1.798.616 2.753.74 1.127.147 2.412.028 3.442-.48.362-.179.865-.451 1.018-.847-.189.017-.36.098-.539.154a9 9 0 0 1-.868.222c-.994.2-2.052.24-3.053.06-.943-.17-1.82-.513-2.693-.873l-.111-.046-.223-.092-.112-.046a26 26 0 0 0-1.35-.527c-.89-.31-1.842-.5-2.784-.5M9.728 1.452c-1.27.28-2.407.826-3.502 1.514-.637.4-1.245.81-1.796 1.323-.82.765-1.447 1.695-1.993 2.666-.563 1-.924 2.166-1.098 3.297-.172 1.11-.2 2.277-.004 3.388.245 1.388.712 2.691 1.448 3.897.248-.116.424-.38.629-.557.414-.359.85-.691 1.317-.978a3.5 3.5 0 0 1 .539-.264c.07-.029.187-.055.22-.132.053-.124-.045-.34-.062-.468a7 7 0 0 1-.068-1.109 9.7 9.7 0 0 1 .61-3.177c.29-.76.73-1.45 1.254-2.069.177-.21.365-.405.56-.6.115-.114.258-.212.33-.359-.376 0-.751.108-1.108.218-.769.237-1.518.588-2.155 1.084-.291.226-.504.522-.779.76-.084.073-.235.17-.352.116-.176-.083-.149-.43-.169-.59-.078-.612.154-1.387.45-1.918.473-.852 1.348-1.58 2.376-1.555.444.011.833.166 1.257.266-.107-.153-.252-.264-.389-.39a5.4 5.4 0 0 0-1.107-.8c-.163-.085-.338-.136-.509-.2-.086-.03-.195-.074-.227-.17-.06-.177.26-.342.377-.417.453-.289 1.01-.527 1.556-.54.854-.021 1.688.452 2.04 1.258.123.284.16.583.184.885l.004.057.006.085.002.029.005.057.004.056c.268-.218.457-.54.718-.774.612-.547 1.45-.79 2.245-.544a2.97 2.97 0 0 1 1.71 1.378c.097.173.365.595.171.767-.152.134-.344.03-.504-.026a3 3 0 0 0-.372-.094l-.068-.014-.069-.013a3.9 3.9 0 0 0-1.377-.002c-.282.05-.557.15-.838.192v.06c.768.006 1.51.444 1.89 1.109.157.275.235.59.295.9.075.38.022.796-.082 1.168-.035.125-.098.336-.247.365-.106.02-.195-.085-.256-.155a4.6 4.6 0 0 0-.492-.522 20 20 0 0 0-1.467-1.14c-.267-.19-.56-.44-.868-.556.087.208.171.402.2.63.088.667-.192 1.296-.612 1.798a2.6 2.6 0 0 1-.426.427c-.067.05-.151.114-.24.1-.277-.044-.31-.463-.353-.677-.144-.726-.086-1.447.114-2.158-.178.09-.307.287-.418.45a5.3 5.3 0 0 0-.612 1.138c-.61 1.617-.604 3.51.186 5.066.088.174.221.15.395.15h.157a3 3 0 0 1 .472.018c.08.01.193 0 .257.06.077.072.036.194.018.282-.05.246-.066.469-.066.72.328-.051.419-.576.535-.84.131-.298.265-.597.387-.9.06-.148.14-.314.119-.479-.024-.185-.157-.381-.25-.54-.177-.298-.378-.606-.508-.929-.104-.258-.007-.58.286-.672.161-.05.334.049.439.166.22.244.363.609.523.896l1.249 2.248q.159.286.32.57c.043.074.086.188.173.219.077.028.182-.012.26-.027.198-.04.398-.083.598-.12.24-.043.605-.035.778-.222-.253-.08-.545-.075-.808-.057-.158.01-.333.067-.479-.025-.216-.137-.36-.455-.492-.667-.326-.525-.633-1.057-.945-1.59l-.05-.084-.1-.17q-.075-.126-.149-.255c-.037-.066-.092-.153-.039-.227.056-.076.179-.08.29-.081h.021q.066.001.117-.004a10 10 0 0 1 1.347-.107c-.035-.122-.135-.26-.103-.39.071-.292.49-.383.686-.174.131.14.207.334.292.504.113.223.24.44.361.66.211.383.441.757.658 1.138l.055.094.028.047c.093.156.187.314.238.489-.753-.035-1.318-.909-1.646-1.499-.027.095.016.179.05.27q.103.282.262.54c.152.244.326.495.556.673.408.315.945.317 1.436.283.315-.022.708-.165 1.018-.068s.434.438.25.7c-.138.196-.321.27-.55.3.162.346.373.667.527 1.02.064.146.13.37.283.448.102.051.248.003.358 0-.11-.292-.317-.54-.419-.839.31.015.61.176.898.28.567.202 1.128.424 1.687.648l.258.104c.23.092.462.183.689.283.083.037.198.123.29.07.074-.043.123-.146.169-.215a10.3 10.3 0 0 0 1.393-3.208c.75-2.989.106-6.287-1.695-8.783-.692-.96-1.562-1.789-2.522-2.476-2.401-1.718-5.551-2.407-8.44-1.768m4.908 14.904c-.636.166-1.292.317-1.945.401.086.293.296.577.45.84.059.101.122.237.24.281.132.05.292-.03.417-.072-.058-.158-.155-.3-.235-.45-.033-.06-.084-.133-.056-.206.05-.137.263-.13.381-.153.31-.063.617-.142.928-.204.114-.023.274-.085.389-.047.086.03.138.1.187.174l.022.033q.043.07.097.122c.125.113.313.13.472.162-.097-.219-.259-.41-.362-.63-.06-.127-.11-.315-.242-.388-.182-.102-.557.089-.743.137m-4.01-1.457c-.03.38-.147.689-.33 1.019.21.026.423.036.629.087.154.038.296.11.449.153-.082-.224-.233-.423-.35-.63-.12-.208-.226-.462-.398-.63"
	},
	nodejs: {
		name: "Node.js",
		color: "#6CC24A",
		path: "M11.998 24c-.321 0-.641-.084-.922-.247L8.14 22.016c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339a.29.29 0 0 0 .272 0l8.795-5.076a.28.28 0 0 0 .134-.238V6.921a.28.28 0 0 0-.137-.242l-8.791-5.072a.28.28 0 0 0-.271 0L3.075 6.68a.28.28 0 0 0-.139.241v10.15a.27.27 0 0 0 .139.235l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675a1.86 1.86 0 0 1-.922-1.604V6.921c0-.659.353-1.275.922-1.603L11.075.236a1.93 1.93 0 0 1 1.848 0l8.794 5.082c.57.329.924.944.924 1.603v10.15a1.86 1.86 0 0 1-.924 1.604l-8.794 5.078c-.28.163-.599.247-.925.247m7.101-10.007c0-1.9-1.284-2.406-3.987-2.763-2.731-.361-3.009-.548-3.009-1.187 0-.528.235-1.233 2.258-1.233 1.807 0 2.473.389 2.747 1.607a.254.254 0 0 0 .247.199h1.141a.26.26 0 0 0 .186-.081.26.26 0 0 0 .067-.196c-.177-2.098-1.571-3.076-4.388-3.076-2.508 0-4.004 1.058-4.004 2.833 0 1.925 1.488 2.457 3.895 2.695 2.88.282 3.103.703 3.103 1.269 0 .983-.789 1.402-2.642 1.402-2.327 0-2.839-.584-3.011-1.742a.255.255 0 0 0-.253-.215h-1.137a.25.25 0 0 0-.254.253c0 1.482.806 3.248 4.655 3.248 2.788.001 4.386-1.096 4.386-3.013"
	},
	postgresql: {
		name: "PostgreSQL",
		color: "#5B8FD6",
		path: "M23.56 14.723a.5.5 0 0 0-.057-.12q-.21-.395-1.007-.231c-1.654.34-2.294.13-2.526-.02 1.342-2.048 2.445-4.522 3.041-6.83.272-1.05.798-3.523.122-4.73a1.6 1.6 0 0 0-.15-.236C21.693.91 19.8.025 17.51.001c-1.495-.016-2.77.346-3.116.479a10 10 0 0 0-.516-.082 8 8 0 0 0-1.312-.127c-1.182-.019-2.203.264-3.05.84C8.66.79 4.729-.534 2.296 1.19.935 2.153.309 3.873.43 6.304c.041.818.507 3.334 1.243 5.744q.69 2.26 1.433 3.582.83 1.493 1.714 1.79c.448.148 1.133.143 1.858-.729a56 56 0 0 1 1.945-2.206c.435.235.906.362 1.39.377v.004a11 11 0 0 0-.247.305c-.339.43-.41.52-1.5.745-.31.064-1.134.233-1.146.811a.6.6 0 0 0 .091.327c.227.423.922.61 1.015.633 1.335.333 2.505.092 3.372-.679-.017 2.231.077 4.418.345 5.088.221.553.762 1.904 2.47 1.904q.375.001.829-.094c1.782-.382 2.556-1.17 2.855-2.906.15-.87.402-2.875.539-4.101.017-.07.036-.12.057-.136 0 0 .07-.048.427.03l.044.007.254.022.015.001c.847.039 1.911-.142 2.531-.43.644-.3 1.806-1.033 1.595-1.67M2.37 11.876c-.744-2.435-1.178-4.885-1.212-5.571-.109-2.172.417-3.683 1.562-4.493 1.837-1.299 4.84-.54 6.108-.13l-.01.01C6.795 3.734 6.843 7.226 6.85 7.44c0 .082.006.199.016.36.034.586.1 1.68-.074 2.918-.16 1.15.194 2.276.973 3.089q.12.126.252.237c-.347.371-1.1 1.193-1.903 2.158-.568.682-.96.551-1.088.508-.392-.13-.813-.587-1.239-1.322-.48-.839-.963-2.032-1.415-3.512m6.007 5.088a1.6 1.6 0 0 1-.432-.178c.089-.039.237-.09.483-.14 1.284-.265 1.482-.451 1.915-1 .099-.127.211-.27.367-.443a.4.4 0 0 0 .074-.13c.17-.151.272-.11.436-.042.156.065.308.26.37.475.03.102.062.295-.045.445-.904 1.266-2.222 1.25-3.168 1.013m2.094-3.988-.052.14c-.133.357-.257.689-.334 1.004-.667-.002-1.317-.288-1.81-.803-.628-.655-.913-1.566-.783-2.5.183-1.308.116-2.447.08-3.059l-.013-.22c.296-.262 1.666-.996 2.643-.772.446.102.718.406.83.928.585 2.704.078 3.83-.33 4.736a9 9 0 0 0-.23.546m7.364 4.572q-.024.266-.062.596l-.146.438a.4.4 0 0 0-.018.108c-.006.475-.054.649-.115.87-.064.229-.135.488-.18 1.057-.11 1.414-.878 2.227-2.417 2.556-1.515.325-1.784-.496-2.02-1.221a7 7 0 0 0-.078-.227c-.215-.586-.19-1.412-.157-2.555.016-.561-.025-1.901-.33-2.646q.006-.44.019-.892a.4.4 0 0 0-.016-.113 2 2 0 0 0-.044-.208c-.122-.428-.42-.786-.78-.935-.142-.059-.403-.167-.717-.087.067-.276.183-.587.309-.925l.053-.142c.06-.16.134-.325.213-.5.426-.948 1.01-2.246.376-5.178-.237-1.098-1.03-1.634-2.232-1.51-.72.075-1.38.366-1.709.532a6 6 0 0 0-.196.104c.092-1.106.439-3.174 1.736-4.482a4 4 0 0 1 .303-.276.35.35 0 0 0 .145-.064c.752-.57 1.695-.85 2.802-.833q.616.01 1.174.081c1.94.355 3.244 1.447 4.036 2.383.814.962 1.255 1.931 1.431 2.454-1.323-.134-2.223.127-2.68.78-.992 1.418.544 4.172 1.282 5.496.135.242.252.452.289.54.24.583.551.972.778 1.256.07.087.138.171.189.245-.4.116-1.12.383-1.055 1.717-.013.156-.043.447-.084.815-.046.208-.07.46-.1.766m.89-1.621c-.04-.832.27-.919.597-1.01l.135-.041a1 1 0 0 0 .134.103c.57.376 1.583.421 3.007.134-.202.177-.519.4-.953.601-.41.19-1.096.333-1.747.364-.72.034-1.086-.08-1.173-.151m.57-9.271c-.006.35-.054.669-.105 1.001-.055.358-.112.728-.127 1.177-.014.436.04.89.093 1.33.107.887.216 1.8-.207 2.701a4 4 0 0 1-.188-.385 8 8 0 0 0-.325-.617c-.616-1.104-2.057-3.69-1.32-4.744.38-.543 1.342-.566 2.179-.463m.228 7.013-.085-.107-.035-.044c.726-1.2.584-2.387.457-3.439-.052-.432-.1-.84-.088-1.222.013-.407.066-.755.118-1.092.064-.415.13-.844.111-1.35a.6.6 0 0 0 .012-.19c-.046-.486-.6-1.938-1.73-3.253a7.8 7.8 0 0 0-2.688-2.04A9.3 9.3 0 0 1 17.62.746c2.052.046 3.675.814 4.824 2.283a1 1 0 0 1 .067.1c.723 1.356-.276 6.275-2.987 10.54m-8.816-6.116c-.025.18-.31.423-.621.423a1 1 0 0 1-.081-.006.8.8 0 0 1-.506-.315c-.046-.06-.12-.178-.106-.285a.22.22 0 0 1 .093-.149c.118-.089.352-.122.61-.086.316.044.642.193.61.418m7.93-.411c.011.08-.049.2-.153.31a.72.72 0 0 1-.408.223 1 1 0 0 1-.075.005c-.293 0-.541-.234-.56-.371-.024-.177.264-.31.56-.352.298-.042.612.009.636.185"
	},
	rust: {
		name: "Rust",
		color: "#E8946A",
		path: "m23.835 11.703-1.008-.623-.028-.294.866-.807a.348.348 0 0 0-.116-.578l-1.106-.414a9 9 0 0 0-.087-.285l.69-.96a.346.346 0 0 0-.226-.544l-1.166-.19a9 9 0 0 0-.14-.261l.49-1.076a.34.34 0 0 0-.028-.336.35.35 0 0 0-.3-.154l-1.185.041a7 7 0 0 0-.188-.227l.273-1.153a.347.347 0 0 0-.417-.417l-1.153.273-.228-.188.041-1.184a.344.344 0 0 0-.49-.328l-1.076.49-.262-.14-.19-1.167a.348.348 0 0 0-.545-.226l-.96.69a9 9 0 0 0-.285-.086L14.597.453a.348.348 0 0 0-.578-.116l-.807.867a9 9 0 0 0-.294-.028L12.295.168a.346.346 0 0 0-.59 0l-.623 1.008-.294.028L9.98.337a.346.346 0 0 0-.578.116l-.414 1.106-.285.086-.959-.69a.348.348 0 0 0-.545.226l-.19 1.167a9 9 0 0 0-.262.14l-1.076-.49a.346.346 0 0 0-.49.328l.041 1.184a8 8 0 0 0-.228.187l-1.153-.272a.347.347 0 0 0-.417.417l.271 1.153-.186.227-1.184-.042a.346.346 0 0 0-.328.49l.49 1.077a9 9 0 0 0-.14.262l-1.166.19a.348.348 0 0 0-.226.544l.69.958-.087.286-1.106.414a.348.348 0 0 0-.116.578l.866.807a9 9 0 0 0-.028.294l-1.008.623a.344.344 0 0 0 0 .59l1.008.623q.012.147.028.294l-.866.807a.346.346 0 0 0 .116.578l1.106.415q.042.144.087.285l-.69.959a.345.345 0 0 0 .227.544l1.166.19q.069.132.14.262l-.49 1.076a.346.346 0 0 0 .328.49l1.183-.041q.093.115.187.227l-.27 1.154a.346.346 0 0 0 .416.417l1.153-.272q.113.096.228.187l-.041 1.184a.344.344 0 0 0 .49.327l1.076-.49q.13.073.262.14l.19 1.167a.348.348 0 0 0 .545.227l.959-.69a9 9 0 0 0 .285.086l.414 1.107a.345.345 0 0 0 .578.115l.808-.865.294.03.623 1.006a.347.347 0 0 0 .59 0l.623-1.007q.148-.013.294-.03l.807.866a.348.348 0 0 0 .578-.115l.414-1.107a9 9 0 0 0 .285-.087l.959.69a.345.345 0 0 0 .545-.226l.19-1.166.262-.14 1.076.49a.347.347 0 0 0 .49-.328l-.041-1.184a7 7 0 0 0 .227-.187l1.153.272a.347.347 0 0 0 .417-.416l-.272-1.155q.095-.112.187-.227l1.184.041a.344.344 0 0 0 .328-.49l-.49-1.076q.072-.13.141-.262l1.166-.19a.348.348 0 0 0 .226-.544l-.69-.959.087-.285 1.106-.414a.346.346 0 0 0 .116-.579l-.866-.807q.016-.147.028-.294l1.008-.624a.344.344 0 0 0 0-.589zm-6.742 8.355a.714.714 0 0 1 .299-1.396.714.714 0 1 1-.3 1.396zm-.342-2.314a.65.65 0 0 0-.771.5l-.358 1.669a8.7 8.7 0 0 1-3.619.78 8.7 8.7 0 0 1-3.695-.815L7.95 18.21a.65.65 0 0 0-.772-.5l-1.473.317a9 9 0 0 1-.761-.898h7.167c.081 0 .136-.014.136-.088v-2.536c0-.074-.054-.088-.136-.088h-2.096v-1.608h2.268c.206 0 1.106.059 1.393 1.209.09.353.288 1.504.424 1.873.134.413.683 1.238 1.268 1.238h3.572a1 1 0 0 0 .13-.013 9 9 0 0 1-.813.952zm-9.914 2.28a.714.714 0 1 1-.3-1.396.714.714 0 0 1 .3 1.396M4.117 8.997a.714.714 0 1 1-1.303.58.714.714 0 0 1 1.304-.58m-.834 1.981 1.534-.682a.65.65 0 0 0 .33-.858l-.316-.715h1.244v5.602H3.567a8.8 8.8 0 0 1-.284-3.348zm6.734-.543V8.784h2.96c.153 0 1.08.177 1.08.87 0 .574-.712.78-1.296.78zm10.757 1.486q0 .329-.024.651h-.9c-.09 0-.127.059-.127.148v.413c0 .973-.548 1.184-1.03 1.238-.457.052-.964-.191-1.027-.472-.27-1.518-.72-1.843-1.43-2.403.882-.56 1.799-1.386 1.799-2.492 0-1.193-.82-1.945-1.377-2.315-.783-.516-1.65-.62-1.883-.62H5.468a8.77 8.77 0 0 1 4.907-2.77l1.098 1.152a.65.65 0 0 0 .918.02l1.227-1.173a8.78 8.78 0 0 1 6.004 4.276l-.84 1.898a.65.65 0 0 0 .33.859l1.618.718q.042.43.042.872zm-9.3-9.6a.713.713 0 1 1 .984 1.032.714.714 0 0 1-.984-1.031m8.339 6.71a.71.71 0 0 1 .939-.362.714.714 0 1 1-.94.364z"
	},
	sqlite: {
		name: "SQLite",
		color: "#4FA9D8",
		path: "M21.678.521c-1.032-.92-2.28-.55-3.513.544a9 9 0 0 0-.547.535c-2.109 2.237-4.066 6.38-4.674 9.544.237.48.422 1.093.544 1.561a13 13 0 0 1 .164.703s-.019-.071-.096-.296l-.05-.146-.033-.08c-.138-.32-.518-.995-.686-1.289-.143.423-.27.818-.376 1.176.484.884.778 2.4.778 2.4s-.025-.099-.147-.442c-.107-.303-.644-1.244-.772-1.464-.217.804-.304 1.346-.226 1.478.152.256.296.698.422 1.186.286 1.1.485 2.44.485 2.44l.017.224a22 22 0 0 0 .056 2.748c.095 1.146.273 2.13.5 2.657l.155-.084c-.334-1.038-.47-2.399-.41-3.967.09-2.398.642-5.29 1.661-8.304 1.723-4.55 4.113-8.201 6.3-9.945-1.993 1.8-4.692 7.63-5.5 9.788-.904 2.416-1.545 4.684-1.931 6.857.666-2.037 2.821-2.912 2.821-2.912s1.057-1.304 2.292-3.166c-.74.169-1.955.458-2.362.629-.6.251-.762.337-.762.337s1.945-1.184 3.613-1.72C21.695 7.9 24.195 2.767 21.678.521m-18.573.543A1.84 1.84 0 0 0 1.27 2.9v16.608a1.84 1.84 0 0 0 1.835 1.834h9.418a23 23 0 0 1-.052-2.707c-.006-.062-.011-.141-.016-.2a27 27 0 0 0-.473-2.378c-.121-.47-.275-.898-.369-1.057-.116-.197-.098-.31-.097-.432 0-.12.015-.245.037-.386a10 10 0 0 1 .234-1.045l.217-.028c-.017-.035-.014-.065-.031-.097l-.041-.381a33 33 0 0 1 .382-1.194l.2-.019c-.008-.016-.01-.038-.018-.053l-.043-.316c.63-3.28 2.587-7.443 4.8-9.791.066-.069.133-.128.198-.194Z"
	},
	firebase: {
		name: "Firebase",
		color: "#FFCA28",
		path: "M19.455 8.369c-.538-.748-1.778-2.285-3.681-4.569a447 447 0 0 0-1.884-2.245l-.488-.576-.207-.245-.113-.133-.022-.032-.01-.005L12.57 0l-.609.488a13.34 13.34 0 0 0-3.681 4.64 11.4 11.4 0 0 0-1.043 3.176 12 12 0 0 0-.121.738 11 11 0 0 0-.632-.033l-.059-.003a7.5 7.5 0 0 0-2.28.274l-.317.089-.163.286a9.6 9.6 0 0 0-1.252 4.416 9.53 9.53 0 0 0 1.583 5.625 9.57 9.57 0 0 0 4.42 3.611l.236.095.071.025.003-.001a9.6 9.6 0 0 0 2.941.568q.171.006.342.006a9.5 9.5 0 0 0 3.69-.742l.008.004.313-.145a9.63 9.63 0 0 0 3.927-3.335 9.6 9.6 0 0 0 1.641-5.042c.075-2.161-.643-4.304-2.133-6.371m-7.083 6.695c.328 1.244.264 2.44-.191 3.558-1.135-1.12-1.967-2.352-2.475-3.665-.543-1.404-.87-2.74-.974-3.975.48.157.922.366 1.315.622 1.132.737 1.914 1.902 2.325 3.461zm.207 6.022c.482.368.99.712 1.513 1.028a7.9 7.9 0 0 1-2.369.273 8 8 0 0 1-.373-.022 9 9 0 0 0 1.228-1.279zm1.347-6.431c-.516-1.957-1.527-3.437-3.002-4.398a7.4 7.4 0 0 0-2.194-.95 9 9 0 0 1 .089-.713 11.6 11.6 0 0 1 .91-2.765l.004-.008c.177-.358.376-.719.61-1.105l.092-.152-.003-.001a11.7 11.7 0 0 1 1.942-2.311l.288.341c.672.796 1.304 1.548 1.878 2.237 1.291 1.549 2.966 3.583 3.612 4.48 1.277 1.771 1.893 3.579 1.83 5.375a7.97 7.97 0 0 1-3.995 6.641 15.5 15.5 0 0 1-2.539-1.599c.79-1.575.952-3.28.479-5.072zm-2.575 5.397a7.9 7.9 0 0 1-2.09 1.856 6 6 0 0 1-.243-.093l-.065-.026a7.97 7.97 0 0 1-3.635-3.01 7.94 7.94 0 0 1-1.298-4.653 7.9 7.9 0 0 1 .882-3.379q.476-.105.96-.131l.084-.002q.245-.005.478 0 .341.017.677.07c.073 1.513.445 3.145 1.105 4.852.637 1.644 1.694 3.162 3.144 4.515z"
	},
	vitest: {
		name: "Vitest",
		color: "#8BC34A",
		path: "M13.74 1.053a.5.5 0 0 0-.157.025.5.5 0 0 0-.25.188L7.595 9.562a.5.5 0 0 0-.084.223.5.5 0 0 0 .032.236.5.5 0 0 0 .14.193.5.5 0 0 0 .215.105l3.707.786-.23 4.58a.5.5 0 0 0 .085.3.5.5 0 0 0 .25.189.5.5 0 0 0 .313 0 .5.5 0 0 0 .25-.187l5.738-8.296a.5.5 0 0 0 .084-.223.5.5 0 0 0-.032-.236.5.5 0 0 0-.14-.194.5.5 0 0 0-.215-.104l-3.707-.787.23-4.58a.5.5 0 0 0-.085-.3.5.5 0 0 0-.25-.188.5.5 0 0 0-.156-.026M1.157 9.788c-.307.001-.6.124-.817.34a1.16 1.16 0 0 0-.34.817 1.16 1.16 0 0 0 .334.82l10.842 10.842a1.2 1.2 0 0 0 .377.252 1.2 1.2 0 0 0 .445.088h.004a1.2 1.2 0 0 0 .445-.088 1.2 1.2 0 0 0 .377-.252l10.842-10.843a1.16 1.16 0 0 0 .334-.82 1.16 1.16 0 0 0-.34-.816 1.16 1.16 0 0 0-.817-.34 1.16 1.16 0 0 0-.82.334l-5.4 5.4-.026.02L12 20.14l-4.598-4.597q-.011-.01-.024-.02l-5.401-5.401a1.16 1.16 0 0 0-.82-.334"
	},
	docker: {
		name: "Docker",
		color: "#2496ED",
		path: "M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51q-.508.001-1.01.087c-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.75.75 0 0 0-.75.748 11.4 11.4 0 0 0 .692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137a15.7 15.7 0 0 0 2.93-.266 12.3 12.3 0 0 0 3.823-1.389 10.5 10.5 0 0 0 2.61-2.136c1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"
	},
	githubactions: {
		name: "GitHub Actions",
		color: "#2088FF",
		path: "M10.984 13.836a.5.5 0 0 1-.353-.146l-.745-.743a.5.5 0 1 1 .706-.708l.392.391 1.181-1.18a.5.5 0 0 1 .708.707l-1.535 1.533a.5.5 0 0 1-.354.146m9.353-.147 1.534-1.532a.5.5 0 0 0-.707-.707l-1.181 1.18-.392-.391a.5.5 0 1 0-.706.708l.746.743a.497.497 0 0 0 .706-.001M4.527 7.452l2.557-1.585A1 1 0 0 0 7.09 4.17L4.533 2.56A1 1 0 0 0 3 3.406v3.196a1.001 1.001 0 0 0 1.527.85m2.03-2.436L4 6.602V3.406zM24 12.5c0 1.93-1.57 3.5-3.5 3.5a3.5 3.5 0 0 1-3.46-3h-2.08a3.5 3.5 0 0 1-3.46 3 3.5 3.5 0 0 1-3.46-3h-.558c-.972 0-1.85-.399-2.482-1.042V17c0 1.654 1.346 3 3 3h.04c.244-1.693 1.7-3 3.46-3 1.93 0 3.5 1.57 3.5 3.5S13.43 24 11.5 24a3.5 3.5 0 0 1-3.46-3H8c-2.206 0-4-1.794-4-4V9.899A5.01 5.01 0 0 1 0 5c0-2.757 2.243-5 5-5s5 2.243 5 5a5.005 5.005 0 0 1-4.952 4.998A2.48 2.48 0 0 0 7.482 12h.558c.244-1.693 1.7-3 3.46-3a3.5 3.5 0 0 1 3.46 3h2.08a3.5 3.5 0 0 1 3.46-3c1.93 0 3.5 1.57 3.5 3.5m-15 8c0 1.378 1.122 2.5 2.5 2.5s2.5-1.122 2.5-2.5-1.122-2.5-2.5-2.5S9 19.122 9 20.5M5 9c2.206 0 4-1.794 4-4S7.206 1 5 1 1 2.794 1 5s1.794 4 4 4m9 3.5c0-1.378-1.122-2.5-2.5-2.5S9 11.122 9 12.5s1.122 2.5 2.5 2.5 2.5-1.122 2.5-2.5m9 0c0-1.378-1.122-2.5-2.5-2.5S18 11.122 18 12.5s1.122 2.5 2.5 2.5 2.5-1.122 2.5-2.5m-13 8a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0m2 0a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0m12 0c0 1.93-1.57 3.5-3.5 3.5a3.5 3.5 0 0 1-3.46-3.002q-.01.003-.021.005l-.506.017h-.017a.5.5 0 0 1-.016-.999l.506-.017c.018-.002.035.006.052.007A3.5 3.5 0 0 1 20.5 17c1.93 0 3.5 1.57 3.5 3.5m-1 0c0-1.378-1.122-2.5-2.5-2.5S18 19.122 18 20.5s1.122 2.5 2.5 2.5 2.5-1.122 2.5-2.5"
	},
	git: {
		name: "Git",
		color: "#F05032",
		path: "M23.546 10.93 13.067.452a1.55 1.55 0 0 0-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 0 1 2.327 2.341l2.658 2.66a1.838 1.838 0 0 1 1.9 3.039 1.837 1.837 0 0 1-2.6 0 1.85 1.85 0 0 1-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348a1.85 1.85 0 0 1 0 2.6 1.844 1.844 0 0 1-2.609 0 1.834 1.834 0 0 1 0-2.598c.182-.18.387-.316.605-.406V8.835a1.834 1.834 0 0 1-.996-2.41L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477a1.545 1.545 0 0 0 2.186 0l10.43-10.43a1.544 1.544 0 0 0 0-2.187"
	},
	cloudflare: {
		name: "Cloudflare",
		color: "#F38020",
		path: "M16.509 16.845c.147-.507.09-.971-.155-1.316-.225-.316-.605-.499-1.062-.52l-8.66-.113a.16.16 0 0 1-.133-.07.2.2 0 0 1-.02-.156.24.24 0 0 1 .203-.156l8.736-.113c1.035-.049 2.16-.886 2.554-1.913l.499-1.302a.27.27 0 0 0 .014-.168 5.689 5.689 0 0 0-10.937-.584 2.58 2.58 0 0 0-1.794-.498 2.56 2.56 0 0 0-2.223 3.18A3.634 3.634 0 0 0 0 16.751q.002.264.035.527a.174.174 0 0 0 .17.148h15.98c.091 0 .176-.065.204-.155zm2.757-5.564c-.077 0-.161 0-.239.011-.056 0-.105.042-.127.098l-.337 1.174c-.148.507-.092.971.154 1.317.225.316.605.498 1.062.52l1.844.113c.056 0 .105.026.133.07a.2.2 0 0 1 .021.156.24.24 0 0 1-.204.156l-1.92.112c-1.042.049-2.159.887-2.553 1.914l-.141.358c-.028.072.021.142.099.142h6.597a.174.174 0 0 0 .17-.126c.111-.408.175-.837.175-1.28a4.74 4.74 0 0 0-4.734-4.727"
	},
	python: {
		name: "Python",
		color: "#4B8BBE",
		path: "m14.25.18.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"
	}
};
var _jsxFileName$6 = "/workspaces/default/code/src/components/portfolio/Stack.tsx";
function smoothstep(value) {
	const clamped = Math.min(Math.max(value, 0), 1);
	return clamped * clamped * (3 - 2 * clamped);
}
/**
* Faixa com as principais tecnologias do card. O SVG é decorativo (aria-hidden); o nome
* fica em texto para leitores de tela e aparece como rótulo discreto no hover.
*/
function StackIcons({ keys }) {
	const icons = keys.filter((key) => key in techIcons).map((k) => techIcons[k]);
	if (icons.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
		className: "stack-icons",
		"aria-label": "Principais tecnologias deste grupo",
		children: icons.map((icon) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
			className: "stack-icon",
			"data-label": icon.name,
			style: { "--icon-color": icon.color },
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
				viewBox: "0 0 24 24",
				fill: "currentColor",
				"aria-hidden": "true",
				focusable: "false",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: icon.path }, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 31,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 30,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "sr-only",
				children: icon.name
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 33,
				columnNumber: 11
			}, this)]
		}, icon.name, true, {
			fileName: _jsxFileName$6,
			lineNumber: 24,
			columnNumber: 9
		}, this))
	}, void 0, false, {
		fileName: _jsxFileName$6,
		lineNumber: 22,
		columnNumber: 5
	}, this);
}
function Stack() {
	const storyRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const story = storyRef.current;
		if (!story) return;
		const cards = Array.from(story.querySelectorAll("[data-stack-card]"));
		const desktop = window.matchMedia("(min-width: 48rem) and (min-height: 42rem)");
		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
		let frame = 0;
		const resetCards = () => {
			story.removeAttribute("data-active");
			cards.forEach((card) => {
				card.style.removeProperty("--stack-card-y");
				card.style.removeProperty("--stack-card-scale");
			});
		};
		const update = () => {
			frame = 0;
			if (!desktop.matches || reducedMotion.matches) {
				resetCards();
				return;
			}
			const storyTop = story.getBoundingClientRect().top + window.scrollY;
			const stepLength = window.innerHeight * .85;
			const progress = Math.min(Math.max((window.scrollY - storyTop) / stepLength, 0), cards.length - 1);
			story.dataset.active = "true";
			cards.forEach((card, index) => {
				const reveal = index === 0 ? 1 : smoothstep(progress - (index - 1));
				const depth = Math.min(Math.max(progress - index, 0), cards.length);
				const entrance = (1 - reveal) * Math.min(window.innerHeight * .82, 720);
				const restingOffset = index * 18;
				card.style.setProperty("--stack-card-y", `${entrance + restingOffset - depth * 8}px`);
				card.style.setProperty("--stack-card-scale", `${1 - depth * .014}`);
			});
		};
		const requestUpdate = () => {
			if (!frame) frame = window.requestAnimationFrame(update);
		};
		update();
		window.addEventListener("scroll", requestUpdate, { passive: true });
		window.addEventListener("resize", requestUpdate);
		desktop.addEventListener("change", requestUpdate);
		reducedMotion.addEventListener("change", requestUpdate);
		return () => {
			if (frame) window.cancelAnimationFrame(frame);
			window.removeEventListener("scroll", requestUpdate);
			window.removeEventListener("resize", requestUpdate);
			desktop.removeEventListener("change", requestUpdate);
			reducedMotion.removeEventListener("change", requestUpdate);
			resetCards();
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		id: "stack",
		className: "scroll-mt-24 pt-16 sm:pt-24 lg:pt-32",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "container-page",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionLabel, { children: stack.label }, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 111,
					columnNumber: 11
				}, this) }, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 110,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
					delay: 60,
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "mt-8 font-display text-3xl font-bold sm:mt-10 sm:text-4xl lg:text-5xl",
						children: stack.title
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 115,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 114,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
					delay: 100,
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-4 max-w-xl leading-relaxed text-muted-foreground",
						children: stack.subtitle
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 121,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 120,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$6,
			lineNumber: 109,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			ref: storyRef,
			className: "stack-story mt-10 sm:mt-14",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "stack-story-stage",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "container-page stack-story-container",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "stack-card-deck",
						children: stack.groups.map((group, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
							"data-stack-card": true,
							className: "stack-card rounded-2xl border border-border bg-surface",
							style: { zIndex: index + 1 },
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "stack-card-heading",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
										className: "mono-label text-primary-soft",
										children: group.title
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 137,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "stack-card-rule",
										"aria-hidden": "true"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 138,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 136,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
									className: "stack-tech-grid",
									children: group.items.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
										className: "stack-tech-item",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "text-sm font-medium text-foreground",
											children: item.name
										}, void 0, false, {
											fileName: _jsxFileName$6,
											lineNumber: 144,
											columnNumber: 25
										}, this), item.note && /* @__PURE__ */ (void 0)("p", {
											className: "mt-1 font-mono text-xs leading-relaxed text-muted-foreground",
											children: item.note
										}, void 0, false, {
											fileName: _jsxFileName$6,
											lineNumber: 146,
											columnNumber: 27
										}, this)]
									}, item.name, true, {
										fileName: _jsxFileName$6,
										lineNumber: 143,
										columnNumber: 23
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 141,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StackIcons, { keys: group.icons }, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 154,
									columnNumber: 19
								}, this)
							]
						}, group.title, true, {
							fileName: _jsxFileName$6,
							lineNumber: 130,
							columnNumber: 17
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 128,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 127,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 126,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$6,
			lineNumber: 125,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$6,
		lineNumber: 108,
		columnNumber: 5
	}, this);
}
var _jsxFileName$5 = "/workspaces/default/code/src/components/portfolio/Projects.tsx";
var marqueePrincipal = [
	"tekidu",
	"evidence-finder",
	"gitflow"
].map((id) => getProject(id)).filter((p) => Boolean(p));
/** Quantas vezes a sequência é desenhada na faixa — só a primeira é lida por tecnologias assistivas. */
var MARQUEE_COPIES = 4;
/**
* Faixa horizontal com movimento contínuo em CSS puro (ver `.project-marquee` em styles.css).
* A primeira cópia é a lista real; as demais são apenas visuais (aria-hidden + inert: sem foco,
* sem anúncio duplicado e sem links repetidos). Pausa por hover/foco é feita via CSS.
*/
function ProjectMarquee({ label, direction, projects: items, indexOf, detailed = false }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "project-marquee",
		"data-direction": direction,
		role: "group",
		"aria-label": label,
		style: { "--marquee-count": items.length },
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "project-marquee-track",
			children: Array.from({ length: MARQUEE_COPIES }, (_, copy) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
				className: "project-marquee-group",
				...copy > 0 ? {
					"aria-hidden": true,
					inert: true
				} : {},
				children: items.map((p) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
					className: "project-marquee-card",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProjectListCard, {
						project: p,
						index: indexOf(p),
						detailed
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 64,
						columnNumber: 17
					}, this)
				}, p.id, false, {
					fileName: _jsxFileName$5,
					lineNumber: 63,
					columnNumber: 15
				}, this))
			}, copy, false, {
				fileName: _jsxFileName$5,
				lineNumber: 57,
				columnNumber: 11
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 55,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$5,
		lineNumber: 48,
		columnNumber: 5
	}, this);
}
function Projects() {
	const f = featuredProject;
	const spotlightRef = useSpotlight();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		id: "projetos",
		className: "scroll-mt-24 py-16 sm:py-24 lg:py-32",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "container-page",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionLabel, { children: projects.label }, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 82,
					columnNumber: 11
				}, this) }, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 81,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
					delay: 60,
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "mt-8 font-display text-3xl font-bold sm:mt-10 sm:text-4xl lg:text-5xl",
						children: projects.title
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 86,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 85,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
					delay: 100,
					variant: "scale",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
						ref: spotlightRef,
						className: "spotlight mt-10 grid grid-cols-1 gap-8 rounded-3xl border border-border bg-surface p-5 transition-colors duration-300 sm:mt-14 sm:gap-10 sm:p-8 lg:grid-cols-2 lg:gap-14 lg:p-10",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-wrap items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-mono text-sm text-muted-foreground",
									children: "01"
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 99,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "size-1.5 rounded-full bg-primary-soft",
										"aria-hidden": "true"
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 101,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "mono-label text-primary-soft",
										children: "Featured Project"
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 102,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 100,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 98,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "mt-4 font-display text-3xl font-bold sm:mt-5 sm:text-4xl",
								children: f.title
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 106,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-3 text-base text-primary-soft sm:text-lg",
								children: f.description
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 109,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-4 leading-relaxed text-muted-foreground sm:mt-5",
								children: f.longDescription
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 110,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
								className: "mt-5 flex flex-wrap gap-2 sm:mt-6 sm:gap-2.5",
								children: f.technologies.map((t) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tag, { children: t }, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 117,
									columnNumber: 21
								}, this) }, t, false, {
									fileName: _jsxFileName$5,
									lineNumber: 116,
									columnNumber: 19
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 114,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
										to: "/projects/$slug",
										params: { slug: f.id },
										className: "btn-press shine-sweep group inline-flex min-h-12 items-center justify-center gap-2 sm:min-h-11 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-bright",
										children: ["Ver detalhes técnicos", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, {
											className: "size-4 transition-transform group-hover:translate-x-0.5",
											"aria-hidden": "true"
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 129,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 123,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
										href: f.githubUrl,
										target: "_blank",
										rel: "noreferrer noopener",
										className: "btn-press inline-flex min-h-12 items-center justify-center gap-2 sm:min-h-11 rounded-xl border border-border-strong bg-surface-raised px-5 py-3 text-sm font-medium transition-colors hover:bg-accent",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Github, {
											className: "size-4",
											"aria-hidden": "true"
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 140,
											columnNumber: 19
										}, this), "Repositório"]
									}, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 134,
										columnNumber: 17
									}, this),
									f.demoUrl ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
										href: f.demoUrl,
										target: "_blank",
										rel: "noreferrer noopener",
										className: "btn-press inline-flex min-h-12 items-center justify-center gap-2 sm:min-h-11 rounded-xl border border-border-strong bg-surface-raised px-5 py-3 text-sm font-medium transition-colors hover:bg-accent",
										children: ["Abrir aplicação", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowUpRight, {
											className: "size-4",
											"aria-hidden": "true"
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 151,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 144,
										columnNumber: 19
									}, this) : null
								]
							}, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 122,
								columnNumber: 15
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 97,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-4 sm:space-y-5",
							children: [
								f.problem ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "rounded-2xl border border-border bg-surface-raised/60 p-5 sm:p-6",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
										className: "mono-label text-primary-soft",
										children: "Problema"
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 160,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-3 text-sm leading-relaxed text-muted-foreground",
										children: f.problem
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 161,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 159,
									columnNumber: 17
								}, this) : null,
								f.solution ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "rounded-2xl border border-border bg-surface-raised/60 p-5 sm:p-6",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
										className: "mono-label text-primary-soft",
										children: "Solução"
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 166,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-3 text-sm leading-relaxed text-muted-foreground",
										children: f.solution
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 167,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 165,
									columnNumber: 17
								}, this) : null,
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "rounded-2xl border border-border bg-surface-raised/60 p-5 sm:p-6",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
										className: "mono-label text-primary-soft",
										children: "Destaques"
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 171,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
										className: "mt-3 space-y-2",
										children: f.features.slice(0, 4).map((h) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
											className: "flex gap-3 text-sm text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-primary-soft",
												"aria-hidden": "true",
												children: "→"
											}, void 0, false, {
												fileName: _jsxFileName$5,
												lineNumber: 175,
												columnNumber: 23
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: h }, void 0, false, {
												fileName: _jsxFileName$5,
												lineNumber: 178,
												columnNumber: 23
											}, this)]
										}, h, true, {
											fileName: _jsxFileName$5,
											lineNumber: 174,
											columnNumber: 21
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 172,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 170,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 157,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 93,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 92,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
					delay: 80,
					className: "mt-4 sm:mt-6",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProjectMarquee, {
						label: "Projetos principais",
						direction: "left",
						projects: marqueePrincipal,
						indexOf: (p) => principalProjects.findIndex((x) => x.id === p.id),
						detailed: true
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 189,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 188,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
					className: "mono-label mt-14 text-muted-foreground sm:mt-20",
					children: "Projetos complementares"
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 199,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
					delay: 80,
					className: "mt-5",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProjectMarquee, {
						label: "Projetos complementares",
						direction: "right",
						projects: otherProjects,
						indexOf: (p) => otherProjects.findIndex((x) => x.id === p.id) + principalProjects.length
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 201,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 200,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$5,
			lineNumber: 80,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$5,
		lineNumber: 79,
		columnNumber: 5
	}, this);
}
/**
* Card de projeto (fora do destaque). Continua sendo, no fundo, um link normal
* para a página de detalhes — funciona igual antes com teclado, toque e leitores de tela.
*
* Em desktop, com mouse e sem reduced motion, projetos com `demoUrl` ganham um badge
* "Visualizar" que segue o cursor: como ele se reposiciona exatamente sobre o ponteiro,
* um clique em qualquer ponto do card enquanto ele está visível abre o link de deploy
* numa nova aba, em vez de navegar para a página de detalhes.
*/
function ProjectListCard({ project: p, index: i, detailed = false }) {
	const { ref, pos, active } = usePointerChip();
	const showChip = active && Boolean(p.demoUrl);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		ref,
		className: cn("relative h-full", showChip && "cursor-none"),
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
			to: "/projects/$slug",
			params: { slug: p.id },
			className: "card-hover-lift group flex h-full flex-col rounded-2xl border border-border bg-surface p-5 sm:p-7",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "font-mono text-sm text-muted-foreground",
						children: String(i + 2).padStart(2, "0")
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 242,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tag, { children: `${p.categories[0]}` }, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 245,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$5,
					lineNumber: 241,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
					className: "mt-4 font-display text-xl font-semibold sm:mt-5",
					children: p.title
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 247,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground",
					children: statusLabel[p.status]
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 248,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-4 text-sm leading-relaxed text-muted-foreground",
					children: p.description
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 251,
					columnNumber: 9
				}, this),
				detailed && p.problem ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-foreground",
						children: "Problema: "
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 254,
						columnNumber: 13
					}, this), p.problem]
				}, void 0, true, {
					fileName: _jsxFileName$5,
					lineNumber: 253,
					columnNumber: 11
				}, this) : null,
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
					className: "mt-auto flex flex-wrap gap-2 pt-6",
					children: p.technologies.slice(0, detailed ? 8 : 5).map((t) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tag, { children: t }, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 261,
						columnNumber: 15
					}, this) }, t, false, {
						fileName: _jsxFileName$5,
						lineNumber: 260,
						columnNumber: 13
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 258,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary-soft",
					children: ["Ver detalhes técnicos", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, {
						className: "size-3.5 transition-transform group-hover:translate-x-0.5",
						"aria-hidden": "true"
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 267,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$5,
					lineNumber: 265,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$5,
			lineNumber: 236,
			columnNumber: 7
		}, this), p.demoUrl ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
			href: p.demoUrl,
			target: "_blank",
			rel: "noreferrer noopener",
			"aria-hidden": "true",
			tabIndex: -1,
			className: "pointer-events-none absolute z-20 flex items-center gap-1.5 whitespace-nowrap rounded-full bg-primary px-4 py-2 font-mono text-xs font-medium uppercase tracking-[0.08em] text-primary-foreground shadow-lg transition-[opacity,transform] duration-150 ease-out",
			style: {
				left: pos.x,
				top: pos.y,
				transform: `translate(-50%, -50%) scale(${showChip ? 1 : .85})`,
				opacity: showChip ? 1 : 0,
				pointerEvents: showChip ? "auto" : "none"
			},
			children: ["Visualizar", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowUpRight, {
				className: "size-3.5",
				"aria-hidden": "true"
			}, void 0, false, {
				fileName: _jsxFileName$5,
				lineNumber: 291,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$5,
			lineNumber: 275,
			columnNumber: 9
		}, this) : null]
	}, void 0, true, {
		fileName: _jsxFileName$5,
		lineNumber: 235,
		columnNumber: 5
	}, this);
}
var _jsxFileName$4 = "/workspaces/default/code/src/components/portfolio/Timeline.tsx";
function Timeline() {
	const listRef = (0, import_react.useRef)(null);
	const progress = useScrollFill(listRef);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		id: "trajetoria",
		className: "scroll-mt-24 py-16 sm:py-24 lg:py-32",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "container-page",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionLabel, { children: timeline.label }, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 15,
					columnNumber: 11
				}, this) }, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 14,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
					delay: 60,
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "mt-8 font-display text-3xl font-bold sm:text-4xl lg:text-5xl sm:mt-10",
						children: timeline.title
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 19,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 18,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ol", {
					ref: listRef,
					className: "relative mt-10 space-y-10 sm:mt-14 sm:space-y-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							"aria-hidden": "true",
							className: "absolute top-2 bottom-2 left-4 w-px bg-border-strong"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 26,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							"aria-hidden": "true",
							className: "absolute top-2 left-4 w-px origin-top bg-gradient-to-b from-primary-soft via-primary to-primary/40 transition-transform duration-300 ease-out",
							style: {
								height: "calc(100% - 1rem)",
								transform: `scaleY(${progress})`
							}
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 30,
							columnNumber: 11
						}, this),
						timeline.steps.map((step, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
							as: "li",
							delay: i * 70,
							className: "relative pl-12 sm:pl-16",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: step.current ? "absolute top-0 left-0 grid size-8 animate-pulse place-items-center rounded-full border border-dashed border-primary/60 bg-background font-mono text-xs text-primary-soft" : "absolute top-0 left-0 grid size-8 place-items-center rounded-full border border-primary/50 bg-background font-mono text-xs text-primary-soft",
									children: i + 1
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 37,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "flex flex-wrap items-center gap-2 font-mono text-xs text-primary-soft",
									children: [step.index, step.current ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[0.625rem] tracking-wide text-primary-soft",
										children: "em andamento"
									}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 49,
										columnNumber: 19
									}, this) : null]
								}, void 0, true, {
									fileName: _jsxFileName$4,
									lineNumber: 46,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "mt-1.5 font-display text-xl font-semibold",
									children: step.title
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 54,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-2 max-w-2xl leading-relaxed text-muted-foreground",
									children: step.description
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 55,
									columnNumber: 15
								}, this)
							]
						}, step.index, true, {
							fileName: _jsxFileName$4,
							lineNumber: 36,
							columnNumber: 13
						}, this))
					]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 24,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$4,
			lineNumber: 13,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$4,
		lineNumber: 12,
		columnNumber: 5
	}, this);
}
var _jsxFileName$3 = "/workspaces/default/code/src/components/portfolio/GithubCta.tsx";
function GithubCta() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		id: "github",
		className: "py-8 sm:py-12 lg:py-20",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "container-page",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "card-hover-lift relative overflow-hidden rounded-3xl border border-border bg-surface p-6 sm:p-12",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					"aria-hidden": "true",
					className: "pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full opacity-40 blur-[100px]",
					style: { background: "radial-gradient(circle, color-mix(in oklab, var(--primary) 60%, transparent), transparent 70%)" }
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 11,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative grid grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-[1fr_auto]",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionLabel, { children: githubSection.label }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 21,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "mt-4 font-display text-2xl font-bold sm:mt-5 sm:text-4xl",
							children: githubSection.title
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 22,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-4 leading-relaxed text-muted-foreground",
							children: [
								githubSection.description[0],
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", { className: "hidden sm:block" }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 27,
									columnNumber: 19
								}, this),
								" ",
								githubSection.description[1]
							]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 25,
							columnNumber: 17
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 20,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: githubSection.cta.href,
						target: "_blank",
						rel: "noreferrer noopener",
						className: "btn-press shine-sweep inline-flex min-h-12 items-center justify-center rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-bright sm:justify-self-start lg:justify-self-end",
						children: githubSection.cta.label
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 30,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 19,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 10,
				columnNumber: 11
			}, this) }, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 9,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$3,
			lineNumber: 8,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 7,
		columnNumber: 5
	}, this);
}
var _jsxFileName$2 = "/workspaces/default/code/src/components/portfolio/ContactDotMatrix.tsx";
var FIGURE_DOTS = 144;
function heartTargets(width, height, size) {
	const cx = width * .34;
	const cy = height * .53;
	return Array.from({ length: FIGURE_DOTS }, (_, index) => {
		const angle = index / FIGURE_DOTS * Math.PI * 2;
		const sin = Math.sin(angle);
		const x = 16 * sin * sin * sin;
		const y = 13 * Math.cos(angle) - 5 * Math.cos(angle * 2) - 2 * Math.cos(angle * 3) - Math.cos(angle * 4);
		return [cx + x / 34 * size, cy - y / 32 * size];
	});
}
function smileTargets(width, height, size) {
	const cx = width * .67;
	const cy = height * .5;
	const radius = size * .48;
	const targets = [];
	for (let index = 0; index < 84; index += 1) {
		const angle = index / 84 * Math.PI * 2;
		targets.push([cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius]);
	}
	for (const direction of [-1, 1]) for (let index = 0; index < 10; index += 1) {
		const angle = index / 10 * Math.PI * 2;
		targets.push([cx + direction * radius * .24 + Math.cos(angle) * radius * .055, cy - radius * .15 + Math.sin(angle) * radius * .1]);
	}
	for (let index = 0; index < 40; index += 1) {
		const angle = Math.PI * (.12 + index / 39 * .76);
		targets.push([cx + Math.cos(angle) * radius * .6, cy + radius * .08 + Math.sin(angle) * radius * .52]);
	}
	return targets;
}
function buildDots(width, height) {
	const spacing = Math.max(22, Math.min(30, width / 40));
	const columns = Math.max(2, Math.floor(width / spacing));
	const rows = Math.max(2, Math.floor(height / spacing));
	const offsetX = (width - (columns - 1) * spacing) / 2;
	const offsetY = (height - (rows - 1) * spacing) / 2;
	const dots = [];
	for (let row = 0; row < rows; row += 1) for (let column = 0; column < columns; column += 1) {
		const x = offsetX + column * spacing;
		const y = offsetY + row * spacing;
		dots.push({
			homeX: x,
			homeY: y,
			x,
			y,
			intensity: 0
		});
	}
	const size = Math.min(width * .24, height * .48, 220);
	const heart = heartTargets(width, height, size);
	const smile = smileTargets(width, height, size);
	[...dots].sort((a, b) => {
		return Math.hypot(a.homeX - width / 2, a.homeY - height / 2) - Math.hypot(b.homeX - width / 2, b.homeY - height / 2);
	}).slice(0, Math.min(FIGURE_DOTS, dots.length)).forEach((dot, index) => {
		dot.heart = heart[index];
		dot.smile = smile[index];
	});
	return dots;
}
function ContactDotMatrix({ sectionRef }) {
	const canvasRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		const section = sectionRef.current;
		if (!canvas || !section) return;
		const context = canvas.getContext("2d");
		if (!context) return;
		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
		const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
		let dots = [];
		let figure = "idle";
		let frame = 0;
		let lastTime = 0;
		let width = 0;
		let height = 0;
		let dotColor = "";
		let figureColor = "";
		const draw = () => {
			context.clearRect(0, 0, width, height);
			for (const dot of dots) {
				context.beginPath();
				context.fillStyle = dot.intensity > .02 ? figureColor : dotColor;
				context.globalAlpha = .11 + dot.intensity * .22;
				context.arc(dot.x, dot.y, 1 + dot.intensity * .45, 0, Math.PI * 2);
				context.fill();
			}
			context.globalAlpha = 1;
		};
		const targetFor = (dot) => {
			if (figure === "heart" && dot.heart) return dot.heart;
			if (figure === "smile" && dot.smile) return dot.smile;
			return [dot.homeX, dot.homeY];
		};
		const animate = (time) => {
			const delta = lastTime ? Math.min(40, time - lastTime) : 16;
			lastTime = time;
			const ease = 1 - Math.exp(-delta / 165);
			let unsettled = false;
			for (const dot of dots) {
				const [targetX, targetY] = targetFor(dot);
				const targetIntensity = figure !== "idle" && (dot.heart || dot.smile) ? 1 : 0;
				dot.x += (targetX - dot.x) * ease;
				dot.y += (targetY - dot.y) * ease;
				dot.intensity += (targetIntensity - dot.intensity) * ease;
				if (Math.abs(targetX - dot.x) > .05 || Math.abs(targetY - dot.y) > .05 || Math.abs(targetIntensity - dot.intensity) > .005) unsettled = true;
			}
			draw();
			if (unsettled) frame = requestAnimationFrame(animate);
			else {
				frame = 0;
				lastTime = 0;
			}
		};
		const requestDraw = () => {
			if (!frame) frame = requestAnimationFrame(animate);
		};
		const setFigure = (next) => {
			if (next === figure) return;
			figure = next;
			requestDraw();
		};
		const resize = () => {
			const rect = section.getBoundingClientRect();
			const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
			width = Math.max(1, rect.width);
			height = Math.max(1, rect.height);
			canvas.width = Math.round(width * ratio);
			canvas.height = Math.round(height * ratio);
			context.setTransform(ratio, 0, 0, ratio, 0, 0);
			const styles = getComputedStyle(section);
			dotColor = styles.getPropertyValue("--muted-foreground").trim();
			figureColor = styles.getPropertyValue("--primary-soft").trim();
			dots = buildDots(width, height);
			if (reducedMotion.matches || !finePointer.matches) figure = "idle";
			draw();
			if (figure !== "idle") requestDraw();
		};
		const onPointerMove = (event) => {
			if (reducedMotion.matches || !finePointer.matches) return;
			const rect = section.getBoundingClientRect();
			const x = (event.clientX - rect.left) / rect.width;
			const y = (event.clientY - rect.top) / rect.height;
			if (y < .12 || y > .9) setFigure("idle");
			else if (figure === "heart") {
				if (x > .56) setFigure("smile");
			} else if (figure === "smile") {
				if (x < .44) setFigure("heart");
			} else setFigure(x < .5 ? "heart" : "smile");
		};
		const onPointerLeave = () => setFigure("idle");
		const disableInteraction = () => {
			if (reducedMotion.matches || !finePointer.matches) {
				figure = "idle";
				for (const dot of dots) {
					dot.x = dot.homeX;
					dot.y = dot.homeY;
					dot.intensity = 0;
				}
				draw();
			}
		};
		const observer = new ResizeObserver(resize);
		observer.observe(section);
		section.addEventListener("pointermove", onPointerMove, { passive: true });
		section.addEventListener("pointerleave", onPointerLeave);
		reducedMotion.addEventListener("change", disableInteraction);
		finePointer.addEventListener("change", disableInteraction);
		resize();
		return () => {
			observer.disconnect();
			section.removeEventListener("pointermove", onPointerMove);
			section.removeEventListener("pointerleave", onPointerLeave);
			reducedMotion.removeEventListener("change", disableInteraction);
			finePointer.removeEventListener("change", disableInteraction);
			if (frame) cancelAnimationFrame(frame);
		};
	}, [sectionRef]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("canvas", {
		ref: canvasRef,
		"aria-hidden": "true",
		className: "pointer-events-none absolute inset-0 z-0 size-full"
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 261,
		columnNumber: 5
	}, this);
}
var _jsxFileName$1 = "/workspaces/default/code/src/components/portfolio/Contact.tsx";
function Contact() {
	const magneticRef = useMagnetic();
	const sectionRef = (0, import_react.useRef)(null);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		ref: sectionRef,
		id: "contato",
		className: "relative isolate scroll-mt-24 overflow-hidden py-16 sm:py-24 lg:py-32",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ContactDotMatrix, { sectionRef }, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 19,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				"aria-hidden": "true",
				className: "pointer-events-none absolute bottom-0 left-1/2 z-0 h-[22rem] w-full max-w-[40rem] -translate-x-1/2 rounded-full opacity-30 blur-[100px] sm:h-[30rem] sm:blur-[130px]",
				style: { background: "radial-gradient(circle, color-mix(in oklab, var(--primary) 55%, transparent), transparent 70%)" }
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 20,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "container-page relative z-10",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionLabel, { children: contact.label }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 30,
					columnNumber: 11
				}, this) }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 29,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mx-auto mt-10 max-w-2xl text-center sm:mt-16",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "font-display text-3xl leading-[1.1] font-bold sm:text-5xl lg:text-6xl",
							children: [
								contact.title[0],
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 37,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-primary-soft",
									children: contact.title[1]
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 38,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 35,
							columnNumber: 13
						}, this) }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 34,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
							delay: 80,
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mx-auto mt-5 max-w-lg leading-relaxed text-muted-foreground sm:mt-7",
								children: contact.description
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 43,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 42,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
							delay: 140,
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:flex sm:flex-wrap sm:justify-center",
								children: contact.actions.map((a) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
									ref: a.primary ? magneticRef : void 0,
									href: a.href,
									...a.href.startsWith("http") ? {
										target: "_blank",
										rel: "noreferrer noopener"
									} : {},
									className: a.primary ? "magnetic btn-press shine-sweep col-span-2 inline-flex min-h-12 items-center justify-center rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-bright sm:col-auto" : "btn-press inline-flex min-h-12 items-center justify-center rounded-xl border border-border-strong bg-surface px-6 py-3.5 text-sm font-medium transition-colors hover:bg-surface-raised",
									children: a.label
								}, a.label, false, {
									fileName: _jsxFileName$1,
									lineNumber: 51,
									columnNumber: 17
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 49,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 48,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 33,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 28,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 14,
		columnNumber: 5
	}, this);
}
/** Mesma largura do `container-page` (72rem) + padding lateral máximo (2rem). */
var CONTAINER = 1152;
var CONTAINER_PADDING = 32;
var clamp = (x, a, b) => Math.min(b, Math.max(a, x));
function computeLayout(width, height) {
	const compact = width < 640;
	const tablet = !compact && width < 1024;
	const contentLeft = compact ? 16 : Math.max(0, (width - CONTAINER) / 2) + CONTAINER_PADDING;
	const fitToGutter = Math.floor((contentLeft - 14) / .6);
	const desktopPx = Math.min(Math.round(clamp(height * .2, 140, 176)), Math.max(120, fitToGutter));
	const robotPx = compact ? 92 : tablet ? 122 : desktopPx;
	const zoom = robotPx / 2;
	const halfWidth = robotPx * .3;
	const bottomPad = compact ? 6 : 10;
	const canvasHeight = Math.round(robotPx * 1.14 + bottomPad + 6);
	let xLeft;
	let xRight;
	if (compact) {
		xRight = width - halfWidth - 8;
		xLeft = xRight - width * .3;
	} else {
		xLeft = clamp(contentLeft / 2, halfWidth + 10, 150);
		xRight = width - xLeft;
	}
	return {
		width,
		robotPx,
		canvasHeight,
		zoom,
		bottomPad,
		xLeft,
		xRight,
		halfWidth,
		contentLeft,
		contentRight: width - contentLeft,
		compact,
		motion: compact ? .6 : tablet ? .85 : 1
	};
}
/** Mesma comparação de valor entre layouts (evita re-render sem mudança real). */
var sameLayout = (a, b) => a.width === b.width && a.robotPx === b.robotPx && a.canvasHeight === b.canvasHeight && a.xLeft === b.xLeft && a.xRight === b.xRight;
/** Abaixo disso (celular muito pequeno / landscape baixo) o conteúdo tem prioridade total. */
var VIEWPORT_QUERY = "(min-width: 340px) and (min-height: 481px)";
function supportsRobot() {
	if (navigator.connection?.saveData) return false;
	try {
		const probe = document.createElement("canvas");
		const gl = probe.getContext("webgl2") ?? probe.getContext("webgl");
		if (!gl) return false;
		gl.getExtension("WEBGL_lose_context")?.loseContext();
		return true;
	} catch {
		return false;
	}
}
/** Executa `cb` quando a página já carregou e o navegador está ocioso. */
function whenIdleAfterLoad(cb) {
	let cancelled = false;
	let handle;
	const ric = window.requestIdleCallback;
	const schedule = () => {
		if (cancelled) return;
		if (ric) handle = ric(() => !cancelled && cb(), { timeout: 2e3 });
		else handle = window.setTimeout(() => !cancelled && cb(), 300);
	};
	if (document.readyState === "complete") schedule();
	else window.addEventListener("load", schedule, { once: true });
	return () => {
		cancelled = true;
		window.removeEventListener("load", schedule);
		if (handle === void 0) return;
		if (ric && window.cancelIdleCallback) window.cancelIdleCallback(handle);
		else window.clearTimeout(handle);
	};
}
function useRobotEnabled() {
	const [enabled, setEnabled] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!supportsRobot()) return;
		const mq = window.matchMedia(VIEWPORT_QUERY);
		let armed = false;
		const sync = () => {
			if (armed) setEnabled(mq.matches);
		};
		const cancel = whenIdleAfterLoad(() => {
			armed = true;
			sync();
		});
		mq.addEventListener("change", sync);
		return () => {
			cancel();
			mq.removeEventListener("change", sync);
		};
	}, []);
	return enabled;
}
function useRobotLayout(enabled) {
	const [layout, setLayout] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!enabled) return;
		let raf = 0;
		const update = () => {
			raf = 0;
			const next = computeLayout(document.documentElement.clientWidth, window.innerHeight);
			setLayout((prev) => prev && sameLayout(prev, next) ? prev : next);
		};
		const schedule = () => {
			if (!raf) raf = requestAnimationFrame(update);
		};
		update();
		window.addEventListener("resize", schedule, { passive: true });
		return () => {
			window.removeEventListener("resize", schedule);
			if (raf) cancelAnimationFrame(raf);
		};
	}, [enabled]);
	return layout;
}
function ScrollRobot() {
	const enabled = useRobotEnabled();
	useReducedMotion();
	const [failed, setFailed] = (0, import_react.useState)(false);
	useRobotLayout(enabled && !failed);
	return null;
}
var _jsxFileName = "/workspaces/default/code/src/routes/index.tsx?tsr-split=component";
function Index() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
			href: "#conteudo",
			className: "sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground",
			children: "Pular para o conteúdo"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 13,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Navbar, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 16,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
			id: "conteudo",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Hero, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 18,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(About, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 19,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stack, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 20,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Projects, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 21,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Timeline, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 22,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(GithubCta, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 23,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Contact, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 24,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 17,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Footer, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 26,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollRobot, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 27,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 12,
		columnNumber: 10
	}, this);
}
//#endregion
export { Index as component };
