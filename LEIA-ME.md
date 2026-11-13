# WhaLead — site de vendas

Site refeito em cima do seu, com o mesmo visual, agora apontado para a compra.
**Modelo: pagamento único de R$ 299,90, à vista ou parcelado em até 12x.
Não é assinatura, não é mensalidade, não tem teste grátis.**

---

## 1. O que mudou em relação ao arquivo que você mandou

| | Antes | Agora |
|---|---|---|
| Peso do `index.html` | **1.301.333 B** (1,3 MB) | **28.760 B** — 45x menor |
| Preço | R$ 299,99 | **R$ 299,90**, igual em toda a página |
| Páginas | 1 | **7** |
| Botões de compra | 3 | **6**, mais a barra fixa no celular |
| Criar conta / entrar | não existia | `criar-conta.html`, `entrar.html`, `painel.html` |
| Cadastro pede | — | nome, e-mail, **telefone com DDD** e senha |
| Termos e privacidade | não existia | `termos.html`, `privacidade.html` |

**Por que caiu tanto de peso:** o seu `index.html` trazia o logo em base64
**três vezes** — o mesmo arquivo de 320 KB colado três vezes dentro do HTML,
1,28 MB só nisso. Agora o logo é um arquivo (`logo-whalead.png`), o navegador
baixa uma vez e usa nos três lugares. No 4G isso é a diferença entre a página
abrir na hora e o cliente desistir antes de ver o preço.

### Mais direcionado à compra
- Título novo: **"Pare de perder venda no meio da conversa."** Fala da dor, não do recurso.
- Preço e condição aparecem **logo abaixo do primeiro botão**, não só lá embaixo.
- Três selos no topo: acesso vitalício · 7 dias de garantia · sem mensalidade.
- Faixa escura de valor no lugar da tira de ícones, com os quatro motivos de comprar.
- **Comparação com CRM mensal:** R$ 89/mês × R$ 299,90 uma vez — "em três anos,
  mais de R$ 3.200, e no dia em que você parar de pagar, perde o acesso".
- Selo de garantia citando o **artigo 49 do CDC** (quebra o medo de comprar).
- FAQ reescrita, e a primeira pergunta é a que trava a venda: **"É mensalidade? Não."**
- CTA de ação em todo lugar: *Comprar agora*, *Quero o WhaLead Pro*, *Liberar agora*.
- **Barra fixa no celular** com preço + botão, sempre à vista.

---

## 2. Os arquivos

```
index.html         a página de vendas
criar-conta.html   cadastro (nome, e-mail, telefone e senha) antes de pagar
entrar.html        login de quem já comprou
painel.html        área do cliente: status do acesso e dados
obrigado.html      tela de volta do pagamento
termos.html        termos de uso
privacidade.html   política de privacidade
config.js          >>> O ÚNICO ARQUIVO QUE VOCÊ PRECISA EDITAR <<<
comum.js           preenche preço e textos, roteia os botões e desenha
                   o botão de suporte das 7 páginas
conta.css          estilo das telas de conta
logo-whalead.png   o logo
brand.png          o ícone (favicon)
```

Tudo com caminho relativo: funciona no GitHub Pages em subpasta, no Cloudflare
ou aberto direto do seu computador com dois cliques.

---

## 3. Mudar o preço (ou qualquer texto): só o `config.js`

Abra `config.js` no Bloco de Notas. Mudou ali, mudou nas 7 páginas:

```js
preco:        'R$ 299,90',   // escreva como deve aparecer na tela
parcelas:     12,
precoParcela: '',            // só preencha se o checkout tiver MESMO 12x sem juros
vitalicio:    true,
garantiaDias: 7,
api:          '',            // vazio = botão vai direto ao Mercado Pago
checkoutUrl:  'https://mpago.li/2du2Do1',
suporte:      'whalead.crm@gmail.com'
```

**`precoParcela` em branco é de propósito.** Prometer "12x de R$ 24,99 sem juros"
numa página e o cliente ver outro valor no Mercado Pago é propaganda enganosa.
Em branco, o site diz apenas "em até 12x no cartão" e o checkout mostra o valor real.
Se você confirmar no Mercado Pago que o parcelamento sai sem juros por sua conta,
preencha e a página passa a mostrar a parcela.

