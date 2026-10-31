// Cardápio FICTÍCIO. Preços em centavos para evitar erro de arredondamento.

export type Desenho =
  | "burger"
  | "duplo"
  | "frango"
  | "hotdog"
  | "batata"
  | "bebida"
  | "milkshake"
  | "doce";

export interface Adicional {
  id: string;
  nome: string;
  preco: number;
}

export interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  desenho: Desenho;
  destaque?: boolean;
  adicionais?: string[];
}

export const adicionais: Adicional[] = [
  { id: "bacon", nome: "Bacon", preco: 400 },
  { id: "cheddar", nome: "Cheddar cremoso", preco: 300 },
  { id: "ovo", nome: "Ovo", preco: 250 },
  { id: "carne", nome: "Carne extra (150 g)", preco: 900 },
  { id: "cebola", nome: "Cebola caramelizada", preco: 250 },
  { id: "molho", nome: "Molho da casa extra", preco: 200 },
];

export const categorias = [
  { id: "lanches", nome: "Lanches" },
  { id: "porcoes", nome: "Porções" },
  { id: "bebidas", nome: "Bebidas" },
  { id: "sobremesas", nome: "Sobremesas" },
];

const paraLanches = ["bacon", "cheddar", "ovo", "carne", "cebola", "molho"];

export const produtos: Produto[] = [
  {
    id: "classico",
    nome: "Clássico do Bairro",
    descricao: "Pão brioche, carne 150 g, queijo prato, alface, tomate e molho da casa.",
    preco: 2690,
    categoria: "lanches",
    desenho: "burger",
    destaque: true,
    adicionais: paraLanches,
  },
  {
    id: "duplo-bacon",
    nome: "Duplo Bacon",
    descricao: "Duas carnes de 150 g, cheddar, bacon crocante e cebola caramelizada.",
    preco: 3890,
    categoria: "lanches",
    desenho: "duplo",
    destaque: true,
    adicionais: paraLanches,
  },
  {
    id: "frango-crocante",
    nome: "Frango Crocante",
    descricao: "Sobrecoxa empanada, maionese de ervas, picles e repolho roxo.",
    preco: 2890,
    categoria: "lanches",
    desenho: "frango",
    adicionais: paraLanches,
  },
  {
    id: "salada",
    nome: "X-Salada da Casa",
    descricao: "Carne 120 g, queijo, presunto, alface, tomate, milho e batata palha.",
    preco: 2290,
    categoria: "lanches",
    desenho: "burger",
    adicionais: paraLanches,
  },
  {
    id: "dogao",
    nome: "Dogão Completo",
    descricao: "Duas salsichas, purê, vinagrete, milho, batata palha e queijo ralado.",
    preco: 1990,
    categoria: "lanches",
    desenho: "hotdog",
    adicionais: ["bacon", "cheddar", "molho"],
  },
  {
    id: "batata",
    nome: "Batata frita",
    descricao: "Porção de 400 g, crocante por fora e macia por dentro.",
    preco: 1890,
    categoria: "porcoes",
    desenho: "batata",
    destaque: true,
    adicionais: ["cheddar", "bacon"],
  },
  {
    id: "onion",
    nome: "Anéis de cebola",
    descricao: "12 anéis empanados com molho barbecue.",
    preco: 2190,
    categoria: "porcoes",
    desenho: "batata",
  },
  {
    id: "refri-lata",
    nome: "Refrigerante lata",
    descricao: "350 ml. Escolha o sabor na observação.",
    preco: 650,
    categoria: "bebidas",
    desenho: "bebida",
  },
  {
    id: "suco",
    nome: "Suco natural",
    descricao: "500 ml. Laranja, limão ou maracujá.",
    preco: 990,
    categoria: "bebidas",
    desenho: "bebida",
  },
  {
    id: "milkshake",
    nome: "Milkshake",
    descricao: "400 ml. Chocolate, morango ou ovomaltine.",
    preco: 1690,
    categoria: "sobremesas",
    desenho: "milkshake",
  },
  {
    id: "brownie",
    nome: "Brownie com sorvete",
    descricao: "Brownie quentinho com uma bola de sorvete de creme.",
    preco: 1590,
    categoria: "sobremesas",
    desenho: "doce",
  },
];
