# AGENTS.md — MetalRenova (ChatarreroMetalRenova)
Web estática del negocio de recogida de chatarra MetalRenova (Getafe y todo Madrid, desde 2005). Objetivo: captar contactos por teléfono y WhatsApp, rápida y posicionada a nivel local.

## Stack y estructura
- Astro 7.3.3 con salida 100% estática, TypeScript estricto, componentes `.astro`; CSS escrito a mano (custom properties), sin framework de UI.
- `src/config/site.ts` = fuente única de datos del negocio; `src/data/precios.json` = precios (opcional, con fallback a "consúltanos").
- `src/layouts/Layout.astro` (SEO, header, footer, CTA móvil); `src/components/` (Header, Footer, Faq, Breadcrumbs…); `src/pages/` (27 páginas: home, materiales, 9 zonas, servicios, legales, 404); `src/styles/global.css`; `public/` (fuentes autoalojadas, `.htaccess`, `robots.txt`).

## Comandos
- Arrancar: `npm run dev`
- Tests: pendiente (verificación = `npm run build` + revisión manual, incluida vista móvil 375px)
- Lint / build: sin lint; build `npm run build`; preview `npm run preview`

## Convenciones
- Todo en español: código, comentarios e interfaz. Un archivo `.astro` en `pages/` = una ruta. Los datos del negocio solo se editan en `site.ts`.

## Reglas de dominio / trampas conocidas
- Prohibido inventar estadísticas, reseñas o cifras sin confirmación del dueño o fuente real (las reseñas van literales con enlace a la ficha).
- Contacto solo con enlaces `tel:` y WhatsApp: sin formularios, sin backend, sin base de datos.
- El `.htaccess` se copia al build (HTTPS, compresión, caché, seguridad); el sitemap excluye `/404`.

## SDD
- Lee `docs/constitution.md` y la spec activa (`specs/NNN-*/`) antes de tocar código.
- Funcionalidades nuevas: flujo SDD (agente coordinator o comandos /sdd-*). Cambios pequeños: /feature.
- El usuario aprueba la spec y el plan con tareas. Lo demás avanza solo y se para si algo falla o falta una decisión.

## Memoria
- Al empezar, lee `MEMORY.md` para conocer el estado del proyecto y las decisiones tomadas.
- Actualízalo al cerrar cada spec, o antes si aparece una decisión importante o un error a evitar: estado actual, decisiones (con su porqué) y errores a evitar.
- Mantenlo breve (máximo ~50 líneas): resume o elimina lo que ya no aporte.
- Si algo se convierte en una regla permanente, propón moverlo a `AGENTS.md`.
- No guardes nunca datos sensibles (claves, tokens, datos personales).

## Límites
- ✅ Siempre: salida 100% estática apta para hosting compartido; actualizar `MEMORY.md` al cerrar cada spec.
- ⚠️ Pregunta antes: dependencias nuevas, cambios en el formato de los datos guardados, cambios de URLs o de SEO.
- 🚫 Nunca: añadir backend, base de datos o formularios; publicar datos no confirmados; subir claves, tokens o archivos .env.

## Verificación
- `npm run build` en verde + revisión manual del flujo afectado en desktop y móvil (375px).
