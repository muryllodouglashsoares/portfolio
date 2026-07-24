(function () {
  const FALLBACK_TIMELINE = [
    { year: "2025", title: "Início dos estudos em programação", description: "Primeiros contatos com lógica de programação e algoritmos." },
    { year: "2025", title: "Ingresso no Ensino Médio Técnico em Informática", description: "Início da formação técnica e aprofundamento em desenvolvimento de software." },
    { year: "2025", title: "Primeiros projetos Web", description: "Desenvolvimento das primeiras aplicações utilizando HTML, CSS e JavaScript." },
    { year: "2025", title: "Sistema de Alarme de Incêndio", description: "Primeiro projeto envolvendo sistemas embarcados e Arduino." },
    { year: "2026", title: "Estudos em Java", description: "Aplicação prática dos conceitos de Programação Orientada a Objetos." },
    { year: "2026", title: "Projetos de Robótica", description: "Desenvolvimento de soluções com LEGO SPIKE Prime e Python para desafios de robótica." },
    { year: "2026", title: "Desenvolvimento do IFConnect", description: "Criação da maior aplicação desenvolvida até o momento, reunindo autenticação, banco de dados e múltiplas funcionalidades." },
    { year: "2026", title: "Organização do GitHub", description: "Documentação dos projetos e construção de um portfólio técnico." },
    { year: "2026", title: "Desenvolvimento do Portfólio Pessoal", description: "Criação do site que reúne todos os projetos, tecnologias e evolução profissional." },
    { year: "2027+", title: "Próximos desafios", description: "Projetos comerciais, sistemas completos, desenvolvimento Full Stack e ingresso em Ciência da Computação." }
  ];

  function renderTimeline(items) {
    const el = document.querySelector('[data-timeline]');
    if (!el) return;
    el.innerHTML = items.map((item, i) => `
      <div class="timeline-item" data-reveal data-reveal-delay="${(i % 4) + 1}">
        <span class="timeline-year">${item.year}</span>
        <h4>${item.title}</h4>
        <p>${item.description}</p>
      </div>`).join('');

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      el.querySelectorAll('[data-reveal]').forEach((n) => observer.observe(n));

      const tlObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      }, { threshold: 0.4 });
      el.querySelectorAll('.timeline-item').forEach((n) => tlObserver.observe(n));
    } else {
      el.querySelectorAll('[data-reveal]').forEach((n) => n.classList.add('is-visible'));
    }
  }

  async function loadTimeline() {
    try {
      const res = await fetch('data/timeline.json');
      if (!res.ok) throw new Error('not ok');
      renderTimeline(await res.json());
    } catch (err) {
      renderTimeline(FALLBACK_TIMELINE);
    }
  }

  loadTimeline();
})();
