# Tareas — Spec 001: Auditoría SEO, marcado y técnico

Orden de dependencia. Cada tarea termina con `npm run build` en verde además de su comprobación concreta (comandos en `plan.md`, "Estrategia de verificación").

- [x] **T1. Crear `src/lib/schema.ts` con `negocioSchema`, `servicioSchema`, `faqSchema`, `migasSchema` y `aJsonLd` (funciones puras, en español).** RF-1, RF-2, RF-3, RF-4, RF-6, RF-7, RF-15
  - Hecho cuando: `npx astro check` sin errores; `negocioSchema(site)` reproduce el objeto actual de `Layout.astro` (mismos campos y valores, horario 00:00-23:59 los 7 días, sin geo/priceRange/redes/gestor), y `npm run build` en verde.

- [x] **T2. Marcado del negocio en todas las páginas indexables y 404 sin canónica.** RF-1, RF-2, RF-3, RF-7, RF-10, RF-11
  - Hecho cuando: el layout usa `negocioSchema` + `aJsonLd`; el recuento de `#negocio"` en `dist/**/index.html` da 26; `dist/404.html` no contiene `ld+json` ni `rel="canonical"` y sí `noindex`; el NAP del JSON-LD coincide con el pie y `/contacto/`.

- [x] **T3. Icono de 48 px o más declarado.** RF-12
  - Hecho cuando: el `<head>` de cualquier página en `dist/` contiene `<link rel="icon" href="/icon-512.png" type="image/png" sizes="512x512">` además del de 32 px, y el icono se ve en la pestaña con `npm run preview`.

- [x] **T4. Marcado de servicio en las 8 páginas de la tabla del plan.** RF-4, RF-5
  - Hecho cuando: el layout acepta `servicio` y emite `servicioSchema`; `"@type":"Service"` aparece exactamente en esas 8 páginas de `dist/` (ninguna más), con `provider.@id` = `https://chatarreriametalrenova.es/#negocio` y `areaServed` Comunidad de Madrid.

- [x] **T5. Marcado `FAQPage` desde `Faq.astro`.** RF-6
  - Hecho cuando: `"@type":"FAQPage"` aparece en 12 páginas de `dist/` (portada, 9 zonas, precios, mudanzas); en la portada y en `/chatarrero-getafe/` las preguntas y respuestas del JSON-LD son literalmente las visibles; el acordeón se ve igual en 375 px.

- [x] **T6. Migas pintadas por el layout y jerarquía corregida.** RF-14, RF-15
  - Hecho cuando: `Layout.astro` pinta `<Breadcrumbs>` y emite `migasSchema`; ninguna página de `src/pages/` importa ni usa `Breadcrumbs`; cómo funciona, mudanzas y nuestros trabajos muestran Inicio › Servicios › <página>; en `dist/` el `BreadcrumbList` coincide con el `<nav class="breadcrumbs">` (orden y posiciones 1..n) en esas 3 páginas, en compra de cobre y en una zona; posición visual idéntica en desktop y 375 px.

- [x] **T7. Las 6 meta descriptions nuevas.** RF-8, RF-9
  - Hecho cuando: las 6 páginas usan los textos del plan aprobados por el dueño; cada una mide entre 130 y 160 caracteres (recuento exacto en `dist/`) y contiene "Madrid"; títulos y H1 sin cambios (diff de `src/pages/` solo toca `const description` en esas páginas).

- [x] **T8. Sitemap sin `lastmod`.** RF-16
  - Hecho cuando: `astro.config.mjs` no tiene `lastmod`; `Select-String dist\sitemap-*.xml 'lastmod'` no devuelve nada; el sitemap sigue sin `/404` y con las 26 URLs.

- [x] **T9. `.htaccess`: caché por huella, HSTS, `/favicon.ico` y barra final.** RF-13, RF-17, RF-18, RF-19, RF-20, RF-21, RF-22, RF-23, RF-24, RF-25
  - Hecho cuando: `dist/.htaccess` coincide con el bloque del plan: regla HTTPS/sin www intacta, 301 de `favicon.ico` a `/icon-512.png`, 301 de barra final con `-d`, `E=CON_HUELLA` para `^_astro/`, `max-age=2592000` sin `immutable` para estáticos sin huella, `max-age=31536000, immutable` solo con `CON_HUELLA`, `max-age=0, must-revalidate` para `html|xml|txt`, `Header always set Strict-Transport-Security "max-age=31536000"` (sin `includeSubDomains` ni `preload`) y `ErrorDocument 404 /404.html`.

- [x] **T10. Validación final.** RF-1 a RF-25
  - Hecho cuando: HTML de `dist/` de portada, una zona, compra de cobre, mudanzas y precios sin errores en validator.schema.org y en la Prueba de resultados enriquecidos (negocio local y migas); checklist de la skill seo-tecnico completo; revisión en `npm run preview` en desktop y 375 px sin cambios visuales salvo las migas de las 3 páginas; ningún título, H1, URL ni texto visible cambiado; quedan anotadas las comprobaciones posteriores al despliegue (`curl -I` y PageSpeed) como no bloqueantes.
