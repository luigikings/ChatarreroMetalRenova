# Spec 002 — Auditoría SEO: contenido y enlazado

Estado: implementada

> Esta spec es la segunda mitad de la auditoría SEO. La primera mitad (marcado del negocio, servicio, preguntas frecuentes y migas, metadatos, favicon, sitemap, caché, HSTS y redirecciones) está en `specs/001-auditoria-seo/spec.md`. Se planificará después de la 001.

## Contexto y objetivo
La portada y la página de Madrid capital compiten por la misma búsqueda ("chatarrería en Madrid"), lo que reparte la fuerza de ambas. La página de precios promete "precios orientativos" que no muestra (ningún material tiene precio confirmado) y aporta poco contenido útil. Además hay anclas genéricas ("Más información") y faltan enlaces internos desde la portada y desde trabajos realizados hacia los servicios. Esta spec diferencia Madrid capital de la portada, alinea toda la web con "precio bajo consulta", amplía la página de precios sin cifras y mejora el enlazado interno, sin cambiar títulos ni URLs y basándose solo en lo que la web ya publica.

## Usuarios
- Visitante que busca en Google (sobre todo en móvil) dónde vender chatarra en Madrid.
- Buscadores (Google, Bing).
- Dueño del negocio, que revisa los textos nuevos antes de publicarlos.

## Historias de usuario
- HU-1. Como visitante que busca "chatarrería en Madrid", quiero llegar a una página principal clara y, si vivo en Madrid capital, a una página específica de la capital.
- HU-2. Como visitante que quiere saber cuánto le pagan, quiero entender de qué depende el precio de mi chatarra y que la web no me prometa cifras que no muestra.
- HU-3. Como visitante, quiero que los enlaces internos me digan a dónde llevan para llegar rápido al material o servicio que me interesa.
- HU-4. Como dueño, quiero revisar los textos nuevos antes de publicarlos y que no incluyan nada que no esté ya en la web.

## Definiciones
- **Contenido principal**: el contenido propio de la página, excluidos cabecera, menú, pie, migas, barra fija de llamada/WhatsApp del móvil, aviso de cookies y botones de acción (`tel:` y WhatsApp).
- **Ancla descriptiva**: texto de enlace que contiene el nombre o tema principal de la página de destino (palabras de su H1 o de su nombre en el menú/pie). "Más información", "aquí", "ver más" o "zona de trabajo" no lo son.
- **Página de material con página propia**: cobre, aluminio, latón, hierro y acero, baterías usadas.
- **Texto ya publicado**: afirmaciones que ya aparecen en alguna página de la web en el momento de aprobar esta spec.

## Hallazgos de la auditoría que cubre esta spec
La evidencia con rutas de archivo irá a su `plan.md`.

- **H-4 (alta).** Canibalización: la portada (título "Chatarrería en Madrid abierta 24 horas", H1 "Chatarrería en Madrid: ...") y `/chatarrero-madrid/` compiten por la misma búsqueda; Madrid capital tiene 2 párrafos y 2 preguntas, no enlaza a la portada y enlaza a `/servicios/` con el ancla "zona de trabajo".
- **H-6 (media).** Ningún material tiene precio publicado; aun así, la entradilla y la meta description de `/precios-chatarra/` hablan de "precios orientativos" y la portada dice "Precio orientativo por kilo." sobre tarjetas que solo muestran "Consúltanos por WhatsApp". La fecha de actualización se muestra como `2026-09-18`.
- **H-7 (media).** Anclas "Más información →" en las tarjetas de materiales de la portada, `/precios-chatarra/` y `/gestion-de-metales/`.
- **H-8 (media).** La portada no enlaza en su contenido principal a vaciados, mudanzas ni servicios; `/nuestros-trabajos/` no enlaza a `/vaciado-de-pisos-y-naves/`.

## Requisitos funcionales

### Portada y Madrid capital (canibalización)
- RF-1: EL SISTEMA mantendrá la portada como la página orientada a "chatarrería en Madrid", con su título, H1 y URL actuales.
- RF-2: CUANDO se visualice la página de Madrid capital, EL SISTEMA mostrará una meta description de 130 a 160 caracteres que contenga "Madrid capital".
- RF-3: CUANDO se visualice la página de Madrid capital, EL SISTEMA mostrará al menos 3 preguntas frecuentes que mencionen "Madrid capital" o "la capital".
- RF-4: CUANDO se visualice la página de Madrid capital, EL SISTEMA no mostrará la frase exacta "chatarrería en Madrid" en su contenido principal salvo en el ancla del enlace a la portada.
- RF-5: CUANDO se visualice la página de Madrid capital, EL SISTEMA mostrará en su contenido principal un enlace a la portada cuyo ancla contenga "chatarrería en Madrid".
- RF-6: CUANDO se visualice la página de Madrid capital, EL SISTEMA usará anclas descriptivas en todos los enlaces internos de su contenido principal.

