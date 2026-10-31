// Regras do carrinho e do pedido, sem dependência de DOM: o mesmo formato vale para o site e para o n8n.
import { adicionais, produtos } from "../data/cardapio";
import { bairros, type FormaPagamento, horarios, integracao } from "../data/config";

export const reais = (centavos: number) =>
  (centavos / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export interface ItemCarrinho {
  /** Chave do item: produto + adicionais, para somar quantidades iguais. */
  chave: string;
  produtoId: string;
  quantidade: number;
  adicionais: string[];
  observacao: string;
}

export const chaveItem = (produtoId: string, extras: string[], observacao: string) =>
  [produtoId, [...extras].sort().join("+"), observacao.trim().toLowerCase()].join("|");

export function precoUnitario(item: Pick<ItemCarrinho, "produtoId" | "adicionais">) {
  const produto = produtos.find((p) => p.id === item.produtoId);
  if (!produto) return 0;
  const extras = item.adicionais.reduce(
    (soma, id) => soma + (adicionais.find((a) => a.id === id)?.preco ?? 0),
    0,
  );
  return produto.preco + extras;
}

export const subtotal = (itens: ItemCarrinho[]) =>
  itens.reduce((soma, i) => soma + precoUnitario(i) * i.quantidade, 0);

/** Contrato do pedido enviado à automação. Documentado em docs/contrato-pedido.md. */
export interface Pedido {
  versao: 1;
  id: string;
  criadoEm: string;
  origem: "site";
  demonstracao: boolean;
  cliente: { nome: string; telefone: string };
  entrega:
    | { tipo: "retirada" }
    | {
        tipo: "entrega";
        bairro: string;
        rua: string;
        numero: string;
        complemento: string;
        referencia: string;
      };
  itens: {
    produtoId: string;
    nome: string;
    quantidade: number;
    precoUnitario: number;
    adicionais: { id: string; nome: string; preco: number }[];
    observacao: string;
    total: number;
  }[];
  pagamento: { forma: FormaPagamento; trocoPara: number | null };
  valores: { subtotal: number; taxaEntrega: number; total: number };
  observacao: string;
}

export interface DadosCheckout {
  nome: string;
  telefone: string;
  tipo: "entrega" | "retirada";
  bairro: string;
  rua: string;
  numero: string;
  complemento: string;
  referencia: string;
  pagamento: FormaPagamento;
  trocoPara: number | null;
  observacao: string;
}

export const taxaDoBairro = (bairro: string) => bairros.find((b) => b.nome === bairro)?.taxa ?? 0;

export function gerarId(agora = new Date()) {
  const data = agora.toISOString().slice(0, 10).replaceAll("-", "");
  const sufixo = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${integracao.prefixoPedido}-${data}-${sufixo}`;
}

export function montarPedido(itens: ItemCarrinho[], d: DadosCheckout, agora = new Date()): Pedido {
  const taxa = d.tipo === "entrega" ? taxaDoBairro(d.bairro) : 0;
  const sub = subtotal(itens);
  return {
    versao: 1,
    id: gerarId(agora),
    criadoEm: agora.toISOString(),
    origem: "site",
    demonstracao: !integracao.webhookUrl,
    cliente: { nome: d.nome.trim(), telefone: d.telefone.replace(/\D/g, "") },
    entrega:
      d.tipo === "retirada"
        ? { tipo: "retirada" }
        : {
            tipo: "entrega",
            bairro: d.bairro,
            rua: d.rua.trim(),
            numero: d.numero.trim(),
            complemento: d.complemento.trim(),
            referencia: d.referencia.trim(),
          },
    itens: itens.map((i) => {
      const produto = produtos.find((p) => p.id === i.produtoId);
      const unit = precoUnitario(i);
      return {
        produtoId: i.produtoId,
        nome: produto?.nome ?? i.produtoId,
        quantidade: i.quantidade,
        precoUnitario: unit,
        adicionais: i.adicionais.flatMap((id) => adicionais.filter((a) => a.id === id)),
        observacao: i.observacao.trim(),
        total: unit * i.quantidade,
      };
    }),
    pagamento: { forma: d.pagamento, trocoPara: d.pagamento === "dinheiro" ? d.trocoPara : null },
    valores: { subtotal: sub, taxaEntrega: taxa, total: sub + taxa },
    observacao: d.observacao.trim(),
  };
}

/** Texto do pedido para WhatsApp, usado como alternativa ou confirmação. */
export function textoWhatsapp(p: Pedido) {
  const linhas = [`*Pedido ${p.id}*`, ""];
  for (const i of p.itens) {
    linhas.push(`${i.quantidade}x ${i.nome} — ${reais(i.total)}`);
    if (i.adicionais.length) linhas.push(`   + ${i.adicionais.map((a) => a.nome).join(", ")}`);
    if (i.observacao) linhas.push(`   Obs.: ${i.observacao}`);
  }
  linhas.push("", `Subtotal: ${reais(p.valores.subtotal)}`);
  if (p.entrega.tipo === "entrega") {
    linhas.push(`Entrega (${p.entrega.bairro}): ${reais(p.valores.taxaEntrega)}`);
    linhas.push(`Endereço: ${p.entrega.rua}, ${p.entrega.numero} ${p.entrega.complemento}`.trim());
  } else {
    linhas.push("Retirada no balcão");
  }
  linhas.push(`*Total: ${reais(p.valores.total)}*`, `Pagamento: ${p.pagamento.forma}`);
  if (p.pagamento.trocoPara) linhas.push(`Troco para ${reais(p.pagamento.trocoPara)}`);
  linhas.push(`Nome: ${p.cliente.nome}`);
  return linhas.join("\n");
}

/** Situação da loja agora, no fuso de Brasília. */
export function situacaoLoja(agora = new Date()) {
  const partes = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(agora);
  const dias = ["dom.", "seg.", "ter.", "qua.", "qui.", "sex.", "sáb."];
  const dia = dias.indexOf(partes.find((p) => p.type === "weekday")?.value ?? "");
  const hora = `${partes.find((p) => p.type === "hour")?.value}:${partes.find((p) => p.type === "minute")?.value}`;
  const hoje = horarios[dia];
  if (hoje && hora >= hoje.abre && hora < hoje.fecha)
    return { aberta: true, texto: `Aberto até ${hoje.fecha}` };
  if (hoje && hora < hoje.abre)
    return { aberta: false, texto: `Fechado agora · abre hoje às ${hoje.abre}` };
  for (let i = 1; i <= 7; i++) {
    const prox = horarios[(dia + i) % 7];
    if (prox) {
      const nome = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"][
        (dia + i) % 7
      ];
      return {
        aberta: false,
        texto: `Fechado agora · abre ${i === 1 ? "amanhã" : nome} às ${prox.abre}`,
      };
    }
  }
  return { aberta: false, texto: "Fechado" };
}