---

## 4. O botão de suporte

Botão escuro e arredondado, fixo no canto **inferior direito**, igual nas sete
páginas. **Um clique e abre a conversa** — sem menu, sem cartão, sem escolha.

Para onde ele vai, nesta ordem:

1. **WhatsApp**, se você preencher `whatsapp` no `config.js`
2. **Gmail na web**, que é o que funciona em qualquer navegador sem instalar nada

Em qualquer um dos dois a mensagem já vai começada: *"Olá! Preciso de ajuda com
o WhaLead."* O link **"Esqueci minha senha"**, na tela de entrar, vai para o
mesmo lugar.

### Ligue o WhatsApp — leva dez segundos

Você vende uma ferramenta de WhatsApp. O cliente que trava às 22h quer mandar
mensagem, não escrever e-mail. No `config.js`:

```js
whatsapp: '5511987654321',   // DDI + DDD + número, só dígitos
```

O botão passa a abrir a conversa direto. Em branco, ele usa o Gmail.

Para trocar o e-mail, mesma coisa, uma linha:

```js
suporte: 'whalead.crm@gmail.com',
```

### Dois defeitos que já aconteceram aqui

**Virou uma barra preta de ponta a ponta.** O `conta.css` tem
`button{width:100%}`, pensado para os botões dos formulários, e ele pegava o
botão de suporte junto. Agora cada medida vai **escrita no próprio elemento** —
estilo no elemento ganha de qualquer folha da página. Mexer no `conta.css`
amanhã não quebra mais nada.

**Clicar não fazia nada.** Era um `mailto:`, que só funciona em quem tem
programa de e-mail configurado. Virou link normal para o WhatsApp ou o Gmail:
link o navegador sempre abre.

### Os links de e-mail escritos no texto

Em dez lugares do site o endereço aparece escrito — no rodapé, na garantia, nas
dúvidas, nos termos, na privacidade, no painel. Todos eles são
`<a data-suporte>` e **abrem o Gmail já endereçado**, igual ao botão. Não
precisa escrever o endereço em lugar nenhum do HTML: o script preenche o texto
e o link a partir do `config.js`. Trocou o e-mail lá, trocou nos dez.

O `teste-botao.js` carrega as sete páginas num navegador de verdade e mede o
botão em cada uma. Se ele deformar ou parar de ir direto, o teste quebra.

---

## 5. A chave de virada: o campo `api`

### Hoje (`api: ''`) — o que já funciona
Todo botão de comprar vai **direto para o seu link do Mercado Pago**.
Você recebe o pagamento, mas o link do MP não diz qual conta pagou:
**você libera o cliente na mão.**

### Depois de publicar o servidor de licenças
Descomente a linha e deixe assim:

```js
api: 'https://whalead-licencas.whalead-crm.workers.dev',
```

Aí o caminho muda sozinho, sem tocar em mais nada:

```
Comprar → criar conta (e-mail e senha) → Mercado Pago → obrigado.html
        → painel.html mostra "Acesso liberado" → entra na extensão com o mesmo login
```

A diferença prática: o pagamento volta **identificado**, o acesso é liberado
automaticamente e você para de destravar cliente no WhatsApp de madrugada.

> O servidor em `whalead-licencas.whalead-crm.workers.dev` **ainda responde 404** —
> não foi publicado. Enquanto isso, deixe `api` vazio.

As telas de conta esperam estes endereços:
`POST /criar-conta`, `POST /entrar`, `POST /eu`, `POST /sair`, `POST /comprar`.

### O telefone no cadastro
`criar-conta.html` pede **telefone com DDD**, obrigatório. A tela formata sozinha
enquanto a pessoa digita — `(11) 98765-4321` — e recusa número incompleto, DDD que
não existe e celular de 11 dígitos sem o 9. No banco fica só o número:
`11987654321`.

O servidor também repassa o telefone ao checkout, então o Mercado Pago já abre com
o campo preenchido — menos digitação na hora de pagar, menos carrinho abandonado.

> Banco de dados que já existe? Rode uma vez:
> `ALTER TABLE contas ADD COLUMN telefone TEXT;`

