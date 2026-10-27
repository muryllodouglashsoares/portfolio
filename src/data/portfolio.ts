// Conteúdo editável do portfólio. Edite apenas este arquivo para atualizar textos.
import heroPortrait from "@/assets/hero-sunset-portrait.jpg";
import aboutIllustration from "@/assets/about-illustration.png";
import { projects as projectList } from "@/data/projects";

export const site = {
  name: "Muryllo",
  logo: "muryllo",
  fullName: "Muryllo Douglas",
  role: "Estudante · Desenvolvedor",
  email: "muryllodouglash.soares@gmail.com",
  github: "https://github.com/muryllodouglashsoares",
  linkedin: "https://www.linkedin.com/in/muryllo-douglas-henrique-soares-7a8416416/",
  footer: "© 2026 Muryllo Douglas · Estudante, desenvolvedor, construtor.",
};

export const nav = [
  { label: "Sobre", href: "/#sobre" },
  { label: "Skills", href: "/#stack" },
  { label: "Engenharia", href: "/#engenharia" },
  { label: "Projetos", href: "/#projetos" },
  { label: "Trajetória", href: "/#trajetoria" },
  { label: "Contato", href: "/#contato" },
];

export const hero = {
  badge: "Estudante · Desenvolvedor",
  greeting: "Oi, eu sou",
  name: "Muryllo.",
  subtitle: ["Eu construo software", "do banco de dados à interface."],
  description:
    "Estudante do Ensino Médio Integrado ao Técnico em Informática no IFPB — Campus Itaporanga. Desenvolvo projetos próprios, de um sistema de gestão de contratos a um app desktop de busca local, e busco minha primeira oportunidade na área de TI.",
  primaryCta: { label: "Ver projetos", href: "/#projetos" },
  secondaryCta: { label: "Conhecer mais", href: "/#sobre" },
  techLabel: "Tecnologias que utilizo",
  tech: ["TypeScript", "React", "Node.js", "PostgreSQL", "Rust", "Git"],
  codeChip: 'const dev = "muryllo"',
  statusChip: "aberto a estágio",
  portraitSrc: heroPortrait as string | null,
  portraitAlt: "Retrato editorial de Muryllo Douglas ao entardecer, com sol estilizado ao fundo",
};

export const about = {
  label: "sobre",
  title: ["Construindo,", "aprendendo", "e evoluindo."],
  paragraphs: [
    "Sou estudante do Ensino Médio Integrado ao Técnico em Informática no IFPB — Campus Itaporanga e desenvolvedor em formação. Construo projetos próprios porque acredito que a melhor forma de aprender é fazendo.",
    "Meu foco é desenvolvimento web e engenharia de software. Tenho ampliado o alcance dos projetos: do front-end para APIs com banco relacional, autorização, testes e deploy automatizado e, mais recentemente, para uma aplicação desktop em Rust. Também me interesso por automação, segurança, estruturas de dados e robótica.",
    "Não estou tentando parecer alguém com anos de experiência que não tenho. Estou mostrando o que consigo construir agora, e procuro um estágio ou posição inicial para continuar evoluindo em um time.",
  ],
  tags: ["Desenvolvimento Web", "React", "TypeScript", "Rust", "Automação", "Robótica", "IFPB"],
  illustrationSrc: aboutIllustration as string,
  illustrationAlt: "Ilustração digital estilizada de Muryllo Douglas",
  stats: [
    { value: String(projectList.length), label: "Projetos documentados" },
    {
      value: String(projectList.filter((p) => p.demoUrl).length),
      label: "Projetos com demo online",
    },
    {
      value: String(projectList.filter((p) => p.authAndDatabase).length),
      label: "Apps com autenticação e banco de dados",
    },
    {
      value: String(projectList.filter((p) => p.hasTests).length),
      label: "Projetos com testes automatizados",
    },
  ],
};

