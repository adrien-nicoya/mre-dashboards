// Barre de navigation commune aux dashboards MRE (injectée sur toutes les pages).
(function () {
  if (window.self !== window.top || document.getElementById('mre-nav')) return;
  var links = [
    ['/', 'Accueil'],
    ['/acquisition/', 'Acquisition'],
    ['/rapports/', 'Rapports post-live'],
    ['/bilans/mre5/', 'Bilans'],
  ];
  var p = location.pathname;
  var active = function (href) {
    if (href === '/') return p === '/' || p === '/index.html';
    if (href === '/bilans/mre5/') return p.indexOf('/bilans/') === 0;
    return p.indexOf(href) === 0;
  };
  if (!document.getElementById('mre-font')) {
    var f = document.createElement('link');
    f.id = 'mre-font'; f.rel = 'stylesheet';
    f.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&display=swap';
    document.head.appendChild(f);
  }
  var css = document.createElement('style');
  css.textContent =
    '#mre-nav{position:sticky;top:0;z-index:9999;background:#fff;border-bottom:1px solid #e8eaf3;box-shadow:0 1px 8px rgba(29,39,78,.05);font-family:Poppins,-apple-system,"Segoe UI",Roboto,sans-serif}' +
    '#mre-nav:before{content:"";display:block;height:3px;background:linear-gradient(90deg,#015dc7,#a200ff)}' +
    '#mre-nav .in{max-width:1200px;margin:0 auto;padding:0 16px;display:flex;align-items:center;gap:6px;height:58px;overflow-x:auto}' +
    '#mre-nav .lg{display:flex;align-items:center;margin-right:18px;flex:0 0 auto;text-decoration:none;padding:0;background:none}' +
    '#mre-nav .lg img{height:40px;width:auto;display:block}' +
    '#mre-nav a.l{color:#747da1;text-decoration:none;font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;padding:8px 12px;border-radius:8px;white-space:nowrap}' +
    '#mre-nav a.l:hover{color:#1d274e;background:#f3f3ff}' +
    '#mre-nav a.l.on{color:#015dc7;background:#f3f3ff}' +
    '@media print{#mre-nav{display:none!important}}';
  document.head.appendChild(css);
  var nav = document.createElement('nav');
  nav.id = 'mre-nav';
  nav.innerHTML = '<div class="in"><a class="lg" href="/" aria-label="Accueil"><img src="/logo-sa.png" alt="Sébastien Ascon"></a>' + links.map(function (l) {
    return '<a class="l' + (active(l[0]) ? ' on' : '') + '" href="' + l[0] + '">' + l[1] + '</a>';
  }).join('') + '</div>';
  // Annule le padding du body pour que la barre occupe toute la largeur.
  var cs = getComputedStyle(document.body);
  var px = function (v) { return parseFloat(v) || 0; };
  nav.style.margin = '-' + px(cs.paddingTop) + 'px -' + px(cs.paddingRight) + 'px ' +
    (px(cs.paddingTop) ? px(cs.paddingTop) : 0) + 'px -' + px(cs.paddingLeft) + 'px';
  document.body.insertBefore(nav, document.body.firstChild);
})();
