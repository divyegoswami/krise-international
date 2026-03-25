const navLinks = [
  { href: 'index.html', label: 'Home' },
  { href: 'products.html', label: 'Products' },
  { href: 'about.html', label: 'Company' },
  { href: 'contact.html', label: 'Contact' }
];

const productPages = new Set([
  'products.html',
  'injection-moulding.html',
  'polymers.html',
  'rubber-products.html',
  'moulds.html',
  'sheet-metal-tools.html'
]);

function injectHeader() {
  const headerHost = document.querySelector('[data-include="header"]');
  if (!headerHost) return;

  const navItems = navLinks
    .map((link) => `<a href="${link.href}" data-nav="${link.href}">${link.label}</a>`)
    .join('');

  headerHost.classList.add('site-header');
  headerHost.innerHTML = `
    <div class="nav-wrap">
      <a class="brand" href="index.html" aria-label="Krise International Home">
        <img
          class="brand-logo"
          src="logo.png"
          alt="Krise International logo"
          width="44"
          height="44"
          loading="eager"
          decoding="async"
        >
        <span class="brand-text">
          <strong>Krise International</strong>
          <span>Industrial Trading Partner</span>
        </span>
      </a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="Toggle menu">
        <i data-lucide="menu"></i>
      </button>
      <nav id="primary-nav" class="primary-nav" aria-label="Primary navigation">
        ${navItems}
        <a href="contact.html#inquiry" class="btn btn-primary btn-nav">Get a Quote</a>
      </nav>
    </div>
  `;
}

function injectFooter() {
  const footerHost = document.querySelector('[data-include="footer"]');
  if (!footerHost) return;

  footerHost.classList.add('site-footer');
  footerHost.innerHTML = `
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="footer-brand-head">
          <img class="footer-logo" src="logo.png" alt="Krise International logo" width="48" height="48" loading="lazy" decoding="async">
          <strong>Krise International</strong>
        </div>
        <p>New Delhi-based global trading company specializing in industrial machinery, polymers, rubber products, moulds, and sheet metal tools.</p>
        <a href="mailto:sales@kriseinternational.com">sales@kriseinternational.com</a>
      </div>
      <div class="footer-col">
        <h4>Quick Links</h4>
        <a href="index.html">Home</a>
        <a href="products.html">Products</a>
        <a href="about.html">Company Profile</a>
        <a href="contact.html">Contact</a>
      </div>
      <div class="footer-col">
        <h4>Core Strengths</h4>
        <span>20+ years industrial expertise</span>
        <span>Worldwide supply network</span>
        <span>Quality-compliant sourcing</span>
        <span>Responsive technical support</span>
      </div>
    </div>
    <div class="footer-bottom">© 2026 Krise International. All rights reserved.</div>
  `;
}

function setActiveLink() {
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';

  const navMapTarget = productPages.has(currentFile) ? 'products.html' : currentFile;
  const activeLink = document.querySelector(`.primary-nav a[data-nav="${navMapTarget}"]`);

  if (activeLink) {
    activeLink.classList.add('active');
    activeLink.setAttribute('aria-current', 'page');
  }
}

function setupMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.primary-nav');
  if (!toggle || !nav) return;

  const closeMenu = () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '<i data-lucide="menu"></i>';
    if (window.lucide) window.lucide.createIcons();
  };

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.innerHTML = isOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
    if (window.lucide) window.lucide.createIcons();
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 1024) closeMenu();
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) closeMenu();
  });
}

function initRevealAnimations() {
  const revealItems = document.querySelectorAll('.reveal');
  if (!revealItems.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
      rootMargin: '0px 0px -30px 0px'
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}

document.addEventListener('DOMContentLoaded', () => {
  injectHeader();
  injectFooter();
  setActiveLink();
  setupMobileNav();
  initRevealAnimations();

  if (window.lucide) {
    window.lucide.createIcons();
  }
});
