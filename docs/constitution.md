# Constitución — MetalRenova (ChatarreroMetalRenova)

Principios innegociables. Toda spec, plan y tarea debe cumplirlos.

1. **Estática siempre**: cada cambio compila con `npm run build` a HTML/CSS/JS planos, sin backend, base de datos ni formularios.
2. **La spec manda**: solo se implementa lo escrito en la spec aprobada; el cambio de requisitos vuelve a spec → plan → tareas → código.
3. **Lógica separada de la interfaz**: la lógica vive en funciones pequeñas y testeables fuera de los `.astro`; los componentes solo pintan.
4. **Verificación obligatoria**: ningún cambio se da por terminado sin `npm run build` en verde y revisión manual en desktop y móvil (375px).
5. **Datos protegidos y veraces**: sin datos sensibles en el repo ni en `MEMORY.md`; ningún dato del negocio sin confirmación del dueño o fuente real.
6. **Todo en español**: código, comentarios e interfaz en español.
7. **SEO local en cada página pública**: toda spec que toque páginas públicas cumple la skill seo-tecnico (título, meta, canónica, JSON-LD, sitemap, robots).
