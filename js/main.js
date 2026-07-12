/* ===========================================================
   LEUN INTERIORISMO — main.js  (Vanilla JS, sin dependencias)
   =========================================================== */
(function () {
  'use strict';

  /* --- Nav: estado al hacer scroll --- */
  var nav = document.getElementById('nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 40); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --- Menú móvil --- */
  var burger = document.getElementById('burger');
  var links = document.getElementById('navLinks');
  if (burger && links) {
    var toggle = function (open) {
      burger.classList.toggle('open', open);
      links.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    burger.addEventListener('click', function () { toggle(!links.classList.contains('open')); });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { toggle(false); });
    });
  }

  /* --- Reveal al hacer scroll --- */
  var reveal = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveal.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.14 });
    reveal.forEach(function (el) { io.observe(el); });
  } else {
    reveal.forEach(function (el) { el.classList.add('in'); });
  }

  /* --- Scroll horizontal con rueda (desktop) en carruseles --- */
  document.querySelectorAll('.coll-track, .show-track').forEach(function (track) {
    track.addEventListener('wheel', function (e) {
      if (window.innerWidth > 860 && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        track.scrollLeft += e.deltaY; e.preventDefault();
      }
    }, { passive: false });
  });

  /* --- Componente Antes / Después --- */
  document.querySelectorAll('.ba').forEach(function (ba) {
    var set = function (p) {
      p = Math.max(0, Math.min(100, p));
      ba.style.setProperty('--p', p);
      ba.setAttribute('aria-valuenow', Math.round(p));
    };
    var fromEvent = function (clientX) {
      var r = ba.getBoundingClientRect();
      set(((clientX - r.left) / r.width) * 100);
    };
    var dragging = false;
    ba.addEventListener('pointerdown', function (e) {
      dragging = true; ba.setPointerCapture(e.pointerId); fromEvent(e.clientX);
    });
    ba.addEventListener('pointermove', function (e) { if (dragging) fromEvent(e.clientX); });
    ba.addEventListener('pointerup', function () { dragging = false; });
    ba.addEventListener('pointercancel', function () { dragging = false; });
    // Teclado (accesibilidad)
    ba.addEventListener('keydown', function (e) {
      var cur = parseFloat(getComputedStyle(ba).getPropertyValue('--p')) || 50;
      if (e.key === 'ArrowLeft') { set(cur - 4); e.preventDefault(); }
      if (e.key === 'ArrowRight') { set(cur + 4); e.preventDefault(); }
      if (e.key === 'Home') { set(0); e.preventDefault(); }
      if (e.key === 'End') { set(100); e.preventDefault(); }
    });
    set(50);
  });

  /* --- Año dinámico en el footer --- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
