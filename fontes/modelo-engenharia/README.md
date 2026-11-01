# Site – Tiago Nascimento | Engenharia Civil

Astro (estático) + TypeScript + Tailwind 4 + Biome. Node 24, pnpm.

## Estado desta prévia

Esta versão é uma apresentação visual para aprovação. Textos biográficos, números,
serviços, obras, depoimentos e imagens são ilustrativos. O registro CREA, a região
de atendimento e os canais de contato aguardam confirmação. O formulário funciona
somente como demonstração e não envia dados.

A prévia pública será servida pelo GitHub Pages em
`https://casadigitalrp-create.github.io/TiagoNascimento-Previa/`.
O projeto está configurado com `base: "/TiagoNascimento-Previa"`, metatag `noindex`
e `robots.txt` com `Disallow: /`.

## Comandos
- `pnpm dev` — prévia local em http://localhost:4321
- `pnpm build` — checa tipos e gera `dist/`
- `pnpm lint` / `pnpm format` — Biome
- `node scripts/gerar-imagens.mjs` — regenera logo e ilustrações SIMULADAS

## Onde editar
- **Textos, contatos, serviços, portfólio, FAQ:** `src/data/site.ts` (itens SIMULADOS estão comentados).
- **Cores e fontes:** `src/styles/global.css` (bloco `@theme`).
- **Imagens:** `public/img/` (substitua as ilustrações por fotos reais mantendo os nomes, ou ajuste `site.ts`).
- **Domínio:** `site` em `astro.config.mjs` e `public/robots.txt`.

## Antes da versão final (pendências)
- [ ] CREA, WhatsApp, e-mail, Instagram reais
- [ ] Fotos reais (retrato, obras) e história real do Tiago
- [ ] Depoimentos e números reais (hoje são exemplos)
- [ ] Domínio real e remoção da configuração de prévia no `astro.config.mjs`
- [ ] Ligar o formulário ao n8n (hoje roda em modo demonstração) e definir política de privacidade/LGPD
- [ ] Revisar todos os textos e remover a etiqueta de prévia somente após aprovação

## Publicação desta prévia no GitHub Pages

O diretório `docs/` contém a saída estática que veio no pacote original, ajustada
para a revisão com `scripts/preparar-previa-estatica.mjs`. O pacote original não
foi incluído no repositório. O build a partir do código fonte deve ser repetido
em um ambiente com as dependências instaladas corretamente antes da versão final.

No GitHub Pages, selecione a branch `main` e a pasta `/docs`. O arquivo
`docs/.nojekyll` evita o processamento desnecessário pelo Jekyll.

## Cloudflare Pages
- Framework preset: Astro
- Build command: `pnpm build`
- Output directory: `dist`
- Variável: `NODE_VERSION=24`
Use estas instruções de Cloudflare apenas para a versão final, após confirmação
de conteúdo, contatos e domínio.
