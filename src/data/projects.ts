export type ProjectStatus = "in-progress" | "completed" | "experimental";

export type ProjectCategory =
  | "Web"
  | "Plataformas"
  | "Robótica"
  | "Acadêmicos";

export interface ProjectSection {
  heading: string;
  body: string;
}

export interface Project {
  /** URL slug — used for /projects/$slug */
  id: string;
  title: string;
  /** One line, used on cards */
  description: string;
  /** Longer paragraph, used on the detail page */
  longDescription: string;
  /** Real problem the project addresses */
  problem?: string;
  /** How it was solved */
  solution?: string;
  /** Confirmed features (from the repository README / source) */
  features: string[];
  technologies: string[];
  categories: ProjectCategory[];
  githubUrl: string;
  demoUrl?: string;
  /** Cover image — real screenshots served from the repository */
  image?: string;
  /** Additional real screenshots */
  screenshots?: { src: string; caption: string }[];
  featured?: boolean;
  status: ProjectStatus;
  /** Extra notes about the build process, only when confirmed */
  notes?: ProjectSection[];
}

const raw = (repo: string, path: string) =>
  `https://raw.githubusercontent.com/muryllodouglashsoares/${repo}/main/${path}`;

export const GITHUB_URL = "https://github.com/muryllodouglashsoares";
export const GITHUB_USER = "muryllodouglashsoares";

export const statusLabel: Record<ProjectStatus, string> = {
  "in-progress": "Em desenvolvimento",
  completed: "Concluído",
  experimental: "Experimental",
};

