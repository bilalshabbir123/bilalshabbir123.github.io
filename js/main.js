/* bilalshabbir.dev · main.js */

// ── NAV: scroll class & mobile toggle ──
(function () {
  const nav = document.querySelector('nav');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      const open = links.classList.contains('open');
      toggle.setAttribute('aria-expanded', open);
      toggle.querySelectorAll('span')[0].style.transform = open ? 'rotate(45deg) translate(5px, 5px)' : '';
      toggle.querySelectorAll('span')[1].style.opacity  = open ? '0' : '';
      toggle.querySelectorAll('span')[2].style.transform = open ? 'rotate(-45deg) translate(5px, -5px)' : '';
    });
    // close on nav link click
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      });
    });
  }
})();

// ── CONTACT FORM (Formspree AJAX) ──
(function () {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form || !status) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';
    status.textContent = '';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        status.style.color = 'var(--green)';
        status.textContent = 'Message sent — I\'ll get back to you soon!';
        form.reset();
      } else {
        const data = await res.json();
        status.style.color = '#dc2626';
        status.textContent = data.errors?.map(e => e.message).join(', ') || 'Something went wrong. Please try again.';
      }
    } catch {
      status.style.color = '#dc2626';
      status.textContent = 'Network error — please email me directly.';
    } finally {
      btn.disabled = false;
      btn.textContent = 'Send Message';
    }
  });
})();

// ── SCROLL REVEAL ──
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 80 + 'ms';
    io.observe(el);
  });
})();
