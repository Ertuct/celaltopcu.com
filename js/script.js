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

  /* --- mail chooser -------------------------------------------------------
     A mailto link does nothing on a desktop without a mail client. With a mouse, a click opens a
     small menu instead: Gmail, Outlook, the default app, or copy the address. Touch devices keep
     the plain mailto (the phone's mail app opens). */
  (function () {
    var fine = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)');
    var menu = null, opener = null;

    function tr() { return root.classList.contains('lang-tr'); }

    function close(focusBack) {
      if (!menu) return;
      menu.remove();
      menu = null;
      if (opener) {
        opener.setAttribute('aria-expanded', 'false');
        if (focusBack) opener.focus();
      }
      opener = null;
    }

    function open(link) {
      var addr = link.getAttribute('href').replace(/^mailto:/i, '').split('?')[0];
      var to = encodeURIComponent(addr);
      var items = [
        [tr() ? "Gmail'de yaz" : 'Write in Gmail',
          'https://mail.google.com/mail/?view=cm&fs=1&to=' + to],
        [tr() ? "Outlook'ta yaz" : 'Write in Outlook',
          'https://outlook.live.com/mail/0/deeplink/compose?to=' + to],
        [tr() ? 'Varsayılan e-posta uygulaması' : 'Default mail app', 'mailto:' + addr],
        [tr() ? 'Adresi kopyala' : 'Copy address', null]
      ];
      menu = document.createElement('div');
      menu.className = 'mail-menu';
      menu.setAttribute('role', 'menu');
      items.forEach(function (it) {
        var el = document.createElement(it[1] ? 'a' : 'button');
        el.className = 'mail-menu-item';
        el.setAttribute('role', 'menuitem');
        el.textContent = it[0];
        if (it[1]) {
          el.href = it[1];
          if (/^https:/.test(it[1])) { el.target = '_blank'; el.rel = 'noopener noreferrer'; }
          el.addEventListener('click', function () { setTimeout(function () { close(false); }, 0); });
        } else {
          el.type = 'button';
          el.addEventListener('click', function () {
            var done = function () {
              el.textContent = tr() ? 'Kopyalandı: ' + addr : 'Copied: ' + addr;
              setTimeout(function () { close(true); }, 1400);
            };
            if (navigator.clipboard) navigator.clipboard.writeText(addr).then(done, function () {});
          });
        }
        menu.appendChild(el);
      });
      document.body.appendChild(menu);
      var r = link.getBoundingClientRect();
      var left = Math.min(r.left + window.scrollX, window.scrollX + document.documentElement.clientWidth - menu.offsetWidth - 12);
      menu.style.left = Math.max(12, left) + 'px';
      menu.style.top = (r.bottom + window.scrollY + 6) + 'px';
      opener = link;
      link.setAttribute('aria-expanded', 'true');
      menu.querySelector('.mail-menu-item').focus();
    }

    document.addEventListener('click', function (e) {
      var link = e.target.closest && e.target.closest('a[href^="mailto:"]');
      if (link && !link.classList.contains('mail-menu-item') && fine && fine.matches) {
        e.preventDefault();
        var same = opener === link;
        close(false);
        if (!same) open(link);
        return;
      }
      if (menu && !menu.contains(e.target)) close(false);
    });
    document.addEventListener('keydown', function (e) {
      if (!menu) return;
      if (e.key === 'Escape') { close(true); return; }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        var list = Array.prototype.slice.call(menu.querySelectorAll('.mail-menu-item'));
        var i = list.indexOf(document.activeElement);
        list[(i + (e.key === 'ArrowDown' ? 1 : list.length - 1)) % list.length].focus();
        e.preventDefault();
      }
    });
    window.addEventListener('resize', function () { close(false); });
  })();

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
