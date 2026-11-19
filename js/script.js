(function () {
  'use strict';

  var root = document.documentElement;

  function remember(key, value) {
    try { localStorage.setItem(key, value); } catch (e) {}
  }

  /* --- language ---------------------------------------------------------- */
  var langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', function () {
      var toTr = !root.classList.contains('lang-tr');
      root.classList.toggle('lang-tr', toTr);
      root.classList.toggle('lang-en', !toTr);
      root.lang = toTr ? 'tr' : 'en';
      remember('site-lang', toTr ? 'tr' : 'en');
    });
  }

  /* --- theme ------------------------------------------------------------- */
  var themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var toLight = !root.classList.contains('theme-light');
      root.classList.toggle('theme-light', toLight);
      root.classList.toggle('theme-dark', !toLight);
      remember('site-theme', toLight ? 'light' : 'dark');
    });
  }

  /* --- mobile menu ------------------------------------------------------- */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* --- copy citation ----------------------------------------------------- */
  Array.prototype.forEach.call(document.querySelectorAll('.copy-btn'), function (btn) {
    btn.addEventListener('click', function () {
      var src = document.querySelector(btn.getAttribute('data-copy'));
      if (!src || !navigator.clipboard) return;
      navigator.clipboard.writeText(src.textContent.replace(/\s+/g, ' ').trim()).then(function () {
        var spans = btn.querySelectorAll('span');
        var prev = [];
        Array.prototype.forEach.call(spans, function (s, i) {
          prev[i] = s.textContent;
          s.textContent = (s.className === 't-tr') ? 'Kopyalandı' : 'Copied';
        });
        setTimeout(function () {
          Array.prototype.forEach.call(spans, function (s, i) { s.textContent = prev[i]; });
        }, 1600);
      });
    });
  });

  /* --- footer year ------------------------------------------------------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* --- reveal on scroll -------------------------------------------------- */
  var targets = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(targets, function (el) { el.classList.add('is-visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  Array.prototype.forEach.call(targets, function (el) { io.observe(el); });
})();
