// ── CURSOR ──
const dot = document.getElementById('cur-dot'), ring = document.getElementById('cur-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx + 'px'; dot.style.top = my + 'px';
});
(function raf() {
  rx += (mx - rx) * .1; ry += (my - ry) * .1;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(raf);
})();

// ── NAV + PROGRESS BAR ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('stuck', scrollY > 60);
  document.getElementById('bar').style.width =
    (scrollY / (document.documentElement.scrollHeight - innerHeight) * 100) + '%';
});

// ── REVEAL ON SCROLL ──
const obs = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
}), { threshold: .06 });
document.querySelectorAll('.rev').forEach(el => obs.observe(el));

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// ── HERO PARALLAX ──
window.addEventListener('scroll', () => {
  const el = document.querySelector('.hero-svg');
  if (el) el.style.transform = `translateY(${scrollY * .3}px)`;
});

// ── NOISE CANVAS ──
(function () {
  const c = document.getElementById('noise');
  const ctx = c.getContext('2d');
  let W, H;
  function rsz() { W = c.width = innerWidth; H = c.height = innerHeight; }
  window.addEventListener('resize', rsz); rsz();
  function n() {
    const d = ctx.createImageData(W, H); const dt = d.data;
    for (let i = 0; i < dt.length; i += 4) {
      const v = Math.random() * 255 | 0;
      dt[i] = dt[i + 1] = dt[i + 2] = v; dt[i + 3] = 255;
    }
    ctx.putImageData(d, 0, 0); requestAnimationFrame(n);
  }
  n();
})();

// ══════════════════════════════════════════
// LANGUAGE SYSTEM
// ══════════════════════════════════════════
let currentLang = 'en';

function setLang(lang) {
  currentLang = lang;
  document.body.classList.toggle('ar', lang === 'ar');
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  // Update all data-en / data-ar elements
  document.querySelectorAll('[data-en]').forEach(el => {
    const txt = el.getAttribute('data-' + lang);
    if (txt) el.textContent = txt;
  });

  // Update active lang button
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.trim().toLowerCase() === lang ||
      (lang === 'ar' && btn.textContent.trim() === 'عر'));
  });

  // Re-render dynamic content in new language
  renderSkyGrids();
}

// ══════════════════════════════════════════
// VIDEO SECTION — Local files from videos/
// ══════════════════════════════════════════
const videoData = [
  {
    file: 'videos/video1.mp4',
    tagEn: 'Featured', tagAr: 'مميز',
    titleEn: 'Knight Realistic Pro v1.4 — Full Showcase',
    titleAr: 'Knight Realistic Pro v1.4 — العرض الكامل',
    descEn: 'The complete cinematic showcase of all v1.4 features. Recorded at 4K with zero post-processing.',
    descAr: 'العرض السينمائي الكامل لجميع مميزات v1.4. مسجّل بدقة 4K بدون أي معالجة بعدية.',
    featured: true
  },
  {
    file: 'videos/video2.mp4',
    tagEn: 'Skydoom', tagAr: 'سكاي',
    titleEn: 'Skydoom — Golden Hour & Midnight Storm',
    titleAr: 'Skydoom — الساعة الذهبية وعاصفة منتصف الليل',
    descEn: 'Two new sky modes: cinematic golden hour warmth and dramatic midnight storm with volumetric lightning.',
    descAr: 'وضعان جديدان للسماء: دفء الساعة الذهبية السينمائي وعاصفة منتصف الليل الدرامية.',
    featured: false
  },
  {
    file: 'videos/video3.mp4',
    tagEn: 'SkinSRP', tagAr: 'سكن',
    titleEn: 'SkinSRP v1.4 — All 5 Skin Variants',
    titleAr: 'SkinSRP v1.4 — جميع الـ 5 خيارات',
    descEn: 'Comparison of all five SkinSRP variants from the original to the new red and pink tree palettes.',
    descAr: 'مقارنة بين جميع خيارات SkinSRP الخمسة من الأصلي إلى لوحات الأشجار الحمراء والوردية الجديدة.',
    featured: false
  }
];

