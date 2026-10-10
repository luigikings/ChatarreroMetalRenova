# MEMORY.md — MetalRenova (ChatarreroMetalRenova)
Memoria del proyecto entre sesiones. Máximo ~50 líneas: resume o elimina lo que ya no aporte.

## Estado actual
- v1 terminada y desplegada en chatarreriametalrenova.es: 27 páginas estáticas con Astro, SEO local y `.htaccess` para hosting compartido.
- SDD inicializado: existen `AGENTS.md`, `docs/constitution.md` y `specs/` (listos para trabajar con specs).

## Decisiones (y por qué)
- Salida 100% estática sin backend ni base de datos: rapidez, SEO local y cero mantenimiento.
- Fuente única de datos en `src/config/site.ts` (precios opcionales en `precios.json`): evitar ediciones duplicadas.
- Contacto solo por `tel:` y WhatsApp: sin formularios ni piezas de servidor que mantener.
- Verificación con `npm run build` + revisión manual (móvil 375px): no hay suite de tests.
- Todo en español (código, comentarios e interfaz): decisión del propietario.
- Web pública local: el SEO se rige por la skill seo-tecnico.

## Aprendizajes y errores a evitar
- (vacío por ahora)

## Próximos pasos
- Aprobar y escribir `AGENTS.md`, `MEMORY.md` y `docs/constitution.md`; crear `specs/`.
- Después: mantenimiento y mejoras puntuales vía SDD (coordinator o /sdd-spec).
