/* ============================================================
   O comportamento compartilhado por todas as páginas.
   ============================================================ */
(function () {
  var C = window.WHALEAD_CONFIG || {};
  var parcelado = C.precoParcela
    ? C.parcelas + 'x de ' + C.precoParcela + ' sem juros'
    : 'em até ' + (C.parcelas || 12) + 'x no cartão';

  /* ---- preenche os textos que vêm da configuração ---- */
  var textos = {
    preco: C.preco,
    parcelas: String(C.parcelas || 12),
    parcelado: parcelado,
    precoCompleto: C.preco + ' à vista, ou ' + parcelado,
    garantia: String(C.garantiaDias || 7),
    suporte: C.suporte || 'whalead.crm@gmail.com',
    ano: String(new Date().getFullYear())
  };
  document.querySelectorAll('[data-t]').forEach(function (e) {
    var v = textos[e.getAttribute('data-t')];
    if (v !== undefined) e.textContent = v;
  });
  document.querySelectorAll('[data-suporte]').forEach(function (e) {
    e.setAttribute('href', 'mailto:' + textos.suporte);
    // data-suporte="texto" mantém o rótulo escrito no HTML;
    // vazio, o link mostra o e-mail que estiver no config.js
    if (e.getAttribute('data-suporte') !== 'texto') e.textContent = textos.suporte;
  });

  /* ---- para onde vai cada botão de comprar ----------------------------
     Com servidor configurado, o caminho passa pela conta: é assim que a
     liberação acontece sozinha. Sem servidor, vai direto ao checkout e
     a liberação fica manual.                                            */
  var destino = C.api ? 'criar-conta.html' : (C.checkoutUrl || '#');
  var externo = !C.api;
  document.querySelectorAll('[data-comprar]').forEach(function (a) {
    a.setAttribute('href', destino);
    if (externo) { a.setAttribute('target', '_blank'); a.setAttribute('rel', 'noopener'); }
  });

  /* quem já entrou não precisa ver "criar conta" */
  if (localStorage.getItem('wl_sessao')) {
    document.querySelectorAll('[data-sealogado]').forEach(function (e) {
      e.setAttribute('href', 'painel.html');
      if (e.hasAttribute('data-sealogado-txt'))
        e.textContent = e.getAttribute('data-sealogado-txt');
    });
  }

  /* ---- o botão de suporte, em todas as páginas -------------------------
     Nasce aqui em vez de estar colado em cada HTML: muda o e-mail no
     config.js e muda em todo lugar, sem reabrir sete arquivos.           */
  (function botaoDeSuporte() {
    if (document.querySelector('.wl-suporte')) return;

    var css = document.createElement('style');
    css.textContent =
      '.wl-suporte{position:fixed;right:20px;bottom:20px;z-index:60;display:flex;' +
      'align-items:center;gap:9px;background:#112b24;color:#fff;text-decoration:none;' +
      'font:650 13.5px/1 "DM Sans",system-ui,sans-serif;padding:13px 18px;border-radius:40px;' +
      'box-shadow:0 8px 24px rgba(17,43,36,.22);transition:background .18s,transform .18s,' +
      'box-shadow .18s;border:1px solid rgba(255,255,255,.08)}' +
      '.wl-suporte:hover{background:#17cb68;transform:translateY(-2px);' +
      'box-shadow:0 12px 28px rgba(23,203,104,.34)}' +
      '.wl-suporte svg{width:17px;height:17px;flex:none}' +
      '@media(max-width:700px){.wl-suporte{bottom:84px;right:14px;padding:12px 15px;' +
      'font-size:12.5px}}' +
      '@media print{.wl-suporte{display:none}}';
    document.head.appendChild(css);

    var a = document.createElement('a');
    a.className = 'wl-suporte';
    a.href = 'mailto:' + textos.suporte +
      '?subject=' + encodeURIComponent('Suporte WhaLead');
    a.title = 'Falar com o suporte: ' + textos.suporte;
    a.setAttribute('aria-label', 'Falar com o suporte');
    a.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-4.2-1L3 20l1.2-4.3A8.4 8.4 0 0 1 ' +
      '3 11.5 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5z"/></svg><span>Suporte</span>';
    document.body.appendChild(a);
  })();

  /* ---- a faixa que aparece quando a visita vem da extensão ---- */
  var p = new URLSearchParams(location.search);
  if (p.get('origem') === 'extensao' || p.get('source') === 'extension') {
    var ctx = document.getElementById('context');
    if (ctx) ctx.classList.add('visible');
  }
})();
