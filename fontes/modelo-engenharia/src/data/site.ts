// Todo o conteúdo editável do site fica aqui.
// Conteúdo desta prévia é ilustrativo. Confirme os dados antes da versão final.

export const site = {
  nome: "Tiago Nascimento",
  titulo: "Engenharia Civil",
  assinatura: "Do sertão baiano aos canteiros de São Paulo.",
  cidade: "Região de atendimento a confirmar",
  crea: "Registro CREA a confirmar",
  whatsapp: "", // contato desativado nesta prévia
  whatsappExibicao: "a confirmar",
  email: "", // contato desativado nesta prévia
  instagram: "", // canal a confirmar
  dominio: "https://casadigitalrp-create.github.io/TiagoNascimento-Previa/",
};

export const asset = (path: string) =>
  `${import.meta.env.BASE_URL.replace(/\/?$/, "/")}${path.replace(/^\/+/, "")}`;

export const whatsappLink = (msg = "Olá, Tiago! Vim pelo site e gostaria de um orçamento.") =>
  site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}` : "#contato";

export const menu = [
  { href: "#servicos", rotulo: "Serviços" },
  { href: "#historia", rotulo: "Minha história" },
  { href: "#portfolio", rotulo: "Portfólio" },
  { href: "#depoimentos", rotulo: "Depoimentos" },
  { href: "#faq", rotulo: "Dúvidas" },
  { href: "#contato", rotulo: "Contato" },
];

export const slides = [
  { src: asset("img/hero-bahia.svg"), legenda: "Onde tudo começou: Bahia" },
  { src: asset("img/hero-sao-paulo.svg"), legenda: "Onde a história foi construída: São Paulo" },
  { src: asset("img/hero-obra.svg"), legenda: "No canteiro, com a mão na massa" },
  { src: asset("img/hero-projeto.svg"), legenda: "No projeto, com precisão" },
];

export const numeros = [
  { valor: "12+", rotulo: "anos de estrada" },
  { valor: "80+", rotulo: "obras acompanhadas" },
  { valor: "100%", rotulo: "foco no cliente" },
  { valor: "1", rotulo: "sonho cumprido" },
]; // SIMULADO — substituir pelos números reais

export const servicos = [
  {
    icone: "estrutura",
    titulo: "Projetos estruturais",
    texto: "Dimensionamento e detalhamento com segurança, economia e atenção às normas técnicas.",
  },
  {
    icone: "obra",
    titulo: "Execução e gestão de obras",
    texto: "Acompanhamento de cronograma, custos e qualidade para a obra sair como planejada.",
  },
  {
    icone: "laudo",
    titulo: "Laudos e vistorias",
    texto: "Laudos cautelares, inspeções e pareceres técnicos claros e bem fundamentados.",
  },
  {
    icone: "reforma",
    titulo: "Reformas e regularização",
    texto: "Da ampliação à regularização do imóvel, com orientação em cada etapa.",
  },
]; // A CONFIRMAR com o Tiago

export const historia = [
  {
    ano: "O começo",
    titulo: "Bahia",
    texto:
      "Criado na Bahia, aprendeu cedo que estudo era o caminho. Entre aulas, trabalho e muita vontade, começou a desenhar o futuro.",
  },
  {
    ano: "A decisão",
    titulo: "A mala e o sonho",
    texto:
      "Deixou a família e a terra natal com poucas coisas na mala e uma certeza: estudar Engenharia Civil em São Paulo.",
  },
  {
    ano: "A luta",
    titulo: "Estudar e trabalhar",
    texto:
      "Dias longos, ônibus lotado, estágio de manhã e faculdade à noite. Cada prova vencida foi uma obra entregue.",
  },
  {
    ano: "A conquista",
    titulo: "Engenheiro civil",
    texto:
      "A proposta desta seção é apresentar sua atuação profissional. Formação e registro serão confirmados com Tiago.",
  },
]; // SIMULADO — história ilustrativa. Substituir pela trajetória real do Tiago.

export const portfolio = [
  {
    img: asset("img/obra-residencial.svg"),
    titulo: "Residência unifamiliar",
    tipo: "Projeto e execução",
  },
  { img: asset("img/obra-estrutural.svg"), titulo: "Edifício comercial", tipo: "Projeto estrutural" },
  { img: asset("img/obra-laudo.svg"), titulo: "Laudo cautelar", tipo: "Vistoria técnica" },
  { img: asset("img/obra-reforma.svg"), titulo: "Reforma de sobrado", tipo: "Reforma e regularização" },
]; // SIMULADO — trocar por fotos reais das obras

export const depoimentos = [
  {
    nome: "Cliente Exemplo 1",
    papel: "Proprietária de residência",
    texto: "Depoimento ilustrativo. Substituir por relato real, com autorização do cliente.",
  },
  {
    nome: "Cliente Exemplo 2",
    papel: "Construtora parceira",
    texto: "Depoimento ilustrativo. Substituir por relato real, com autorização do cliente.",
  },
  {
    nome: "Cliente Exemplo 3",
    papel: "Síndico de condomínio",
    texto: "Depoimento ilustrativo. Substituir por relato real, com autorização do cliente.",
  },
]; // SIMULADO

export const faq = [
  {
    p: "Como funciona o orçamento?",
    r: "Na versão final, o canal de contato será definido com Tiago. O formulário desta prévia não envia dados.",
  },
  {
    p: "Vocês atendem em quais regiões?",
    r: "A região de atendimento será confirmada com o profissional antes da publicação final.",
  },
  {
    p: "Quanto tempo leva um laudo ou projeto?",
    r: "O prazo depende da complexidade. Informo uma estimativa realista na proposta.",
  },
  {
    p: "Os serviços emitem ART?",
    r: "A emissão de ART depende do serviço e da responsabilidade técnica. Informação a confirmar com o profissional.",
  },
]; // A CONFIRMAR
