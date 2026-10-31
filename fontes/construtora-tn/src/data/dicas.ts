// Artigos de exemplo para a área de dicas. A CONFIRMAR: revisão técnica do Tiago antes de publicar.

export interface Dica {
  slug: string;
  titulo: string;
  resumo: string;
  leitura: string;
  blocos: { subtitulo?: string; texto: string }[];
}

export const dicas: Dica[] = [
  {
    slug: "o-que-entra-no-orcamento-de-uma-casa",
    titulo: "O que entra no orçamento de uma casa (e o que costuma ficar de fora)",
    resumo: "Saber o que está incluído evita a maior parte das surpresas no meio da obra.",
    leitura: "4 min",
    blocos: [
      {
        texto:
          "Dois orçamentos com valores muito diferentes quase nunca estão falando da mesma obra. Antes de comparar o preço, compare o que cada um inclui.",
      },
      {
        subtitulo: "Normalmente incluído",
        texto:
          "Fundação, estrutura, alvenaria, cobertura, instalações elétricas e hidráulicas, revestimentos e mão de obra. Em um bom orçamento, cada item aparece separado por etapa.",
      },
      {
        subtitulo: "O que costuma ficar de fora",
        texto:
          "Taxas da prefeitura, ligação de água e energia, muros, paisagismo, móveis planejados e acabamentos acima do padrão combinado. Pergunte sobre cada um antes de assinar.",
      },
      {
        subtitulo: "Reserve uma margem",
        texto:
          "Mesmo com planejamento, imprevistos acontecem, principalmente no solo e em reformas. Ter uma reserva para eles traz tranquilidade e evita parar a obra.",
      },
    ],
  },
  {
    slug: "como-evitar-que-a-obra-atrase",
    titulo: "Como evitar que a sua obra atrase",
    resumo: "Atraso raramente é azar. Na maior parte das vezes é falta de planejamento.",
    leitura: "3 min",
    blocos: [
      {
        texto:
          "Estudos sobre obras no Brasil apontam a falta de planejamento, a gestão fraca e o atraso na entrega de materiais entre as principais causas de atraso.",
      },
      {
        subtitulo: "Cronograma por etapa",
        texto:
          "Peça um cronograma que mostre cada etapa com início e fim. Assim dá para saber cedo se algo saiu do ritmo.",
      },
      {
        subtitulo: "Decida os acabamentos antes",
        texto:
          "Trocar piso, louça ou janela no meio da obra muda prazo e custo. Quanto mais decisões antes de começar, menos paradas depois.",
      },
      {
        subtitulo: "Acompanhe toda semana",
        texto:
          "Um relatório semanal com fotos mostra o avanço real e evita descobrir um problema só no fim.",
      },
    ],
  },
  {
    slug: "alvara-art-e-habite-se",
    titulo: "Alvará, ART e habite-se: o que é cada um",
    resumo: "Três documentos que todo mundo ouve falar e pouca gente sabe para que servem.",
    leitura: "3 min",
    blocos: [
      {
        subtitulo: "Alvará de construção",
        texto:
          "Autorização da prefeitura para começar a obra, a partir do projeto aprovado. Construir sem ele pode gerar multa e embargo.",
      },
      {
        subtitulo: "ART",
        texto:
          "A Anotação de Responsabilidade Técnica é registrada no CREA e identifica o profissional responsável pelo projeto ou pela execução. Ela protege você e deixa claro quem responde pela obra.",
      },
      {
        subtitulo: "Habite-se",
        texto:
          "Documento da prefeitura que confirma que a obra foi concluída de acordo com o projeto aprovado. Ele costuma ser exigido para averbar a construção na matrícula, vender ou financiar o imóvel.",
      },
      {
        texto:
          "As exigências mudam de cidade para cidade. Confirme na prefeitura do seu município o que vale para o seu caso.",
      },
    ],
  },
];
