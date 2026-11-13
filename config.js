/* ============================================================
   WhaLead — o ÚNICO arquivo que você precisa editar.
   Mudou aqui, mudou em todas as páginas do site.
   ============================================================ */
window.WHALEAD_CONFIG = {

  /* ---- preço ---------------------------------------------------------
     Escreva exatamente como deve aparecer na tela.
     ATENÇÃO: isto tem que bater com o valor do checkout e com o
     PLANO_VALOR do servidor. Preço diferente em dois lugares é
     reclamação na certa (e no Procon).                                  */
  preco:        'R$ 299,90',
  parcelas:     12,
  // Só preencha se o seu checkout realmente oferecer SEM JUROS.
  // Prometer parcela fixa que o cliente não vê no checkout é propaganda
  // enganosa. Em branco, o site fala apenas "em até 12x".
  precoParcela: '',

  /* ---- o que o cliente leva ------------------------------------------
     A licença vale 1 ano a contar do dia da compra, e não renova sozinha.

     ATENÇÃO: quem manda de verdade no prazo é a variável DIAS_ACESSO do
     servidor, na Cloudflare. Aqui é só o texto do site. Se mudar um, mude
     o outro — prazo anunciado diferente do prazo entregue é infração ao
     Código de Defesa do Consumidor, art. 37.                             */
  vitalicio:    false,  // false = a licença vence
  validadeDias: 365,    // tem que bater com DIAS_ACESSO lá na Cloudflare
  garantiaDias: 7,      // direito de arrependimento (CDC, art. 49)

  /* ---- para onde vai o botão de comprar -------------------------------
     LIGADO em 12/11/2026. O servidor está no ar e testado: o cliente cria
     conta antes de pagar e o acesso é liberado pelo painel.

     Se algum dia precisar desligar o login e mandar todo mundo direto
     para o checkout, basta deixar `api` em branco.                       */
  api:          'https://whalead-licencas.whalead-crm.workers.dev',
  checkoutUrl:  'https://mpago.li/2du2Do1',

  /* ---- contato --------------------------------------------------------
     O botão de suporte, no canto da tela, abre um cartão com as formas de
     falar com você. Preenchendo `whatsapp`, aparece lá um botão verde que
     abre a conversa direto — para quem está no celular, é o que de fato
     funciona. Escreva só os números, com DDI e DDD: 5511987654321.        */
  suporte:      'whalead.crm@gmail.com',
  whatsapp:     ''
};
