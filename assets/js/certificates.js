(function () {
  const grid = document.querySelector('[data-certs-grid]');
  if (!grid) return;

  const FALLBACK_CERTIFICATES = [
    {
      id: "software-freedom-day",
      title: "Software Freedom Day 2025",
      issuer: "IFPB Campus Itaporanga",
      date: "20/09/2025",
      hours: "7 horas",
      description: "Participação no Dia Internacional da Liberdade de Software, evento realizado em Itaporanga-PB.",
      image: "assets/images/certificates/software-freedom-day.jpg"
    },
    {
      id: "obi-2025",
      title: "XXVII Olimpíada Brasileira de Informática (OBI 2025)",
      issuer: "Sociedade Brasileira de Computação (SBC)",
      date: "2025",
      hours: "",
      description: "Participação na OBI 2025, modalidade Programação, Nível 1.",
      image: "assets/images/certificates/obi-2025.jpg"
    }
  ];

  function emptyState() {
    return `
      <div class="cert-empty" data-reveal>
        <div class="icon">📄</div>
        <p>Ainda sem certificados publicados — espaço reservado para participações em olimpíadas e cursos complementares conforme forem concluídos.</p>
      </div>`;
  }

  function cardTemplate(cert, i) {
    const meta = [cert.date, cert.hours].filter(Boolean).join(' · ');
    return `
      <article class="cert-card cert-card-filled" data-reveal data-reveal-delay="${(i % 4) + 1}" data-cert-image="${cert.image}" tabindex="0" role="button" aria-label="Ver certificado: ${cert.title}">
        <div class="cert-thumb">
          <img src="${cert.image}" alt="Certificado — ${cert.title}" loading="lazy">
        </div>
        <div class="cert-info">
          <h3>${cert.title}</h3>
          <p class="cert-issuer">${cert.issuer}</p>
          ${meta ? `<p class="cert-meta">${meta}</p>` : ''}
        </div>
      </article>`;
  }

  function attachReveal() {
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
  }

  function attachLightbox() {
    grid.querySelectorAll('[data-cert-image]').forEach((card) => {
      const open = () => openLightbox(card.getAttribute('data-cert-image'), card.querySelector('h3')?.textContent || '');
      card.addEventListener('click', open);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
      });
    });
  }

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

  function render(certs) {
    if (!certs || !certs.length) {
      grid.innerHTML = emptyState();
    } else {
      grid.innerHTML = certs.map(cardTemplate).join('');
      attachLightbox();
    }
    attachReveal();
  }

  async function loadCertificates() {
    try {
      const res = await fetch('data/certificates.json');
      if (!res.ok) throw new Error('not ok');
      const data = await res.json();
      render(data);
    } catch (err) {
      render(FALLBACK_CERTIFICATES);
    }
  }

  loadCertificates();
})();