### Página de precios y "precio bajo consulta"
- RF-7: MIENTRAS ningún material tenga precio confirmado, EL SISTEMA presentará los precios como "bajo consulta" (sin mencionar "precios orientativos" publicados) en la entradilla de la página de precios, en su meta description y en la introducción de la sección de materiales de la portada.
- RF-8: SI un material no tiene precio confirmado, ENTONCES EL SISTEMA mostrará "Consúltanos por WhatsApp" y ninguna cifra de precio.
- RF-9: CUANDO se visualice la página de precios, EL SISTEMA mostrará, por cada material con página propia, qué variantes o estados influyen en su precio (p. ej. cobre limpio frente a cable con funda), sin cifras en euros.
- RF-10: CUANDO se visualice la explicación de un material en la página de precios, EL SISTEMA enlazará a la página de ese material con ancla descriptiva.
- RF-11: CUANDO se visualice la página de precios, EL SISTEMA mostrará la fecha de última actualización en formato legible en español (p. ej. "18 de septiembre de 2026"), como fecha de calendario sin conversión de zona horaria.
- RF-12: SI la fecha de última actualización falta o no es una fecha válida, ENTONCES EL SISTEMA omitirá la línea de fecha.
- RF-13: CUANDO se publique el nuevo contenido de la página de precios, EL SISTEMA mostrará como fecha de última actualización la de esa publicación.

### Textos nuevos
- RF-14: EL SISTEMA solo incluirá en los textos nuevos o reescritos de esta spec (Madrid capital, página de precios, entradilla de materiales de la portada y sus meta descriptions) afirmaciones que formen parte del texto ya publicado.

### Enlazado interno
- RF-15: EL SISTEMA usará anclas descriptivas en todos los enlaces internos del contenido principal de la portada, la página de precios y la página general de metales.
- RF-16: SI un material no tiene página propia (bronce, plomo, níquel, zinc, virutas), ENTONCES EL SISTEMA mostrará su tarjeta sin enlace.
- RF-17: CUANDO se visualice la portada, EL SISTEMA mostrará en su contenido principal enlaces con ancla descriptiva a vaciado de pisos y naves, a mudanzas y a servicios.
- RF-18: CUANDO se visualice la página de trabajos realizados, EL SISTEMA mostrará en su contenido principal un enlace con ancla descriptiva a vaciado de pisos y naves.

## Requisitos no funcionales
- SEO (constitución, punto 7; skill seo-tecnico): las páginas tocadas siguen cumpliendo el checklist (title, description, canonical, un H1, jerarquía sin saltos, OG mínimo, imágenes con alt/width/height).
- Se mantiene la regla de la spec 001 (RF-9): ningún título, H1 ni URL cambia.
- Si cambian las preguntas frecuentes de Madrid capital o de precios, su marcado (spec 001, RF-6) sigue coincidiendo literalmente con lo visible.
- Revisión del dueño: todo texto visible nuevo o reescrito y las meta descriptions nuevas se someten a su revisión antes de publicar.
- Salida 100% estática; sin formularios, backend ni base de datos. Sin dependencias nuevas. Todo en español.
- Verificación: `npm run build` en verde y revisión manual en desktop y móvil (375 px).

## Casos límite
- Todos los precios sin confirmar: la página de precios sigue siendo útil (factores, variantes por material, preguntas frecuentes) y no muestra cifras.
- Un material pasa a tener precio confirmado en el futuro: RF-7 deja de aplicarse y la web puede volver a hablar de precios orientativos.
- Fecha de actualización vacía o mal formada: no se muestra la línea y la compilación no falla.
- Tarjeta de plomo en la portada: hoy enlaza a la página general de metales; pasa a mostrarse sin enlace (RF-16). La portada ya enlaza a la lista completa de materiales y precios.
- Madrid capital: no se afirman barrios, plazos ni datos locales que no estén ya publicados.

## Fuera de alcance
- Todo lo de la spec 001 (marcado, metadatos de otras páginas, migas, favicon, sitemap, caché, HSTS, redirecciones).
- Contenido de las otras 8 páginas de zona. Siguiente spec recomendada: "003 — contenido de zonas", con datos reales del dueño.
- Publicar precios en cifras.
- Cambiar títulos, H1 o URLs.
- Acciones externas al código (Google Business, Search Console, directorios, backlinks): ver recomendaciones en la spec 001.

## Criterios de finalización
- `npm run build` en verde y HTML generado revisado contra cada RF.
- Checklist de la skill seo-tecnico de las páginas tocadas completo en desktop y móvil (375 px).
- Ningún título, H1 ni URL cambiado.
- Textos nuevos o reescritos (Madrid capital, precios, entradilla de la portada y sus meta descriptions) revisados y aprobados por el dueño antes de publicar. Bloquea el cierre.
- `MEMORY.md` actualizado.

## Correspondencia con la numeración anterior

| Nuevo | Anterior |
|---|---|
| RF-1 a RF-14 | RF-8 a RF-21 |
| RF-15 | RF-28 |
| RF-16 | RF-29 |
| RF-17 | RF-30 |
| RF-18 | RF-31 |

## Dudas abiertas
- Ninguna.
