# WhaLead — Página de vendas

## Publicar
Hospede index.html, brand.png e config.js juntos em qualquer hospedagem estática HTTPS.
Edite checkoutUrl em config.js com o link real do seu checkout.
Sem esse link, os botões exibem um aviso de demonstração e não realizam transações.

## Condições
A página comunica 7 dias gratuitos com cartão obrigatório, seguidos de cobrança de um plano de R$ 478,80 em 12 parcelas de R$ 39,90. Não é apresentada como assinatura mensal avulsa.
O processamento do cartão, teste, cancelamento e cobrança precisa ser configurado no provedor de pagamentos. A página não implementa esses serviços.
Antes de publicar, confirme a vigência do plano, renovação, regras e canal de cancelamento, termos de uso, política de privacidade, identificação do fornecedor e requisitos de ativação. Inclua os links finais na página e no checkout.
Os recursos descritos devem corresponder aos recursos reais da extensão. Painel ilustrativo com dados fictícios.

## Link a partir da extensão
Exemplo de destino: https://SEU-DOMINIO/?origem=extensao&recurso=agendamento&utm_source=extensao&utm_medium=popup&utm_campaign=upgrade

No clique do botão do popup da extensão Chrome:

```js
document.querySelector('#upgrade').addEventListener('click', () => {
  chrome.tabs.create({
    url: 'https://SEU-DOMINIO/?origem=extensao&recurso=agendamento&utm_source=extensao&utm_medium=popup&utm_campaign=upgrade'
  });
});
```

Troque SEU-DOMINIO e o seletor #upgrade pelos valores reais. O redirecionamento requer alteração no código da extensão, que não foi fornecido. Não envie dados pessoais ou tokens na URL.
Os parâmetros de atribuição e recurso são encaminhados ao checkout. Verifique a compatibilidade com o provedor.
O desbloqueio automático do Pro exige autenticação, backend e webhook do pagamento; não é realizado por esta página estática.

## Executar localmente
python -m http.server 3000 --bind 0.0.0.0
