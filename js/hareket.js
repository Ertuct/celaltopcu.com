/* hareket.js — üç sitede ortak kaydırma ve hareket katmanı (celaltopcu.com, FORGEA, FabriQ).
   AYNI dosya üç sitede durur; birinde değiştirirsen diğer ikisine de kopyala.
   - Lenis (js/vendor/lenis.min.js, MIT, yerel): yalnız fare tekerleği; dokunmatik doğal kalır.
     prefers-reduced-motion: reduce iken HİÇ başlatılmaz. JS kapalıyken site normal kaydırılır.
   - Menü: sayfa başında şeffaf; 8px kaydırınca zemin + alt çizgi (html'e değil başlığa .is-scrolled).
   - Aktif bölüm: menüde aynı sayfadaki #çapa bağlantıları .is-active alır.
   - Belirme: .reveal öğeleri bir kez belirir; kardeşler arası 60 ms; ilk ekrandakiler animasyonsuz görünür.
   - Mobil menü açıkken arka plan kaydırması kilitli (html.nav-open). */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var header = document.querySelector('[data-site-header]');
  function headerH() { return header ? header.offsetHeight : 0; }

  /* --- 1. Yumuşak kaydırma ------------------------------------------------ */
  var lenis = null;
  if (!reduce && typeof window.Lenis === 'function') {
    try {
      lenis = new window.Lenis({
        lerp: 0.1,
        wheelMultiplier: 1,
        syncTouch: false,          // dokunmatikte doğal kaydırma
        autoRaf: true,
        anchors: { offset: -headerH() }
      });
      window.siteLenis = lenis;
    } catch (e) { lenis = null; }
  }

  /* --- 2. Menü zemini ----------------------------------------------------- */
  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', (window.scrollY || root.scrollTop) > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  if (lenis) lenis.on('scroll', onScroll);
  onScroll();

  /* --- 3. Mobil menü açıkken kaydırma kilidi ------------------------------ */
  var toggle = document.getElementById('navToggle');
  if (toggle && 'MutationObserver' in window) {
    new MutationObserver(function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      root.classList.toggle('nav-open', open);
      if (lenis) { if (open) lenis.stop(); else lenis.start(); }
    }).observe(toggle, { attributes: true, attributeFilter: ['aria-expanded'] });
  }

  /* --- 4. Aktif bölüm ----------------------------------------------------- */
  if (header && 'IntersectionObserver' in window) {
    var map = {};
    Array.prototype.forEach.call(header.querySelectorAll('a[href]'), function (a) {
      var href = a.getAttribute('href');
      var hash = href.charAt(0) === '#' ? href.slice(1) : '';
      if (!hash) return;
      var sec = document.getElementById(hash);
      if (sec) { (map[hash] = map[hash] || []).push(a); }
    });
    var ids = Object.keys(map);
    if (ids.length) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          ids.forEach(function (id) {
            map[id].forEach(function (a) { a.classList.toggle('is-active', id === en.target.id); });
          });
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      ids.forEach(function (id) { spy.observe(document.getElementById(id)); });
    }
  }

  /* --- 5. Belirme --------------------------------------------------------- */
  var items = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (!items.length) return;
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }
  // İlk ekranda zaten görünenler animasyonsuz görünür (HTML'de .reveal almamaları gerekir; bu bir emniyet).
  var vh = window.innerHeight || root.clientHeight;
  items = items.filter(function (el) {
    if (el.getBoundingClientRect().top < vh * 0.92) {
      el.classList.add('no-anim', 'is-visible');
      return false;
    }
    return true;
  });
  var io = new IntersectionObserver(function (entries) {
    var batch = entries.filter(function (en) { return en.isIntersecting; });
    batch.forEach(function (en, i) {
      en.target.style.setProperty('--reveal-delay', Math.min(i, 5) * 60 + 'ms');
      en.target.classList.add('is-visible');
      io.unobserve(en.target);
    });
  }, { threshold: 0.12 });
  items.forEach(function (el) { io.observe(el); });
})();
