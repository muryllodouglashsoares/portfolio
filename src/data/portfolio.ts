// Conteúdo editável do portfólio. Edite apenas este arquivo para atualizar textos.
import heroPortrait from "@/assets/hero-sunset-portrait.jpg";
import aboutIllustration from "@/assets/about-illustration.png";

export const site = {
  name: "Muryllo",
  logo: "muryllo",
  fullName: "Muryllo Douglas",
  role: "Estudante · Desenvolvedor",
  email: "muryllo@email.com",
  github: "https://github.com/muryllodouglashsoares",
  linkedin: "https://linkedin.com/in/muryllodouglas",
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
  subtitle: ["Eu construo experiências", "para a web."],
  description:
    "Sou estudante de Informática no IFPB e desenvolvedor em formação. Gosto de transformar ideias em projetos reais, explorando desenvolvimento web, software e novas tecnologias.",
  primaryCta: { label: "Ver projetos", href: "/#projetos" },
  secondaryCta: { label: "Conhecer mais", href: "/#sobre" },
  techLabel: "Tecnologias que utilizo",
  tech: ["TypeScript", "React", "Python", "Git", "HTML", "CSS"],
  codeChip: 'const dev = "muryllo"',
  statusChip: "open to opportunities",
  portraitSrc: heroPortrait as string | null,
  portraitAlt: "Retrato editorial de Muryllo Douglas ao entardecer, com sol estilizado ao fundo",
};

export const about = {
  label: "sobre",
  title: ["Construindo,", "aprendendo", "e evoluindo."],
  paragraphs: [
    "Sou estudante de Informática no IFPB e desenvolvedor em formação. Construo projetos reais desde cedo porque acredito que a melhor forma de aprender é fazendo.",
    "Tenho interesse em interfaces digitais, desenvolvimento web, automação e robótica. Cada projeto é uma oportunidade de explorar algo novo e entregar algo que funciona de verdade.",
    "Não estou tentando parecer alguém com anos de experiência que não tenho. Estou mostrando o que consigo construir agora — e evoluindo rápido.",
  ],
  tags: ["Desenvolvimento Web", "React", "TypeScript", "Robótica", "Automação", "IFPB"],
  illustrationSrc: aboutIllustration as string,
  illustrationAlt: "Ilustração digital estilizada de Muryllo Douglas",
  stats: [
    { value: "6+", label: "Projetos documentados" },
    { value: "4", label: "Projetos publicados" },
    { value: "25+", label: "Tecnologias utilizadas" },
    { value: "∞", label: "Aprendizado contínuo" },
  ],
};

export const stack = {
  label: "stack",
  title: "Tecnologias que utilizo",
  subtitle: "Onde cada tecnologia foi usada, e para quê.",
  groups: [
    {
      title: "Front-end",
      items: [
        { name: "HTML / CSS", note: "Base de todos os projetos web" },
        { name: "JavaScript", note: "IFConnect, OdontoPrime — interatividade sem framework" },
        {
          name: "TypeScript",
          note: "Tekidu, Savora, FORJA, OdontoPrime — tipagem de dados e componentes",
        },
        { name: "React", note: "Tekidu, Savora, FORJA, OdontoPrime — construção de interfaces" },
        { name: "Tailwind CSS", note: "Tekidu, OdontoPrime — estilização utilitária" },
        { name: "TanStack Start", note: "Savora, FORJA, OdontoPrime — SSR e roteamento" },
      ],
    },
    {
      title: "Back-end / Dados",
      items: [
        { name: "Firebase Auth", note: "Tekidu, IFConnect — autenticação de usuários" },
        { name: "Cloud Firestore", note: "Tekidu — dados acadêmicos e regras de acesso" },
        { name: "Realtime Database", note: "IFConnect — feed, chat e notificações" },
        { name: "Vitest + Firebase Emulator", note: "Tekidu — testes das regras de segurança" },
      ],
    },
    {
      title: "Deploy / Automação",
      items: [
        { name: "Git / GitHub", note: "Todos os projetos — versionamento e histórico" },
        { name: "Cloudflare", note: "Tekidu, Savora, FORJA, OdontoPrime — deploy e hospedagem" },
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
        "Design responsivo mobile-first, com dark mode via tokens de design",
      ],
    },
    {
      title: "Dados e autorização",
      items: [
        "Modelagem de dados acadêmicos e sociais no Firestore / Realtime Database",
        "Autenticação com Firebase Auth (e-mail/senha, Google, verificação de e-mail)",
        "Autorização por perfil validada no banco via Security Rules — não só escondida na UI",
      ],
    },
    {
      title: "Qualidade",
      items: [
        "Testes de regras de segurança com Firebase Emulator e Vitest",
        "Validação de formulário em duas camadas: cliente (Zod) e servidor",
        "Code splitting por perfil de usuário para reduzir o que cada um carrega",
      ],
    },
    {
      title: "Deploy e automação",
      items: [
        "Versionamento com Git, histórico organizado por commit no GitHub",
        "Deploy contínuo em Cloudflare Pages / Workers",
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
        "Primeiros projetos próprios ganham forma. Tekidu, IFConnect e outros nascem como ideias reais.",
    },
    {
      index: "04",
      title: "Publicação",
      description:
        "Projetos entram em produção: deploy na Cloudflare, domínio próprio. O código chega ao mundo.",
    },
    {
      index: "05",
      title: "Evolução",
      description:
        "Sistemas mais complexos: autenticação, banco de dados, regras de segurança e testes automatizados.",
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
    "Todos os meus projetos estão documentados e disponíveis.",
    "Código real, histórico real, evolução real.",
  ],
  cta: { label: "Ver GitHub →", href: site.github },
};

export const contact = {
  label: "contato",
  title: ["Vamos construir", "algo juntos?"],
  description:
    "Estou sempre aberto a novas oportunidades de aprendizado, projetos e experiências em que eu possa contribuir e continuar evoluindo como desenvolvedor.",
  actions: [
    { label: "Entrar em contato", href: `mailto:${site.email}`, primary: true },
    { label: "GitHub", href: site.github, primary: false },
    { label: "LinkedIn", href: site.linkedin, primary: false },
  ],
};
