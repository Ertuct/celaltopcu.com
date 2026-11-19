const root = document.documentElement;

function remember(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    /* storage unavailable */
  }
}

document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('langToggle').addEventListener('click', () => {
  const toTr = !root.classList.contains('lang-tr');
  root.classList.toggle('lang-tr', toTr);
  root.classList.toggle('lang-en', !toTr);
  remember('site-lang', toTr ? 'tr' : 'en');
});

document.getElementById('themeToggle').addEventListener('click', () => {
  const toLight = !root.classList.contains('theme-light');
  root.classList.toggle('theme-light', toLight);
  root.classList.toggle('theme-dark', !toLight);
  remember('site-theme', toLight ? 'light' : 'dark');
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
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
