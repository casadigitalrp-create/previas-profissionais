// Configuração da loja. Marca e dados FICTÍCIOS: este é um modelo do catálogo, não um cliente.

export const loja = {
  nome: "Lanche do Bairro",
  slogan: "Lanche de verdade, do jeito que você pede.",
  cidade: "Sua cidade",
  endereco: "Rua Exemplo, 123 - Centro", // FICTÍCIO
  whatsapp: "", // vazio nesta prévia: o pedido não vai para nenhum número real
  instagram: "",
};

/**
 * Integração de pedidos.
 * - `webhookUrl` vazio: modo demonstração (o pedido é montado e exibido, nada é enviado).
 * - `webhookUrl` preenchido: o site faz POST do pedido em JSON (ver docs/contrato-pedido.md),
 *   normalmente para um Webhook do n8n.
 */
export const integracao = {
  webhookUrl: "",
  prefixoPedido: "LB",
};

/** Horário de funcionamento por dia da semana (0 = domingo). Horas no fuso de Brasília. */
export const horarios: Record<number, { abre: string; fecha: string } | null> = {
  0: { abre: "18:00", fecha: "23:30" },
  1: null,
  2: { abre: "18:00", fecha: "23:00" },
  3: { abre: "18:00", fecha: "23:00" },
  4: { abre: "18:00", fecha: "23:00" },
  5: { abre: "18:00", fecha: "23:59" },
  6: { abre: "18:00", fecha: "23:59" },
}; // FICTÍCIO

/** Taxas de entrega por bairro, em centavos. FICTÍCIO. */
export const bairros = [
  { nome: "Centro", taxa: 500, tempo: "30–40 min" },
  { nome: "Jardim das Flores", taxa: 700, tempo: "35–45 min" },
  { nome: "Vila Nova", taxa: 800, tempo: "40–50 min" },
  { nome: "Parque Industrial", taxa: 1000, tempo: "45–60 min" },
];

export const pedidoMinimo = 2000; // centavos

export const formasPagamento = [
  { id: "pix", rotulo: "Pix na entrega ou retirada" },
  { id: "cartao", rotulo: "Cartão na maquininha" },
  { id: "dinheiro", rotulo: "Dinheiro" },
] as const;

export type FormaPagamento = (typeof formasPagamento)[number]["id"];
