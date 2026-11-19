document.getElementById('year').textContent = new Date().getFullYear();

const langToggle = document.getElementById('langToggle');
langToggle.addEventListener('click', () => {
  const isTr = document.documentElement.classList.contains('lang-tr');
  const next = isTr ? 'lang-en' : 'lang-tr';
  document.documentElement.className = next;
  try {
    localStorage.setItem('site-lang', isTr ? 'en' : 'tr');
  } catch (e) {
    /* storage unavailable, ignore */
  }
});

const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach((el) => observer.observe(el));
