(function () {
  const el = document.querySelector('[data-typing]');
  if (!el) return;

  const roles = JSON.parse(el.getAttribute('data-typing'));
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;
  const textSpan = el.querySelector('.typing-text');

  function tick() {
    const current = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      textSpan.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 1600);
        return;
      }
    } else {
      charIndex--;
      textSpan.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(tick, deleting ? 35 : 65);
  }

  if (roles.length) {
    setTimeout(tick, 500);
  }
})();
