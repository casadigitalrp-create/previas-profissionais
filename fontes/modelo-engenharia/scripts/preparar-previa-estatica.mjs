// Ajusta a saída estática original para a revisão no GitHub Pages.
// Use somente sobre uma cópia ainda não alterada de dist/ dentro de docs/.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const docs = join(dirname(fileURLToPath(import.meta.url)), "..", "docs");
const index = join(docs, "index.html");
let html = readFileSync(index, "utf8");
if (!html.includes("tiagonascimento.example.com") || !html.includes("CREA-SP 0000000/D")) {
  throw new Error("A saída não corresponde à versão original esperada.");
}

const replace = (before, after) => {
  if (!html.includes(before)) throw new Error(`Trecho não encontrado: ${before.slice(0, 60)}`);
  html = html.split(before).join(after);
};

replace("<title>Tiago Nascimento | Engenharia Civil em São Paulo</title>", "<title>Prévia para aprovação | Tiago Nascimento</title>");
replace(
  "Projetos estruturais, laudos, vistorias, reformas e gestão de obras com solidez, transparência e cuidado. Peça seu orçamento.",
  "Prévia demonstrativa de site. Conteúdo, imagens, serviços e contatos aguardam confirmação do profissional.",
);
replace("<meta charset=\"utf-8\">", "<meta charset=\"utf-8\"><meta name=\"robots\" content=\"noindex, nofollow\">");
html = html.replace(/<script type="application\/ld\+json">.*?<\/script>/, "");
replace("https://tiagonascimento.example.com", "https://casadigitalrp-create.github.io/TiagoNascimento-Previa");
replace('href="/sitemap-index.xml"', 'href="/TiagoNascimento-Previa/sitemap-index.xml"');
html = html.replaceAll('"/img/', '"/TiagoNascimento-Previa/img/');
html = html.replaceAll('"/_astro/', '"/TiagoNascimento-Previa/_astro/');

replace(
  "<main>",
  '<main><aside aria-label="Aviso da prévia" style="background:#f28c28;color:#07152a;padding:84px 20px 12px;text-align:center;font:600 14px/1.5 Arial,sans-serif">PRÉVIA PARA APROVAÇÃO — Informações pessoais, serviços, obras, números e imagens são ilustrativos. Contatos e envio de formulário estão desativados.</aside>',
);
html = html.replace(/href="https:\/\/wa\.me\/5511900000000[^"]*"/g, 'href="#contato"');
html = html.replace(/href="mailto:contato@exemplo\.com\.br"/g, 'href="#contato"');
html = html.replace(/<a href="#contato" aria-label="Falar no WhatsApp".*?<\/a>/, "");
replace("CREA-SP 0000000/D", "Registro CREA a confirmar");
replace("(11) 90000-0000", "a confirmar");
replace("contato@exemplo.com.br", "a confirmar");
html = html.replaceAll('<a class="font-semibold underline decoration-obra underline-offset-4" href="#contato">a confirmar</a>', '<strong>a confirmar</strong>');
html = html.replaceAll('<a href="#contato" class="hover:text-obra">a confirmar</a>', '<span>a confirmar</span>');
html = html.replace(/<a href="#contato" class="hover:text-obra">WhatsApp a confirmar<\/a>/, "WhatsApp: a confirmar");
replace("São Paulo, SP", "Região de atendimento a confirmar");
replace("Solicitar orçamento", "Ver contato");
replace(
  "Sou Tiago Nascimento, engenheiro civil. Saí da Bahia com um sonho e hoje levo essa mesma garra para o seu projeto, seu laudo ou sua obra em São Paulo.",
  "Esta é uma proposta visual para apresentar o trabalho de Tiago Nascimento. A trajetória, os serviços e os dados profissionais serão confirmados antes da versão final.",
);
replace("Da Bahia a São Paulo: construir um caminho antes de construir obras", "História ilustrativa para validação");
replace("Trabalhos em destaque", "Exemplos visuais de trabalhos");
replace(
  "Formado em Engenharia Civil, atuo com projetos, laudos e acompanhamento de obras. Acredito que uma boa obra começa na escuta: entender o que o cliente precisa, explicar cada decisão técnica e entregar o que foi combinado.",
  "Nesta prévia, esta área mostra uma proposta de apresentação profissional. Formação, serviços e forma de atendimento serão confirmados com Tiago antes da versão final.",
);
replace("Responsabilidade técnica com ART", "Responsabilidade técnica a confirmar");
replace("Foto e número do CREA simulados (a confirmar).", "Imagem ilustrativa e registro CREA a confirmar.");
replace(
  "Hoje, com o CREA no bolso, leva para cada cliente a mesma garra: construir com solidez, honestidade e cuidado.",
  "Nesta prévia, a formação e o registro profissional serão confirmados com Tiago antes da versão final.",
);
replace("Contatos simulados (a confirmar).", "Os contatos ainda não estão ativos nesta prévia.");
replace(
  "Conte o que você precisa. Respondo com uma proposta clara e sem compromisso.",
  "Os canais de contato serão definidos com Tiago. Este formulário é apenas uma demonstração visual.",
);
replace(
  '<form id="form-contato" class="reveal bg-white/5 p-6 ring-1 ring-white/15 backdrop-blur sm:p-8" novalidate>',
  '<form id="form-contato" class="reveal bg-white/5 p-6 ring-1 ring-white/15 backdrop-blur sm:p-8" novalidate><p style="border-left:4px solid #f28c28;padding-left:12px;margin-bottom:20px;font-weight:600">Formulário ilustrativo. Não informe dados reais: nada será enviado.</p>',
);
replace(
  "Concordo em compartilhar estes dados para receber retorno sobre meu orçamento. Eles não serão usados para outra finalidade.",
  "Entendo que este formulário é uma demonstração e não envia dados.",
);
replace("Enviar solicitação", "Testar formulário sem envio");
replace("Recebido! (modo demonstração: nenhum dado foi enviado)", "Demonstração concluída. Nenhum dado foi enviado.");
replace("Preencha nome, WhatsApp e aceite o termo para continuar.", "Preencha os campos e confirme que entende o modo de demonstração.");
replace(
  "Você envia os dados pelo formulário ou pelo WhatsApp, eu entendo a demanda e retorno com uma proposta clara, sem compromisso.",
  "Na versão final, o canal de contato será definido com Tiago. O formulário desta prévia não envia dados.",
);
replace("Atendimento em São Paulo e região. Consulte para outras cidades.", "A região de atendimento será confirmada com o profissional antes da publicação final.");
replace("Sim. Os trabalhos técnicos são acompanhados da ART (Anotação de Responsabilidade Técnica) quando aplicável.", "A emissão de ART depende do serviço e da responsabilidade técnica. Informação a confirmar com o profissional.");

writeFileSync(index, html);
const cssPath = join(docs, "_astro", "index.SGqZUk9Q.css");
const css = readFileSync(cssPath, "utf8").replaceAll("/_astro/", "/TiagoNascimento-Previa/_astro/");
writeFileSync(cssPath, css);
for (const name of ["sitemap-0.xml", "sitemap-index.xml"]) {
  const path = join(docs, name);
  writeFileSync(path, readFileSync(path, "utf8").replaceAll("https://tiagonascimento.example.com", "https://casadigitalrp-create.github.io/TiagoNascimento-Previa"));
}
writeFileSync(join(docs, "robots.txt"), "User-agent: *\nDisallow: /\n");
writeFileSync(join(docs, ".nojekyll"), "");
console.log("Prévia estática ajustada em docs/.");
