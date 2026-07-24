(function () {
  const grid = document.querySelector('[data-projects-grid]');
  const filterRow = document.querySelector('[data-filter-row]');
  if (!grid) return;

  // Fallback copy of data/projects.json so the page still renders when opened
  // directly from disk (file://), where fetch() of local JSON is blocked by
  // the browser. When served over http(s) (GitHub Pages, live-server, etc.)
  // the real data/projects.json file is fetched instead, so that stays the
  // single source of truth to edit.
  const FALLBACK_PROJECTS = [
    {
      id: "ifconnect", featured: false, icon: "🌐", title: "IFConnect", category: "web",
      categoryLabel: "Rede Social / Plataforma Acadêmica",
      description: "Rede social acadêmica desenvolvida para conectar alunos e professores do IFPB (campus Itaporanga e João Pessoa), reunindo feed de publicações, avisos institucionais, resumos por matéria, gestão de laboratórios e um painel administrativo completo em um único ambiente. É o maior projeto desenvolvido até o momento.",
      technologies: ["HTML5", "CSS3", "JavaScript", "Firebase"],
      features: ["Autenticação de usuários e perfis (aluno, professor, admin)", "Feed de publicações com curtidas, comentários e hashtags", "Filtros de feed: Seguindo, Meu Campus, Populares, Relevantes", "Mural de Avisos institucionais fixáveis", "Explorar: busca de usuários por campus e por professores", "Perfil com posts, badges e sistema de conquistas", "Resumos compartilhados organizados por matéria", "Gestão de Laboratórios com registro e histórico de uso", "Painel Administrativo com controle de usuários e moderação de conteúdo", "Suporte a múltiplos campi (Itaporanga e João Pessoa)", "Interface responsiva com tema claro/escuro"],
      learnings: ["Estruturação de aplicações web maiores", "Organização de código em múltiplos módulos", "Firebase Authentication", "Firestore e modelagem de dados em tempo real", "Controle de permissões por papel de usuário", "Desenvolvimento Front-end e responsividade", "Planejamento e priorização de funcionalidades"],
      images: ["assets/images/projects/ifconnect/feed.jpg", "assets/images/projects/ifconnect/avisos.jpg", "assets/images/projects/ifconnect/explorar.jpg", "assets/images/projects/ifconnect/perfil.jpg", "assets/images/projects/ifconnect/resumos.jpg", "assets/images/projects/ifconnect/labs.jpg", "assets/images/projects/ifconnect/admin.jpg"],
      github: "https://github.com/muryllodouglashsoares/plataforma-comunicacao", demo: "https://ifconnect.pages.dev"
    },
    {
      id: "alarme-incendio", featured: false, icon: "🚨", title: "Sistema de Alarme de Incêndio", category: "robotica",
      categoryLabel: "Sistemas Embarcados",
      description: "Projeto desenvolvido com Arduino para monitoramento e detecção de incêndios, acionando automaticamente um sistema de alerta.",
      technologies: ["Arduino", "C++"],
      features: ["Monitoramento contínuo", "Detecção de fumaça/incêndio", "Acionamento automático do alarme"],
      learnings: ["Sensores", "Programação embarcada", "Lógica de automação", "Integração hardware/software"],
      images: [],
      github: "https://github.com/muryllodouglashsoares", demo: ""
    },
    {
      id: "robotica-spike", featured: false, icon: "🏆", title: "Robô Campeão — Amistoso Interno de Robótica", category: "robotica",
      categoryLabel: "Robótica",
      description: "Construção e programação de robô utilizando LEGO SPIKE Prime, consagrado campeão no 2º Amistoso de Robótica do IFPB, com desafios de seguidor de linha, desvio de obstáculos e leitura de sensores.",
      technologies: ["Python", "LEGO SPIKE Prime"],
      features: ["Seguidor de linha", "Desvio de obstáculos", "Sensor de cor", "Sensor ultrassônico", "Estratégias para competições"],
      learnings: ["Algoritmos", "Programação de robôs", "Controle de sensores", "Tomada de decisão", "Resolução de problemas"],
      images: ["assets/images/projects/robotica/amistoso-01.jpg", "assets/images/projects/robotica/amistoso-02.jpg", "assets/images/projects/robotica/amistoso-03.jpg", "assets/images/projects/robotica/amistoso-04.jpg"],
      github: "https://github.com/muryllodouglashsoares/mini-robotics-competition", demo: ""
    },
    {
      id: "robo-resgate-ev3", featured: false, icon: "🚧", title: "Robô Autônomo de Resgate — OBR (Em Desenvolvimento)", category: "robotica",
      categoryLabel: "Robótica",
      description: "Robô autônomo em desenvolvimento para a categoria de Resgate da Olimpíada Brasileira de Robótica, utilizando tecnologia LEGO Mindstorms EV3.",
      technologies: ["LEGO Mindstorms EV3"],
      features: ["Navegação autônoma", "Leitura de sensores para identificação de rota", "Estratégias para desafios de resgate"],
      learnings: ["Montagem de robôs com LEGO Mindstorms EV3", "Programação de comportamento autônomo", "Planejamento para competições de robótica"],
      images: ["assets/images/projects/ev3/ev3-01.jpg", "assets/images/projects/ev3/ev3-02.jpg", "assets/images/projects/ev3/ev3-03.jpg", "assets/images/projects/ev3/ev3-04.jpg", "assets/images/projects/ev3/ev3-05.jpg", "assets/images/projects/ev3/ev3-06.jpg", "assets/images/projects/ev3/ev3-07.jpg", "assets/images/projects/ev3/ev3-08.jpg"],
      github: "https://github.com/muryllodouglashsoares", demo: ""
    }
  ];

  const CATEGORY_LABELS = {
    all: "Todos", web: "Web", robotica: "Robótica", outros: "Outros"
  };

  function openLightbox(src, title) {
    const overlay = document.createElement('div');
    overlay.className = 'cert-lightbox';
    overlay.innerHTML = `
      <div class="cert-lightbox-inner">
        <button class="cert-lightbox-close" aria-label="Fechar">&times;</button>
        <img src="${src}" alt="${title}">
      </div>`;
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    function close() {
      overlay.remove();
      document.body.style.overflow = '';
    }
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target.classList.contains('cert-lightbox-close')) close();
    });
    document.addEventListener('keydown', function onKey(e) {
      if (e.key === 'Escape') { close(); document.removeEventListener('keydown', onKey); }
    });
  }

  function galleryTemplate(images, title) {
    if (!images || !images.length) return '';
    if (images.length === 1) {
      return `<div class="card-cover"><img src="${images[0]}" alt="Captura de tela — ${title}" loading="lazy" data-lightbox-img></div>`;
    }
    const shown = images.slice(0, 8);
    return `<div class="card-gallery">${shown.map((src) => `<img src="${src}" alt="Captura de tela — ${title}" loading="lazy" data-lightbox-img>`).join('')}</div>`;
  }

  function cardTemplate(p) {
    const demoBtn = p.demo
      ? `<a class="btn btn-ghost btn-sm" href="${p.demo}" target="_blank" rel="noopener">Demo</a>`
      : '';
    return `
      <article class="project-card" data-category="${p.category}" data-reveal>
        ${galleryTemplate(p.images, p.title)}
        <div class="icon-badge">${p.icon}</div>
        <div>
          <span class="category">${p.categoryLabel}</span>
          <h3>${p.title}</h3>
        </div>
        <p class="desc">${p.description}</p>
        <div class="tags">${p.technologies.map((t) => `<span class="tag">${t}</span>`).join('')}</div>
        <details>
          <summary>Funcionalidades &amp; aprendizados</summary>
          <strong>Funcionalidades</strong>
          <ul>${p.features.map((f) => `<li>${f}</li>`).join('')}</ul>
          <strong>Aprendizados</strong>
          <ul>${p.learnings.map((l) => `<li>${l}</li>`).join('')}</ul>
        </details>
        <div class="card-actions">
          <a class="btn btn-ghost btn-sm" href="${p.github}" target="_blank" rel="noopener">GitHub</a>
          ${demoBtn}
        </div>
      </article>`;
  }

  function attachLightboxHandlers(root) {
    root.querySelectorAll('[data-lightbox-img]').forEach((img) => {
      img.addEventListener('click', () => openLightbox(img.getAttribute('src'), img.getAttribute('alt') || ''));
    });
  }

  function render(projects) {
    const nonFeatured = projects.filter((p) => !p.featured);
    grid.innerHTML = nonFeatured.map(cardTemplate).join('');
    attachLightboxHandlers(grid);

    // Re-trigger reveal observer for freshly injected cards
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      grid.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
    } else {
      grid.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'));
    }

    // Build filters
    const categories = ['all', ...new Set(nonFeatured.map((p) => p.category))];
    if (filterRow) {
      filterRow.innerHTML = categories
        .map((c, i) => `<button class="filter-btn ${i === 0 ? 'active' : ''}" data-filter="${c}">${CATEGORY_LABELS[c] || c}</button>`)
        .join('');

      filterRow.querySelectorAll('.filter-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          filterRow.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          const filter = btn.getAttribute('data-filter');
          grid.querySelectorAll('.project-card').forEach((card) => {
            const show = filter === 'all' || card.getAttribute('data-category') === filter;
            card.style.display = show ? '' : 'none';
          });
        });
      });
    }

    renderFeatured(projects.find((p) => p.featured));
  }

  function renderFeatured(p) {
    const el = document.querySelector('[data-featured-project]');
    if (!el || !p) return;
    const gallery = (p.images && p.images.length)
      ? `<div class="featured-gallery" data-reveal data-reveal-delay="1">${p.images.slice(0, 6).map((src) => `<img src="${src}" alt="Captura de tela — ${p.title}" loading="lazy" data-lightbox-img>`).join('')}</div>`
      : `<div class="featured-visual" data-reveal data-reveal-delay="1">${p.icon}</div>`;
    const demoBtn = p.demo
      ? `<a class="btn btn-ghost" href="${p.demo}" target="_blank" rel="noopener">Ver Demo</a>`
      : '';
    el.innerHTML = `
      <div data-reveal>
        <span class="tag-featured">Projeto em destaque</span>
        <h3>${p.icon} ${p.title}</h3>
        <p class="desc">${p.description}</p>
        <div class="tags" style="margin-top:1rem;">${p.technologies.map((t) => `<span class="tag">${t}</span>`).join('')}</div>
        <div class="featured-list">
          <h4>Funcionalidades</h4>
          <ul>${p.features.map((f) => `<li>${f}</li>`).join('')}</ul>
        </div>
        <div class="card-actions" style="margin-top:1.5rem;">
          <a class="btn btn-primary" href="${p.github}" target="_blank" rel="noopener">Ver no GitHub</a>
          ${demoBtn}
        </div>
      </div>
      ${gallery}
    `;
    attachLightboxHandlers(el);
  }

  async function loadProjects() {
    try {
      const res = await fetch('data/projects.json');
      if (!res.ok) throw new Error('not ok');
      const data = await res.json();
      render(data);
    } catch (err) {
      render(FALLBACK_PROJECTS);
    }
  }

  loadProjects();
})();
