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
  /* ---- um endereço de suporte só, usado por tudo ----------------------
     `mailto:` não serve: só funciona em quem tem programa de e-mail
     configurado, e em celular normalmente não faz nada. O Gmail na web
     abre em qualquer navegador, já com destinatário e assunto prontos.  */
  var recadoSuporte = 'Olá! Preciso de ajuda com o WhaLead.';
  var LINK_EMAIL = 'https://mail.google.com/mail/?view=cm&fs=1' +
    '&to=' + encodeURIComponent(textos.suporte) +
    '&su=' + encodeURIComponent('Suporte WhaLead') +
    '&body=' + encodeURIComponent(recadoSuporte);

  /* todo link de e-mail do site, em qualquer página, vai para o mesmo lugar */
  document.querySelectorAll('[data-suporte]').forEach(function (e) {
    e.setAttribute('href', LINK_EMAIL);
    e.setAttribute('target', '_blank');
    e.setAttribute('rel', 'noopener');
    e.setAttribute('title', 'Escrever para ' + textos.suporte);
    e.style.cursor = 'pointer';
    // data-suporte="texto" mantém o rótulo escrito no HTML;
    // vazio, o link mostra o e-mail que estiver no config.js
    if (e.getAttribute('data-suporte') !== 'texto') e.textContent = textos.suporte;
  });

  /* ---- para onde vai cada botão de comprar ----------------------------
     Com servidor configurado, o caminho passa pela conta: é assim que a
     liberação acontece sozinha. Sem servidor, vai direto ao checkout e
     a liberação fica manual.                                            */
  var destino2 = C.api ? 'criar-conta.html' : (C.checkoutUrl || '#');
  var destino = destino2;
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
     Um clique, e pronto: abre a conversa. Sem cartão no meio.

     Para onde vai, nesta ordem:
       1. WhatsApp, se você preencheu `whatsapp` no config.js
       2. Gmail na web, que funciona em qualquer navegador sem instalar nada

     É um link de verdade (<a>), não um botão com JavaScript: link o
     navegador sempre abre, enquanto janela aberta por script pode ser
     bloqueada. E o estilo vai ESCRITO NO ELEMENTO, porque o conta.css tem
     um `button{width:100%}` que esticava este botão de ponta a ponta da
     tela. Estilo no elemento ganha de qualquer folha da página — o botão
     fica igualzinho nas sete abas.                                        */
  (function botaoDeSuporte() {
    if (document.querySelector('.wl-suporte')) return;
    var email = textos.suporte;
    var zap = String(C.whatsapp || '').replace(/\D+/g, '');
    var destino = zap
      ? 'https://wa.me/' + zap + '?text=' + encodeURIComponent(recadoSuporte)
      : LINK_EMAIL;

    /* o que não dá para escrever no elemento: passar o mouse, foco,
       celular e impressão. Vai com !important para vencer o que está
       escrito no elemento.                                               */
    var css = document.createElement('style');
    css.textContent = [
      '.wl-suporte:hover{background:#17cb68 !important;transform:translateY(-2px) !important;',
      'box-shadow:0 12px 28px rgba(23,203,104,.34) !important}',
      '.wl-suporte:focus-visible{outline:3px solid #17cb68 !important;outline-offset:3px !important}',
      '@media(max-width:700px){.wl-suporte{bottom:84px !important;right:14px !important;',
      'padding:12px 15px !important;font-size:12.5px !important}}',
      '@media print{.wl-suporte{display:none !important}}'
    ].join('');
    document.head.appendChild(css);

    var a = document.createElement('a');
    a.className = 'wl-suporte';
    a.href = destino;
    a.target = '_blank';
    a.rel = 'noopener';
    a.title = zap ? 'Falar com o suporte no WhatsApp'
                  : 'Falar com o suporte: ' + email;
    a.setAttribute('aria-label', a.title);
    a.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ' +
      'style="width:17px;height:17px;flex:none;display:block">' +
      '<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-4.2-1L3 20l1.2-4.3A8.4 8.4 0 0 1 ' +
      '3 11.5 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5z"/></svg><span>Suporte</span>';

    /* cada medida escrita no próprio elemento: nenhuma folha da página alcança */
    var medidas = {
      position: 'fixed', right: '20px', bottom: '20px', left: 'auto', top: 'auto',
      zIndex: '60', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      gap: '9px', width: 'auto', minWidth: '0', maxWidth: 'none',
      height: 'auto', minHeight: '0', boxSizing: 'border-box',
      margin: '0', padding: '13px 18px',
      background: '#112b24', color: '#fff', border: '1px solid rgba(255,255,255,.08)',
      borderRadius: '40px', font: '650 13.5px/1 "DM Sans",system-ui,sans-serif',
      letterSpacing: '0', textAlign: 'center', textTransform: 'none',
      textDecoration: 'none', whiteSpace: 'nowrap', cursor: 'pointer', opacity: '1',
      boxShadow: '0 8px 24px rgba(17,43,36,.22)',
      transition: 'background .18s,transform .18s,box-shadow .18s'
    };
    Object.keys(medidas).forEach(function (k) {
      /* !important no próprio elemento: ganha até de folha com !important */
      a.style.setProperty(k.replace(/[A-Z]/g, function (m) { return '-' + m.toLowerCase(); }),
        medidas[k], 'important');
    });
    document.body.appendChild(a);

    /* se o navegador tiver guardado a versão antiga em cache e ela já tiver
       desenhado o cartão de opções, varre daqui                            */
    document.querySelectorAll('.wl-sup-cx').forEach(function (v) { v.remove(); });

    /* "Esqueci minha senha" e qualquer outro link marcado vão para o mesmo lugar.
       Alguns nascem depois, criados por script da própria página — por isso
       ligamos também tudo o que aparecer no documento daqui pra frente.    */
    function ligar(el) {
      el.setAttribute('href', destino);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
      el.style.cursor = 'pointer';
    }
    var marca = '[data-abrir-suporte],[data-suporte-botao]';
    document.querySelectorAll(marca).forEach(ligar);
    new MutationObserver(function (lista) {
      lista.forEach(function (m) {
        m.addedNodes.forEach(function (no) {
          if (no.nodeType !== 1) return;
          if (no.matches && no.matches(marca)) ligar(no);
          if (no.querySelectorAll) no.querySelectorAll(marca).forEach(ligar);
          /* botões de comprar criados depois também precisam de endereço */
          var cs = (no.matches && no.matches('[data-comprar]')) ? [no]
                 : (no.querySelectorAll ? [].slice.call(no.querySelectorAll('[data-comprar]')) : []);
          cs.forEach(function (a) {
            a.setAttribute('href', destino2);
            if (externo) { a.setAttribute('target', '_blank'); a.setAttribute('rel', 'noopener'); }
          });
        });
      });
    }).observe(document.documentElement, { childList: true, subtree: true });
  })();

  /* ---- a faixa que aparece quando a visita vem da extensão ---- */
  var p = new URLSearchParams(location.search);
  if (p.get('origem') === 'extensao' || p.get('source') === 'extension') {
    var ctx = document.getElementById('context');
    if (ctx) ctx.classList.add('visible');
  }
})();
