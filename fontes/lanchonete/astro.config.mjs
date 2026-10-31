import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// Prévia servida pelo GitHub Pages dentro da galeria previas-profissionais.
export default defineConfig({
  site: "https://casadigitalrp-create.github.io",
  base: "/previas-profissionais/lanchonete",
  trailingSlash: "always",
  output: "static",
  outDir: "../../lanchonete",
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
