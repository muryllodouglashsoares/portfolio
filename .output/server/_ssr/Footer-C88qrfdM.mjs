import { n as __toESM } from "../_runtime.mjs";
import { o as projects$1, r as hero_sunset_portrait_default } from "./projects-BwsLHbzK.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as Menu, t as X } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Footer-C88qrfdM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var about_illustration_default = "/assets/about-illustration-tV9CnTp6.png";
var site = {
	name: "Muryllo",
	logo: "muryllo",
	fullName: "Muryllo Douglas",
	role: "Estudante · Desenvolvedor",
	email: "muryllodouglash.soares@gmail.com",
	github: "https://github.com/muryllodouglashsoares",
	linkedin: "https://www.linkedin.com/in/muryllo-douglas-henrique-soares-7a8416416/",
	footer: "© 2026 Muryllo Douglas · Estudante, desenvolvedor, construtor."
};
var nav = [
	{
		label: "Sobre",
		href: "/#sobre"
	},
	{
		label: "Skills",
		href: "/#stack"
	},
	{
		label: "Projetos",
		href: "/#projetos"
	},
	{
		label: "Trajetória",
		href: "/#trajetoria"
	},
	{
		label: "Contato",
		href: "/#contato"
	}
];
var hero = {
	badge: "Estudante · Desenvolvedor",
	greeting: "Oi, eu sou",
	name: "Muryllo.",
	subtitle: ["Eu construo software", "do banco de dados à interface."],
	description: "Estudante do Ensino Médio Integrado ao Técnico em Informática no IFPB — Campus Itaporanga. Desenvolvo projetos próprios, de um sistema de gestão de contratos a um app desktop de busca local, e busco minha primeira oportunidade na área de TI.",
	primaryCta: {
		label: "Ver projetos",
		href: "/#projetos"
	},
	secondaryCta: {
		label: "Conhecer mais",
		href: "/#sobre"
	},
	techLabel: "Tecnologias que utilizo",
	tech: [
		"TypeScript",
		"React",
		"Node.js",
		"PostgreSQL",
		"Rust",
		"Git"
	],
	codeChip: "const dev = \"muryllo\"",
	statusChip: "aberto a estágio",
	portraitSrc: hero_sunset_portrait_default,
	portraitAlt: "Retrato editorial de Muryllo Douglas ao entardecer, com sol estilizado ao fundo"
};
var about = {
	label: "sobre",
	title: [
		"Construindo,",
		"aprendendo",
		"e evoluindo."
	],
	paragraphs: [
		"Sou estudante do Ensino Médio Integrado ao Técnico em Informática no IFPB — Campus Itaporanga e desenvolvedor em formação. Construo projetos próprios porque acredito que a melhor forma de aprender é fazendo.",
		"Meu foco é desenvolvimento web e engenharia de software. Tenho ampliado o alcance dos projetos: do front-end para APIs com banco relacional, autorização, testes e deploy automatizado e, mais recentemente, para uma aplicação desktop em Rust. Também me interesso por automação, segurança, estruturas de dados e robótica.",
		"Não estou tentando parecer alguém com anos de experiência que não tenho. Estou mostrando o que consigo construir agora, e procuro um estágio ou posição inicial para continuar evoluindo em um time."
	],
	tags: [
		"Desenvolvimento Web",
		"React",
		"TypeScript",
		"Rust",
		"Automação",
		"Robótica",
		"IFPB"
	],
	illustrationSrc: about_illustration_default,
	illustrationAlt: "Ilustração digital estilizada de Muryllo Douglas",
	stats: [
		{
			value: String(projects$1.length),
			label: "Projetos documentados"
		},
		{
			value: String(projects$1.filter((p) => p.demoUrl).length),
			label: "Projetos com demo online"
		},
		{
			value: String(projects$1.filter((p) => p.authAndDatabase).length),
			label: "Apps com autenticação e banco de dados"
		},
		{
			value: String(projects$1.filter((p) => p.hasTests).length),
			label: "Projetos com testes automatizados"
		}
	]
};
var stack = {
	label: "stack",
	title: "Tecnologias que utilizo",
	subtitle: "Só o que já usei em projetos, e onde. Em estudo agora, sem projeto publicado: estruturas de dados e algoritmos, arquitetura de software e robótica autônoma.",
	groups: [
		{
			title: "Front-end",
			icons: [
				"javascript",
				"typescript",
				"react",
				"tailwind",
				"tanstack"
			],
			items: [
				{
					name: "HTML / CSS",
					note: "Base de todos os projetos web"
				},
				{
					name: "JavaScript",
					note: "IFConnect, OdontoPrime — interatividade sem framework"
				},
				{
					name: "TypeScript",
					note: "LexContract, Evidence Finder, Tekidu, Savora, FORJA, OdontoPrime — tipagem de dados e componentes"
				},
				{
					name: "React",
					note: "LexContract, Evidence Finder, Tekidu, Savora, FORJA, OdontoPrime — construção de interfaces"
				},
				{
					name: "Tailwind CSS",
					note: "LexContract, Tekidu, Savora, FORJA — estilização utilitária"
				},
				{
					name: "TanStack Start",
					note: "Savora, FORJA, OdontoPrime — SSR e roteamento"
				}
			]
		},
		{
			title: "Back-end / Dados",
			icons: [
				"nodejs",
				"postgresql",
				"rust",
				"sqlite",
				"firebase"
			],
			items: [
				{
					name: "Node.js + Fastify",
					note: "LexContract — API REST modular com JWT e papéis"
				},
				{
					name: "PostgreSQL + Prisma",
					note: "LexContract — dados relacionais isolados por escritório"
				},
				{
					name: "Rust + Tauri",
					note: "Evidence Finder, GitFlow Desktop — núcleo dos apps desktop"
				},
				{
					name: "SQLite (FTS5)",
					note: "Evidence Finder — metadados e busca de texto local"
				},
				{
					name: "Firebase Auth",
					note: "Tekidu, IFConnect — autenticação de usuários"
				},
				{
					name: "Cloud Firestore",
					note: "Tekidu — dados acadêmicos e regras de acesso"
				},
				{
					name: "Realtime Database",
					note: "IFConnect — feed, chat e notificações"
				}
			]
		},
		{
			title: "Qualidade / Deploy",
			icons: [
				"vitest",
				"docker",
				"githubactions",
				"git",
				"cloudflare"
			],
			items: [
				{
					name: "Vitest + Firebase Emulator",
					note: "Tekidu — testes das regras de segurança"
				},
				{
					name: "Vitest",
					note: "LexContract (API), Evidence Finder (frontend), Tekidu — testes automatizados"
				},
				{
					name: "cargo test (Rust)",
					note: "Evidence Finder, GitFlow Desktop — testes do núcleo"
				},
				{
					name: "Playwright",
					note: "LexContract — 4 fluxos E2E rodando no CI"
				},
				{
					name: "Docker",
					note: "LexContract — imagens do frontend (Nginx) e do backend"
				},
				{
					name: "GitHub Actions",
					note: "LexContract — CI e deploy só após todos os testes passarem"
				},
				{
					name: "Git / GitHub",
					note: "Todos os projetos — versionamento e histórico"
				},
				{
					name: "Cloudflare",
					note: "LexContract, Tekidu, Savora, FORJA, OdontoPrime — deploy e hospedagem"
				},
				{
					name: "Make",
					note: "Savora, FORJA, OdontoPrime — automação de formulários"
				},
				{
					name: "Zod",
					note: "FORJA — validação de formulário no cliente e no servidor"
				}
			]
		},
		{
			title: "Robótica",
			icons: ["python"],
			items: [{
				name: "Python",
				note: "Mini Olimpíada — leitura de sensor e lógica do robô"
			}, {
				name: "LEGO Spike Prime",
				note: "Mini Olimpíada — montagem e programação em blocos"
			}]
		}
	]
};
var projects = {
	label: "projetos",
	title: "O que venho construindo"
};
var timeline = {
	label: "trajetória",
	title: "Minha evolução",
	steps: [
		{
			index: "01",
			title: "Fundamentos",
			description: "Primeiros passos em lógica de programação, HTML, CSS e JavaScript. A curiosidade vira código."
		},
		{
			index: "02",
			title: "Exploração",
			description: "Experimentação com diferentes tecnologias: Python, React, frameworks e ferramentas de desenvolvimento."
		},
		{
			index: "03",
			title: "Construção",
			description: "Primeiros projetos próprios ganham forma. IFConnect, Tekidu e outros nascem como ideias reais."
		},
		{
			index: "04",
			title: "Publicação",
			description: "Projetos entram no ar: deploy na Cloudflare, com demos públicas. O código chega ao mundo."
		},
		{
			index: "05",
			title: "Evolução",
			description: "Sistemas mais complexos: autenticação, banco de dados, regras de segurança e testes automatizados — no LexContract, backend próprio com PostgreSQL, testes E2E e pipeline de CI/CD; no Evidence Finder e no GitFlow Desktop, apps desktop com núcleo em Rust, ainda em desenvolvimento."
		},
		{
			index: "06",
			title: "Próximo passo",
			description: "Estruturas de dados e algoritmos, arquitetura de software e automação/robótica autônoma — o que estou estudando agora, para sistemas mais completos.",
			current: true
		}
	]
};
var githubSection = {
	label: "github",
	title: "Código aberto, projetos reais.",
	description: ["Os projetos apresentados aqui estão documentados e disponíveis no GitHub.", "Código real, histórico real, evolução real."],
	cta: {
		label: "Ver GitHub →",
		href: site.github
	}
};
var contact = {
	label: "contato",
	title: ["Vamos construir", "algo juntos?"],
	description: "Estou buscando minha primeira oportunidade na área de TI — estágio ou posição inicial. Se o meu trabalho combina com o que você procura, vamos conversar.",
	actions: [
		{
			label: "Entrar em contato",
			href: `mailto:${site.email}`,
			primary: true
		},
		{
			label: "GitHub",
			href: site.github,
			primary: false
		},
		{
			label: "LinkedIn",
			href: site.linkedin,
			primary: false
		}
	]
};
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
/**
* Sistema de motion do portfólio.
*
* Todos os hooks aqui:
* - respeitam `prefers-reduced-motion`;
* - usam apenas `transform`/`opacity` para animar (sem layout thrashing);
* - usam `requestAnimationFrame` para trabalho ligado a scroll/pointer;
* - se desligam sozinhos em touch/dispositivos sem hover fino, quando fizer sentido.
*/
function useReducedMotion() {
	const [reduced, setReduced] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined" || !window.matchMedia) return;
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		setReduced(mq.matches);
		const handler = (e) => setReduced(e.matches);
		mq.addEventListener("change", handler);
		return () => mq.removeEventListener("change", handler);
	}, []);
	return reduced;
}
function useFinePointer() {
	const [fine, setFine] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined" || !window.matchMedia) return;
		const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
		setFine(mq.matches);
		const handler = (e) => setFine(e.matches);
		mq.addEventListener("change", handler);
		return () => mq.removeEventListener("change", handler);
	}, []);
	return fine;
}
/** Progresso de leitura da página (0–1), para a barra fina no topo. */
function useScrollProgress() {
	const [progress, setProgress] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		let raf = 0;
		const update = () => {
			const max = document.documentElement.scrollHeight - window.innerHeight;
			setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
			raf = 0;
		};
		const onScroll = () => {
			if (!raf) raf = requestAnimationFrame(update);
		};
		update();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
			if (raf) cancelAnimationFrame(raf);
		};
	}, []);
	return progress;
}
/** Qual seção (por id) está ativa no viewport — para destacar o item da navbar. */
function useActiveSection(ids) {
	const [active, setActive] = (0, import_react.useState)(ids[0] ?? "");
	const key = ids.join(",");
	(0, import_react.useEffect)(() => {
		if (typeof IntersectionObserver === "undefined") return;
		const elements = key.split(",").filter(Boolean).map((id) => document.getElementById(id)).filter((el) => el !== null);
		if (!elements.length) return;
		const observer = new IntersectionObserver((entries) => {
			const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
			if (visible[0]) setActive(visible[0].target.id);
		}, {
			rootMargin: "-35% 0px -50% 0px",
			threshold: [
				0,
				.2,
				.5,
				.8,
				1
			]
		});
		elements.forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	}, [key]);
	return active;
}
/** Contagem numérica suave, disparada externamente por `active` (ex.: quando entra no viewport). */
function useCountUp(target, active, duration = 900) {
	const [value, setValue] = (0, import_react.useState)(0);
	const reduced = useReducedMotion();
	(0, import_react.useEffect)(() => {
		if (!active) return;
		if (reduced) {
			setValue(target);
			return;
		}
		let raf = 0;
		let start = null;
		const step = (ts) => {
			if (start === null) start = ts;
			const p = Math.min(1, (ts - start) / duration);
			const eased = 1 - Math.pow(1 - p, 3);
			setValue(Math.round(eased * target));
			if (p < 1) raf = requestAnimationFrame(step);
		};
		raf = requestAnimationFrame(step);
		return () => cancelAnimationFrame(raf);
	}, [
		active,
		target,
		duration,
		reduced
	]);
	return value;
}
/** Progresso de preenchimento (0–1) usado na linha vertical da Trajetória. */
function useScrollFill(ref) {
	const [progress, setProgress] = (0, import_react.useState)(0);
	const reduced = useReducedMotion();
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		if (reduced) {
			setProgress(1);
			return;
		}
		let raf = 0;
		const update = () => {
			const rect = el.getBoundingClientRect();
			const anchor = window.innerHeight * .62;
			const total = rect.height + anchor;
			const passed = anchor - rect.top;
			setProgress(Math.max(0, Math.min(1, total > 0 ? passed / total : 0)));
			raf = 0;
		};
		const onScroll = () => {
			if (!raf) raf = requestAnimationFrame(update);
		};
		update();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
			if (raf) cancelAnimationFrame(raf);
		};
	}, [ref, reduced]);
	return progress;
}
/** Efeito magnético sutil para CTAs — só em desktop com ponteiro fino e sem reduced motion. */
function useMagnetic(strength = .28, maxOffset = 9) {
	const ref = (0, import_react.useRef)(null);
	const fine = useFinePointer();
	const reduced = useReducedMotion();
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el || !fine || reduced) return;
		const onMove = (e) => {
			const rect = el.getBoundingClientRect();
			const relX = (e.clientX - rect.left) / rect.width - .5;
			const relY = (e.clientY - rect.top) / rect.height - .5;
			const x = Math.max(-maxOffset, Math.min(maxOffset, relX * maxOffset * 2 * strength));
			const y = Math.max(-maxOffset, Math.min(maxOffset, relY * maxOffset * 2 * strength));
			el.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)`;
		};
		const onLeave = () => {
			el.style.transform = "";
		};
		el.addEventListener("pointermove", onMove);
		el.addEventListener("pointerleave", onLeave);
		return () => {
			el.removeEventListener("pointermove", onMove);
			el.removeEventListener("pointerleave", onLeave);
			el.style.transform = "";
		};
	}, [
		fine,
		reduced,
		strength,
		maxOffset
	]);
	return ref;
}
/**
* Badge que segue o cursor dentro de um card (ex.: "Visualizar" nos projetos).
* Retorna a posição local do ponteiro e se o card está em hover — só em desktop
* com ponteiro fino e sem reduced motion; em touch/reduced motion fica sempre inativo,
* então quem consome o hook cai de volta no link normal do card.
*/
function usePointerChip() {
	const ref = (0, import_react.useRef)(null);
	const [pos, setPos] = (0, import_react.useState)({
		x: 0,
		y: 0
	});
	const [hovering, setHovering] = (0, import_react.useState)(false);
	const fine = useFinePointer();
	const reduced = useReducedMotion();
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el || !fine || reduced) return;
		const onMove = (e) => {
			const rect = el.getBoundingClientRect();
			setPos({
				x: e.clientX - rect.left,
				y: e.clientY - rect.top
			});
		};
		const onEnter = () => setHovering(true);
		const onLeave = () => setHovering(false);
		el.addEventListener("pointermove", onMove);
		el.addEventListener("pointerenter", onEnter);
		el.addEventListener("pointerleave", onLeave);
		return () => {
			el.removeEventListener("pointermove", onMove);
			el.removeEventListener("pointerenter", onEnter);
			el.removeEventListener("pointerleave", onLeave);
		};
	}, [fine, reduced]);
	return {
		ref,
		pos,
		active: hovering && fine && !reduced
	};
}
/** Spotlight que segue o cursor dentro de um card (ex.: projeto em destaque). Desktop apenas. */
function useSpotlight() {
	const ref = (0, import_react.useRef)(null);
	const fine = useFinePointer();
	const reduced = useReducedMotion();
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el || !fine || reduced) return;
		const onMove = (e) => {
			const rect = el.getBoundingClientRect();
			el.style.setProperty("--spot-x", `${(e.clientX - rect.left) / rect.width * 100}%`);
			el.style.setProperty("--spot-y", `${(e.clientY - rect.top) / rect.height * 100}%`);
		};
		el.addEventListener("pointermove", onMove);
		return () => el.removeEventListener("pointermove", onMove);
	}, [fine, reduced]);
	return ref;
}
var _jsxFileName$3 = "/workspaces/default/code/src/components/portfolio/ScrollProgress.tsx";
function ScrollProgress() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "scroll-progress-track",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "scroll-progress-bar",
			style: { transform: `scaleX(${useScrollProgress()})` }
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
var _jsxFileName$2 = "/workspaces/default/code/src/components/portfolio/Navbar.tsx";
var sectionIds = nav.map((item) => item.href.replace("/#", ""));
var MOBILE_MENU_ID = "menu-movel";
function Navbar() {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	const toggleRef = (0, import_react.useRef)(null);
	const activeSection = useActiveSection(sectionIds);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 12);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onKeyDown = (e) => {
			if (e.key !== "Escape") return;
			setOpen(false);
			toggleRef.current?.focus();
		};
		const desktop = window.matchMedia("(min-width: 64rem)");
		const onChange = (e) => {
			if (e.matches) setOpen(false);
		};
		document.addEventListener("keydown", onKeyDown);
		desktop.addEventListener("change", onChange);
		return () => {
			document.removeEventListener("keydown", onKeyDown);
			desktop.removeEventListener("change", onChange);
		};
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
		className: cn("fixed inset-x-0 top-0 z-50 transition-colors duration-300", open ? "border-b border-border bg-background/95 backdrop-blur-xl" : scrolled ? "border-b border-border bg-background/80 backdrop-blur-xl" : "bg-transparent"),
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollProgress, {}, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 56,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "container-page flex h-16 items-center justify-between gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: "/#top",
						className: "inline-flex min-h-11 shrink-0 items-center font-display text-base font-bold tracking-tight",
						children: [site.logo, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-primary-soft",
							children: "."
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 63,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 58,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
						"aria-label": "Navegação principal",
						className: "hidden lg:block",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
							className: "flex items-center gap-8",
							children: nav.map((item) => {
								const id = item.href.replace("/#", "");
								return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
									href: item.href,
									"data-active": activeSection === id,
									className: cn("nav-link text-sm transition-colors before:absolute before:-inset-x-2 before:-inset-y-3.5", activeSection === id ? "text-foreground" : "text-muted-foreground hover:text-foreground"),
									children: item.label
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 72,
									columnNumber: 19
								}, this) }, item.href, false, {
									fileName: _jsxFileName$2,
									lineNumber: 71,
									columnNumber: 17
								}, this);
							})
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 67,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 66,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "hidden items-center gap-3 lg:flex",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
							href: site.github,
							target: "_blank",
							rel: "noreferrer noopener",
							className: "btn-press relative rounded-lg border border-border-strong bg-surface px-4 py-2 text-sm transition-colors before:absolute before:inset-x-0 before:-inset-y-1.5 hover:bg-surface-raised",
							children: "GitHub"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 91,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
							href: "/#contato",
							className: "btn-press relative rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors before:absolute before:inset-x-0 before:-inset-y-1.5 hover:bg-primary-bright",
							children: "Contato"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 99,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 90,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						ref: toggleRef,
						type: "button",
						onClick: () => setOpen((v) => !v),
						"aria-label": open ? "Fechar menu" : "Abrir menu",
						"aria-expanded": open,
						"aria-controls": open ? MOBILE_MENU_ID : void 0,
						className: "btn-press grid size-11 shrink-0 place-items-center rounded-lg border border-border-strong bg-surface lg:hidden",
						children: open ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, {
							className: "size-5",
							"aria-hidden": "true"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 117,
							columnNumber: 13
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Menu, {
							className: "size-5",
							"aria-hidden": "true"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 119,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 107,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 57,
				columnNumber: 7
			}, this),
			open && /* @__PURE__ */ (void 0)("div", {
				id: MOBILE_MENU_ID,
				className: "max-h-[calc(100dvh-4rem)] animate-in overflow-y-auto overscroll-contain border-t border-border duration-200 fade-in slide-in-from-top-2 lg:hidden",
				children: /* @__PURE__ */ (void 0)("nav", {
					"aria-label": "Navegação móvel",
					className: "container-page py-4",
					children: [/* @__PURE__ */ (void 0)("ul", {
						className: "grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8",
						children: nav.map((item) => /* @__PURE__ */ (void 0)("li", { children: /* @__PURE__ */ (void 0)("a", {
							href: item.href,
							onClick: () => setOpen(false),
							className: "flex min-h-12 items-center text-base text-muted-foreground transition-colors hover:text-foreground",
							children: item.label
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 133,
							columnNumber: 19
						}, this) }, item.href, false, {
							fileName: _jsxFileName$2,
							lineNumber: 132,
							columnNumber: 17
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 130,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "mt-3 grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (void 0)("a", {
							href: site.github,
							target: "_blank",
							rel: "noreferrer noopener",
							onClick: () => setOpen(false),
							className: "btn-press inline-flex min-h-12 items-center justify-center rounded-lg border border-border-strong bg-surface px-4 text-sm",
							children: "GitHub"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 144,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("a", {
							href: "/#contato",
							onClick: () => setOpen(false),
							className: "btn-press inline-flex min-h-12 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground",
							children: "Contato"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 153,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 143,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 129,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 125,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$2,
		lineNumber: 46,
		columnNumber: 5
	}, this);
}
var _jsxFileName$1 = "/workspaces/default/code/src/components/portfolio/Reveal.tsx";
function Reveal({ children, className, delay = 0, as = "div", variant = "fade-up" }) {
	const ref = (0, import_react.useRef)(null);
	const [visible, setVisible] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		if (typeof IntersectionObserver === "undefined") {
			setVisible(true);
			return;
		}
		const observer = new IntersectionObserver((entries) => {
			for (const entry of entries) if (entry.isIntersecting) {
				setVisible(true);
				observer.disconnect();
			}
		}, {
			threshold: .12,
			rootMargin: "0px 0px -8% 0px"
		});
		observer.observe(el);
		return () => observer.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(as, {
		ref,
		className: cn("reveal", className),
		"data-visible": visible ? "true" : "false",
		"data-animation": variant,
		style: { transitionDelay: `${delay}ms` },
		children
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 50,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/workspaces/default/code/src/components/portfolio/Footer.tsx";
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("footer", {
		className: "border-t border-border py-8",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "container-page flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
				href: "/#top",
				className: "inline-flex min-h-11 items-center self-start lg:min-h-0 font-display text-base font-bold tracking-tight sm:self-auto",
				children: [site.logo, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "text-primary-soft",
					children: "."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 14,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 9,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-sm text-muted-foreground",
				children: site.footer
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 16,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 8,
			columnNumber: 9
		}, this) }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 7,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 6,
		columnNumber: 5
	}, this);
}
//#endregion
export { useSpotlight as _, cn as a, hero as c, timeline as d, useCountUp as f, useScrollFill as g, useReducedMotion as h, about as i, projects as l, usePointerChip as m, Navbar as n, contact as o, useMagnetic as p, Reveal as r, githubSection as s, Footer as t, stack as u };
