// Carrinho no navegador. Guarda no localStorage só por conveniência: se falhar, funciona em memória.
import { chaveItem, type ItemCarrinho, subtotal } from "./pedido";

const CHAVE = "lanche-do-bairro-carrinho-v1";
let memoria: ItemCarrinho[] = [];

export function lerCarrinho(): ItemCarrinho[] {
  try {
    const bruto = localStorage.getItem(CHAVE);
    if (bruto) memoria = JSON.parse(bruto);
  } catch {
    /* sem armazenamento: usa a memória */
  }
  return memoria;
}

function salvar(itens: ItemCarrinho[]) {
  memoria = itens;
  try {
    localStorage.setItem(CHAVE, JSON.stringify(itens));
  } catch {
    /* ignora */
  }
  document.dispatchEvent(new CustomEvent("carrinho", { detail: itens }));
}

export function adicionar(
  produtoId: string,
  quantidade: number,
  extras: string[],
  observacao: string,
) {
  const itens = lerCarrinho();
  const chave = chaveItem(produtoId, extras, observacao);
  const existente = itens.find((i) => i.chave === chave);
  if (existente) existente.quantidade += quantidade;
  else itens.push({ chave, produtoId, quantidade, adicionais: extras, observacao });
  salvar([...itens]);
}

export function alterarQuantidade(chave: string, delta: number) {
  const itens = lerCarrinho()
    .map((i) => (i.chave === chave ? { ...i, quantidade: i.quantidade + delta } : i))
    .filter((i) => i.quantidade > 0);
  salvar(itens);
}

export const limpar = () => salvar([]);
export const totalItens = () => lerCarrinho().reduce((s, i) => s + i.quantidade, 0);
export const valorCarrinho = () => subtotal(lerCarrinho());