export const stack = {
  label: "stack",
  title: "Tecnologias que utilizo",
  subtitle:
    "Só o que já usei em projetos, e onde. Em estudo agora, sem projeto publicado: estruturas de dados e algoritmos, arquitetura de software e robótica autônoma.",
  groups: [
    {
      title: "Front-end",
      items: [
        { name: "HTML / CSS", note: "Base de todos os projetos web" },
        { name: "JavaScript", note: "IFConnect, OdontoPrime — interatividade sem framework" },
        {
          name: "TypeScript",
          note:
            "LexContract, Evidence Finder, Tekidu, Savora, FORJA, OdontoPrime — tipagem de dados e componentes",
        },
        {
          name: "React",
          note:
            "LexContract, Evidence Finder, Tekidu, Savora, FORJA, OdontoPrime — construção de interfaces",
        },
        {
          name: "Tailwind CSS",
          note: "LexContract, Tekidu, Savora, FORJA — estilização utilitária",
        },
        { name: "TanStack Start", note: "Savora, FORJA, OdontoPrime — SSR e roteamento" },
      ],
    },
    {
      title: "Back-end / Dados",
      items: [
        { name: "Node.js + Fastify", note: "LexContract — API REST modular com JWT e papéis" },
        {
          name: "PostgreSQL + Prisma",
          note: "LexContract — dados relacionais isolados por escritório",
        },
        {
          name: "Rust + Tauri",
          note: "Evidence Finder, GitFlow Desktop — núcleo dos apps desktop",
        },
        { name: "SQLite (FTS5)", note: "Evidence Finder — metadados e busca de texto local" },
        { name: "Firebase Auth", note: "Tekidu, IFConnect — autenticação de usuários" },
        { name: "Cloud Firestore", note: "Tekidu — dados acadêmicos e regras de acesso" },
        { name: "Realtime Database", note: "IFConnect — feed, chat e notificações" },
      ],
    },
    {
      title: "Qualidade / Deploy",
      items: [
        {
          name: "Vitest + Firebase Emulator",
          note: "Tekidu — testes das regras de segurança",
        },
        {
          name: "Vitest",
          note: "LexContract (API), Evidence Finder (frontend), Tekidu — testes automatizados",
        },
        { name: "cargo test (Rust)", note: "Evidence Finder, GitFlow Desktop — testes do núcleo" },
        { name: "Playwright", note: "LexContract — 4 fluxos E2E rodando no CI" },
        { name: "Docker", note: "LexContract — imagens do frontend (Nginx) e do backend" },
        {
          name: "GitHub Actions",
          note: "LexContract — CI e deploy só após todos os testes passarem",
        },
        { name: "Git / GitHub", note: "Todos os projetos — versionamento e histórico" },
        {
          name: "Cloudflare",
          note: "LexContract, Tekidu, Savora, FORJA, OdontoPrime — deploy e hospedagem",
        },
        { name: "Make", note: "Savora, FORJA, OdontoPrime — automação de formulários" },
        { name: "Zod", note: "FORJA — validação de formulário no cliente e no servidor" },
      ],
    },
    {
      title: "Robótica",
      items: [
        { name: "Python", note: "Mini Olimpíada — leitura de sensor e lógica do robô" },
        { name: "LEGO Spike Prime", note: "Mini Olimpíada — montagem e programação em blocos" },
      ],
    },
  ],
};

