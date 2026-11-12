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
     Antes era um link mailto: direto, e isso falha calado em três
     situações comuns: computador sem programa de e-mail configurado,
     celular sem conta de e-mail, e páginas abertas dentro de outra
     (pré-visualizações). A pessoa clica e NADA acontece.

     Agora o botão abre um cartãozinho com três saídas. Se uma não
     funcionar na máquina dela, as outras funcionam.                      */
  (function botaoDeSuporte() {
    if (document.querySelector('.wl-suporte')) return;
    var email = textos.suporte;
    var assunto = 'Suporte WhaLead';
    var zap = String(C.whatsapp || '').replace(/\D+/g, '');

    /* O CSS abaixo é blindado de propósito: a classe vem dobrada
       (.wl-suporte.wl-suporte) e todas as medidas estão escritas, mesmo as
       óbvias. Motivo: o conta.css tem uma regra `button{width:100%}` que
       pegava este botão e o esticava de ponta a ponta da tela. Widget que
       mora em página alheia não pode depender do que a página faz. */
    var css = document.createElement('style');
    css.textContent = [
      '.wl-suporte.wl-suporte{position:fixed;right:20px;bottom:20px;left:auto;top:auto;',
      'z-index:60;display:inline-flex;align-items:center;justify-content:center;gap:9px;',
      'width:auto;min-width:0;max-width:none;height:auto;min-height:0;box-sizing:border-box;',
      'margin:0;padding:13px 18px;background:#112b24;color:#fff;',
      'border:1px solid rgba(255,255,255,.08);border-radius:40px;',
      'font:650 13.5px/1 "DM Sans",system-ui,sans-serif;letter-spacing:0;text-align:center;',
      'text-transform:none;text-decoration:none;white-space:nowrap;cursor:pointer;opacity:1;',
      'box-shadow:0 8px 24px rgba(17,43,36,.22);',
      'transition:background .18s,transform .18s,box-shadow .18s}',
      '.wl-suporte.wl-suporte:hover{background:#17cb68;transform:translateY(-2px);',
      'box-shadow:0 12px 28px rgba(23,203,104,.34)}',
      '.wl-suporte.wl-suporte:focus-visible{outline:3px solid #17cb68;outline-offset:3px}',
      '.wl-suporte.wl-suporte svg{width:17px;height:17px;flex:none;display:block}',
      '.wl-suporte.wl-suporte span{display:inline;font:inherit;color:inherit}',

      '.wl-sup-cx.wl-sup-cx{position:fixed;right:20px;bottom:76px;left:auto;top:auto;z-index:61;',
      'width:290px;max-width:calc(100vw - 40px);box-sizing:border-box;margin:0;padding:18px;',
      'background:#fff;border:1px solid #e3eae5;border-radius:16px;display:none;',
      'box-shadow:0 18px 44px rgba(17,43,36,.18);text-align:left;',
      'font:400 14px/1.5 "DM Sans",system-ui,sans-serif;color:#112b24}',
      '.wl-sup-cx.wl-sup-cx.on{display:block}',
      '.wl-sup-cx.wl-sup-cx h4{margin:0 0 4px;padding:0;color:#112b24;',
      'font:750 16px/1.2 Manrope,system-ui,sans-serif;letter-spacing:-.3px}',
      '.wl-sup-cx.wl-sup-cx p{margin:0 0 14px;padding:0;font-size:12.5px;color:#728078;',
      'line-height:1.5;text-align:left}',
      '.wl-sup-cx.wl-sup-cx a,.wl-sup-cx.wl-sup-cx button{display:flex;align-items:center;',
      'justify-content:center;gap:8px;box-sizing:border-box;width:100%;min-height:0;',
      'margin:0 0 8px;padding:11px 12px;border-radius:10px;border:1px solid #e3eae5;',
      'background:#fff;color:#112b24;text-decoration:none;cursor:pointer;opacity:1;',
      'font:650 13.5px/1.3 "DM Sans",system-ui,sans-serif;text-align:center;',
      'transition:background .15s,border-color .15s}',
      '.wl-sup-cx.wl-sup-cx a:hover,.wl-sup-cx.wl-sup-cx button:hover{background:#f7f9f5;',
      'border-color:#cfe0d5;transform:none}',
      '.wl-sup-cx.wl-sup-cx .zap{background:#17cb68;border-color:#17cb68;color:#fff}',
      '.wl-sup-cx.wl-sup-cx .zap:hover{background:#14a85b;border-color:#14a85b}',
      '.wl-sup-cx.wl-sup-cx .wl-sup-end{margin:12px 0 0;padding:12px 0 0;',
      'border-top:1px solid #eef3ef;font-size:12px;color:#728078;text-align:center;',
      'word-break:break-all}',
      '.wl-sup-cx.wl-sup-cx .wl-sup-end b{color:#112b24;font-weight:650}',

      '@media(max-width:700px){.wl-suporte.wl-suporte{bottom:84px;right:14px;',
      'padding:12px 15px;font-size:12.5px}',
      '.wl-sup-cx.wl-sup-cx{bottom:140px;right:14px;left:14px;width:auto;max-width:none}}',
      '@media print{.wl-suporte.wl-suporte,.wl-sup-cx.wl-sup-cx{display:none}}'
    ].join('');
    document.head.appendChild(css);

    var bt = document.createElement('button');
    bt.className = 'wl-suporte';
    bt.type = 'button';
    bt.setAttribute('aria-label', 'Falar com o suporte');
    bt.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-4.2-1L3 20l1.2-4.3A8.4 8.4 0 0 1 ' +
      '3 11.5 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5z"/></svg><span>Suporte</span>';

    var cx = document.createElement('div');
    cx.className = 'wl-sup-cx';
    cx.innerHTML =
      '<h4>Falar com o suporte</h4>' +
      '<p>Conte o que aconteceu e diga o e-mail que você usou na compra.</p>' +
      (zap
        ? '<a class="zap" target="_blank" rel="noopener" href="https://wa.me/' + zap +
          '?text=' + encodeURIComponent('Olá! Preciso de ajuda com o WhaLead.') +
          '">Abrir o WhatsApp</a>'
        : '') +
      '<a target="_blank" rel="noopener" href="https://mail.google.com/mail/?view=cm&fs=1' +
        '&to=' + encodeURIComponent(email) + '&su=' + encodeURIComponent(assunto) +
        '">Escrever pelo Gmail</a>' +
      '<a href="mailto:' + email + '?subject=' + encodeURIComponent(assunto) +
        '">Usar meu programa de e-mail</a>' +
      '<button type="button" class="wl-sup-copy">Copiar o endereço</button>' +
      '<p class="wl-sup-end">ou escreva para <b>' + email + '</b></p>';

    document.body.appendChild(bt);
    document.body.appendChild(cx);

    var aberto = false;
    function mostrar(v) { aberto = v; cx.classList.toggle('on', v);
      bt.setAttribute('aria-expanded', v ? 'true' : 'false'); }
    bt.addEventListener('click', function (e) { e.stopPropagation(); mostrar(!aberto); });

    /* qualquer link da página pode abrir o cartão: data-abrir-suporte */
    document.querySelectorAll('[data-abrir-suporte]').forEach(function (el) {
      el.style.cursor = 'pointer';
      el.addEventListener('click', function (e) {
        e.preventDefault(); e.stopPropagation(); mostrar(true);
      });
    });
    document.addEventListener('click', function (e) {
      if (aberto && !cx.contains(e.target)) mostrar(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && aberto) mostrar(false); });

    /* copiar funciona até onde a área de transferência moderna não funciona */
    cx.querySelector('.wl-sup-copy').addEventListener('click', function () {
      var b = this, antes = b.textContent;
      var pronto = function () { b.textContent = 'Copiado!';
        setTimeout(function () { b.textContent = antes; }, 1800); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(pronto, velhoJeito);
      } else velhoJeito();
      function velhoJeito() {
        var t = document.createElement('textarea');
        t.value = email; t.style.position = 'fixed'; t.style.opacity = '0';
        document.body.appendChild(t); t.select();
        try { document.execCommand('copy'); pronto(); }
        catch (e) { b.textContent = email; }
        document.body.removeChild(t);
      }
    });
  })();

  /* ---- a faixa que aparece quando a visita vem da extensão ---- */
  var p = new URLSearchParams(location.search);
  if (p.get('origem') === 'extensao' || p.get('source') === 'extension') {
    var ctx = document.getElementById('context');
    if (ctx) ctx.classList.add('visible');
  }
})();
