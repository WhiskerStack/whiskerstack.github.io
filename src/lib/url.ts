/** Enlaces internos que respetan `base` de astro.config (por si el sitio vive en un subdirectorio). */
const base = import.meta.env.BASE_URL.replace(/\/?$/, "/");
export const href = (path = "") => base + path.replace(/^\//, "");
