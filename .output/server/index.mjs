globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { t as FastResponse } from "./_libs/srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/apple-touch-icon.png": {
		"type": "image/png",
		"etag": "\"81-mAbclH2j95rrPL5C5IBTPHZ/qUY\"",
		"mtime": "2026-10-29T18:36:31.159Z",
		"size": 129,
		"path": "../public/apple-touch-icon.png"
	},
	"/favicon-16x16.png": {
		"type": "image/png",
		"etag": "\"80-ellK9IN5JNysvI3KPYWD3qzN1x8\"",
		"mtime": "2026-10-29T18:36:31.159Z",
		"size": 128,
		"path": "../public/favicon-16x16.png"
	},
	"/favicon-192x192.png": {
		"type": "image/png",
		"etag": "\"81-ry7dPSopOxJil70PdlbyqJNfLGE\"",
		"mtime": "2026-10-29T18:36:31.159Z",
		"size": 129,
		"path": "../public/favicon-192x192.png"
	},
	"/favicon-32x32.png": {
		"type": "image/png",
		"etag": "\"81-VDNjo3haGCDNevM3I9fdPIhDdwo\"",
		"mtime": "2026-10-29T18:36:31.159Z",
		"size": 129,
		"path": "../public/favicon-32x32.png"
	},
	"/favicon-512x512.png": {
		"type": "image/png",
		"etag": "\"82-RAfK59EpbUs7ap9BfmPcrYhAJdM\"",
		"mtime": "2026-10-29T18:36:31.159Z",
		"size": 130,
		"path": "../public/favicon-512x512.png"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"82-v2WoDiIRv3ycZiAnt2cgYmnoHQ8\"",
		"mtime": "2026-10-29T18:36:31.159Z",
		"size": 130,
		"path": "../public/favicon.ico"
	},
	"/favicon.svg": {
		"type": "image/svg+xml",
		"etag": "\"71d-em5rzZQpE1uNytUlwrS0Ya5w/6Q\"",
		"mtime": "2026-10-29T18:36:31.159Z",
		"size": 1821,
		"path": "../public/favicon.svg"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"d6-gUaiKw4mPlUobb3tPor+nUvfVuE\"",
		"mtime": "2026-10-29T18:36:31.159Z",
		"size": 214,
		"path": "../public/robots.txt"
	},
	"/sitemap.xml": {
		"type": "application/xml",
		"etag": "\"5a7-Hf0xjsBBWqQqCUN1VKotyjdF+J4\"",
		"mtime": "2026-10-29T18:36:31.159Z",
		"size": 1447,
		"path": "../public/sitemap.xml"
	},
	"/assets/Footer-4STIKniJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bce4-Z3dCxQyRuPU/QkQnnma4AW5TdKQ\"",
		"mtime": "2026-10-29T18:36:30.382Z",
		"size": 48356,
		"path": "../public/assets/Footer-4STIKniJ.js"
	},
	"/assets/about-illustration-tV9CnTp6.png": {
		"type": "image/png",
		"etag": "\"83-ejb9TC1QDJCLjR+niQwcN36c9kA\"",
		"mtime": "2026-10-29T18:36:30.383Z",
		"size": 131,
		"path": "../public/assets/about-illustration-tV9CnTp6.png"
	},
	"/assets/hero-sunset-portrait-n5AqGVp8.jpg": {
		"type": "image/jpeg",
		"etag": "\"82-gfncwEzq2S4sa33qeOdRTqmbGZA\"",
		"mtime": "2026-10-29T18:36:30.383Z",
		"size": 130,
		"path": "../public/assets/hero-sunset-portrait-n5AqGVp8.jpg"
	},
	"/assets/jsx-dev-runtime-C-9nZidY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"84c7-31qf9gD4EzR6ptI0r8MsLYGNRDE\"",
		"mtime": "2026-10-29T18:36:30.383Z",
		"size": 33991,
		"path": "../public/assets/jsx-dev-runtime-C-9nZidY.js"
	},
	"/assets/mini-olimpiada-robotica-CrFJ4kzm.jpg": {
		"type": "image/jpeg",
		"etag": "\"83-cZvotZvdVkr0na45l0LmvPILx68\"",
		"mtime": "2026-10-29T18:36:30.383Z",
		"size": 131,
		"path": "../public/assets/mini-olimpiada-robotica-CrFJ4kzm.jpg"
	},
	"/assets/projects._slug-B_7fUD5h.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2db6-W74Y9XSCEtpMdP11UILenQ4cUto\"",
		"mtime": "2026-10-29T18:36:30.383Z",
		"size": 11702,
		"path": "../public/assets/projects._slug-B_7fUD5h.js"
	},
	"/assets/robot-wF-vsUPb.glb": {
		"type": "model/gltf-binary",
		"etag": "\"61e80-tDSgjgCoeGHIfSk/zn8JaFqaSRg\"",
		"mtime": "2026-10-29T18:36:30.383Z",
		"size": 401024,
		"path": "../public/assets/robot-wF-vsUPb.glb"
	},
	"/assets/robotLayout-Bx1Qd_bg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"328-oL7suu9Ih5gQ3s0zdp0C9wXIuxc\"",
		"mtime": "2026-10-29T18:36:30.383Z",
		"size": 808,
		"path": "../public/assets/robotLayout-Bx1Qd_bg.js"
	},
	"/assets/routes-Jdjt-D6g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12cd6-BnL6GPFranWTEtW6kWXciMNkVuU\"",
		"mtime": "2026-10-29T18:36:30.383Z",
		"size": 77014,
		"path": "../public/assets/routes-Jdjt-D6g.js"
	},
	"/assets/styles-DLINWdSk.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1abaf-+TzVJciNTouO/RSg0VQcIK4U8vg\"",
		"mtime": "2026-10-29T18:36:30.383Z",
		"size": 109487,
		"path": "../public/assets/styles-DLINWdSk.css"
	},
	"/assets/index-CMx6oecm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8b5f4-fIkK/fZj+GfGYt/DHfi8+4Vr+Ug\"",
		"mtime": "2026-10-29T18:36:30.378Z",
		"size": 570868,
		"path": "../public/assets/index-CMx6oecm.js"
	},
	"/assets/RobotScene-nWcBsy4_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"103090-EfHKecy4oc+eEsKBq3oznLSjyhs\"",
		"mtime": "2026-10-29T18:36:30.382Z",
		"size": 1061008,
		"path": "../public/assets/RobotScene-nWcBsy4_.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/.pnpm/nitro@3.0.260603-beta_jiti@2.7.0_vite@8.1.5_@types+node@22.19.17_jiti@2.7.0_/node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_fvrVfO = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_fvrVfO
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/.pnpm/nitro@3.0.260603-beta_jiti@2.7.0_vite@8.1.5_@types+node@22.19.17_jiti@2.7.0_/node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/.pnpm/nitro@3.0.260603-beta_jiti@2.7.0_vite@8.1.5_@types+node@22.19.17_jiti@2.7.0_/node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/.pnpm/nitro@3.0.260603-beta_jiti@2.7.0_vite@8.1.5_@types+node@22.19.17_jiti@2.7.0_/node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/.pnpm/nitro@3.0.260603-beta_jiti@2.7.0_vite@8.1.5_@types+node@22.19.17_jiti@2.7.0_/node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
