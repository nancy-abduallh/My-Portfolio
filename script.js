/* ============================================================
   NANCY ABDULLAH FATHY — PORTFOLIO SCRIPT
   Language (EN/AR) · Formspree · Typing · Counters · Marquee ·
   Reveal · Project/gallery filters · Sidebar · Lightbox
   Needs translations.js (T, FORMSPREE_URL) loaded first.
   ============================================================ */

/* one extra string for the new "tech wordmarks" label */
Object.assign(T.en, { logos_label: 'Tech I build with' });
Object.assign(T.ar, { logos_label: 'التقنيات التي أعمل بها' });

/* ── STATE ─────────────────────────────────────────────────── */
let currentLang = localStorage.getItem('naf_lang') || 'en';
let typedIndex = 0, typedCharIdx = 0, typedDeleting = false;
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── LANGUAGE ──────────────────────────────────────────────── */
function applyLang(lang) {
  currentLang = lang;
  const t = T[lang];
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  localStorage.setItem('naf_lang', lang);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.textContent = t[key];
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (t[key] !== undefined) el.placeholder = t[key];
  });
  rebuildSelects(lang);
  document.title = lang === 'ar'
    ? 'نانسي عبدالله فتحي | مطورة TypeScript · Next.js'
    : 'Nancy Abdullah Fathy | TypeScript · Next.js Developer';
}

function rebuildSelects(lang) {
  const t = T[lang];
  const ptSel = document.getElementById('selectProjectType');
  const bdSel = document.getElementById('selectBudget');
  if (ptSel) {
    ptSel.innerHTML = `
      <option value="">${t.pt_placeholder}</option>
      <option value="landing">${t.pt_landing}</option>
      <option value="ecomm">${t.pt_ecomm}</option>
      <option value="webapp">${t.pt_webapp}</option>
      <option value="corp">${t.pt_corp}</option>
      <option value="api">${t.pt_api}</option>
      <option value="cms">${t.pt_cms}</option>
      <option value="dash">${t.pt_dash}</option>
      <option value="redesign">${t.pt_redesign}</option>
      <option value="portfolio">${t.pt_portfolio}</option>
      <option value="custom">${t.pt_custom}</option>`;
  }
  if (bdSel) {
    bdSel.innerHTML = `
      <option value="">${t.bd_placeholder}</option>
      <option value="under2k">${t.bd_1}</option>
      <option value="2k-5k">${t.bd_2}</option>
      <option value="5k-10k">${t.bd_3}</option>
      <option value="10k-20k">${t.bd_4}</option>
      <option value="20k-50k">${t.bd_5}</option>
      <option value="over50k">${t.bd_6}</option>
      <option value="open">${t.bd_7}</option>`;
  }
}