function buildVideoGrid() {
  const grid = document.getElementById('videoGrid');
  if (!grid) return;
  grid.innerHTML = '';
  videoData.forEach((v, i) => {
    const card = document.createElement('div');
    card.className = 'yt-card' + (v.featured ? ' featured' : '');
    card.innerHTML = `
      <div class="yt-thumb">
        <video preload="none" poster="" id="vid-${i}">
          <source src="${v.file}" type="video/mp4">
        </video>
        <div class="yt-play-overlay" onclick="playVideo(${i}, this)">
          <div class="yt-play-btn">
            <svg width="16" height="18" viewBox="0 0 16 18" fill="white"><polygon points="1,1 15,9 1,17"/></svg>
          </div>
        </div>
      </div>
      <div class="yt-body">
        <div class="yt-tag" data-en="${v.tagEn}" data-ar="${v.tagAr}">${currentLang === 'ar' ? v.tagAr : v.tagEn}</div>
        <div class="yt-title" data-en="${v.titleEn}" data-ar="${v.titleAr}">${currentLang === 'ar' ? v.titleAr : v.titleEn}</div>
        <div class="yt-desc" data-en="${v.descEn}" data-ar="${v.descAr}">${currentLang === 'ar' ? v.descAr : v.descEn}</div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function playVideo(idx, overlay) {
  const vid = document.getElementById('vid-' + idx);
  if (!vid) return;
  overlay.style.opacity = '0';
  overlay.style.pointerEvents = 'none';
  vid.controls = true;
  vid.play();
}

// ══════════════════════════════════════════
// SKIN GALLERY
// ══════════════════════════════════════════
const skinData = {
  v12: { count: 6, prefix: 'assets/images/skins v1.2_' },
  v13: { count: 6, prefix: 'assets/images/skins v1.3_' },
  v14: { count: 6, prefix: 'assets/images/skins v1.4_' },
  red: { count: 6, prefix: 'assets/images/skins red_' }
};

function buildSkinGalleries() {
  Object.entries(skinData).forEach(([key, data]) => {
    const gallery = document.getElementById('gallery-' + key);
    if (!gallery) return;
    gallery.innerHTML = '';
    for (let i = 1; i <= data.count; i++) {
      const slot = document.createElement('div');
      slot.className = 'skin-slot';
      slot.innerHTML = `
        <img src="${data.prefix}${i}.jpg" alt="Skin ${key} ${i}" 
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <div class="skin-slot-ph" style="display:none">
          <span class="skin-ph-num">0${i}</span>
          <span class="skin-ph-lbl">Screenshot ${i}</span>
        </div>
        <div class="skin-slot-overlay"></div>
        <div class="skin-slot-num">0${i} / 0${data.count}</div>
      `;
      gallery.appendChild(slot);
    }
  });
}

function switchSkin(id, btn) {
  document.querySelectorAll('.stab').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  document.querySelectorAll('.skin-panel').forEach(p => { p.classList.remove('on'); });
  const panel = document.getElementById('sp-' + id);
  if (panel) panel.classList.add('on');
}

// ══════════════════════════════════════════
// SKYDOOM — before/after toggle per slot
// ══════════════════════════════════════════
// sky/morning: sky112, sky112d, sky212, sky212d, sky312, sky312d, sky412, sky412d
// sky/afternoon: sky116, sky116d, sky216, sky216d, sky316, sky316d, sky416, sky416d
// sky/night: sky121, sky121d, sky221, sky221d, sky321, sky321d, sky421, sky421d

const skyFiles = {
  morning: [
    { mod: 'sky/morning/sky112.jpg', def: 'sky/morning/sky112d.jpg' },
    { mod: 'sky/morning/sky212.jpg', def: 'sky/morning/sky212d.jpg' },
    { mod: 'sky/morning/sky312.jpg', def: 'sky/morning/sky312d.jpg' },
    { mod: 'sky/morning/sky412.jpg', def: 'sky/morning/sky412d.jpg' }
  ],
  afternoon: [
    { mod: 'sky/afternoon/sky116.jpg', def: 'sky/afternoon/sky116d.jpg' },
    { mod: 'sky/afternoon/sky216.jpg', def: 'sky/afternoon/sky216d.jpg' },
    { mod: 'sky/afternoon/sky316.jpg', def: 'sky/afternoon/sky316d.jpg' },
    { mod: 'sky/afternoon/sky416.jpg', def: 'sky/afternoon/sky416d.jpg' }
  ],
  night: [
    { mod: 'sky/night/sky121.jpg', def: 'sky/night/sky121d.jpg' },
    { mod: 'sky/night/sky221.jpg', def: 'sky/night/sky221d.jpg' },
    { mod: 'sky/night/sky321.jpg', def: 'sky/night/sky321d.jpg' },
    { mod: 'sky/night/sky421.jpg', def: 'sky/night/sky421d.jpg' }
  ]
};

function renderSkyGrids() {
  Object.entries(skyFiles).forEach(([time, pairs]) => {
    const grid = document.getElementById('sky-grid-' + time);
    if (!grid) return;
    grid.innerHTML = '';
    pairs.forEach((pair, i) => {
      // Each pair makes 2 slots: before (default) + after (mod)
      ['def', 'mod'].forEach(type => {
        const slot = document.createElement('div');
        slot.className = 'sky-slot';
        const isAfter = type === 'mod';
        const imgSrc = isAfter ? pair.mod : pair.def;
        const beforeTxt = currentLang === 'ar' ? 'قبل' : 'Before';
        const afterTxt = currentLang === 'ar' ? 'بعد' : 'After';
        const showAfterTxt = currentLang === 'ar' ? 'عرض البعد' : 'Show After';
        const showBeforeTxt = currentLang === 'ar' ? 'عرض القبل' : 'Show Before';
        slot.innerHTML = `
          <div class="sky-slot-img-wrap" 
               data-before="${pair.def}" 
               data-after="${pair.mod}"
               data-state="${type}">
            <img src="${imgSrc}" alt="${isAfter ? 'With Mod' : 'Default'} ${i + 1}"
              onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
            <div class="sky-slot-ph" style="display:none">${isAfter ? (currentLang === 'ar' ? 'مع الموديف' : 'With Mod') : (currentLang === 'ar' ? 'بدون موديف' : 'Default')} ${i + 1}</div>
            <span class="sky-label ${isAfter ? 'a' : 'b'}">${isAfter ? afterTxt : beforeTxt}</span>
          </div>
          <button class="sky-toggle" onclick="toggleSkySlot(this)" data-state="${type}">
            ⇄ ${isAfter ? showBeforeTxt : showAfterTxt}
          </button>
        `;
        grid.appendChild(slot);
      });
    });
  });
}

function toggleSkySlot(btn) {
  const slot = btn.closest('.sky-slot');
  const wrap = slot.querySelector('.sky-slot-img-wrap');
  const img = wrap.querySelector('img');
  const label = wrap.querySelector('.sky-label');
  const before = wrap.dataset.before;
  const after = wrap.dataset.after;
  const state = wrap.dataset.state;
  const isAr = currentLang === 'ar';

  if (state === 'def') {
    img.src = after;
    wrap.dataset.state = 'mod';
    label.className = 'sky-label a';
    label.textContent = isAr ? 'بعد' : 'After';
    btn.innerHTML = `⇄ ${isAr ? 'عرض القبل' : 'Show Before'}`;
    btn.dataset.state = 'mod';
  } else {
    img.src = before;
    wrap.dataset.state = 'def';
    label.className = 'sky-label b';
    label.textContent = isAr ? 'قبل' : 'Before';
    btn.innerHTML = `⇄ ${isAr ? 'عرض البعد' : 'Show After'}`;
    btn.dataset.state = 'def';
  }
}

function switchSky(id, btn) {
  document.querySelectorAll('.sdtab').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  document.querySelectorAll('.sd-panel').forEach(p => p.classList.remove('on'));
  document.getElementById('sky-' + id).classList.add('on');
}

// ══════════════════════════════════════════
// FILTER BEFORE/AFTER TOGGLE
// ══════════════════════════════════════════
function toggleFilterCell(btn) {
  const cell = btn.closest('.filter-cell');
  const img = cell.querySelector('.fcell-img');
  const label = cell.querySelector('.fcell-label');
  const before = cell.dataset.before;
  const after = cell.dataset.after;
  const state = btn.dataset.state;
  const isAr = currentLang === 'ar';

  if (state === 'before') {
    img.src = after;
    img.alt = 'After';
    label.textContent = isAr ? 'بعد' : 'After';
    label.className = 'fcell-label after-label';
    btn.dataset.state = 'after';
    btn.innerHTML = `<span class="toggle-icon">⇄</span><span>${isAr ? 'عرض القبل' : 'Show Before'}</span>`;
  } else {
    img.src = before;
    img.alt = 'Before';
    label.textContent = isAr ? 'قبل' : 'Before';
    label.className = 'fcell-label before-label';
    btn.dataset.state = 'before';
    btn.innerHTML = `<span class="toggle-icon">⇄</span><span>${isAr ? 'عرض البعد' : 'Show After'}</span>`;
  }
}

function switchFilter(id, btn) {
  document.querySelectorAll('.ftab').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  document.querySelectorAll('.filter-panel').forEach(p => p.style.display = 'none');
  document.getElementById('fp-' + id).style.display = 'block';
}

// ══════════════════════════════════════════
// UPDATES TABS
// ══════════════════════════════════════════
function switchUpd(id, btn) {
  document.querySelectorAll('.upd-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.upd-content').forEach(c => c.classList.remove('active'));
  document.getElementById('uc-' + id).classList.add('active');
}

// ══════════════════════════════════════════
// INIT
// ══════════════════════════════════════════
window.addEventListener('DOMContentLoaded', () => {
  buildVideoGrid();
  buildSkinGalleries();
  renderSkyGrids();
});