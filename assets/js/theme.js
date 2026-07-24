(function () {
  // Auto-update footer year
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Copy email to clipboard
  const copyBtn = document.querySelector('[data-copy-email]');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const email = copyBtn.getAttribute('data-copy-email');
      try {
        await navigator.clipboard.writeText(email);
        const original = copyBtn.textContent;
        copyBtn.textContent = 'Copiado!';
        setTimeout(() => { copyBtn.textContent = original; }, 1800);
      } catch (err) {
        window.location.href = `mailto:${email}`;
      }
    });
  }

  // Contact form: no backend configured yet, so open the user's mail client
  const form = document.querySelector('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('#name')?.value || '';
      const email = form.querySelector('#email')?.value || '';
      const message = form.querySelector('#message')?.value || '';
      const to = form.getAttribute('data-contact-form');
      const subject = encodeURIComponent(`Contato pelo portfólio — ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    });
  }
})();