/* ── SCROLL EFFECTS (nav, progress, floating buttons, active link) ── */
(function initScroll() {
  const nav = document.getElementById('navbar');
  const backTop = document.getElementById('backTop');
  const waBtn = document.getElementById('waBtn');
  const prog = document.getElementById('scrollProgress');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, .sidebar-nav a');

  function onScroll() {
    const sy = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    if (prog) prog.style.width = (docH > 0 ? (sy / docH) * 100 : 0) + '%';
    if (nav) nav.classList.toggle('scrolled', sy > 40);
    const show = sy > 500;
    if (backTop) backTop.classList.toggle('show', show);
    if (waBtn) waBtn.classList.toggle('show', show);
    let cur = '';
    sections.forEach(s => { if (sy >= s.offsetTop - 260) cur = s.id; });
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ── STAGGERED REVEAL ──────────────────────────────────────── */
(function initReveal() {
  const SEL = '[data-reveal],.reveal,.timeline-item,.project-card,.skill-card,.cert-item,.stat-item';
  const els = document.querySelectorAll(SEL);

  /* per-card stagger (--rd) inside grids */
  const stagger = (sel, step, mod) => document.querySelectorAll(sel).forEach(box => {
    [...box.children].forEach((el, i) => el.style.setProperty('--rd', (i % mod) * step + 'ms'));
  });
  stagger('.skills-grid', 90, 3);
  stagger('.projects-grid', 90, 2);
  stagger('.hero-stats', 80, 4);
  stagger('.cert-list', 70, 2);

  const show = el => {
    el.classList.add('in');
    el.querySelectorAll('.lang-fill').forEach(b => { b.style.width = b.dataset.w + '%'; });
    setTimeout(() => el.classList.add('done'), 1400); // drop the stagger delay so hovers feel instant
  };

  if (prefersReduced || !('IntersectionObserver' in window)) {
    els.forEach(show);
    return;
  }
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      show(e.target);
      o.unobserve(e.target);
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
  els.forEach(el => obs.observe(el));
})();

/* ── TYPING EFFECT ─────────────────────────────────────────── */
function initTyping() {
  const el = document.getElementById('typedRole');
  if (!el) return;
  (function type() {
    const roles = T[currentLang].hero_role_typed;
    if (typedIndex >= roles.length) typedIndex = 0;
    const current = roles[typedIndex];
    if (typedDeleting) {
      el.textContent = current.slice(0, --typedCharIdx);
      if (typedCharIdx <= 0) {
        typedDeleting = false;
        typedIndex = (typedIndex + 1) % roles.length;
        setTimeout(type, 400); return;
      }
    } else {
      el.textContent = current.slice(0, ++typedCharIdx);
      if (typedCharIdx === current.length) {
        typedDeleting = true;
        setTimeout(type, 2200); return;
      }
    }
    setTimeout(type, typedDeleting ? 55 : 80);
  })();
}

/* ── STAT COUNTERS ─────────────────────────────────────────── */
function initCounters() {
  document.querySelectorAll('.stat-num[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    if (prefersReduced) { el.textContent = target + suffix; return; }
    const dur = 1400;
    const start = performance.now();
    (function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  });
}

/* ── MARQUEE — duplicate the track for a seamless loop ─────── */
(function initMarquee() {
  const track = document.getElementById('marqueeTrack');
  if (track) track.innerHTML += track.innerHTML;
})();

/* ── SIDEBAR ───────────────────────────────────────────────── */
(function initSidebar() {
  const menuBtn = document.getElementById('menuBtn');
  const sidebar = document.getElementById('mobileSidebar');
  const closeBtn = document.getElementById('sidebarClose');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (!menuBtn || !sidebar || !closeBtn || !backdrop) return;

  const open = () => {
    sidebar.classList.add('open'); backdrop.classList.add('open');
    menuBtn.classList.add('active'); document.body.style.overflow = 'hidden';
    if (window.__lenis) window.__lenis.stop();
  };
  const close = () => {
    sidebar.classList.remove('open'); backdrop.classList.remove('open');
    menuBtn.classList.remove('active'); document.body.style.overflow = '';
    if (window.__lenis) window.__lenis.start();
  };
  menuBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  document.querySelectorAll('.sidebar-nav a').forEach(l => l.addEventListener('click', close));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();

/* ── MEDIA TABS ────────────────────────────────────────────── */
function swapMedia(btn, proj, type) {
  btn.closest('.mtabs').querySelectorAll('.mtab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(proj + '-img').classList.toggle('active', type === 'img');
  document.getElementById(proj + '-vid').classList.toggle('active', type === 'vid');
}

/* ── PROJECT FILTER ────────────────────────────────────────── */
function pFilter(btn, stack) {
  document.querySelectorAll('.pf-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.project-card').forEach(card => {
    const match = stack === 'all' || (card.dataset.stack || '').split(' ').includes(stack);
    card.classList.toggle('filter-hide', !match);
    if (match) {
      card.classList.remove('in', 'done');
      requestAnimationFrame(() => requestAnimationFrame(() => {
        card.classList.add('in');
        setTimeout(() => card.classList.add('done'), 1400);
      }));
    }
  });
}

/* ── GALLERY FILTER ────────────────────────────────────────── */
function gFilter(btn, type) {
  document.querySelectorAll('.gf-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.gi').forEach(item => {
    const show = type === 'all' || item.dataset.type === type;
    item.style.opacity = show ? '1' : '0.2';
    item.style.transform = show ? '' : 'scale(0.96)';
    item.style.pointerEvents = show ? '' : 'none';
  });
}

/* ── FORM SUBMISSION ───────────────────────────────────────── */
async function submitForm(event) {
  event.preventDefault();
  const btn = document.getElementById('sendBtn');
  const feedback = document.getElementById('formFeedback');
  const form = document.getElementById('contactForm');
  const t = T[currentLang];

  btn.classList.add('loading'); btn.disabled = true;
  feedback.className = 'form-feedback';

  const data = {
    name: form.querySelector('[name="name"]').value,
    email: form.querySelector('[name="email"]').value,
    project_type: form.querySelector('[name="project_type"]').value,
    budget: form.querySelector('[name="budget"]').value,
    subject: form.querySelector('[name="subject"]').value,
    message: form.querySelector('[name="message"]').value,
  };

  if (!data.name || !data.email || !data.message) {
    feedback.textContent = currentLang === 'ar'
      ? '✗ يرجى ملء الحقول المطلوبة (الاسم، البريد الإلكتروني، الرسالة).'
      : '✗ Please fill in required fields (name, email, message).';
    feedback.className = 'form-feedback error';
    btn.classList.remove('loading'); btn.disabled = false;
    return;
  }

  try {
    const res = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Server error');
    feedback.textContent = t.f_success;
    feedback.className = 'form-feedback success';
    form.reset();
    rebuildSelects(currentLang);
    setTimeout(() => { feedback.className = 'form-feedback'; }, 7000);
  } catch {
    feedback.textContent = t.f_error;
    feedback.className = 'form-feedback error';
  } finally {
    btn.classList.remove('loading'); btn.disabled = false;
  }
}

/* ── LIGHTBOX ──────────────────────────────────────────────── */
(function initLightbox() {
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  const lbCap = document.getElementById('lightboxCaption');
  if (!lb) return;

  document.querySelectorAll('.project-card img, .gi img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', e => {
      e.stopPropagation();
      lbImg.src = img.src;
      if (lbCap) lbCap.textContent = img.alt || '';
      lb.classList.add('show');
    });
  });
  document.getElementById('lightboxClose').addEventListener('click', () => lb.classList.remove('show'));
  lb.addEventListener('click', e => { if (e.target === lb) lb.classList.remove('show'); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') lb.classList.remove('show'); });
})();

/* ── INIT ──────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  applyLang(currentLang);

  const switchLang = () => {
    applyLang(currentLang === 'en' ? 'ar' : 'en');
    typedIndex = 0; typedCharIdx = 0; typedDeleting = false;
  };
  document.getElementById('langToggle').addEventListener('click', switchLang);
  document.getElementById('sidebarLangToggle')?.addEventListener('click', switchLang);

  document.getElementById('backTop').addEventListener('click', () => {
    if (window.__lenis) window.__lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  setTimeout(initTyping, 800);
  initCounters();

  document.querySelectorAll('img').forEach(img => {
    img.loading = 'lazy';
    img.addEventListener('error', function () {
      if (!this.src.includes('placeholder')) {
        this.src = 'https://via.placeholder.com/640x360/0c1226/5df0a8?text=' + encodeURIComponent(this.alt || 'Image');
      }
    });
  });
  document.querySelectorAll('video').forEach(vid => {
    vid.addEventListener('error', function () {
      const ph = document.createElement('div');
      ph.className = 'media-ph';
      ph.innerHTML = '<i class="fas fa-video"></i><p>Video unavailable</p>';
      this.parentElement.replaceChild(ph, this);
    });
  });
});