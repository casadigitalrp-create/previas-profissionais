# Prévia: Construtora TN

Primeiro modelo **multipáginas** da CasaDigitalRP. Astro estático + TypeScript estrito + Tailwind 4 + Biome, Node 24 e pnpm.
O build grava direto em `../../construtora-tn/`, servido pelo GitHub Pages da galeria.

## Páginas
Início, Sobre, Serviços (+ 1 página por serviço), Obras (filtro + 1 página por obra), Dicas (+ artigos),
Orçamento, Trabalhe conosco, Política de privacidade e 404.

## Onde editar
- Empresa, números, dores, etapas, depoimentos, FAQ: `src/data/site.ts`
- Serviços: `src/data/servicos.ts` · Obras: `src/data/obras.ts` · Dicas: `src/data/dicas.ts`
- Cores e fontes (claro/escuro): `src/styles/global.css`

## Pendências para a versão final
- [ ] CREA da empresa e do responsável técnico, WhatsApp, e-mail, região de atendimento
- [ ] Fotos reais das obras (hoje são ilustrações) com autorização dos clientes
- [ ] Números, depoimentos, vagas e história reais
- [ ] Revisão técnica do Tiago nas dicas
- [ ] Ligar formulários ao n8n e revisar política de privacidade (LGPD)
- [ ] Confirmar regras de publicidade no Código de Ética do CONFEA (não foi possível ler o texto oficial)
- [ ] Domínio próprio e remoção do `noindex`/aviso de prévia
