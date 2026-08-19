/* Room 32 — 共用導覽／頁尾注入 ＋ 繁中／英文切換
   - 想改導覽或頁尾文字：改下面 NAV / FOOTER 的模板字串
   - 想讓某段文字雙語：幫該元素加上 data-zh="..." data-en="..." */

const PAGES = {
  'index.html':       { zh: 'Room 32',                    en: 'Room 32' },
  'about.html':       { zh: '關於 Room 32',               en: 'About Room 32' },
  'exhibitions.html': { zh: '展覽與活動',                 en: 'Exhibitions & Events' },
  'works.html':       { zh: '作品／文字',                 en: 'Works & Writings' },
  'journal.html':     { zh: '影像日記',                   en: 'Journal' },
  'contact.html':     { zh: '聯絡',                       en: 'Contact' }
};

const NAV = `
<nav>
  <a class="brand" href="index.html">
    <img class="brand-logo" src="assets/img/logo.png" alt="Room 32">
    <span class="brand-name">ROOM 32</span>
    <span class="brand-sub" data-zh="三二" data-en="San Er"></span>
  </a>
  <div class="nav-links">
    <a href="index.html"   data-zh="首頁" data-en="Home"></a>
    <a href="about.html"   data-zh="關於" data-en="About"></a>
    <a href="exhibitions.html" data-zh="展覽／活動" data-en="Exhibitions"></a>
    <a href="works.html"   data-zh="作品／文字" data-en="Works"></a>
    <a href="journal.html" data-zh="日記" data-en="Journal"></a>
    <a href="contact.html" data-zh="聯絡" data-en="Contact"></a>
    <button id="lang-toggle" type="button" aria-label="Switch language"></button>
  </div>
</nav>`;

const FOOTER = `
<div class="footer-grid">
  <div>
    <div class="footer-brand">ROOM 32</div>
    <div data-zh="一個流動的獨立空間" data-en="A nomadic independent space"></div>
  </div>
  <div>
    <div data-zh="香港 · 岡山 · 長沙" data-en="Hong Kong · Okayama · Changsha"></div>
    <div>&copy; 2025 ROOM 32</div>
  </div>
</div>`;

function currentPage() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  return PAGES[path] ? path : 'index.html';
}

function injectChrome() {
  const header = document.getElementById('site-header');
  const footer = document.getElementById('site-footer');
  if (header) header.innerHTML = NAV;
  if (footer) footer.innerHTML = FOOTER;

  const page = currentPage();
  document.querySelectorAll('.nav-links a').forEach((a) => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  document.getElementById('lang-toggle').addEventListener('click', () => {
    applyLang(lang === 'en' ? 'zh' : 'en');
  });
}

function applyLang(l) {
  lang = l;
  localStorage.setItem('room32-lang', l);
  document.documentElement.lang = l === 'en' ? 'en' : 'zh-Hant';

  document.querySelectorAll('[data-en],[data-zh]').forEach((el) => {
    const text = l === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-zh');
    if (text !== null) el.textContent = text;
  });

  const page = currentPage();
  const title = PAGES[page][l];
  if (title) document.title = title + ' — Room 32';

  const btn = document.getElementById('lang-toggle');
  if (btn) btn.textContent = l === 'en' ? '中' : 'EN';
}

let lang = localStorage.getItem('room32-lang') || 'zh';

injectChrome();
applyLang(lang);
