# Tareas 002 — Auditoría SEO: contenido y enlazado

Orden de dependencia. Máximo ~30 min por tarea. Sin commit ni push hasta que lo pida el dueño.
Verificación global: `npx astro check` + `npm run build` + revisión manual desktop y 375 px.
Bloquea el cierre: aprobación del dueño de los textos del `plan.md`.

- [x] **T1. Función de fecha legible `src/lib/fecha.ts`.** RF-11, RF-12
  - Hecho cuando: `formatearFechaLegible('2026-09-18')` devuelve «18 de septiembre de 2026» sin usar `Date`; con fecha vacía o inválida devuelve `null`.
- [x] **T2. Página de precios: «bajo consulta», bloques por material y fecha.** RF-7, RF-8, RF-9, RF-10, RF-11, RF-12, RF-13, RF-14, RF-15
  - Hecho cuando: entradilla y meta con «bajo consulta» sin «orientativos»; 5 bloques con factores sin cifras y enlace descriptivo a su material; fecha legible con omisión si es inválida; `actualizado` con la fecha de publicación confirmada; sin «Más información»; textos solo con afirmaciones ya publicadas (salvo «bajo consulta» de RF-7) y aprobados por el dueño.
- [x] **T3. Madrid capital diferenciada de la portada.** RF-2, RF-3, RF-4, RF-5, RF-6, RF-14
  - Hecho cuando: meta intacta (130–160, con «Madrid capital»); 3 FAQ que mencionan la capital; la frase exacta «chatarrería en Madrid» solo aparece en el ancla a la portada; todos los enlaces internos con ancla descriptiva (fuera «zona de trabajo»); textos solo con afirmaciones ya publicadas y aprobados por el dueño.
- [x] **T4. Portada: «bajo consulta», anclas y sección de servicios.** RF-1, RF-7, RF-14, RF-15, RF-16, RF-17
  - Hecho cuando: título, H1 y URL intactos; intro de materiales «bajo consulta»; anclas «Compra de … en Madrid»; tarjeta de plomo sin enlace; sección nueva con enlaces descriptivos a vaciados, mudanzas y servicios; textos aprobados por el dueño.
- [x] **T5. Metales y trabajos: anclas y enlace a vaciados.** RF-14, RF-15, RF-16, RF-18
  - Hecho cuando: `gestion-de-metales.astro` sin «Más información» (tarjetas sin página propia ya sin enlace); `nuestros-trabajos.astro` enlaza a vaciados con ancla descriptiva en su contenido; textos aprobados por el dueño.
- [x] **T6. Validación RF por RF + checklist seo-tecnico y veredicto.** Todos los RF
  - Hecho cuando: `npx astro check` y `npm run build` en verde; HTML revisado RF por RF (grep de «orientativo», «Más información», «zona de trabajo», fecha cruda, frase exacta); títulos/H1/URLs intactos; checklist seo-tecnico de las 5 páginas tocadas; textos aprobados por el dueño; línea de VEREDICTO escrita.
  - Nota de cierre: validación RF por RF y checklist seo-tecnico hechos por @reviewer con **VEREDICTO: APROBADO** (`astro check` y `build` en verde, HTML generado revisado RF por RF). La confirmación visual en navegador (desktop y 375 px) queda como revisión manual del dueño, sin pasos bloqueantes adicionales.
  - Único cambio de código al cerrar: en `src/pages/index.astro`, la sección «Vaciados, mudanzas y todos los servicios» pasó de `class="section section--alt"` a `class="section"` (decisión del dueño) para separarla visualmente de la sección siguiente, también gris. Ni una palabra más.
