import type { Desenho } from "./servicos";

// SIMULADO: todas as obras são exemplos. Substituir por obras reais, com fotos e autorização do cliente.

export const categorias = ["Residencial", "Reforma", "Comercial", "Regularização"] as const;
export type Categoria = (typeof categorias)[number];

export interface Obra {
  slug: string;
  titulo: string;
  categoria: Categoria;
  desenho: Desenho;
  local: string;
  area: string;
  prazo: string;
  resumo: string;
  desafio: string;
  solucao: string;
  resultado: string;
}

export const obras: Obra[] = [
  {
    slug: "casa-terrea-familia-exemplo",
    titulo: "Casa térrea de 3 quartos",
    categoria: "Residencial",
    desenho: "casa",
    local: "Cidade a confirmar",
    area: "142 m²",
    prazo: "9 meses",
    resumo: "Casa da família construída do zero, com acompanhamento semanal à distância.",
    desafio:
      "Os proprietários moravam em outra cidade e não conseguiriam visitar a obra com frequência.",
    solucao:
      "Relatórios semanais com fotos e vídeo curto de cada etapa, e reuniões on-line nas decisões de acabamento.",
    resultado: "Entrega no prazo combinado, com todas as decisões registradas por escrito.",
  },
  {
    slug: "sobrado-geminado-exemplo",
    titulo: "Sobrados geminados",
    categoria: "Residencial",
    desenho: "sobrado",
    local: "Cidade a confirmar",
    area: "2 × 118 m²",
    prazo: "11 meses",
    resumo: "Dois sobrados no mesmo lote, construídos ao mesmo tempo para otimizar custos.",
    desafio: "Lote estreito e orçamento fechado para as duas unidades.",
    solucao:
      "Projeto estrutural compartilhado e compra de materiais em lote, com cronograma único para as duas casas.",
    resultado: "Economia na compra de materiais e as duas unidades prontas para venda.",
  },
  {
    slug: "reforma-apartamento-exemplo",
    titulo: "Reforma completa de apartamento",
    categoria: "Reforma",
    desenho: "reforma",
    local: "Cidade a confirmar",
    area: "78 m²",
    prazo: "10 semanas",
    resumo: "Troca de pisos, cozinha integrada e parte elétrica refeita.",
    desafio: "Retirada de parede em prédio com regras rígidas do condomínio.",
    solucao:
      "Avaliação estrutural antes da demolição, laudo para o síndico e horários de obra combinados com o condomínio.",
    resultado: "Cozinha integrada com segurança e sem reclamação dos vizinhos.",
  },
  {
    slug: "ampliacao-residencia-exemplo",
    titulo: "Ampliação com segundo pavimento",
    categoria: "Reforma",
    desenho: "sobrado",
    local: "Cidade a confirmar",
    area: "+64 m²",
    prazo: "5 meses",
    resumo: "Novo andar sobre casa existente, com a família morando no imóvel.",
    desafio: "A estrutura original não tinha sido pensada para receber outro pavimento.",
    solucao:
      "Reforço estrutural projetado e executado antes da ampliação, com ART de projeto e de obra.",
    resultado: "Dois quartos novos e o imóvel regularizado na prefeitura.",
  },
  {
    slug: "loja-de-rua-exemplo",
    titulo: "Loja de rua",
    categoria: "Comercial",
    desenho: "comercial",
    local: "Cidade a confirmar",
    area: "210 m²",
    prazo: "7 semanas",
    resumo: "Adequação de imóvel antigo para uma loja com data de inauguração marcada.",
    desafio: "Prazo curto e exigências do Corpo de Bombeiros para liberar o funcionamento.",
    solucao: "Obra dividida em frentes simultâneas e documentação preparada desde o primeiro dia.",
    resultado: "Inauguração na data prevista.",
  },
  {
    slug: "regularizacao-imovel-exemplo",
    titulo: "Regularização para financiamento",
    categoria: "Regularização",
    desenho: "planta",
    local: "Cidade a confirmar",
    area: "96 m²",
    prazo: "4 meses",
    resumo: "Imóvel construído sem projeto aprovado, regularizado para a venda com financiamento.",
    desafio: "A venda dependia da averbação da construção, exigida pelo banco.",
    solucao:
      "Levantamento do imóvel, projeto de regularização e acompanhamento do processo na prefeitura.",
    resultado: "Construção averbada e venda concluída.",
  },
];
