# Catálogo de modelos da CasaDigitalRP

A página inicial (`index.html`) apresenta os modelos por estilo e código (códigos estáveis), sem nomes de clientes, com filtros por segmento e formato e botão de WhatsApp com o modelo escolhido. Site estático com 11 modelos publicados neste repositório. Todos os links de modelos da página inicial apontam para pastas deste catálogo.

## Novos modelos

- M02 Psicologia · Sálvia: `modelo-psicologia/`
- M03 Nutrição · Brisa: `modelo-nutricao/`
- M04 Personal trainer · Pop: `modelo-personal/`
- M05 Fisioterapia · Traço: `modelo-fisioterapia/`
- Lanche do Bairro (pedidos online, marca fictícia): `lanchonete/`, gerado a partir de `fontes/lanchonete/`
- Construtora TN (multipáginas): `construtora-tn/`, gerado a partir de `fontes/construtora-tn/` (`pnpm install && pnpm build`, Node 24)

Estas páginas são demonstrações para avaliação. Informações profissionais, textos, imagens e contatos provisórios exigem validação antes de qualquer site final. Os HTMLs têm `noindex, nofollow` e um aviso visual. As fontes originais continuam nas respectivas pastas de `C:\TIC\Projetos\Laboratorios`.

O arquivo `.nojekyll` permite que o GitHub Pages sirva os recursos do Astro em diretórios `_astro`.

## Padrão de nomes dos modelos

- Código sequencial `Mxx` que nunca é reaproveitado (o cliente cita o código no WhatsApp).
- Nome no formato **Profissão · Estilo**: a profissão diz para quem é; o estilo é uma palavra ligada ao visual
  (material, cor, objeto), nunca o nome de um cliente: Alicerce, Sálvia, Brisa, Pop, Traço, Mármore, Esquadro, Compasso, Linho, Claquete, Balcão.
- Sem numeração de versão no nome: uma variação ganha nome próprio.
- Card padronizado: descrição (clima + para quem), 2 etiquetas (formato + recurso principal) e "Indicado para".

## Modelos convertidos

M02 a M05 nasceram como prévias de um dentista e foram convertidos para psicologia, nutrição, personal trainer e
fisioterapia (textos, ferramenta, glossário, dúvidas, imagens com dente e monogramas), com nomes fictícios.
O código-fonte original não está neste repositório; a conversão foi feita sobre o HTML gerado.

## Modelos centralizados em 01/11/2026

- M07 Odontologia · Mármore: `modelo-odontologia/`; fonte em `fontes/modelo-odontologia/`.
- M08 Engenharia · Esquadro: `modelo-engenharia/`; fonte em `fontes/modelo-engenharia/`.
- M09 Serviços técnicos · Compasso: `modelo-servicos-tecnicos/` (HTML, CSS, JavaScript e recursos próprios).
- M10 Ateliê · Linho: `modelo-atelie/` (site estático editável).

M08 e M09 são versões distintas e foram preservadas. Os códigos dos modelos são preservados mesmo quando uma amostra é retirada; códigos retirados não são reutilizados.

Para reconstruir M07: em `fontes/modelo-odontologia`, execute `pnpm install --frozen-lockfile` e `pnpm build` com Node 24; copie o conteúdo de `dist/` para `modelo-odontologia/`. A configuração usa a base `/previas-profissionais/modelo-odontologia`.

M08 preserva a saída estática revisada do repositório original. O README da fonte registra as limitações de reconstrução dessa versão. Não substituir essa saída por um build sem revisar os avisos demonstrativos e contatos.
