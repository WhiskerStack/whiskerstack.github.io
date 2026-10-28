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
- `src/components/CatalogDemo.astro`: el catálogo de demostración (buscador, filtros y mensaje de pedido para WhatsApp).
- `src/data/demo-catalog.json`: productos del demo.
- `src/styles/global.css`: tokens de diseño. Se usan dos tintas, como en el logo; `.inv` invierte un bloque y el modo oscuro invierte la página entera.
- `public/`: favicon.svg (se invierte solo con el tema oscuro del navegador), favicon.ico, apple-touch-icon.png y og.png.
