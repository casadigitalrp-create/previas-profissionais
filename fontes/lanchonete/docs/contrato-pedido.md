# Contrato do pedido (site → automação)

O site envia cada pedido como **um POST em JSON** para `integracao.webhookUrl` (`src/data/config.ts`).
Normalmente é o nó **Webhook** do n8n. Com o campo vazio, o site fica em modo demonstração e não envia nada.

## Regras

- Método `POST`, cabeçalho `Content-Type: application/json`, tempo limite de 10 s.
- O site considera sucesso qualquer resposta 2xx. Fora disso, mostra erro e deixa o cliente tentar de novo.
- **Todos os valores são em centavos** (inteiros). `2690` = R$ 26,90.
- `id` é único por pedido (`LB-AAAAMMDD-XXXX`). Use-o para evitar duplicidade se o cliente reenviar.
- `versao` muda só se o formato mudar de forma incompatível.
- Os preços vêm do site, então o **n8n deve recalcular o total com a tabela oficial** antes de aceitar o pedido.
  Assim, ninguém altera preço pelo navegador.

## Exemplo

```json
{
  "versao": 1,
  "id": "LB-20261031-K3F9",
  "criadoEm": "2026-10-31T22:14:05.120Z",
  "origem": "site",
  "demonstracao": false,
  "cliente": { "nome": "Maria", "telefone": "16999999999" },
  "entrega": {
    "tipo": "entrega",
    "bairro": "Centro",
    "rua": "Rua Exemplo",
    "numero": "45",
    "complemento": "Apto 12",
    "referencia": "Perto da praça"
  },
  "itens": [
    {
      "produtoId": "classico",
      "nome": "Clássico do Bairro",
      "quantidade": 2,
      "precoUnitario": 3090,
      "adicionais": [{ "id": "bacon", "nome": "Bacon", "preco": 400 }],
      "observacao": "sem cebola",
      "total": 6180
    }
  ],
  "pagamento": { "forma": "dinheiro", "trocoPara": 10000 },
  "valores": { "subtotal": 6180, "taxaEntrega": 500, "total": 6680 },
  "observacao": ""
}
```

Na retirada, `entrega` vem só como `{ "tipo": "retirada" }` e `taxaEntrega` é `0`.
`pagamento.forma` é `pix`, `cartao` ou `dinheiro`. `trocoPara` só existe no dinheiro (senão, `null`).

## Fluxo sugerido no n8n

1. **Webhook** (POST) recebe o pedido e responde 200 logo depois da validação.
2. **Validar**: campos obrigatórios, `id` ainda não registrado, total recalculado com a tabela de preços.
3. **Registrar** em Google Sheets ou banco (uma linha por pedido, itens em JSON ou em outra aba).
4. **Avisar a cozinha**: mensagem no WhatsApp ou Telegram da loja, ou impressão na impressora térmica.
5. **Confirmar ao cliente** no WhatsApp com número, itens, total e tempo estimado.
6. **Status**: quando a loja muda a etapa (planilha ou botão), o n8n avisa o cliente:
   Recebido → Em preparo → Saiu para entrega → Entregue.
7. **Falhas**: se algo der errado, avisar o dono e registrar o pedido numa aba de pendências.

## Segurança antes de publicar

- Webhook com caminho difícil de adivinhar e, se possível, um cabeçalho secreto validado no n8n.
- Limitar tamanho do corpo e taxa de pedidos por telefone.
- Não registrar dados além do necessário (LGPD) e apagar pedidos antigos conforme a política.
