import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://casadigitalrp-create.github.io",
  base: "/previas-profissionais/modelo-engenharia",
  output: "static",
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
