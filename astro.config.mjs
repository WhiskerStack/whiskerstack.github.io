import { defineConfig } from "astro/config";

// Repo: WhiskerStack/whiskerstack.github.io → se publica en la raíz, sin `base`.
// Si algún día usas un dominio propio, cambia `site` (y src/config/site.ts).
export default defineConfig({
  site: "https://whiskerstack.github.io",
});
