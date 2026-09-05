#!/usr/bin/env node
// Gera o site estático para o GitHub Pages.
//
// Por quê este script existe: o preset "static"/"github-pages" do Nitro (v3
// beta, usado pelo TanStack Start) tem um bug conhecido de prerender que gera
// arquivos vazios nesta combinação de versões (ver issues do tanstack-router/
// nitro sobre "Cannot find module .output/server/server.js" e prerender
// retornando 0 bytes). O preset "node-server", em contraste, funciona
// perfeitamente: builda um servidor Node real e funcional.
//
// Este script contorna o bug fazendo manualmente o que o SSG automático
// deveria fazer: sobe o servidor Node real, "congela" cada rota em HTML via
// crawling (wget), copia os assets estáticos do build e escreve os arquivos
// que o GitHub Pages exige (.nojekyll, 404.html).
import { spawn, execSync } from "node:child_process";
import { cpSync, mkdirSync, writeFileSync, existsSync, rmSync } from "node:fs";
import { setTimeout as sleep } from "node:timers/promises";

const PORT = 4500;
const BASE = "/portfolio"; // deve bater com `base` em vite.config.ts
const ORIGIN = `http://127.0.0.1:${PORT}`;
const OUT_DIR = ".output/gh-pages";

rmSync(OUT_DIR, { recursive: true, force: true });
mkdirSync(OUT_DIR, { recursive: true });

// 1. Copia os assets estáticos já buildados (o node-server não serve
//    /assets sozinho — precisa de um host estático na frente, que aqui é o
//    próprio GitHub Pages).
cpSync(".output/public/assets", `${OUT_DIR}/assets`, { recursive: true });
for (const file of ["favicon.ico", "robots.txt"]) {
  if (existsSync(`.output/public/${file}`)) {
    cpSync(`.output/public/${file}`, `${OUT_DIR}/${file}`);
  }
}

// 2. Sobe o servidor Node real e espera responder.
const server = spawn("node", [".output/server/index.mjs"], {
  env: { ...process.env, PORT: String(PORT), HOST: "127.0.0.1" },
  stdio: "ignore",
  detached: true,
});
let ready = false;
for (let i = 0; i < 40 && !ready; i++) {
  try {
    execSync(`curl -sf -o /dev/null "${ORIGIN}${BASE}/"`);
    ready = true;
  } catch {
    await sleep(250);
  }
}
if (!ready) {
  server.kill();
  console.error("Servidor não respondeu a tempo.");
  process.exit(1);
}

// 3. Congela as páginas HTML: crawler baseado em links reais do SSR (a home
//    e a página de projeto já renderizam <a href> para todas as rotas).
try {
  execSync(
    `wget --mirror --no-host-directories --cut-dirs=1 --page-requisites ` +
      `--adjust-extension --no-parent -P "${OUT_DIR}" "${ORIGIN}${BASE}/"`,
    { stdio: "inherit" },
  );
} catch {
  // wget sai com código != 0 quando algum requisito de página (ex.: /assets,
  // já copiados manualmente no passo 1, ou o placeholder de imagem do
  // Lovable) responde com erro. As páginas HTML reais (rotas) são o que
  // importa aqui, e essas já foram checadas abaixo.
}

// 4. Página 404 dedicada (GitHub Pages serve esse arquivo para qualquer rota
//    não encontrada).
const notFound = execSync(`curl -s "${ORIGIN}${BASE}/__not-found__"`).toString();
writeFileSync(`${OUT_DIR}/404.html`, notFound);

server.kill("SIGKILL");

// 5. Arquivo exigido pelo GitHub Pages para não ignorar pastas como /assets.
writeFileSync(`${OUT_DIR}/.nojekyll`, "");

// 6. Validação: nenhuma página essencial pode ter ficado vazia/ausente.
const { statSync, readdirSync } = await import("node:fs");
const projectFiles = existsSync(`${OUT_DIR}/projects`) ? readdirSync(`${OUT_DIR}/projects`) : [];
const problems = [];
if (statSync(`${OUT_DIR}/index.html`, { throwIfNoEntry: false })?.size === 0) problems.push("index.html vazio");
if (!existsSync(`${OUT_DIR}/404.html`)) problems.push("404.html ausente");
if (projectFiles.length === 0) problems.push("nenhuma página de projeto foi gerada em /projects");
for (const f of projectFiles) {
  if (statSync(`${OUT_DIR}/projects/${f}`).size === 0) problems.push(`projects/${f} vazio`);
}
if (problems.length) {
  console.error("Falha na validação do build estático:", problems);
  process.exit(1);
}

console.log(`\nSite estático gerado em ${OUT_DIR} (${projectFiles.length} páginas de projeto).`);
process.exit(0);
