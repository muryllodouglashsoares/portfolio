# Muryllo Douglas — Portfólio

Estudante de Informática (Ensino Médio Integrado ao Técnico) no **IFPB Campus Itaporanga** e desenvolvedor em formação. Este repositório é o código-fonte do meu portfólio pessoal — e também um retrato de como venho evoluindo de landing pages para sistemas com autenticação, banco de dados e regras de autorização reais.

**[Ver portfólio ao vivo →](https://portfolio-c1u.pages.dev)**

---

## Sobre mim

Sou estudante do 2º ano do Técnico em Informática no IFPB Itaporanga, construindo projetos reais como forma prática de aprender desenvolvimento de software. Meu foco está em desenvolvimento web (front-end e back-end), automação e, mais recentemente, arquitetura e estruturas de dados — a base para sistemas mais complexos do que os que eu conseguia construir há um ano.

Não é um portfólio de "faço sites". É o histórico de alguém aumentando a complexidade técnica projeto a projeto: de landing pages estáticas para uma plataforma com três perfis de usuário, Firestore e regras de segurança testadas.

## O que estou construindo

A progressão dos meus projetos segue um caminho direto:

```
Landing Pages  →  Interfaces com lógica  →  Autenticação e dados  →  Autorização e arquitetura
```

Comecei com páginas e interfaces para fixar HTML, CSS, JavaScript e responsividade. De lá, passei para aplicações com lógica de negócio real — e hoje trabalho no **Tekidu**, onde autenticação, banco de dados, papéis de usuário e regras de segurança deixaram de ser conceito e passaram a ser código em produção.

## Projetos em destaque

### 🎓 [Tekidu](https://github.com/muryllodouglashsoares/Tekidu) — em desenvolvimento

O projeto de maior complexidade do portfólio. Uma plataforma de gestão e acompanhamento acadêmico com três experiências separadas — administrador, professor e estudante — cada uma com telas e permissões próprias.

- **O que resolve:** informações acadêmicas (notas, frequência, boletim, avisos) espalhadas entre planilhas e sistemas dispersos.
- **Como:** autenticação completa com Firebase Auth (login, primeiro acesso, recuperação de senha), dados acadêmicos no Cloud Firestore, e autorização por perfil garantida via **Firestore Security Rules** — não apenas escondida na interface.
- **Stack:** React 18 · TypeScript · Vite · Tailwind CSS · Framer Motion · Firebase Auth · Cloud Firestore · Vitest
- **Detalhe técnico:** as regras de segurança têm suíte de testes própria com Vitest + Firebase Emulator, e a maior parte das rotas usa `React.lazy` agrupado por perfil — um estudante não baixa o código do painel administrativo.
- **Aprendizado:** marcou a transição de interfaces isoladas para uma aplicação com persistência de dados e autorização validada no banco.
- 🔗 [Demo](https://tekidu.pages.dev/) · [Repositório](https://github.com/muryllodouglashsoares/Tekidu)

### 💬 [IFConnect](https://github.com/muryllodouglashsoares/IFConnect) — concluído

Rede social acadêmica com feed, chat em tempo real e painel de moderação, em **JavaScript puro** (sem framework de front-end).

- **Stack:** JavaScript · Firebase Auth · Realtime Database
- **Aprendizado:** veio antes do Tekidu — foi onde autenticação, tempo real e controle de acesso por cargo apareceram por conta própria, sem um framework organizando o crescimento do código.

### 🍽️ [Savora](https://github.com/muryllodouglashsoares/savora-landing-page) — concluído

Landing page e cardápio digital de um restaurante fictício, com animação autoral na hero e reservas ponta a ponta (React Hook Form → server function → webhook → Google Sheets → PDF).

- **Stack:** React 19 · TypeScript · TanStack Start · Tailwind CSS 4 · Motion · Cloudflare Workers
- 🔗 [Demo](https://savora-landing-page.muryllodouglash-soares.workers.dev/)

### 🏋️ [FORJA Training Studio](https://github.com/muryllodouglashsoares/gym-landing-page) — concluído

Landing page de alta conversão com validação dupla de formulário (cliente + servidor), campo honeypot anti-bot e SEO técnico completo (JSON-LD, Open Graph, sitemap).

- **Stack:** TanStack Start · React 19 · TypeScript · Tailwind CSS 4 · React Hook Form · Zod
- 🔗 [Demo](https://gym-landing-page.muryllodouglash-soares.workers.dev/)

### 🦷 [OdontoPrime](https://github.com/muryllodouglashsoares/clinica-landing-page) — concluído

Landing page de clínica odontológica renderizada via SSR, a partir de um design de referência, com dados estruturados para SEO.

- **Stack:** TanStack Start · React 19 · TypeScript · Tailwind CSS
- 🔗 [Demo](https://clinica-landing-page.muryllodouglash-soares.workers.dev/)

### 🤖 [Mini Olimpíada de Robótica](https://github.com/muryllodouglashsoares/mini-robotics-competition) — concluído

Robô seguidor de linha em LEGO Spike Prime para competição do IFPB, com duas abordagens comparadas: programação em blocos com dois sensores, e Python com um único sensor.

- **Stack:** LEGO Spike Prime · Python · Programação em blocos

Além destes, tenho experiência com **robótica educacional** (LEGO SPIKE Prime, OBR) e um projeto de **sistema embarcado de alarme de incêndio**, unindo hardware, lógica de programação e automação.

## Stack / Tecnologias

**Front-end**
![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/-React-149ECA?style=flat-square&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![TanStack Start](https://img.shields.io/badge/-TanStack_Start-FF4154?style=flat-square)

**Back-end / BaaS**
![Firebase](https://img.shields.io/badge/-Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black)
![Firestore](https://img.shields.io/badge/-Firestore-FFA000?style=flat-square)
![Zod](https://img.shields.io/badge/-Zod-3E67B1?style=flat-square)

**Infraestrutura**
![Cloudflare](https://img.shields.io/badge/-Cloudflare-F38020?style=flat-square&logo=cloudflare&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/-GitHub_Pages-222222?style=flat-square&logo=github&logoColor=white)
![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat-square&logo=vite&logoColor=white)

**Ferramentas**
![Git](https://img.shields.io/badge/-Git-F05032?style=flat-square&logo=git&logoColor=white)
![Vitest](https://img.shields.io/badge/-Vitest-6E9F18?style=flat-square&logo=vitest&logoColor=white)

**Robótica / Automação**
![Python](https://img.shields.io/badge/-Python-3776AB?style=flat-square&logo=python&logoColor=white)
![LEGO SPIKE Prime](https://img.shields.io/badge/-LEGO_SPIKE_Prime-E3000B?style=flat-square)

*Este portfólio em si (o código deste repositório) é construído com React 19, TypeScript, TanStack Start e Tailwind CSS 4, com build para GitHub Pages.*

## Atualmente estudando

- Estruturas de dados e algoritmos
- Arquitetura de software
- Programação competitiva
- Backend e regras de autorização
- Robótica autônoma e automação

## Objetivos

- Aprofundar backend e modelagem de dados além do Firebase, incluindo bancos relacionais
- Evoluir o Tekidu com mais recursos acadêmicos e melhor cobertura de testes
- Aplicar estruturas de dados e arquitetura de software em projetos de maior escala
- Ganhar experiência prática em automação e robótica autônoma
- Conquistar minha primeira oportunidade profissional como desenvolvedor (estágio ou trainee)

## Contato

- **Portfólio:** [muryllodouglashsoares.github.io/portfolio](https://muryllodouglashsoares.github.io/portfolio/)
- **GitHub:** [github.com/muryllodouglashsoares](https://github.com/muryllodouglashsoares)
- **LinkedIn:** [linkedin.com/in/muryllodouglashsoares](https://linkedin.com/in/muryllodouglashsoares)

---

<sub>Construído com React 19, TypeScript, TanStack Start e Tailwind CSS 4. Deploy contínuo via GitHub Actions para GitHub Pages.</sub>
