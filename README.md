# WhiskerStack: landing

Sitio estático en Astro. No usa servidor ni base de datos.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/, que se sube a cualquier hosting estático
```

## Antes de publicar
- `src/config/site.ts`: número de WhatsApp, usuario de Telegram, correo y dominio (marcados con TODO).
- `astro.config.mjs`: `site` con el dominio real.

## Dónde está cada cosa
- `src/pages/index.astro`: secciones y textos (los arrays del principio contienen los servicios, los pasos y las preguntas).
- `src/data/projects.json`: los trabajos publicados (ver abajo).
- `src/components/ProjectStack.astro`: la pila de trabajos destacados de la portada.
- `src/components/Works.astro`: la sección "Trabajos publicados" de la portada (máximo 8 + el hueco "Tu sitio puede ser el siguiente"). Si hay más de 8, aparece el botón "Ver los N trabajos".
- `src/pages/trabajos.astro`: página /trabajos con todos, buscador y filtro por categoría. El filtro queda en la URL (`/trabajos/?c=Menú&q=café`), así que se puede compartir.
- `src/styles/global.css`: tokens de diseño. Se usan dos tintas, como en el logo; `.inv` invierte un bloque y el modo oscuro invierte la página entera.
- `public/`: favicon.svg (se invierte solo con el tema oscuro del navegador), favicon.ico, apple-touch-icon.png y og.png.

## Añadir un trabajo
1. Agrega un objeto a `src/data/projects.json`:
   ```json
   {
     "slug": "mi-sitio",
     "name": "Mi Sitio",
     "url": "https://whiskerstack.github.io/mi-sitio",
     "kind": "Menú de cafetería",
     "category": "Menú",
     "description": "Una línea sobre qué es y qué tiene.",
     "featured": true
   }
   ```
   `kind` es el texto que se ve en la tarjeta; `category` es por lo que se filtra en /trabajos. Usa siempre los mismos nombres de categoría (por ejemplo Catálogo, Menú, Sitio informativo, Anuncio). Los botones de filtro solo aparecen cuando hay más de una categoría. El orden del array es el orden en pantalla. Con `"featured": true` sale en la portada, pero solo aparecen los primeros 5 (`HERO_MAX` en `src/lib/projects.ts`). Todos salen en "Trabajos publicados".
2. Captura: `npm run capture -- mi-sitio`. Guarda `src/assets/projects/mi-sitio.png` a 1280×800, y Astro la convierte a WebP en varios tamaños al compilar.
   La primera vez instala el navegador: `npm i -D playwright && npx playwright install chromium`.
   Opciones en el JSON: `"capture": { "path": "/catalogo", "blurMedia": true }`. `path` captura otra página del sitio en vez de la portada; `blurMedia` desenfoca fotos y videos de terceros (carteles, actores).
   También puedes poner una imagen propia con ese nombre. Si no hay captura, la tarjeta muestra el nombre.
