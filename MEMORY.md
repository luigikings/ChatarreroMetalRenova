# MEMORY.md — MetalRenova (ChatarreroMetalRenova)
Memoria del proyecto entre sesiones. Máximo ~50 líneas: resume o elimina lo que ya no aporte.

## Estado actual
- v1 desplegada en chatarreriametalrenova.es: 27 páginas estáticas con Astro, SEO local y `.htaccess` para Hostinger.
- Spec 001 «Auditoría SEO: marcado y técnico»: implementada y validada (APROBADO), sin commit ni despliegue todavía.
- Spec 002 «Contenido y enlazado»: aprobada, pendiente de plan y tareas.
- Spec 003 (contenido propio de las páginas de zona): recomendada, sin redactar.

## Decisiones (y por qué)
- Salida 100% estática, sin backend ni formularios; contacto solo por `tel:` y WhatsApp: rapidez, SEO local y cero mantenimiento.
- Fuente única de datos en `src/config/site.ts`: evitar ediciones duplicadas.
- JSON-LD en funciones puras de `src/lib/schema.ts` (constitución: lógica fuera de los `.astro`).
- Marcado del negocio (`RecyclingCenter`) completo en todas las páginas indexables con un único `@id` (`/#negocio`): NAP coherente en toda la web.
- `Service` solo en las 8 páginas de servicio/material, enlazado al negocio por `@id`; el resto no lo lleva.
- `FAQPage` emitido por `Faq.astro` con los mismos items visibles: Google ya no muestra fragmentos FAQ para este tipo de webs, pero el marcado ayuda a entender la página.
- Migas: `Layout.astro` las pinta y las marca desde su prop `breadcrumbs` (fuente única, visible = marcado). Las páginas no importan `Breadcrumbs`.
- Sitemap sin `lastmod`: una fecha de build igual para todo es poco fiable y Google la ignora.
- Caché: 1 año + `immutable` solo para `/_astro/` (archivos con huella); 30 días para estáticos de `public/`; HTML/XML/TXT con revalidación.
- HSTS `max-age=31536000` sin `includeSubDomains` ni `preload`: no comprometer subdominios ni entrar en la lista de precarga sin decidirlo.
- 404 con `noindex`, sin canónica ni JSON-LD.
- Nada de geo, priceRange, redes ni número de gestor de residuos hasta que el dueño los confirme. No marcar reseñas propias (Google no las acepta para el propio negocio).
- Verificación: `npx astro check` + `npm run build` + revisión manual (desktop y 375 px); no hay suite de tests.

## Aprendizajes y errores a evitar
- En `.htaccess`, nunca comentarios al final de una directiva (`Header ... # x`): Apache los lee como argumentos y da 500. Comentarios en línea propia.
- Textos nuevos (metas, contenidos) solo con afirmaciones ya publicadas en la web o confirmadas por el dueño.
- No aceptar ni rechazar el banner de cookies al revisar en el navegador.

## Próximos pasos
- Commit y despliegue de la spec 001; después, `curl -I` a: `http://`, `http://www.`, `/contacto`, `/favicon.ico`, una URL inexistente, un archivo de `/_astro/`, `/og-image.jpg`, `/fonts/…`, `/sitemap-index.xml`, `/robots.txt` (301 únicos, 404 real, caché y HSTS).
- Si LiteSpeed ignora `env=CON_HUELLA`, usar un `.htaccess` propio dentro de `_astro/` (alternativa ya prevista en el plan 001).
- Validar portada, una zona, cobre, mudanzas y precios en validator.schema.org y en la Prueba de resultados enriquecidos; PageSpeed en móvil.
- Planificar la spec 002.
- Spec aparte: aspecto legal del banner de cookies / Consent Mode v2.
- Fuera del código: Google Business Profile y Search Console (enviar sitemap).
