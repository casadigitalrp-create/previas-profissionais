// Dados gerais da Construtora TN.
// Prévia demonstrativa: tudo marcado como SIMULADO ou A CONFIRMAR precisa ser validado com o Tiago.

export const site = {
  nome: "Construtora TN",
  nomeCurto: "TN",
  slogan: "Sua obra no prazo, no orçamento e sem surpresa.",
  responsavel: "Tiago Nascimento, engenheiro civil",
  crea: "CREA a confirmar", // A CONFIRMAR: registro da empresa e do responsável técnico
  cidade: "Região de atendimento a confirmar", // A CONFIRMAR
  whatsapp: "", // contato desativado nesta prévia
  email: "", // contato desativado nesta prévia
  instagram: "", // A CONFIRMAR
  horario: "Segunda a sexta, 8h às 18h", // SIMULADO
};

/** Caminho de arquivo respeitando o `base` da prévia. */
export const url = (caminho = "") =>
  `${import.meta.env.BASE_URL.replace(/\/?$/, "/")}${caminho.replace(/^\/+/, "")}`;

/** Sem WhatsApp confirmado, as chamadas levam para a página de orçamento. */
export const whatsappLink = (
  msg = "Olá! Vim pelo site da Construtora TN e quero conversar sobre uma obra.",
) =>
  site.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`
    : url("orcamento/");

export const menu = [
  { href: "", rotulo: "Início" },
  { href: "sobre/", rotulo: "Sobre" },
  { href: "servicos/", rotulo: "Serviços" },
  { href: "obras/", rotulo: "Obras" },
  { href: "dicas/", rotulo: "Dicas" },
  { href: "orcamento/", rotulo: "Orçamento" },
];

export const rodapeLinks = [
  { href: "trabalhe-conosco/", rotulo: "Trabalhe conosco" },
  { href: "politica-de-privacidade/", rotulo: "Política de privacidade" },
];

export const numeros = [
  { valor: "12+", rotulo: "anos de experiência" },
  { valor: "80+", rotulo: "obras acompanhadas" },
  { valor: "100%", rotulo: "obras com ART" },
  { valor: "1", rotulo: "relatório por semana, sempre" },
]; // SIMULADO: substituir pelos números reais

/** O que faz as pessoas terem medo de construir, e como a TN responde. */
export const dores = [
  {
    medo: "“A obra vai atrasar.”",
    cuidado:
      "Cronograma por etapa antes de começar e acompanhamento semanal. Se algo mudar, você fica sabendo na hora, com o motivo e o novo prazo.",
  },
  {
    medo: "“O orçamento vai estourar.”",
    cuidado:
      "Orçamento detalhado por etapa, com o que está e o que não está incluído. Nenhum custo extra sem a sua aprovação por escrito.",
  },
  {
    medo: "“A empresa vai sumir no meio da obra.”",
    cuidado:
      "Empresa com registro no CREA, contrato assinado e ART de cada serviço. Você sabe quem é o responsável técnico e como falar com ele.",
  },
  {
    medo: "“Não vou entender o que estão fazendo.”",
    cuidado:
      "Relatório semanal com fotos e explicação em linguagem simples. Sem termo técnico sem tradução.",
  },
  {
    medo: "“Vão esconder problema embaixo do reboco.”",
    cuidado:
      "Registro fotográfico das etapas que somem depois: fundação, ferragem, tubulação e parte elétrica.",
  },
  {
    medo: "“A papelada vai me travar.”",
    cuidado:
      "Orientação e acompanhamento do alvará, da ART e do habite-se, do projeto à entrega das chaves.",
  },
];

export const etapas = [
  {
    titulo: "Conversa e visita",
    texto:
      "Entendemos o que você quer, visitamos o terreno ou imóvel e tiramos as primeiras dúvidas.",
  },
  {
    titulo: "Projeto e orçamento",
    texto: "Projeto, orçamento por etapa e cronograma. Você aprova tudo antes de qualquer tijolo.",
  },
  {
    titulo: "Documentação",
    texto: "Contrato, ART e alvará encaminhados. A obra só começa com a papelada em ordem.",
  },
  {
    titulo: "Obra acompanhada",
    texto: "Execução com relatório semanal de fotos, gastos e próximos passos.",
  },
  {
    titulo: "Entrega e garantia",
    texto: "Vistoria final com você, entrega das chaves, manual da obra e suporte na garantia.",
  },
];

export const depoimentos = [
  {
    nome: "Cliente Exemplo 1",
    papel: "Construiu a casa da família",
    texto: "Depoimento ilustrativo. Substituir por relato real, com autorização do cliente.",
  },
  {
    nome: "Cliente Exemplo 2",
    papel: "Reformou o apartamento",
    texto: "Depoimento ilustrativo. Substituir por relato real, com autorização do cliente.",
  },
  {
    nome: "Cliente Exemplo 3",
    papel: "Ampliou a loja",
    texto: "Depoimento ilustrativo. Substituir por relato real, com autorização do cliente.",
  },
]; // SIMULADO

export const faq = [
  {
    p: "Quanto custa construir uma casa?",
    r: "Depende do tamanho, do padrão de acabamento e do terreno. Por isso o orçamento é feito por etapa, depois da visita, mostrando o que entra em cada valor.",
  },
  {
    p: "Vocês fazem o projeto ou só a obra?",
    r: "Os dois. Você pode contratar só o projeto, só a execução com um projeto que já tem, ou o pacote completo.",
  },
  {
    p: "O que é ART e por que importa?",
    r: "É a Anotação de Responsabilidade Técnica, registrada no CREA. Ela mostra quem responde tecnicamente pelo serviço. Toda obra da TN tem ART.",
  },
  {
    p: "Como eu acompanho a obra se não puder ir lá?",
    r: "Você recebe um relatório semanal com fotos, o que foi feito, o que foi gasto e o que vem a seguir.",
  },
  {
    p: "E se eu quiser mudar algo no meio da obra?",
    r: "Pode. A mudança é orçada à parte e só entra depois que você aprovar o novo valor e o novo prazo.",
  },
  {
    p: "Vocês atendem em quais cidades?",
    r: "A região de atendimento será confirmada antes da versão final do site.",
  },
]; // A CONFIRMAR com o Tiago
