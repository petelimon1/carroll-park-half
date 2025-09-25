// Inject shared nav and wire up behavior
(async () => {
  try {
    const res = await fetch('nav.html', { cache: 'no-cache' });
    const html = await res.text();

    const mount = document.createElement('div');
    mount.id = 'nav-container';
    mount.innerHTML = html;

    // Insert at the top of <body>
    document.body.prepend(mount);

    // Mark current page active
    const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('.nav-list a, .drawer a').forEach(a => {
      const href = (a.getAttribute('href') || '').toLowerCase();
      if (href === current || (current === 'index.html' && (href === '' || href === './'))) {
        a.setAttribute('aria-current', 'page');
      }
    });

    // Drawer logic
    const btn = document.querySelector('.hamburger');
    const drawer = document.getElementById('mobile-drawer');
    const scrim = document.getElementById('scrim');
    const openDrawer = (open) => {
      btn.classList.toggle('open', open);
      drawer.classList.toggle('open', open);
      scrim.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
      drawer.hidden = !open;
      scrim.hidden = !open;
    };
    btn.addEventListener('click', () => openDrawer(!btn.classList.contains('open')));
    scrim.addEventListener('click', () => openDrawer(false));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') openDrawer(false); });
  } catch (e) {
    console.error('Nav load failed', e);
  }
})();