Com `api` vazio o cadastro nem aparece: o botão vai direto ao Mercado Pago. O
telefone só começa a ser pedido quando você publicar o servidor.

---

## 6. A palavra "assinatura" saiu de tudo que o cliente lê

Você apontou o painel dentro do WhatsApp: o cabeçalho ainda dizia
**"sem assinatura"**. Varri o produto inteiro e tirei o termo de todo texto visível:

| Onde | Antes | Agora |
|---|---|---|
| Painel no WhatsApp Web | sem assinatura | acesso não liberado |
| Entrando na conta | Conferindo sua assinatura… | Conferindo seu acesso… |
| Chave antiga | Quem **assina** pelo site… | Quem **compra** pelo site… |
| Erro sem internet | conferir sua assinatura | conferir seu acesso |
| Servidor, outro PC | Essa/Sua **assinatura** está em uso | Esse/Seu **acesso** está em uso |

Ficaram de fora, de propósito: **"não é mensalidade"** e **"não é assinatura"** —
negar é justamente o que a gente quer dizer. E dentro do código, os nomes de função
que falam em *assinatura digital*: isso é criptografia do comprovante, não cobrança.

Tem um teste automático vigiando isso agora (`t59.js`, seção 17): se a palavra
voltar a aparecer em algum texto da extensão, o teste quebra.

---

## 7. Antes de publicar — três coisas obrigatórias

1. **Seus dados de fornecedor.** Em `termos.html` e `privacidade.html` há
   `[a preencher]` para razão social/nome, CNPJ ou CPF e endereço. O artigo 33
   do CDC exige isso em venda a distância, e a Chrome Web Store também pede.
   Procure por `>>> PREENCHA` nos dois arquivos.
2. **O e-mail de suporte** é `whalead.crm@gmail.com`, no `config.js`.
   Trocou ali, trocou nas 7 páginas e no botão flutuante. Leia essa caixa todo
   dia: é para onde chegam os pedidos de reembolso, e o prazo de 7 dias do CDC
   corre mesmo que ninguém abra o e-mail.
3. **Confira o checkout.** Abra `https://mpago.li/2du2Do1` e veja se mostra
   **R$ 299,90** (o seu LEIA-ME antigo dizia 299,99). Preço diferente entre
   página e checkout é reclamação no Procon na certa.

---

## 8. Como publicar

### GitHub Pages — `whalead-crm/WhaLead`
Mande **todos** os arquivos desta pasta para a raiz do repositório e faça commit
na branch de produção. O site sai em
`https://whalead-crm.github.io/WhaLead/`.

> O repositório está escrito **`ladingpage`** — falta o *n* de *landing*.
> Dá para corrigir em Settings → Repository name; o endereço do site muda junto,
> então ajuste o link na extensão depois.

### Cloudflare
Como você fazia antes: substitua os arquivos e publique de novo.

> Existe uma **cópia antiga** da landing no ar em
> `wha-lead-ladingpage.whalead-crm.workers.dev`, com o preço velho de R$ 299,99.
> Apague esse Worker (Workers & Pages → Settings → Delete) para não ter dois
> sites seus dizendo preços diferentes.

### Testar antes
Abra o `index.html` com dois cliques. Funciona tudo, menos o que depende do
servidor. Teste também no celular: a barra fixa de compra só aparece lá.

---

## 9. Aviso vindo da extensão

Abra o site com `?origem=extensao` no fim do endereço para mostrar a faixa
"Você encontrou um recurso Pro":

```
https://whalead-crm.github.io/WhaLead/?origem=extensao
```

Nunca coloque senha ou token na URL.

---

## 10. O que ainda não está pronto

- **Liberação automática do Pro** — depende de publicar o servidor de licenças
  e preencher o `api`.
- **"Esqueci minha senha"** — hoje o link manda e-mail para o suporte e você
  reseta na mão. Para ser automático, precisa de domínio próprio e um serviço
  de envio (Resend, por exemplo).
- **Dados do fornecedor** nos termos e na privacidade (item 7).
- **Fonte do site:** a página usa Google Fonts. Dentro de pré-visualizações sem
  internet ela aparece com a fonte do sistema; no navegador, normal.
