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

  /* ---- o que o cliente leva ------------------------------------------ */
  vitalicio:    true,   // true = pagamento único, acesso para sempre
  garantiaDias: 7,      // direito de arrependimento (CDC, art. 49)

  /* ---- para onde vai o botão de comprar -------------------------------
     Enquanto o servidor de licenças não estiver publicado, deixe `api`
     vazio: os botões vão direto para o seu link do Mercado Pago.

     Quando o servidor estiver no ar, preencha `api`. Aí o cliente passa
     a criar conta antes de pagar, e o acesso é liberado sozinho — sem
     você precisar destravar ninguém na mão.                              */
  api:          '',
  // api:       'https://whalead-licencas.whalead-crm.workers.dev',
  checkoutUrl:  'https://mpago.li/2du2Do1',

  /* ---- contato -------------------------------------------------------- */
  suporte:      'whalead.crm@gmail.com'
};