export const projects: Project[] = [
  {
    id: "tekidu",
    title: "Tekidu",
    description:
      "Plataforma de gestão e acompanhamento acadêmico com experiências separadas para administradores, professores e estudantes.",
    longDescription:
      "A Tekidu centraliza informações acadêmicas — notas, frequência, boletim, turmas e comunicados — em um único ambiente, no lugar de planilhas e sistemas dispersos. A plataforma possui três experiências distintas, cada uma com telas e permissões próprias.",
    problem:
      "Informações acadêmicas espalhadas entre planilhas e sistemas separados, sem um lugar único onde estudante, professor e administração enxerguem os mesmos dados.",
    solution:
      "Um ambiente único com três perfis de acesso: o administrador gerencia estudantes, professores, turmas, disciplinas e avisos; o professor cuida de turmas, avaliações, notas e frequência; o estudante acessa boletim, desempenho, frequência e avisos, restrito aos próprios dados.",
    features: [
      "Autenticação completa: login, primeiro acesso com e-mail transacional e recuperação de senha via Firebase Authentication",
      "Gestão acadêmica com CRUDs completos de estudantes, professores, turmas, disciplinas e avaliações",
      "Lançamento de notas, cálculo de médias e boletim consolidado por estudante",
      "Registro de frequência por sessão, com histórico por período",
      "Relatórios e indicadores de desempenho por estudante e por turma",
      "Avisos, central de notificações e calendário acadêmico",
      "Command palette para navegação por atalhos de teclado",
      "UX mobile dedicada: bottom navigation, sheets e FAB próprios",
      "Dark mode via tokens de design em CSS variables",
    ],
    technologies: [
      "React 18",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "React Router",
      "Firebase Auth",
      "Cloud Firestore",
      "Firestore Rules",
      "Vitest",
    ],
    categories: ["Plataformas", "Web", "Acadêmicos"],
    githubUrl: "https://github.com/muryllodouglashsoares/Tekidu",
    demoUrl: "https://tekidu.pages.dev/",
    image: raw("Tekidu", "docs/screenshots/landing-page.png"),
    screenshots: [
      { src: raw("Tekidu", "docs/screenshots/dashboard.png"), caption: "Dashboard" },
      { src: raw("Tekidu", "docs/screenshots/boletim.png"), caption: "Boletim" },
      {
        src: raw("Tekidu", "docs/screenshots/meu-desempenho.png"),
        caption: "Meu desempenho",
      },
      { src: raw("Tekidu", "docs/screenshots/avisos.png"), caption: "Avisos" },
      { src: raw("Tekidu", "docs/screenshots/login.png"), caption: "Login" },
    ],
    featured: true,
    status: "in-progress",
    notes: [
      {
        heading: "Segurança no banco, não só na interface",
        body: "As permissões por perfil (admin, teacher, student) são validadas diretamente nas Firestore Security Rules — quem pode ler e escrever cada coleção, validação de payload e acesso restrito aos próprios dados. Esconder um botão na UI não é tratado como controle de acesso.",
      },
      {
        heading: "Testes automatizados em duas frentes",
        body: "As regras de segurança têm suíte própria com Vitest, Firebase Emulator e @firebase/rules-unit-testing, cobrindo cenários de acesso permitido e negado. Há também testes de unidade para regras de negócio, como cálculo de médias e frequência.",
      },
      {
        heading: "Code splitting granular",
        body: "Praticamente todas as páginas são carregadas sob demanda com React.lazy, agrupadas por Suspense conforme o perfil do usuário — um estudante nunca baixa o código do portal administrativo.",
      },
      {
        heading: "Camada de serviços por domínio",
        body: "O acesso ao Firestore fica isolado em serviços (students, grades, attendance, reports, audit, email), mantendo os componentes de UI livres de lógica de dados. Alterações sensíveis, como edição de notas, geram log de auditoria assíncrono.",
      },
    ],
  },
  {
    id: "ifconnect",
    title: "IFConnect",
    description:
      "Rede social acadêmica com feed, chat em tempo real e moderação, conectando estudantes, professores e administradores.",
    longDescription:
      "O IFConnect foi criado para centralizar a comunicação acadêmica de uma instituição de ensino, unindo recursos de rede social, comunicação em tempo real e gestão de conteúdo institucional, com diferentes níveis de acesso para alunos, professores e administradores.",
    problem:
      "Comunicação acadêmica fragmentada entre grupos de mensagem, murais e avisos soltos, sem um espaço institucional próprio.",
    solution:
      "Uma plataforma única com feed social, chat em tempo real e painel administrativo, com cargos e permissões distintas para aluno, professor e administrador.",
    features: [
      "Cadastro e login por e-mail/senha, login com Google, verificação de e-mail e recuperação de senha",
      "Perfis com handle único, foto e curso/disciplina",
      "Feed de postagens com curtidas, upvotes e comentários",
      "Sistema de seguidores, com feed personalizado",
      "Chat privado e em grupo em tempo real",
      "Notificações e indicadores de mensagens não lidas",
      "Sistema de badges e conquistas",
      "Cargos (aluno, professor, administrador) com permissões distintas e painel de moderação",
    ],
    technologies: [
      "JavaScript",
      "HTML",
      "CSS",
      "Firebase Auth",
      "Realtime Database",
    ],
    categories: ["Plataformas", "Web", "Acadêmicos"],
    githubUrl: "https://github.com/muryllodouglashsoares/IFConnect",
    image: raw("IFConnect", "screenshots/Captura%20de%20Tela%20(206).png"),
    screenshots: [
      {
        src: raw("IFConnect", "screenshots/Captura%20de%20Tela%20(210).png"),
        caption: "Avisos",
      },
      {
        src: raw("IFConnect", "screenshots/Captura%20de%20Tela%20(209).png"),
        caption: "Explorar",
      },
      {
        src: raw("IFConnect", "screenshots/Captura%20de%20Tela%20(208).png"),
        caption: "Perfil",
      },
      {
        src: raw("IFConnect", "screenshots/Captura%20de%20Tela%20(212).png"),
        caption: "Painel administrativo",
      },
    ],
    status: "completed",
    notes: [
      {
        heading: "Tudo em JavaScript puro",
        body: "A aplicação foi construída sem framework de front-end, com integração direta ao Firebase Authentication e ao Realtime Database — um exercício de organizar uma base grande de JavaScript por conta própria.",
      },
    ],
  },
  {
    id: "savora",
    title: "Savora",
    description:
      "Landing page e cardápio digital de um restaurante fictício, com animação autoral na hero e reservas integradas ponta a ponta.",
    longDescription:
      "Site institucional com cardápio digital, seções de apresentação, mapa de localização e formulário de reservas com automação real de ponta a ponta. Construído como peça de portfólio, com foco em animação de alto padrão e performance. Todos os dados do restaurante são fictícios.",
    problem:
      "Demonstrar, em uma peça de portfólio, o que separa uma landing page bonita de uma entrega real: animação autoral, performance medida e um formulário que realmente termina em algum lugar.",
    solution:
      "Uma hero com montagem animada do prato (composta apenas com transform e opacity, respeitando prefers-reduced-motion) e um fluxo de reservas que vai da validação no cliente até a planilha e o relatório em PDF.",
    features: [
      "Landing page completa: hero, sobre, especialidades, ingredientes, galeria, avaliações, localização, FAQ e CTA",
      "Cardápio digital com itens organizados por categoria",
      "Animação autoral na hero: montagem do prato, com fallback estático para prefers-reduced-motion",
      "Localização via embed real do Google Maps, com filtro visual combinando com o tema",
      "Reservas ponta a ponta: React Hook Form → server function → webhook do Make → Google Sheets → relatório em PDF",
    ],
    technologies: [
      "React 19",
      "TypeScript",
      "TanStack Start",
      "Tailwind CSS 4",
      "Motion",
      "shadcn/ui",
      "React Hook Form",
      "Cloudflare Workers",
    ],
    categories: ["Web"],
    githubUrl: "https://github.com/muryllodouglashsoares/savora-landing-page",
    demoUrl:
      "https://savora-landing-page.muryllodouglash-soares.workers.dev/",
    image: raw("savora-landing-page", "screenshots/Pagina_principal.png"),
    screenshots: [
      {
        src: raw("savora-landing-page", "screenshots/Menu.png"),
        caption: "Cardápio digital",
      },
      {
        src: raw("savora-landing-page", "screenshots/Reservas.png"),
        caption: "Reservas",
      },
      {
        src: raw("savora-landing-page", "screenshots/Imagens_da_Casa.png"),
        caption: "Galeria",
      },
    ],
    status: "completed",
    notes: [
      {
        heading: "Performance como decisão de design",
        body: "A sequência de montagem anima somente transform e opacity e roda uma única vez; nada usa repeat infinito além da auréola do prato. O will-change é aplicado só enquanto uma peça está caindo, e no mobile a timeline usa menos peças e menos partículas.",
      },
    ],
  },
  {
    id: "forja",
    title: "FORJA Training Studio",
    description:
      "Landing page de alta conversão para um studio de treinamento conceitual, com SEO técnico e captura de lead integrada.",
    longDescription:
      "O objetivo foi construir uma landing page no padrão que uma agência entregaria a um cliente do nicho fitness: identidade visual forte, copy persuasiva, formulário validado ponta a ponta, SEO técnico completo e cuidado com performance e acessibilidade. O studio é fictício.",
    features: [
      "Landing page completa: hero, planos, depoimentos, FAQ e contato",
      "Formulário com validação dupla — client-side (React Hook Form + Zod) e server-side via createServerFn",
      "Campo honeypot anti-bot",
      "Integração real do formulário com Make → Google Sheets",
      "SEO estruturado: JSON-LD, Open Graph, Twitter Card, canonical, sitemap.xml e robots.txt",
      "Manifest PWA com ícones, incluindo variante maskable",
      "Otimização de imagem com srcSet/sizes e dimensões explícitas para evitar CLS",
    ],
    technologies: [
      "TanStack Start",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "shadcn/ui",
      "React Hook Form",
      "Zod",
    ],
    categories: ["Web"],
    githubUrl: "https://github.com/muryllodouglashsoares/gym-landing-page",
    demoUrl: "https://gym-landing-page.muryllodouglash-soares.workers.dev/",
    image: raw("gym-landing-page", "screenshots/Pagina_principal.png"),
    screenshots: [
      { src: raw("gym-landing-page", "screenshots/Planos.png"), caption: "Planos" },
      {
        src: raw("gym-landing-page", "screenshots/Registro_de_Treinos.png"),
        caption: "Registro de treinos",
      },
      {
        src: raw("gym-landing-page", "screenshots/Formulário.png"),
        caption: "Formulário de contato",
      },
    ],
    status: "completed",
  },
  {
    id: "odontoprime",
    title: "OdontoPrime",
    description:
      "Landing page de clínica odontológica construída a partir de um design de referência, com SSR e SEO técnico.",
    longDescription:
      "Landing page pixel-perfect construída a partir de um design de referência para uma clínica odontológica, servindo como peça de portfólio para demonstrar domínio de SSR, SEO técnico e integração de formulário com automação real.",
    features: [
      "Landing page completa (serviços, equipe, depoimentos, FAQ) renderizada via SSR",
      "Formulário de contato integrado a webhook real (Make → Google Sheets), com modo demonstração automático",
      "Dados estruturados JSON-LD para Dentist e FAQPage",
      "sitemap.xml, robots.txt e manifest.json (PWA) com ícones",
    ],
    technologies: [
      "TanStack Start",
      "React 19",
      "TypeScript",
      "HTML",
      "CSS",
      "JavaScript",
      "Tailwind CSS",
      "Vite",
    ],
    categories: ["Web"],
    githubUrl: "https://github.com/muryllodouglashsoares/clinica-landing-page",
    demoUrl: "https://clinica-landing-page.muryllodouglash-soares.workers.dev/",
    image: raw("clinica-landing-page", "screenshots/pagina-principal.png"),
    screenshots: [
      {
        src: raw("clinica-landing-page", "screenshots/especialidades.png"),
        caption: "Especialidades",
      },
      {
        src: raw("clinica-landing-page", "screenshots/equipe.png"),
        caption: "Equipe",
      },
      {
        src: raw("clinica-landing-page", "screenshots/formulario-contato.png"),
        caption: "Formulário de contato",
      },
    ],
    status: "completed",
    notes: [
      {
        heading: "Por que HTML/CSS/JS puro dentro de uma rota React",
        body: "O design foi construído como página estática, mas o projeto usa TanStack Start para servir esse conteúdo via SSR na rota /, em vez de redirecionar para um HTML solto. Isso evita o duplo carregamento e garante que crawlers e previews de link recebam o conteúdo real da página.",
      },
    ],
  },
  {
    id: "mini-olimpiada-robotica",
    title: "Mini Olimpíada de Robótica",
    description:
      "Robô seguidor de linha em LEGO Spike Prime, programado em blocos e em Python, para a competição do IFPB.",
    longDescription:
      "Projeto desenvolvido para participação na Mini Olimpíada de Robótica do IFPB, utilizando a plataforma LEGO Spike Prime. O objetivo foi projetar, montar e programar um robô capaz de seguir uma linha de forma autônoma, usando sensores de cor para interpretar o ambiente.",
    problem:
      "Fazer um robô percorrer sozinho um trajeto marcado por uma linha, dentro das regras da competição.",
    solution:
      "Duas abordagens de leitura de linha foram desenvolvidas e comparadas: uma com dois sensores de cor programada em blocos e outra com um único sensor programada em Python.",
    features: [
      "Robô seguidor de linha com 2 sensores de cor, programado em blocos",
      "Versão alternativa com 1 sensor de cor, programada em Python",
      "Documentação das regras da competição",
      "Registro fotográfico e em vídeo de todo o processo: iniciação, testes e conclusão da prova",
    ],
    technologies: ["LEGO Spike Prime", "Python", "Programação em blocos"],
    categories: ["Robótica", "Acadêmicos"],
    githubUrl:
      "https://github.com/muryllodouglashsoares/mini-robotics-competition",
    image: raw("mini-robotics-competition", "images/Registro_Teste_2.jpeg"),
    screenshots: [
      {
        src: raw("mini-robotics-competition", "images/Registro_Iniciacao.jpeg"),
        caption: "Iniciação",
      },
      {
        src: raw("mini-robotics-competition", "images/Registro_de_Teste.jpeg"),
        caption: "Teste",
      },
      {
        src: raw(
          "mini-robotics-competition",
          "images/Registro_de_Conclus%C3%A3o_da_Prova.jpeg",
        ),
        caption: "Conclusão da prova",
      },
    ],
    status: "completed",
    notes: [
      {
        heading: "Aprendizados",
        body: "Programação em blocos e em Python, lógica computacional, robótica educacional, montagem mecânica, uso de sensores, resolução de problemas e trabalho em equipe.",
      },
    ],
  },
  {
    id: "portfolio-vanilla",
    title: "Portfólio (HTML, CSS e JS)",
    description:
      "Primeira versão do meu portfólio, escrita em HTML, CSS e JavaScript puro, sem frameworks nem build step.",
    longDescription:
      "Portfólio desenvolvido em HTML5, CSS3 e JavaScript puro para apresentar minha trajetória, meus projetos e minha evolução técnica. Sem bibliotecas e sem etapa de build — todo o comportamento foi escrito à mão.",
    features: [
      "Navbar fixa com destaque de seção ativa e menu responsivo",
      "Projetos e timeline carregados de arquivos JSON, com filtro por categoria",
      "Scroll reveal e efeito de digitação na hero",
      "Formulário de contato que abre o cliente de e-mail com a mensagem pronta",
      "Acessibilidade: HTML semântico, :focus-visible, ARIA e prefers-reduced-motion respeitado",
      "Deploy automático via GitHub Actions para o GitHub Pages",
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "GitHub Actions"],
    categories: ["Web"],
    githubUrl: "https://github.com/muryllodouglashsoares/portfolio",
    status: "completed",
  },
];

export const featuredProject = projects.find((p) => p.featured)!;
export const otherProjects = projects.filter((p) => !p.featured);

export function getProject(id: string) {
  return projects.find((p) => p.id === id);
}

export const categories: ProjectCategory[] = Array.from(
  new Set(otherProjects.flatMap((p) => p.categories)),
) as ProjectCategory[];
