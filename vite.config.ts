// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// This project can build for three different targets from the same `vite
// build` command — each hosting platform sets its own env var during CI, so
// we detect which one we're in and adjust `base`/`nitro.preset` accordingly.
//   - Cloudflare Pages: sets CF_PAGES=1 automatically during its own build.
//   - GitHub Actions (used for GitHub Pages): sets GITHUB_ACTIONS=true.
//   - Local dev / anything else: defaults to a plain Cloudflare Worker build,
//     matching this project's original target.
const isCloudflarePagesBuild = process.env.CF_PAGES === "1";
const isGithubPagesBuild = process.env.GITHUB_ACTIONS === "true" && !isCloudflarePagesBuild;

// GitHub Pages serves this repo at /portfolio/ (not the domain root), so every
// asset URL and route needs that prefix. Cloudflare Pages/Workers serve from
// the domain root, so they keep "/".
const base = isGithubPagesBuild ? "/portfolio/" : "/";

export default defineConfig({
  vite: { base },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR
    // error wrapper) — only relevant to Cloudflare builds (Worker or Pages).
    // The GitHub Pages build only runs the server transiently (see
    // scripts/build-github-pages.mjs) to freeze pages to static HTML, so this
    // wrapper doesn't apply there.
    ...(isGithubPagesBuild ? {} : { server: { entry: "server" } }),
  },
  nitro: {
    preset: isCloudflarePagesBuild
      ? "cloudflare-pages"
      : isGithubPagesBuild
        ? // GitHub Pages only serves static files (no Node/Cloudflare runtime).
          // Nitro's own "static"/"github-pages" SSG presets have a
          // reproducible prerender bug in this TanStack Start + Nitro v3 beta
          // combo (routes get written as empty files — see upstream issues on
          // tanstack-router about ".output/server/server.js" / empty
          // prerender output). We use the stable "node-server" preset
          // instead: it builds a real, working Node server, and
          // scripts/build-github-pages.mjs boots it and freezes every route
          // to static HTML itself (`bun run build:gh-pages`).
          "node-server"
        : "cloudflare-module",
  },
});
