import type { ImageMetadata } from "astro";
import data from "../data/projects.json";

/**
 * Los trabajos se editan en src/data/projects.json (ver README).
 * El orden del array es el orden en que se muestran.
 */
export interface Project {
  slug: string;
  name: string;
  url: string;
  kind: string; // descripción corta del tipo: "Catálogo de papercraft"
  category: string; // para filtrar: "Catálogo", "Menú", "Sitio informativo", "Anuncio"…
  description: string;
  featured?: boolean;
  capture?: { path?: string; blurMedia?: boolean };
}

/** Máximo de trabajos destacados en la pila de la portada. */
export const HERO_MAX = 5;
/** Máximo de trabajos en la sección de la portada (el hueco "Tu sitio puede ser el siguiente" completa la cuadrícula de 9). */
export const LANDING_MAX = 8;

export const projects = data as Project[];

// En GitHub Pages, un repo con el mismo nombre que una página de la landing la tapa
// sin avisar (whiskerstack.github.io/trabajos). Aquí se corta el build si pasa.
const pageRoutes = Object.keys(import.meta.glob("../pages/**/*.{astro,md,mdx}"))
  .map((f) => f.replace(/^\.\.\/pages\//, "").split("/")[0].replace(/\.\w+$/, "").toLowerCase())
  .filter((r) => r && r !== "index");
for (const p of projects) {
  const m = p.url.match(/^https?:\/\/whiskerstack\.github\.io\/([^/?#]+)/i);
  const segment = m?.[1].toLowerCase();
  if (segment && pageRoutes.includes(segment)) {
    throw new Error(
      `El proyecto "${p.slug}" (${p.url}) usa la ruta /${segment}/, que ya es una página de la landing. ` +
        `Renombra el repo del proyecto o la página en src/pages/.`,
    );
  }
}
export const featured = projects.filter((p) => p.featured).slice(0, HERO_MAX);

/** Categorías en orden de aparición, con cuántos trabajos tiene cada una. */
export const categories = [...new Set(projects.map((p) => p.category))].map((name) => ({
  name,
  count: projects.filter((p) => p.category === name).length,
}));

// Capturas en src/assets/projects/<slug>.(png|jpg|webp)
const shots = import.meta.glob<{ default: ImageMetadata }>("../assets/projects/*.{png,jpg,jpeg,webp}", {
  eager: true,
});
export const shotFor = (slug: string): ImageMetadata | undefined =>
  Object.entries(shots).find(([path]) => path.split("/").pop()!.replace(/\.\w+$/, "") === slug)?.[1].default;

export const hostOf = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");
