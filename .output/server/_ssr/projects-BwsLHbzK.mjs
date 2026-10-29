//#region node_modules/.nitro/vite/services/ssr/assets/projects-BwsLHbzK.js
var hero_sunset_portrait_default = "/assets/hero-sunset-portrait-n5AqGVp8.jpg";
var mini_olimpiada_robotica_default = "/assets/mini-olimpiada-robotica-CrFJ4kzm.jpg";
var raw = (repo, path) => `https://raw.githubusercontent.com/muryllodouglashsoares/${repo}/main/${path}`;
var statusLabel = {
	"in-progress": "Em desenvolvimento",
	completed: "Concluído",
	experimental: "Experimental"
};
var projects = [
	{
		id: "lexcontract",
		title: "LexContract",
		description: "SaaS de gestão de contratos de prestação de serviços jurídicos, com API própria, banco relacional, isolamento entre escritórios e pipeline de CI/CD.",
		longDescription: "O LexContract centraliza o ciclo de vida de contratos de advogados autônomos e pequenos escritórios — clientes, modelos, contratos, documentos, pagamentos e histórico de auditoria — em um único sistema, no lugar de planilhas, e-mail e papel. Cada escritório é um tenant com dados isolados. É o projeto com a maior amplitude técnica do portfólio: frontend, backend próprio, banco relacional, testes e automação de deploy.",
		problem: "Pequenos escritórios de advocacia acompanham contratos, cobranças e documentos espalhados entre e-mail, WhatsApp, planilhas e pastas físicas, sem rastreabilidade e com dificuldade de continuidade quando mais de uma pessoa acompanha o mesmo caso.",
		solution: "Um domínio central — o contrato — ligado a cliente, modelo, versões do texto, documentos, pagamentos e auditoria, tudo isolado por escritório (officeId). O contrato percorre estados controlados (rascunho → envio → assinatura → vigência → encerramento), com permissões por papel (ADMIN, LAWYER, ASSISTANT) aplicadas no backend.",
		features: [
			"Autenticação por e-mail e senha com JWT, sessão validada em /auth/me e hash de senha com bcryptjs",
			"Permissões por papel (ADMIN, LAWYER, ASSISTANT) verificadas no backend, e não apenas escondidas na interface",
			"Isolamento multi-tenant: os serviços filtram por escritório em toda leitura e escrita",
			"Modelos de contrato com variáveis substituídas automaticamente e criação de contratos em etapas, com versionamento do conteúdo",
			"Transições de status controladas, término e renovação com alerta automático de vencimento",
			"Aceite eletrônico por link público de uso único (assinatura eletrônica simples, não ICP-Brasil), com token em hash, expiração e vínculo com a versão exata do contrato",
			"Documentos, parcelas de pagamento com indicadores financeiros, notificações e Web Push",
			"Dashboard, busca global, filtros avançados e histórico de auditoria das ações"
		],
		technologies: [
			"React 19",
			"TypeScript",
			"Vite",
			"Tailwind CSS 4",
			"Node.js",
			"Fastify",
			"PostgreSQL",
			"Prisma",
			"Zod",
			"Vitest",
			"Playwright",
			"Docker",
			"GitHub Actions"
		],
		categories: ["Plataformas", "Web"],
		githubUrl: "https://github.com/muryllodouglashsoares/law-contract-management",
		demoUrl: "https://law-contract-management.pages.dev/",
		image: raw("law-contract-management", "docs/screenshots/dashboard.webp"),
		screenshots: [
			{
				src: raw("law-contract-management", "docs/screenshots/novo-contrato-revisao.webp"),
				caption: "Novo contrato — revisão"
			},
			{
				src: raw("law-contract-management", "docs/screenshots/contrato-resumo.webp"),
				caption: "Detalhe do contrato"
			},
			{
				src: raw("law-contract-management", "docs/screenshots/contrato-pagamentos.webp"),
				caption: "Pagamentos do contrato"
			},
			{
				src: raw("law-contract-management", "docs/screenshots/contratos-filtros.webp"),
				caption: "Contratos com filtros"
			},
			{
				src: raw("law-contract-management", "docs/screenshots/historico.webp"),
				caption: "Histórico de auditoria"
			}
		],
		featured: true,
		principal: true,
		authAndDatabase: true,
		hasTests: true,
		status: "in-progress",
		architecture: [
			"React + TypeScript (Vite) — interface, sessão do usuário e cliente HTTP central",
			"API Fastify — rotas e controllers por módulo, com autenticação e papéis nos preHandlers",
			"Services — regras de negócio, sempre filtrando pelo escritório do usuário autenticado",
			"Prisma ORM — acesso tipado ao banco, com índices e restrições de unicidade por escritório",
			"PostgreSQL — dados relacionais: clientes, contratos, versões, documentos, pagamentos e auditoria",
			"GitHub Actions — CI (frontend, backend, Docker, E2E) e deploy encadeado para Render (API) e Cloudflare Pages (frontend)"
		],
		challenges: [{
			problem: "Em um sistema multi-escritório, um erro de filtro em uma única consulta pode expor contratos de um escritório a outro.",
			investigation: "Mapeamento de todo recurso de negócio que precisa guardar o escritório de origem e de quais pontos o identificador poderia chegar à consulta.",
			solution: "Todo recurso guarda officeId e cada service filtra por request.user.officeId vindo do token, nunca por um id enviado livremente pelo cliente. Restrições de unicidade (como CPF/CNPJ) valem por escritório, não globalmente."
		}, {
			problem: "Ocultar botões para quem não tem permissão não impede uma chamada direta à API.",
			investigation: "Separação entre autenticação, autorização e validação como etapas sequenciais de cada rota.",
			solution: "Autorização por papel aplicada no servidor (authenticate → requireRole → validação com Zod); quem força a chamada recebe 403. Há testes de integração dedicados às regras de papel."
		}],
		notes: [{
			heading: "Qualidade e entrega",
			body: "O repositório tem testes unitários e de integração no backend (Vitest, com PostgreSQL real no CI), 4 fluxos E2E em Playwright (login, criar contrato, enviar contrato, registrar pagamento) e um pipeline que só publica depois que typecheck, build, testes, E2E e build das imagens Docker passam."
		}, {
			heading: "Limitações declaradas",
			body: "A assinatura é um aceite eletrônico simples, sem validade ICP-Brasil. O projeto não alega conformidade com a LGPD nem certificação de segurança: os mecanismos listados são os que existem no código. É um projeto em evolução, sem usuários reais comprovados."
		}],
		learned: "O LexContract foi onde passei a pensar o sistema de ponta a ponta: modelagem relacional, API própria, autorização no servidor, isolamento de dados entre clientes, testes automatizados e um pipeline que impede deploy com falha."
	},
	{
		id: "evidence-finder",
		title: "Evidence Finder",
		description: "Aplicativo desktop (Tauri + Rust) que organiza e pesquisa localmente PDFs, imagens, textos e conversas, com busca exata e por significado, referência à fonte e exportação de evidências.",
		longDescription: "Aplicativo desktop (Tauri 2 com núcleo em Rust e interface em React) que reúne arquivos em projetos locais independentes, extrai o texto (com OCR local), permite pesquisar esse conteúdo — de forma exata, por significado ou híbrida — com trechos ligados ao documento de origem e exporta os resultados selecionados em um pacote com relatório PDF. O processamento é local: o código não contém cliente de rede nem telemetria. A versão é a 0.1.0 e o projeto está em desenvolvimento: ainda não há instalador publicado e a validação em um Windows real continua pendente.",
		problem: "Encontrar uma informação específica em muitas capturas de tela, PDFs e conversas exige abrir arquivo por arquivo, e é difícil provar de onde veio cada trecho.",
		solution: "Importar os arquivos em um projeto local, extrair o texto de cada formato, indexar tudo em SQLite (FTS5 para a busca exata e vetores locais para a busca por significado) e devolver os resultados com contexto e fonte, com SHA-256 para verificar se o arquivo continua o mesmo na exportação.",
		features: [
			"Projetos independentes: cada um tem a própria pasta, o próprio banco SQLite e o próprio índice, e a pesquisa nunca mistura projetos",
			"Importação de PNG, JPEG, TXT e PDF, além de texto copiado, com formato conferido pelo conteúdo, detecção de duplicatas por SHA-256 e limite de 500 documentos por projeto",
			"Extração de texto de PDFs e TXT e OCR local de imagens e PDFs digitalizados via Tesseract (dependência externa, instalada à parte)",
			"Três modalidades de pesquisa: exata (SQLite FTS5), por significado (embeddings locais, com modelo instalado pelo usuário) e híbrida (fusão RRF), com filtros, ordenação e contexto dos trechos",
			"Exportação dos resultados selecionados em relatório PDF, manifest.json e cópia das fontes cujo SHA-256 foi verificado",
			"Privacidade e segurança descritas no README: processamento local, permissões mínimas do Tauri, CSP restritiva, caminhos validados no núcleo e arquivos originais nunca alterados"
		],
		technologies: [
			"Tauri 2",
			"Rust",
			"React 19",
			"TypeScript",
			"SQLite (FTS5)",
			"Tesseract (OCR)",
			"candle (embeddings locais)",
			"Vite",
			"Vitest"
		],
		categories: ["Plataformas"],
		githubUrl: "https://github.com/muryllodouglashsoares/evidence-finder",
		image: raw("evidence-finder", "docs/screenshots/Dashboard.png"),
		screenshots: [
			{
				src: raw("evidence-finder", "docs/screenshots/Tela_Pesquisa.png"),
				caption: "Pesquisa"
			},
			{
				src: raw("evidence-finder", "docs/screenshots/Conteudo_Encontrado.png"),
				caption: "Resultados e seleção"
			},
			{
				src: raw("evidence-finder", "docs/screenshots/Fontes.png"),
				caption: "Documentos e fontes"
			},
			{
				src: raw("evidence-finder", "docs/screenshots/PDF.png"),
				caption: "Relatório PDF"
			}
		],
		principal: true,
		hasTests: true,
		status: "in-progress",
		architecture: [
			"React + TypeScript — telas; uma única camada de serviço (services/core.ts) conversa com o núcleo",
			"Comandos Tauri (Rust) — superfície exposta: a interface envia só identificadores e tokens opacos, e pastas e arquivos são escolhidos em diálogos nativos abertos pelo Rust",
			"Núcleo em Rust — importação, extração, pesquisa (exata e semântica) e exportação",
			"SQLite por projeto — metadados, trechos, índice FTS5 e vetores",
			"Componentes locais opcionais — Tesseract (OCR), PDFium (evidência visual em PDFs digitais) e o modelo semântico, instalados à parte"
		],
		notes: [
			{
				heading: "Estado atual",
				body: "Versão 0.1.0, em desenvolvimento. Segundo o README, estão implementados e testados em Linux: projetos, importação, extração, OCR, pesquisa exata, a lógica do índice semântico, a exportação em PDF e o manifesto. Continuam pendentes: a validação do fluxo completo em um Windows real, o instalador Windows (o script de empacotamento nunca foi executado), os testes com o modelo semântico real e a calibração do limiar de similaridade."
			},
			{
				heading: "Limitações declaradas",
				body: "O armazenamento local não é criptografado, não há auditoria profissional de segurança e o app não protege contra malware nem contra outros usuários da mesma conta. O SHA-256 mostra que o conteúdo é idêntico ao registrado na importação, mas não comprova autenticidade, autoria nem cadeia de custódia. Ainda não existe Release para download."
			},
			{
				heading: "Testes",
				body: "Na última rodada registrada no repositório (docs/FASE7.md, em Linux), 82 testes de frontend (Vitest) e 258 testes Rust passaram. Outros 10 testes Rust ficam ignorados por dependerem de recursos externos, e os 4 testes do modelo semântico real não foram executados. São os números daquela rodada, não uma nova execução."
			}
		],
		learned: "O Evidence Finder me tirou do ambiente web: aplicação desktop, linguagem de sistemas, persistência local, tratamento de arquivos não confiáveis e escolhas de segurança documentadas — inclusive o que o projeto ainda não garante."
	},
	{
		id: "tekidu",
		title: "Tekidu",
		description: "Plataforma de gestão e acompanhamento acadêmico com experiências separadas para administradores, professores, estudantes e responsáveis.",
		longDescription: "A Tekidu centraliza informações acadêmicas — notas, frequência, boletim, turmas e comunicados — em um único ambiente, no lugar de planilhas e sistemas dispersos. A plataforma possui quatro experiências distintas, cada uma com telas e permissões próprias.",
		problem: "Informações acadêmicas espalhadas entre planilhas e sistemas separados, sem um lugar único onde estudante, professor e administração enxerguem os mesmos dados.",
		solution: "Um ambiente único com quatro perfis de acesso: o administrador gerencia estudantes, professores, turmas, disciplinas e avisos; o professor cuida de turmas, avaliações, notas e frequência; o estudante acessa boletim, desempenho, frequência, justificativas de falta, mensagens e avisos, restrito aos próprios dados; o responsável consulta boletim e frequência dos estudantes vinculados, somente leitura.",
		features: [
			"Autenticação completa: login, primeiro acesso com e-mail transacional (EmailJS, enviado pelo servidor) e recuperação de senha via Firebase Authentication",
			"Gestão acadêmica com CRUDs completos de estudantes, professores, turmas, disciplinas e avaliações",
			"Lançamento de notas, cálculo de médias e boletim consolidado por estudante",
			"Registro de frequência por sessão, com histórico por período",
			"Relatórios e indicadores de desempenho por estudante e por turma",
			"Justificativas de falta com documento comprobatório (imagem ou PDF) e mensagens entre professores e estudantes",
			"Exportação de boletim em PDF e de frequência e relatórios em Excel/PDF",
			"Avisos, central de notificações e calendário acadêmico",
			"Command palette para navegação por atalhos de teclado",
			"UX mobile dedicada: bottom navigation, sheets e FAB próprios",
			"PWA instalável, com Service Worker",
			"Painel de acessibilidade com preferências de texto, contraste e movimento",
			"Dark mode via tokens de design em CSS variables"
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
			"Cloudflare Pages Functions",
			"Vitest"
		],
		categories: [
			"Plataformas",
			"Web",
			"Acadêmicos"
		],
		githubUrl: "https://github.com/muryllodouglashsoares/Tekidu",
		demoUrl: "https://tekidu.pages.dev/",
		image: raw("Tekidu", "docs/screenshots/landing-page.png"),
		screenshots: [
			{
				src: raw("Tekidu", "docs/screenshots/dashboard.png"),
				caption: "Dashboard"
			},
			{
				src: raw("Tekidu", "docs/screenshots/boletim.png"),
				caption: "Boletim"
			},
			{
				src: raw("Tekidu", "docs/screenshots/meu-desempenho.png"),
				caption: "Meu desempenho"
			},
			{
				src: raw("Tekidu", "docs/screenshots/avisos.png"),
				caption: "Avisos"
			},
			{
				src: raw("Tekidu", "docs/screenshots/login.png"),
				caption: "Login"
			}
		],
		principal: true,
		authAndDatabase: true,
		hasTests: true,
		status: "in-progress",
		architecture: [
			"React + TypeScript (Vite) — quatro experiências de UI (admin, professor, estudante, responsável) sobre a mesma base de componentes",
			"Firebase Authentication — login, primeiro acesso e recuperação de senha",
			"Cloud Firestore — dados acadêmicos: estudantes, turmas, notas, frequência, avisos",
			"Firestore Security Rules — autorização por perfil aplicada no banco, não só na UI",
			"Camada de serviços por domínio (students, grades, attendance, reports, audit, email) isolando o acesso a dados dos componentes",
			"Cloudflare Pages Functions — envio do e-mail de primeiro acesso (EmailJS) e Web Push, mantendo credenciais fora do bundle do cliente",
			"Deploy em Cloudflare Pages"
		],
		challenges: [{
			problem: "Esconder botões e rotas na interface não impede que um usuário autenticado leia ou escreva dados de outro perfil diretamente na API do Firestore.",
			investigation: "Revisão de quais coleções cada perfil (admin, professor, estudante) realmente precisa ler ou escrever, e quais campos podem ser alterados por cada um.",
			solution: "Regras de autorização escritas diretamente nas Firestore Security Rules, com suíte de testes própria usando Vitest, Firebase Emulator e @firebase/rules-unit-testing cobrindo cenários de acesso permitido e negado."
		}, {
			problem: "Um estudante abrindo a plataforma não deveria baixar o código do portal administrativo só para ver seu próprio boletim.",
			investigation: "Mapeamento das rotas por perfil de usuário para identificar quais telas nunca são acessadas juntas na mesma sessão.",
			solution: "A maioria das páginas carregada sob demanda com React.lazy, agrupadas por Suspense conforme o perfil — cada usuário baixa só o código da sua própria experiência."
		}],
		notes: [{
			heading: "Camada de serviços por domínio",
			body: "O acesso ao Firestore fica isolado em serviços (students, grades, attendance, reports, audit, email, entre outros), mantendo os componentes de UI livres de lógica de dados. Alterações sensíveis, como edição de notas, geram log de auditoria assíncrono."
		}, {
			heading: "O que ainda falta",
			body: "Segundo o roadmap do repositório, ainda não há pipeline de CI/CD nem testes de componentes de interface; também estão previstos monitoramento de erros em produção e uma auditoria de acessibilidade."
		}],
		learned: "A Tekidu marcou a transição de construir interfaces isoladas para uma aplicação com autenticação, persistência de dados, autorização por perfil e regras de segurança validadas no banco — não só escondidas na tela."
	},
	{
		id: "gitflow",
		title: "GitFlow Desktop",
		description: "Aplicativo desktop (Tauri + Rust + React) para operar repositórios Git locais pela interface: branches, commit seletivo com revisão do diff e sincronização remota com bloqueios de segurança.",
		longDescription: "O GitFlow Desktop (nome provisório) é um aplicativo desktop em Tauri, Rust, React e TypeScript para operar repositórios Git locais sem digitar comandos. Ele mostra o estado do repositório e os diffs, lista, cria e troca branches, cria commits apenas com os arquivos que o usuário selecionou e executa fetch, pull e push mostrando o resultado real do Git. O projeto está em desenvolvimento: as fases 1 a 3 estão implementadas, e ZIP, merge manual, pull requests, autenticação própria e instalador ainda não existem.",
		problem: "Operações do Git pelo terminal exigem comandos precisos, e um descuido pode incluir arquivos indesejados em um commit ou enviar alterações para o destino errado.",
		solution: "Uma interface que executa o Git local de forma controlada — sem shell, com argumentos separados e bloqueios explícitos — e só mostra sucesso quando o Git comprova o resultado: o HEAD avançou, o push não teve linhas rejeitadas, o pull alterou o HEAD.",
		features: [
			"Fase 1 (leitura): seleção de pasta, validação do repositório e exibição de branch, estado, arquivos alterados e diffs, com preparados e não preparados em grupos separados",
			"Fase 2: listagem, criação e troca de branches; a troca é bloqueada com alterações em arquivos rastreados, e o app nunca usa --force, stash, reset ou clean para viabilizá-la",
			"Commit seletivo: só os arquivos marcados entram (git commit --only, sem add . nem commit -a), com revisão do diff exato e recusa se algo mudou durante a revisão",
			"Fase 3: diagnóstico de sincronização (sincronizada, adiantada, atrasada ou divergente) calculado com as referências locais, e fetch, pull e push com confirmação do destino exato",
			"Push sem --force, sem alterar upstream e sem pular hooks; main e master exigem uma segunda confirmação validada também no backend",
			"Classificação de falhas (autenticação, rede, TLS, push rejeitado, conflito) com detalhes técnicos higienizados; o app não armazena credenciais"
		],
		technologies: [
			"Tauri",
			"Rust",
			"React",
			"TypeScript",
			"Tailwind CSS",
			"Vite",
			"Vitest",
			"Git CLI"
		],
		categories: ["Plataformas"],
		githubUrl: "https://github.com/muryllodouglashsoares/gitflow",
		principal: true,
		hasTests: true,
		status: "in-progress",
		architecture: [
			"React + TypeScript — telas e hooks; services/gitService.ts é a única fronteira com o backend",
			"Comandos Tauri finos (commands.rs), assíncronos, com permissões mínimas e CSP restritiva",
			"Crate Rust separado (gitflow-git), sem dependência do Tauri — execução do Git, status, diff, branches, commit e sincronização remota",
			"Git CLI executado sem shell, com ambiente endurecido, tempo limite, limite de saída e trava de uma operação de escrita por repositório"
		],
		notes: [
			{
				heading: "Estado atual",
				body: "Segundo o README, as fases 1 a 3 (leitura, operações locais e sincronização remota) estão implementadas. Ainda não existem importação de ZIP, merge manual, resolução de conflitos, pull requests, autenticação própria nem instalador: hoje o app é iniciado em modo de desenvolvimento pelo iniciar.bat, que instala as dependências no Windows."
			},
			{
				heading: "Decisões de segurança",
				body: "A interface nunca envia comandos, só caminhos, que são validados e interpretados literalmente. O Git roda com fsmonitor desativado, sem terminal interativo e com variáveis perigosas removidas. Pull e push recebem o destino que o usuário viu, e o backend recusa a operação se o estado mudou nesse intervalo."
			},
			{
				heading: "Testes e limitações",
				body: "O README descreve testes de integração em Rust com Git real em repositórios temporários (incluindo remotos locais) e testes de frontend para a lógica pura; não há testes de componentes React. Falhas reais de autenticação e TLS não são reproduzíveis sem servidor, então a classificação é coberta por testes unitários com saídas reais do Git. As operações de rede não têm progresso percentual nem cancelamento."
			}
		]
	},
	{
		id: "ifconnect",
		title: "IFConnect",
		description: "Rede social acadêmica com feed, chat em tempo real e moderação, conectando estudantes, professores e administradores.",
		longDescription: "O IFConnect foi criado para centralizar a comunicação acadêmica de uma instituição de ensino, unindo recursos de rede social, comunicação em tempo real e gestão de conteúdo institucional, com diferentes níveis de acesso para alunos, professores e administradores.",
		problem: "Comunicação acadêmica fragmentada entre grupos de mensagem, murais e avisos soltos, sem um espaço institucional próprio.",
		solution: "Uma plataforma única com feed social, chat em tempo real e painel administrativo, com cargos e permissões distintas para aluno, professor e administrador.",
		features: [
			"Cadastro e login por e-mail/senha, login com Google, verificação de e-mail e recuperação de senha",
			"Perfis com handle único, foto e curso/disciplina",
			"Feed de postagens com curtidas, upvotes e comentários",
			"Sistema de seguidores, com feed personalizado",
			"Chat privado e em grupo em tempo real",
			"Notificações e indicadores de mensagens não lidas",
			"Sistema de badges e conquistas",
			"Cargos (aluno, professor, administrador) com permissões distintas e painel de moderação"
		],
		technologies: [
			"JavaScript",
			"HTML",
			"CSS",
			"Firebase Auth",
			"Realtime Database"
		],
		categories: [
			"Plataformas",
			"Web",
			"Acadêmicos"
		],
		githubUrl: "https://github.com/muryllodouglashsoares/plataforma-comunicacao",
		image: raw("plataforma-comunicacao", "screenshots/Captura%20de%20Tela%20(206).png"),
		screenshots: [
			{
				src: raw("plataforma-comunicacao", "screenshots/Captura%20de%20Tela%20(210).png"),
				caption: "Avisos"
			},
			{
				src: raw("plataforma-comunicacao", "screenshots/Captura%20de%20Tela%20(209).png"),
				caption: "Explorar"
			},
			{
				src: raw("plataforma-comunicacao", "screenshots/Captura%20de%20Tela%20(208).png"),
				caption: "Perfil"
			},
			{
				src: raw("plataforma-comunicacao", "screenshots/Captura%20de%20Tela%20(212).png"),
				caption: "Painel administrativo"
			}
		],
		authAndDatabase: true,
		status: "completed",
		architecture: [
			"JavaScript (sem framework de front-end) — feed, chat e painel administrativo",
			"Firebase Authentication — cadastro, login com Google e verificação de e-mail",
			"Firebase Realtime Database — posts, seguidores, chat e notificações em tempo real",
			"Cargos (aluno, professor, administrador) controlando o que cada perfil pode ver e moderar — permissões tratadas no código do cliente, sem backend próprio"
		],
		notes: [{
			heading: "Tudo em JavaScript puro",
			body: "A aplicação foi construída sem framework de front-end, com integração direta ao Firebase Authentication e ao Realtime Database — um exercício de organizar uma base grande de JavaScript por conta própria."
		}],
		learned: "O IFConnect veio antes da Tekidu: foi onde a autenticação, o tempo real e o controle de acesso por cargo apareceram pela primeira vez, sem o apoio de um framework para organizar o crescimento do código."
	},
	{
		id: "savora",
		title: "Savora",
		description: "Landing page e cardápio digital de um restaurante fictício, com animação autoral na hero e reservas integradas ponta a ponta.",
		longDescription: "Site institucional com cardápio digital, seções de apresentação, mapa de localização e formulário de reservas com automação real de ponta a ponta. Construído como peça de portfólio, com foco em animação de alto padrão e performance. Todos os dados do restaurante são fictícios.",
		problem: "Demonstrar, em uma peça de portfólio, o que separa uma landing page bonita de uma entrega real: animação autoral, performance medida e um formulário que realmente termina em algum lugar.",
		solution: "Uma hero com montagem animada do prato (composta apenas com transform e opacity, respeitando prefers-reduced-motion) e um fluxo de reservas que vai da validação no cliente até a planilha e o relatório em PDF.",
		features: [
			"Landing page completa: hero, sobre, especialidades, ingredientes, galeria, avaliações, localização, FAQ e CTA",
			"Cardápio digital com itens organizados por categoria",
			"Animação autoral na hero: montagem do prato, com fallback estático para prefers-reduced-motion",
			"Localização via embed real do Google Maps, com filtro visual combinando com o tema",
			"Reservas ponta a ponta: React Hook Form → server function → webhook do Make → Google Sheets → relatório em PDF"
		],
		technologies: [
			"React 19",
			"TypeScript",
			"TanStack Start",
			"Tailwind CSS 4",
			"Motion",
			"shadcn/ui",
			"React Hook Form",
			"Cloudflare Workers"
		],
		categories: ["Web"],
		githubUrl: "https://github.com/muryllodouglashsoares/savora-landing-page",
		demoUrl: "https://savora-landing-page.muryllodouglash-soares.workers.dev/",
		image: raw("savora-landing-page", "screenshots/Pagina_principal.png"),
		screenshots: [
			{
				src: raw("savora-landing-page", "screenshots/Menu.png"),
				caption: "Cardápio digital"
			},
			{
				src: raw("savora-landing-page", "screenshots/Reservas.png"),
				caption: "Reservas"
			},
			{
				src: raw("savora-landing-page", "screenshots/Imagens_da_Casa.png"),
				caption: "Galeria"
			}
		],
		status: "completed",
		notes: [{
			heading: "Origem do projeto",
			body: "O projeto foi iniciado no Lovable e evoluído manualmente — incluindo a limpeza do scaffold de UI, que removeu componentes e dependências não utilizados."
		}, {
			heading: "Performance como decisão de design",
			body: "A sequência de montagem anima somente transform e opacity e roda uma única vez; nada usa repeat infinito além da auréola do prato. O will-change é aplicado só enquanto uma peça está caindo, e no mobile a timeline usa menos peças e menos partículas."
		}]
	},
	{
		id: "forja",
		title: "FORJA Training Studio",
		description: "Landing page de um studio de treinamento fictício, com validação dupla do formulário, SEO técnico e captura de lead integrada.",
		longDescription: "O objetivo foi construir uma landing page no padrão que uma agência entregaria a um cliente do nicho fitness: identidade visual forte, copy persuasiva, formulário validado ponta a ponta, SEO técnico completo e cuidado com performance e acessibilidade. O studio é fictício.",
		features: [
			"Landing page completa: hero, planos, depoimentos, FAQ e contato",
			"Formulário com validação dupla — client-side (React Hook Form + Zod) e server-side via createServerFn",
			"Campo honeypot anti-bot",
			"Integração real do formulário com Make → Google Sheets",
			"SEO estruturado: JSON-LD, Open Graph, Twitter Card, canonical, sitemap.xml e robots.txt",
			"Manifest PWA com ícones, incluindo variante maskable",
			"Otimização de imagem com srcSet/sizes e dimensões explícitas para evitar CLS"
		],
		technologies: [
			"TanStack Start",
			"React 19",
			"TypeScript",
			"Tailwind CSS 4",
			"shadcn/ui",
			"React Hook Form",
			"Zod"
		],
		categories: ["Web"],
		hasTests: true,
		githubUrl: "https://github.com/muryllodouglashsoares/gym-landing-page",
		demoUrl: "https://gym-landing-page.muryllodouglash-soares.workers.dev/",
		image: raw("gym-landing-page", "screenshots/Pagina_principal.png"),
		screenshots: [
			{
				src: raw("gym-landing-page", "screenshots/Planos.png"),
				caption: "Planos"
			},
			{
				src: raw("gym-landing-page", "screenshots/Registro_de_Treinos.png"),
				caption: "Registro de treinos"
			},
			{
				src: raw("gym-landing-page", "screenshots/Formulário.png"),
				caption: "Formulário de contato"
			}
		],
		status: "completed",
		notes: [{
			heading: "Projeto conceitual",
			body: "O studio é fictício e as imagens vêm de banco de imagens (Unsplash), já que não há uma academia real para fornecer fotos próprias. O formulário é funcional de verdade — conectado a uma automação real — apenas para demonstrar o fluxo completo de captura de lead."
		}, {
			heading: "Testes",
			body: "O handler do formulário de contato (honeypot, validação, timeout e falhas do webhook) tem testes com fetch simulado, executados com node:test. O repositório não descreve outros testes automatizados."
		}]
	},
	{
		id: "odontoprime",
		title: "OdontoPrime",
		description: "Landing page de uma clínica odontológica fictícia, construída a partir de um design de referência, com SSR e SEO técnico.",
		longDescription: "Landing page pixel-perfect construída a partir de um design de referência para uma clínica odontológica, servindo como peça de portfólio para exercitar SSR, SEO técnico e integração de formulário com automação real. A clínica e seus dados são fictícios.",
		features: [
			"Landing page completa (serviços, equipe, depoimentos, FAQ) renderizada via SSR",
			"Formulário de contato integrado a webhook real (Make → Google Sheets), com modo demonstração automático",
			"Dados estruturados JSON-LD para Dentist e FAQPage",
			"sitemap.xml, robots.txt e manifest.json (PWA) com ícones"
		],
		technologies: [
			"TanStack Start",
			"React 19",
			"TypeScript",
			"HTML",
			"CSS",
			"JavaScript",
			"Vite"
		],
		categories: ["Web"],
		githubUrl: "https://github.com/muryllodouglashsoares/clinica-landing-page",
		demoUrl: "https://clinica-landing-page.muryllodouglash-soares.workers.dev/",
		image: raw("clinica-landing-page", "screenshots/pagina-principal.png"),
		screenshots: [
			{
				src: raw("clinica-landing-page", "screenshots/especialidades.png"),
				caption: "Especialidades"
			},
			{
				src: raw("clinica-landing-page", "screenshots/equipe.png"),
				caption: "Equipe"
			},
			{
				src: raw("clinica-landing-page", "screenshots/formulario-contato.png"),
				caption: "Formulário de contato"
			}
		],
		status: "completed",
		notes: [{
			heading: "Por que HTML/CSS/JS puro dentro de uma rota React",
			body: "O design foi construído como página estática, mas o projeto usa TanStack Start para servir esse conteúdo via SSR na rota /, em vez de redirecionar para um HTML solto. Isso evita o duplo carregamento e garante que crawlers e previews de link recebam o conteúdo real da página."
		}]
	},
	{
		id: "mini-olimpiada-robotica",
		title: "Mini Olimpíada de Robótica",
		description: "Robô seguidor de linha em LEGO Spike Prime, programado em blocos e em Python, para a competição do IFPB.",
		longDescription: "Projeto desenvolvido para participação na Mini Olimpíada de Robótica do IFPB, utilizando a plataforma LEGO Spike Prime. O objetivo foi projetar, montar e programar um robô capaz de seguir uma linha de forma autônoma, usando sensores de cor para interpretar o ambiente.",
		problem: "Fazer um robô percorrer sozinho um trajeto marcado por uma linha, dentro das regras da competição.",
		solution: "Duas abordagens de leitura de linha foram desenvolvidas e comparadas: uma com dois sensores de cor programada em blocos e outra com um único sensor programada em Python.",
		features: [
			"Robô seguidor de linha com 2 sensores de cor, programado em blocos",
			"Versão alternativa com 1 sensor de cor, programada em Python",
			"Documentação das regras da competição",
			"Registro fotográfico e em vídeo de todo o processo: iniciação, testes e conclusão da prova"
		],
		technologies: [
			"LEGO Spike Prime",
			"Python",
			"Programação em blocos"
		],
		categories: ["Robótica", "Acadêmicos"],
		githubUrl: "https://github.com/muryllodouglashsoares/mini-robotics-competition",
		image: mini_olimpiada_robotica_default,
		screenshots: [
			{
				src: raw("mini-robotics-competition", "images/Registro_Iniciacao.jpeg"),
				caption: "Iniciação"
			},
			{
				src: raw("mini-robotics-competition", "images/Registro_de_Teste.jpeg"),
				caption: "Teste"
			},
			{
				src: raw("mini-robotics-competition", "images/Registro_de_Conclus%C3%A3o_da_Prova.jpeg"),
				caption: "Conclusão da prova"
			}
		],
		status: "completed",
		notes: [{
			heading: "Aprendizados",
			body: "Programação em blocos e em Python, lógica computacional, robótica educacional, montagem mecânica, uso de sensores, resolução de problemas e trabalho em equipe."
		}]
	}
];
var featuredProject = projects.find((p) => p.featured);
/** Projetos principais além do destaque (profundidade técnica verificada) */
var principalProjects = projects.filter((p) => p.principal && !p.featured);
/** Projetos complementares: demonstram competências específicas */
var otherProjects = projects.filter((p) => !p.featured && !p.principal);
function getProject(id) {
	return projects.find((p) => p.id === id);
}
Array.from(new Set(otherProjects.flatMap((p) => p.categories)));
//#endregion
export { principalProjects as a, otherProjects as i, getProject as n, projects as o, hero_sunset_portrait_default as r, statusLabel as s, featuredProject as t };
