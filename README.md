# Muryllo Douglas — Portfólio

Estudante do Ensino Médio Integrado ao Técnico em Informática no **IFPB — Campus Itaporanga** e desenvolvedor em formação. Este repositório é o código-fonte do meu portfólio pessoal e também um retrato de como venho aumentando a complexidade dos projetos: de landing pages para sistemas com API própria, banco relacional, autorização no servidor, testes e deploy automatizado.

**[Ver portfólio ao vivo →](https://portfolio-c1u.pages.dev/)**

> Não estou tentando parecer alguém com anos de experiência que não tenho. Estou mostrando o que consigo construir agora, e procuro um **estágio ou posição inicial** para continuar evoluindo em um time.

---

## Sobre mim

Construo projetos próprios porque acredito que a melhor forma de aprender é fazendo. Meu foco é desenvolvimento web e engenharia de software, e nos últimos projetos ampliei o alcance: do front-end para **APIs com banco relacional, autorização, testes e CI/CD** e, mais recentemente, para **aplicações desktop com núcleo em Rust**. Também me interesso por automação, segurança, estruturas de dados e robótica.

```
Landing pages  →  Autenticação e dados  →  Backend próprio e banco relacional  →  Desktop com Rust
```

## Projetos em destaque

Projetos principais, escolhidos pela profundidade técnica e pelo problema que resolvem. Cada um tem página de detalhes no portfólio (problema, solução, arquitetura e limitações declaradas).

### ⚖️ [LexContract](https://github.com/muryllodouglashsoares/law-contract-management) — em desenvolvimento

Sistema de gestão de contratos jurídicos para advogados autônomos e pequenos escritórios: centraliza clientes, modelos, contratos, documentos, pagamentos e auditoria. É o projeto com maior amplitude técnica do portfólio.

- **Segurança:** login com JWT; permissões por papel (`ADMIN`, `LAWYER`, `ASSISTANT`) verificadas **no backend**, não só escondidas na interface; isolamento de dados entre escritórios (multi-tenant) em toda leitura e escrita.
- **Contratos:** modelos com variáveis, criação em etapas, versionamento do conteúdo, transições de status controladas e aceite eletrônico por link público de uso único (assinatura eletrônica simples, não ICP-Brasil).
- **Qualidade e entrega:** testes no backend com PostgreSQL real no CI, 4 fluxos E2E em Playwright e pipeline no GitHub Actions que só publica após typecheck, build, testes, E2E e build das imagens Docker passarem.
- **Stack:** React 19 · TypeScript · Vite · Tailwind CSS 4 · Node.js · Fastify · PostgreSQL · Prisma · Zod · Vitest · Playwright · Docker · GitHub Actions
- 🔗 [Demo](https://law-contract-management.pages.dev/) · [Repositório](https://github.com/muryllodouglashsoares/law-contract-management)

### 🔎 [Evidence Finder](https://github.com/muryllodouglashsoares/evidence-finder) — em desenvolvimento

Aplicativo desktop que organiza e pesquisa PDFs, imagens, textos e conversas, sempre com referência à fonte e exportação de evidências. Processamento 100% local: o código não tem cliente de rede nem telemetria.

- **Pesquisa:** exata (SQLite FTS5), por significado (embeddings locais) e híbrida, com OCR local via Tesseract.
- **Exportação:** relatório em PDF e `manifest.json`, com SHA-256 para verificar se a fonte continua a mesma.
- **Stack:** Tauri 2 · Rust · React 19 · TypeScript · SQLite (FTS5) · Tesseract · Vitest
- **Estado atual:** versão 0.1.0, testada em Linux. Validação no Windows, instalador e release para download ainda estão pendentes.
- 🔗 [Repositório](https://github.com/muryllodouglashsoares/evidence-finder)

### 🌿 [GitFlow Desktop](https://github.com/muryllodouglashsoares/gitflow) — em desenvolvimento

Interface desktop para operar repositórios Git locais: branches, revisão de diff, commit seletivo e sincronização remota com bloqueios de segurança.

- **Como:** o núcleo em Rust executa o Git sem shell e só reporta sucesso quando o Git comprova o resultado (HEAD avançou, push sem linhas rejeitadas).
- **Segurança:** push sem `--force`; `main` e `master` exigem segunda confirmação, validada também no backend; o app não armazena credenciais.
- **Stack:** Tauri · Rust · React · TypeScript · Git CLI
- **Estado atual:** fases 1 a 3 (leitura, operações locais e sincronização remota) implementadas. Ainda sem instalador: hoje roda em modo de desenvolvimento.
- 🔗 [Repositório](https://github.com/muryllodouglashsoares/gitflow)

### 🎓 [Tekidu](https://github.com/muryllodouglashsoares/Tekidu) — em desenvolvimento

Plataforma de gestão acadêmica com quatro experiências separadas: administrador, professor, estudante e responsável.

- **O que resolve:** notas, frequência, boletim e avisos espalhados entre planilhas e sistemas separados.
- **Como:** Firebase Auth (login, primeiro acesso, recuperação de senha), dados no Cloud Firestore, exportação em PDF e Excel, justificativas de falta com anexo, interface mobile dedicada, PWA instalável e painel de acessibilidade.
- **Detalhe técnico:** a autorização por perfil é garantida pelas **Firestore Security Rules**, com suíte de testes própria (Vitest + Firebase Emulator).
- **Stack:** React · TypeScript · Tailwind CSS · Firebase Auth · Cloud Firestore · Vitest
- 🔗 [Demo](https://tekidu.pages.dev/) · [Repositório](https://github.com/muryllodouglashsoares/Tekidu)

## Outros projetos

| Projeto | Tipo | Stack | Status |
| --- | --- | --- | --- |
| [**IFConnect**](https://github.com/muryllodouglashsoares/plataforma-comunicacao) | Rede social acadêmica: feed, chat em tempo real e painel de moderação, em JavaScript puro | JavaScript · Firebase Auth · Realtime Database | Concluído |
| [**Savora**](https://github.com/muryllodouglashsoares/savora-landing-page) · [demo](https://savora-landing-page.muryllodouglash-soares.workers.dev/) | Landing page e cardápio digital, com reservas ponta a ponta (formulário → server function → webhook → Google Sheets → PDF) | React 19 · TanStack Start · Tailwind CSS 4 · Motion · Cloudflare Workers | Concluído |
| [**FORJA Training Studio**](https://github.com/muryllodouglashsoares/gym-landing-page) · [demo](https://gym-landing-page.muryllodouglash-soares.workers.dev/) | Landing page com validação de formulário no cliente e no servidor, honeypot anti-bot e SEO técnico | TanStack Start · React 19 · TypeScript · Zod | Concluído |
| [**OdontoPrime**](https://github.com/muryllodouglashsoares/clinica-landing-page) · [demo](https://clinica-landing-page.muryllodouglash-soares.workers.dev/) | Landing page de clínica odontológica com SSR e dados estruturados JSON-LD | TanStack Start · React 19 · TypeScript | Concluído |
| [**Mini Olimpíada de Robótica**](https://github.com/muryllodouglashsoares/mini-robotics-competition) | Seguidor de linha em LEGO Spike Prime para competição do IFPB, em blocos e em Python | LEGO Spike Prime · Python | Concluído |

## Stack / Tecnologias

Só o que já usei em projetos, e onde.

**Front-end**
![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/-React-149ECA?style=flat-square&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![TanStack Start](https://img.shields.io/badge/-TanStack_Start-FF4154?style=flat-square)

**Back-end / Dados**
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Fastify](https://img.shields.io/badge/-Fastify-000000?style=flat-square&logo=fastify&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/-Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)
![SQLite](https://img.shields.io/badge/-SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white)
![Firebase](https://img.shields.io/badge/-Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black)
![Firestore](https://img.shields.io/badge/-Firestore-FFA000?style=flat-square)
![Zod](https://img.shields.io/badge/-Zod-3E67B1?style=flat-square)

**Desktop**
![Rust](https://img.shields.io/badge/-Rust-000000?style=flat-square&logo=rust&logoColor=white)
![Tauri](https://img.shields.io/badge/-Tauri-24C8D8?style=flat-square&logo=tauri&logoColor=white)

**Qualidade / Deploy**
![Vitest](https://img.shields.io/badge/-Vitest-6E9F18?style=flat-square&logo=vitest&logoColor=white)
![Playwright](https://img.shields.io/badge/-Playwright-2EAD33?style=flat-square&logo=playwright&logoColor=white)
![Docker](https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/-GitHub_Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white)
![Git](https://img.shields.io/badge/-Git-F05032?style=flat-square&logo=git&logoColor=white)
![Cloudflare](https://img.shields.io/badge/-Cloudflare-F38020?style=flat-square&logo=cloudflare&logoColor=white)
![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat-square&logo=vite&logoColor=white)

**Robótica**
![Python](https://img.shields.io/badge/-Python-3776AB?style=flat-square&logo=python&logoColor=white)
![LEGO SPIKE Prime](https://img.shields.io/badge/-LEGO_SPIKE_Prime-E3000B?style=flat-square)

## Atualmente estudando

Sem projeto publicado ainda:

- Estruturas de dados e algoritmos
- Arquitetura de software
- Robótica autônoma e automação

## Objetivos

- Conquistar minha primeira oportunidade profissional na área de TI (estágio ou posição inicial)
- Evoluir LexContract, Evidence Finder, GitFlow Desktop e Tekidu até versões estáveis, com release para download nos apps desktop
- Aplicar estruturas de dados e arquitetura de software em projetos de maior escala
- Ganhar experiência prática em automação e robótica autônoma

## Contato

- **Portfólio:** [portfolio-c1u.pages.dev](https://portfolio-c1u.pages.dev/)
- **E-mail:** [muryllodouglash.soares@gmail.com](mailto:muryllodouglash.soares@gmail.com)
- **GitHub:** [github.com/muryllodouglashsoares](https://github.com/muryllodouglashsoares)
- **LinkedIn:** [linkedin.com/in/muryllo-douglas-henrique-soares-7a8416416](https://www.linkedin.com/in/muryllo-douglas-henrique-soares-7a8416416/)

---

<sub>Este portfólio é construído com React 19, TypeScript, Vite e Tailwind CSS 4, e hospedado na Cloudflare Pages.</sub>