export const engineering = {
  label: "engenharia",
  title: "Como eu penso o desenvolvimento",
  description:
    "Tecnologia é meio, não fim. Estas são as competências que aplico de projeto em projeto — só o que já apareceu em código real.",
  groups: [
    {
      title: "Front-end",
      items: [
        "Componentização de interfaces em React, reaproveitando UI entre telas",
        "TypeScript para tipar dados, formulários e o contrato entre camadas",
        "Design responsivo, com dark mode via tokens de design no Tekidu",
      ],
    },
    {
      title: "Dados, autorização e privacidade",
      items: [
        "Modelagem relacional com PostgreSQL e Prisma no LexContract; modelagem de dados acadêmicos e sociais no Firestore / Realtime Database",
        "Autenticação com Firebase Auth: e-mail/senha e recuperação de senha no Tekidu; e-mail/senha, Google e verificação de e-mail no IFConnect",
        "LexContract: papéis verificados no servidor e dados isolados por escritório. Tekidu: autorização por perfil validada no banco via Security Rules — não só escondida na UI. No IFConnect, as permissões por cargo ficam no código do cliente",
        "Evidence Finder: processamento local, sem cliente de rede nem telemetria, permissões mínimas do Tauri, caminhos validados no núcleo e SHA-256 para verificar a integridade das fontes — com limitações documentadas, como a ausência de criptografia do armazenamento",
        "GitFlow Desktop: Git executado sem shell, caminhos validados, nenhuma operação destrutiva (sem force, reset ou clean) e confirmação do destino exato antes de pull e push",
      ],
    },
    {
      title: "Qualidade",
      items: [
        "Testes unitários e de integração da API (LexContract), 4 fluxos E2E com Playwright e testes das regras de segurança do Firestore (Tekidu)",
        "Evidence Finder: 258 testes Rust e 82 de frontend na última rodada registrada no repositório (docs/FASE7.md, executada em Linux). GitFlow Desktop: testes de integração em Rust com Git real em repositórios temporários",
        "Validação de formulário em duas camadas: cliente (Zod) e servidor, com testes do handler do formulário no FORJA",
        "Code splitting por perfil de usuário para reduzir o que cada um carrega",
      ],
    },
    {
      title: "Deploy e automação",
      items: [
        "Versionamento com Git e GitHub em todos os projetos",
        "Pipeline de CI/CD no LexContract: o deploy só ocorre depois de typecheck, build, testes, E2E e imagens Docker",
        "Deploy em Cloudflare Pages / Workers e Render (API)",
        "Integração de formulários com automações reais (Make → Google Sheets)",
      ],
    },
  ],
};

// Textos da seção de projetos. Os dados de cada projeto (descrição, stack,
// problema/solução, arquitetura etc.) vivem em `@/data/projects` — fonte
// única de verdade, reaproveitada tanto no card da home quanto na página
// de detalhes de cada projeto.
export const projects = {
  label: "projetos",
  title: "O que venho construindo",
};

export const timeline = {
  label: "trajetória",
  title: "Minha evolução",
  steps: [
    {
      index: "01",
      title: "Fundamentos",
      description:
        "Primeiros passos em lógica de programação, HTML, CSS e JavaScript. A curiosidade vira código.",
    },
    {
      index: "02",
      title: "Exploração",
      description:
        "Experimentação com diferentes tecnologias: Python, React, frameworks e ferramentas de desenvolvimento.",
    },
    {
      index: "03",
      title: "Construção",
      description:
        "Primeiros projetos próprios ganham forma. IFConnect, Tekidu e outros nascem como ideias reais.",
    },
    {
      index: "04",
      title: "Publicação",
      description:
        "Projetos entram no ar: deploy na Cloudflare, com demos públicas. O código chega ao mundo.",
    },
    {
      index: "05",
      title: "Evolução",
      description:
        "Sistemas mais complexos: autenticação, banco de dados, regras de segurança e testes automatizados — no LexContract, backend próprio com PostgreSQL, testes E2E e pipeline de CI/CD; no Evidence Finder e no GitFlow Desktop, apps desktop com núcleo em Rust, ainda em desenvolvimento.",
    },
    {
      index: "06",
      title: "Próximo passo",
      description:
        "Estruturas de dados e algoritmos, arquitetura de software e automação/robótica autônoma — o que estou estudando agora, para sistemas mais completos.",
      current: true,
    },
  ],
};

export const githubSection = {
  label: "github",
  title: "Código aberto, projetos reais.",
  description: [
    "Os projetos apresentados aqui estão documentados e disponíveis no GitHub.",
    "Código real, histórico real, evolução real.",
  ],
  cta: { label: "Ver GitHub →", href: site.github },
};

export const contact = {
  label: "contato",
  title: ["Vamos construir", "algo juntos?"],
  description:
    "Estou buscando minha primeira oportunidade na área de TI — estágio ou posição inicial. Se o meu trabalho combina com o que você procura, vamos conversar.",
  actions: [
    { label: "Entrar em contato", href: `mailto:${site.email}`, primary: true },
    { label: "GitHub", href: site.github, primary: false },
    { label: "LinkedIn", href: site.linkedin, primary: false },
  ],
};
