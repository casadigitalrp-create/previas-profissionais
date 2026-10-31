// Serviços da Construtora TN. A CONFIRMAR com o Tiago: lista, escopo e o que cada um inclui.

export type Desenho = "casa" | "sobrado" | "comercial" | "reforma" | "planta" | "laudo";

export interface Servico {
  slug: string;
  titulo: string;
  resumo: string;
  paraQuem: string;
  inclui: string[];
  desenho: Desenho;
}

export const servicos: Servico[] = [
  {
    slug: "construcao-residencial",
    titulo: "Construção de casas",
    resumo: "Da fundação à entrega das chaves, com orçamento por etapa e acompanhamento semanal.",
    paraQuem: "Quem tem o terreno e quer construir sem virar mestre de obras nas horas vagas.",
    inclui: [
      "Projeto arquitetônico e complementares, ou execução de projeto existente",
      "Orçamento detalhado por etapa e cronograma",
      "Compra e controle de materiais",
      "Equipe própria e parceiros acompanhados",
      "ART, alvará e apoio no habite-se",
      "Relatório semanal com fotos",
    ],
    desenho: "casa",
  },
  {
    slug: "reformas-e-ampliacoes",
    titulo: "Reformas e ampliações",
    resumo:
      "Mais espaço, novo acabamento ou correção de problemas, sem transformar a casa num canteiro sem fim.",
    paraQuem: "Quem vai reformar casa, apartamento ou ponto comercial e quer prazo combinado.",
    inclui: [
      "Vistoria do imóvel antes do orçamento",
      "Avaliação estrutural quando houver demolição ou ampliação",
      "Plano de obra para quem continua morando no local",
      "Orçamento por etapa e cronograma",
      "ART e regularização da ampliação",
    ],
    desenho: "reforma",
  },
  {
    slug: "obras-comerciais",
    titulo: "Obras comerciais",
    resumo:
      "Lojas, escritórios e galpões entregues no prazo que o seu negócio precisa para abrir as portas.",
    paraQuem: "Empresas que não podem perder dias de faturamento com obra atrasada.",
    inclui: [
      "Planejamento com a data de inauguração como meta",
      "Adequação às exigências da prefeitura e do Corpo de Bombeiros",
      "Execução em etapas para reduzir o tempo parado",
      "ART e documentação para o alvará de funcionamento",
    ],
    desenho: "comercial",
  },
  {
    slug: "projetos-e-regularizacao",
    titulo: "Projetos e regularização",
    resumo:
      "Projeto estrutural, aprovação na prefeitura e regularização de imóveis construídos sem documentação.",
    paraQuem: "Quem precisa aprovar um projeto, vender ou financiar um imóvel irregular.",
    inclui: [
      "Projeto estrutural com memória de cálculo",
      "Levantamento do imóvel existente",
      "Encaminhamento do processo na prefeitura",
      "ART do projeto e acompanhamento até a aprovação",
    ],
    desenho: "planta",
  },
  {
    slug: "laudos-e-vistorias",
    titulo: "Laudos e vistorias",
    resumo:
      "Laudo cautelar de vizinhança, inspeção predial e parecer técnico explicados em linguagem clara.",
    paraQuem: "Proprietários, condomínios e quem vai comprar ou construir ao lado de outro imóvel.",
    inclui: [
      "Vistoria com registro fotográfico",
      "Laudo técnico com ART",
      "Explicação dos resultados e próximos passos",
    ],
    desenho: "laudo",
  },
];
