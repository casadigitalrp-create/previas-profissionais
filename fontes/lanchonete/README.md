# Modelo: Lanche do Bairro (pedidos online)

Modelo do catálogo para lanchonetes, hamburguerias e restaurantes de delivery. **Marca, cardápio e preços são
fictícios.** Astro estático + TypeScript estrito + Tailwind 4 + Biome, Node 24 e pnpm. O build grava em
`../../lanchonete/`.

## O que faz

- Status de **aberto/fechado** pelo horário de Brasília.
- Cardápio por categoria, com **adicionais, observação e quantidade** em cada item.
- **Sacola** que fica salva no navegador.
- Checkout sem cadastro: entrega (taxa por bairro) ou retirada, pagamento, troco e pedido mínimo.
- Pedido montado num **JSON padronizado**, pronto para o n8n (`docs/contrato-pedido.md`).
- Página de confirmação com número do pedido, etapas e o JSON enviado (para demonstrar a integração).

## Onde editar

| O quê | Arquivo |
|---|---|
| Nome, endereço, horários, bairros e taxas, pedido mínimo, pagamento, **URL do webhook** | `src/data/config.ts` |
| Produtos, categorias e adicionais | `src/data/cardapio.ts` |
| Regras de preço, formato do pedido, texto de WhatsApp | `src/lib/pedido.ts` |
| Cores e fontes (claro/escuro) | `src/styles/global.css` |

## Ligar na automação

1. Criar o workflow no n8n seguindo `docs/contrato-pedido.md`.
2. Colocar a URL de produção do Webhook em `integracao.webhookUrl`.
3. `pnpm build` e publicar.

## Pendências para usar com um cliente real

- [ ] Marca, cardápio, fotos reais e preços do cliente
- [ ] Horários, bairros e taxas reais
- [ ] Workflow n8n com validação de preço, registro e avisos no WhatsApp
- [ ] Revisar a política de privacidade (LGPD)
- [ ] Remover `noindex` e o aviso de modelo
