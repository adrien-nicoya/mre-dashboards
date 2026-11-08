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
  var css = document.createElement('style');
  css.textContent =
    '#mre-nav{position:sticky;top:0;z-index:9999;background:#0f172a;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}' +
    '#mre-nav .in{max-width:1200px;margin:0 auto;padding:0 16px;display:flex;align-items:center;gap:4px;height:46px;overflow-x:auto}' +
    '#mre-nav b{color:#fff;font-size:13px;font-weight:800;letter-spacing:.06em;margin-right:14px;white-space:nowrap}' +
    '#mre-nav a{color:#94a3b8;text-decoration:none;font-size:13.5px;font-weight:600;padding:6px 11px;border-radius:8px;white-space:nowrap}' +
    '#mre-nav a:hover{color:#fff;background:rgba(255,255,255,.06)}' +
    '#mre-nav a.on{color:#fff;background:rgba(59,130,246,.35)}' +
    '@media print{#mre-nav{display:none!important}}';
  document.head.appendChild(css);
  var nav = document.createElement('nav');
  nav.id = 'mre-nav';
  nav.innerHTML = '<div class="in"><b>MÉTHODE MRE</b>' + links.map(function (l) {
    return '<a href="' + l[0] + '"' + (active(l[0]) ? ' class="on"' : '') + '>' + l[1] + '</a>';
  }).join('') + '</div>';
  // Annule le padding du body pour que la barre occupe toute la largeur.
  var cs = getComputedStyle(document.body);
  var px = function (v) { return parseFloat(v) || 0; };
  nav.style.margin = '-' + px(cs.paddingTop) + 'px -' + px(cs.paddingRight) + 'px ' +
    (px(cs.paddingTop) ? px(cs.paddingTop) : 0) + 'px -' + px(cs.paddingLeft) + 'px';
  document.body.insertBefore(nav, document.body.firstChild);
})();
