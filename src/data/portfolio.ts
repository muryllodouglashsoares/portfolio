// Conteúdo editável do portfólio. Edite apenas este arquivo para atualizar textos.
import heroPortrait from "@/assets/hero-portrait.png";
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
  { label: "Sobre", href: "#sobre" },
  { label: "Skills", href: "#stack" },
  { label: "Projetos", href: "#projetos" },
  { label: "Trajetória", href: "#trajetoria" },
  { label: "Contato", href: "#contato" },
];

export const hero = {
  badge: "Estudante · Desenvolvedor",
  greeting: "Oi, eu sou",
  name: "Muryllo.",
  subtitle: ["Eu construo experiências", "para a web."],
  description:
    "Sou estudante de Informática no IFPB e desenvolvedor em formação. Gosto de transformar ideias em projetos reais, explorando desenvolvimento web, software e novas tecnologias.",
  primaryCta: { label: "Ver projetos", href: "#projetos" },
  secondaryCta: { label: "Conhecer mais", href: "#sobre" },
  techLabel: "Tecnologias que utilizo",
  tech: ["TypeScript", "React", "Python", "Git", "HTML", "CSS"],
  codeChip: 'const dev = "muryllo"',
  statusChip: "open to opportunities",
  portraitSrc: heroPortrait as string | null,
  portraitAlt: "Retrato editorial de Muryllo Douglas com halo roxo ao fundo",

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
  groups: [
    {
      title: "Front-end",
      items: [
        { name: "HTML", note: null },
        { name: "CSS", note: null },
        { name: "JavaScript", note: "Tekidu · Savora · FORJA" },
        { name: "TypeScript", note: "Tekidu · projetos pessoais" },
        { name: "React", note: "Tekidu · IFConnect" },
        { name: "Tailwind CSS", note: "Tekidu · IFConnect" },
        { name: "Vite", note: "Tekidu · IFConnect" },
      ],
    },
    {
      title: "Back-end / Dados",
      items: [
        { name: "Firebase", note: "Tekidu" },
        { name: "Firestore", note: "Tekidu" },
        { name: "Firebase Auth", note: "Tekidu" },
        { name: "Cloudflare Workers", note: "Tekidu" },
      ],
    },
    {
      title: "Ferramentas",
      items: [
        { name: "Git", note: "todos os projetos" },
        { name: "GitHub", note: "todos os projetos" },
        { name: "GitHub Actions", note: "Tekidu · IFConnect" },
        { name: "Make (n8n-like)", note: "automações" },
      ],
    },
    {
      title: "Outros",
      items: [
        { name: "Python", note: "automações · scripts" },
        { name: "LEGO Spike Prime", note: "Mini Olimpíada de Robótica" },
        { name: "Robótica", note: "Mini Olimpíada" },
      ],
    },
  ],
};

export const projects = {
  label: "projetos",
  title: "O que venho construindo",
  featured: {
    index: "01",
    badge: "Featured Project",
    name: "Tekidu",
    tagline: "Visualizando a evolução acadêmica.",
    description:
      "Sistema web completo para visualização e acompanhamento do desempenho acadêmico. Do problema à solução: autenticação, banco de dados em tempo real, dashboards de dados e deploy automatizado.",
    tags: ["TypeScript", "React", "Firebase", "Tailwind CSS", "Vite"],
    primaryCta: { label: "Ver projeto →", href: site.github },
    secondaryCta: { label: "GitHub", href: site.github },
    problem: "Estudantes não tinham forma visual e centralizada de acompanhar sua evolução.",
    solution:
      "Aplicação full-stack com autenticação, persistência de dados e painéis interativos.",
    highlights: [
      "Autenticação completa",
      "Dados em tempo real",
      "Dashboard interativo",
      "Deploy automatizado",
    ],
  },
  items: [
    {
      index: "02",
      kind: "Plataforma",
      name: "IFConnect",
      tagline: "Conectando a comunidade do IFPB.",
      description:
        "Plataforma de conexão entre estudantes e professores do IFPB. Recursos de comunicação e compartilhamento de conteúdo acadêmico.",
      tags: ["React", "TypeScript", "Tailwind CSS"],
    },
    {
      index: "03",
      kind: "Landing Page",
      name: "Savora",
      tagline: "Sabor com identidade digital.",
      description:
        "Landing page moderna para restaurante com cardápio digital integrado e identidade visual completa.",
      tags: ["JavaScript", "CSS", "HTML"],
    },
    {
      index: "04",
      kind: "Site Institucional",
      name: "FORJA Training Studio",
      tagline: "Treino com propósito.",
      description:
        "Site institucional para academia de treinamento funcional. Design forte, hierarquia visual clara e conversão.",
      tags: ["JavaScript", "CSS", "HTML"],
    },
    {
      index: "05",
      kind: "Site Institucional",
      name: "OdontoPrime",
      tagline: "Presença digital para clínica odontológica.",
      description:
        "Site profissional para clínica odontológica com agendamento e apresentação dos serviços.",
      tags: ["HTML", "CSS", "JavaScript"],
    },
    {
      index: "06",
      kind: "Robótica",
      name: "Mini Olimpíada de Robótica",
      tagline: "Tecnologia na prática, desde cedo.",
      description:
        "Projeto de robótica educacional utilizando LEGO Spike Prime. Competição organizada para jovens estudantes.",
      tags: ["Python", "LEGO Spike Prime", "Robótica"],
    },
  ],
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
        "Projetos entram em produção. Deploy, domínio próprio, GitHub Actions. O código chega ao mundo.",
    },
    {
      index: "05",
      title: "Evolução",
      description:
        "Sistemas mais complexos, stacks mais robustas, soluções mais bem pensadas. O processo continua.",
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
