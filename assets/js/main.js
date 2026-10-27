/* ==========================================================================
   main.js — Estrutura Engenharia
   Header, menu mobile, reveal on scroll, filtros, contadores, formulário
   ========================================================================== */
(function () {
  'use strict';

  var doc = document;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------
     1. Header: estado "stuck" + cores sobre hero escuro
  --------------------------------------------------------------- */
  var header = doc.querySelector('.site-header');
  var hero = doc.querySelector('.hero');

  function onScrollHeader() {
    if (!header) return;
    var scrolled = window.scrollY > 24;
    header.classList.toggle('is-stuck', scrolled);
    if (header.classList.contains('site-header--over-dark')) {
      var heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;
      header.classList.toggle('is-stuck', heroBottom < header.offsetHeight - 8);
    }
  }
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------------------------------------------------------------
     2. Menu mobile
  --------------------------------------------------------------- */
  var toggle = doc.querySelector('.nav-toggle');
  var nav = doc.getElementById('primary-nav');

  function closeNav() {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    doc.body.style.overflow = '';
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
      doc.body.style.overflow = !open ? 'hidden' : '';
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });

    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 980) closeNav();
    });
  }

  /* ---------------------------------------------------------------
     3. Reveal on scroll
  --------------------------------------------------------------- */
  var revealEls = doc.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------------------------------------------------------------
     4. Link ativo na navegação conforme seção visível
  --------------------------------------------------------------- */
  var sections = doc.querySelectorAll('main section[id]');
  var navLinks = doc.querySelectorAll('.nav__link[href^="#"]');

  if ('IntersectionObserver' in window && sections.length && navLinks.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = '#' + entry.target.id;
        navLinks.forEach(function (link) {
          link.classList.toggle('is-active', link.getAttribute('href') === id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------------------------------------------------------------
     5. Filtros de projetos
  --------------------------------------------------------------- */
  var filterBtns = doc.querySelectorAll('.filter-btn');
  var projects = doc.querySelectorAll('.project');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.dataset.filter;

      filterBtns.forEach(function (b) {
        var active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', String(active));
      });

      projects.forEach(function (p) {
        var match = filter === 'all' || p.dataset.category === filter;
        p.classList.toggle('is-hidden', !match);
      });
    });
  });

  /* ---------------------------------------------------------------
     6. Contadores animados
  --------------------------------------------------------------- */
  var counters = doc.querySelectorAll('[data-count]');

  function animateCount(el) {
    var target = parseFloat(el.dataset.count);
    var decimals = (el.dataset.count.split('.')[1] || '').length;
    var duration = 1400;
    var start = null;

    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = target * eased;
      el.textContent = value.toFixed(decimals);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toFixed(decimals);
    }
    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window && !reduceMotion && counters.length) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          co.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { co.observe(c); });
  }

  /* ---------------------------------------------------------------
     7. Formulário de contato (validação + feedback local)
  --------------------------------------------------------------- */
  var form = doc.getElementById('contact-form');
  var feedback = doc.getElementById('form-feedback');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var btn = form.querySelector('button[type="submit"]');
      var label = btn.querySelector('span');
      var original = label ? label.textContent : '';

      if (btn) btn.disabled = true;
      if (label) label.textContent = 'Enviando...';

      window.setTimeout(function () {
        if (btn) btn.disabled = false;
        if (label) label.textContent = original;
        form.reset();

        if (feedback) {
          feedback.classList.add('is-shown');
          feedback.setAttribute('role', 'status');
          feedback.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' });
        }
      }, 900);
    });
  }

  /* ---------------------------------------------------------------
     8. Botão voltar ao topo
  --------------------------------------------------------------- */
  var toTop = doc.querySelector('.to-top');

  if (toTop) {
    window.addEventListener('scroll', function () {
      toTop.classList.toggle('is-shown', window.scrollY > 700);
    }, { passive: true });

    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------------------------------------------------------------
     9. Ano atual no rodapé
  --------------------------------------------------------------- */
  var yearEl = doc.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
