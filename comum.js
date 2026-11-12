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
    suporte: C.suporte || 'suporte@whalead.com.br',
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

  /* ---- a faixa que aparece quando a visita vem da extensão ---- */
  var p = new URLSearchParams(location.search);
  if (p.get('origem') === 'extensao' || p.get('source') === 'extension') {
    var ctx = document.getElementById('context');
    if (ctx) ctx.classList.add('visible');
  }
})();
