# Spec 001 — Auditoría SEO: marcado y técnico

Estado: implementada

> Esta spec es la primera mitad de la auditoría SEO. La segunda mitad (contenido de Madrid capital y de la página de precios, "precio bajo consulta" y enlazado interno) está en `specs/002-seo-contenido-enlazado/spec.md`. Ambas comparten el anexo de hallazgos; cada una recoge los suyos.

## Contexto y objetivo
La web de MetalRenova (chatarrería en Getafe y todo Madrid) vive de captar llamadas y WhatsApp desde búsquedas locales. La base técnica es buena (HTML estático, un H1 por página, títulos únicos, canónicas, sitemap, robots, fuentes propias con `swap`, imágenes optimizadas, analítica cargada solo tras consentimiento), pero la auditoría detecta huecos técnicos que limitan el posicionamiento local: el marcado del negocio solo está en la portada, no hay marcado de servicio ni de preguntas frecuentes, las migas son incoherentes, hay meta descriptions cortas, el favicon es pequeño para Google, la 404 declara canónica, el sitemap declara fechas artificiales y la caché y la seguridad del servidor son mejorables. Esta spec corrige esos puntos sin cambiar textos visibles, títulos ni URLs. El marcado de preguntas frecuentes se añade por coherencia semántica: desde 2023 Google solo muestra fragmentos enriquecidos de FAQ para webs gubernamentales y sanitarias, así que no se espera ese resultado enriquecido.

## Usuarios
- Buscadores (Google, Bing) que rastrean e interpretan la web.
- Visitante que busca en Google dónde vender chatarra o vaciar un espacio en Madrid.
- Dueño del negocio, que confirma datos y revisa las meta descriptions nuevas.

## Historias de usuario
- HU-1. Como buscador, quiero datos estructurados coherentes en cada página para entender qué negocio es, dónde está y qué servicios ofrece (sin esperar fragmentos enriquecidos de FAQ).
- HU-2. Como visitante, quiero un resultado de búsqueda con descripción completa e icono reconocible para elegir MetalRenova.
- HU-3. Como visitante, quiero migas de pan coherentes para saber dónde estoy dentro de la web.
- HU-4. Como dueño, quiero que ninguna mejora publique datos no confirmados ni cambie títulos o URLs que ya posicionan.

## Definiciones
- **Página pública indexable**: toda página del sitio salvo la de error 404.
- **Página de zona**: cada una de las 9 páginas "Chatarrería y chatarrero en <localidad>".
- **Página de servicio con marcado**: vaciado de pisos y naves, y mudanzas.
- **Página de material**: compra de cobre, aluminio, latón, hierro y acero, baterías, y la página general de metales ("Compramos metales y chatarra en Madrid").
- **Cambio transversal**: cambio aplicado a la plantilla común de todas las páginas (metadatos, marcado del negocio, marcado de preguntas frecuentes, migas). Afecta también a las páginas de zona sin modificar su texto.
- **Archivo con huella de versión**: archivo generado en la compilación cuyo nombre incluye un hash de su contenido.
- **NAP**: nombre, dirección y teléfonos del negocio.

## Hallazgos de la auditoría que cubre esta spec
La evidencia con rutas de archivo está en `plan.md`.

- **H-1 (alta).** El marcado del negocio (centro de reciclaje) solo aparece en la portada; las 26 páginas restantes no identifican al negocio ni su NAP.
- **H-2 (alta).** Ninguna página de servicio o material declara un marcado de servicio.
- **H-5 (media).** Los bloques de preguntas frecuentes (portada, 9 zonas, precios, mudanzas) no llevan marcado.
- **H-9 (media).** Meta descriptions por debajo de 130 caracteres en compra de cobre (~128), aluminio (~122), baterías (~118), hierro y acero (~118), vaciado de pisos y naves (~119) y nuestros trabajos (~123).
- **H-10 (media).** Solo se declara un icono de 32×32 px (Google recomienda más de 48×48 px) y `/favicon.ico` responde 404.
- **H-11 (baja).** Migas incoherentes: vaciado cuelga de "Servicios", pero mudanzas, cómo funciona y nuestros trabajos cuelgan de "Inicio".
- **H-12 (baja).** La 404 declara canónica (además de `noindex`).
- **H-13 (baja).** El sitemap declara para todas las URLs la fecha de la compilación como fecha de modificación.
- **H-14 (baja).** Imágenes, iconos y fuentes sin huella de versión se cachean un año como `immutable`; `sitemap.xml` y `robots.txt` no tienen política de caché explícita.
- **H-15 (baja).** No se envía cabecera HSTS pese a forzar HTTPS.

Correcto (sin acción): `lang="es"`, viewport, un solo H1 por página, títulos únicos de 40-60 caracteres con localidad, canónicas absolutas con barra final, HTTPS + sin www, 404 real con `noindex`, sitemap sin `/404` y enlazado en `robots.txt`, fuentes con `font-display: swap` y precarga, imágenes con `alt`, `width`, `height`, formato moderno y `lazy`, sin JS bloqueante, NAP de una única fuente. Sin `hreflang` (sitio monolingüe).

## Requisitos funcionales

### Datos estructurados
- RF-1: EL SISTEMA incluirá en cada página pública indexable el marcado completo del negocio (tipo centro de reciclaje) con el mismo identificador `@id` en todas ellas, nombre, URL, teléfonos, dirección postal completa y horario.
- RF-2: EL SISTEMA usará en el marcado del negocio exactamente el mismo nombre, dirección y teléfonos que se muestran en el pie y en la página de contacto.
- RF-3: EL SISTEMA representará el horario visible "Abierto 24 horas, todos los días" en el marcado como apertura 00:00 y cierre 23:59 los 7 días de la semana.
- RF-4: CUANDO se publique una página de servicio con marcado o una página de material, EL SISTEMA incluirá un marcado de servicio con el nombre del servicio (p. ej. "Compra de cobre", "Vaciado de pisos, locales y naves", "Mudanzas y portes"), el negocio como proveedor mediante su `@id` y la Comunidad de Madrid como área servida.
- RF-5: EL SISTEMA no incluirá marcado de servicio en la portada, las páginas de zona, cómo funciona, trabajos realizados, servicios, precios, contacto, legales ni 404.
- RF-6: CUANDO una página muestre un bloque de preguntas frecuentes, EL SISTEMA incluirá un marcado de preguntas frecuentes con las mismas preguntas y respuestas, literalmente, que las visibles.
- RF-7: SI un dato del negocio no está confirmado (coordenadas, rango de precios, perfiles sociales, número de gestor de residuos), ENTONCES EL SISTEMA no lo incluirá ni en la página ni en el marcado.

### Metadatos
- RF-8: EL SISTEMA tendrá en las páginas de compra de cobre, aluminio, baterías, hierro y acero, vaciado de pisos y naves, y trabajos realizados una meta description única de 130 a 160 caracteres que mencione Madrid.
- RF-9: EL SISTEMA mantendrá sin cambios los títulos, H1 y URLs de todas las páginas.
- RF-10: SI la página es la de error 404, ENTONCES EL SISTEMA no emitirá etiqueta canónica.
- RF-11: SI la página es la de error 404, ENTONCES EL SISTEMA mantendrá la etiqueta `noindex`.
- RF-12: EL SISTEMA declarará como icono del sitio, además del actual, una imagen PNG cuadrada de 48×48 px o mayor ya existente en la web.
- RF-13: CUANDO se pida `/favicon.ico`, EL SISTEMA responderá con una redirección 301 al icono PNG declarado de 48×48 px o mayor.

### Migas de pan
- RF-14: EL SISTEMA mostrará estas migas de pan: Inicio › Servicios en la página de servicios; Inicio › Servicios › <página> en cómo funciona, vaciado de pisos y naves, mudanzas y trabajos realizados; Inicio › Gestión de metales en la página general de metales; Inicio › Gestión de metales › <página> en las 5 páginas de material; Inicio › <página> en precios, contacto, zonas y legales; y ninguna en la portada y la 404.
- RF-15: EL SISTEMA publicará un marcado de migas de pan con los mismos elementos, en el mismo orden y con posiciones consecutivas desde "Inicio", que las migas visibles de cada página.

### Rastreo, caché y seguridad
- RF-16: EL SISTEMA no incluirá fecha de modificación en las entradas del sitemap.
- RF-17: EL SISTEMA servirá los archivos con huella de versión en el nombre con caché de 1 año e `immutable`.
- RF-18: EL SISTEMA servirá las imágenes, iconos y fuentes sin huella de versión en el nombre con caché de 30 días como máximo y sin `immutable`.
- RF-19: EL SISTEMA servirá las páginas HTML, los archivos del sitemap y `robots.txt` con revalidación obligatoria (`max-age=0, must-revalidate`).
- RF-20: EL SISTEMA enviará en todas las respuestas HTTPS, incluidas las redirecciones 301, la cabecera `Strict-Transport-Security` con el valor exacto `max-age=31536000` (sin `includeSubDomains` ni `preload`).
- RF-21: CUANDO se pida una URL por HTTP, EL SISTEMA redirigirá con 301 a la misma ruta en HTTPS sin `www`.
- RF-22: CUANDO se pida una URL con `www`, EL SISTEMA redirigirá con 301 a la misma ruta en HTTPS sin `www`.
- RF-23: CUANDO se pida una página existente sin barra final, EL SISTEMA redirigirá con 301 a la versión con barra final.
- RF-24: CUANDO se pida una URL que combine HTTP o `www` con la ausencia de barra final, EL SISTEMA llegará a la URL canónica en un máximo de 2 redirecciones 301.
- RF-25: CUANDO se pida una URL inexistente, EL SISTEMA devolverá código 404 con la página de error.

## Requisitos no funcionales
- SEO (constitución, punto 7; skill seo-tecnico): cada página pública indexable cumple el checklist (title, description, canonical, un H1, jerarquía de títulos sin saltos, OG mínimo, imágenes con alt/width/height, sitemap, robots, sin `noindex` indebido). La 404 queda excluida de la regla de jerarquía de títulos por ser `noindex`.
- Datos estructurados sin errores en el Schema Markup Validator (validator.schema.org) para todos los tipos (negocio, servicio, preguntas frecuentes, migas), y sin errores en la Prueba de resultados enriquecidos de Google para negocio local y migas. No se espera resultado enriquecido de FAQ.
- Las 6 meta descriptions nuevas solo contienen afirmaciones que ya aparecen en alguna página de la web y las revisa el dueño antes de publicar.
- Rendimiento en móvil: LCP ≤ 2,5 s, CLS ≤ 0,1, INP ≤ 200 ms; el marcado es JSON en línea y no añade JavaScript ejecutable.
- Salida 100% estática apta para hosting compartido; sin formularios, backend ni base de datos.
- Sin dependencias nuevas.
- Todo el contenido, código y comentarios en español.
- Verificación: `npm run build` en verde y revisión manual en desktop y móvil (375 px).

## Casos límite
- Campo de dato del negocio vacío (gestor de residuos, email): no aparece ni en la página ni en el marcado.
- Bloque de preguntas con título personalizado: el marcado recoge las preguntas, no el título.
- Páginas de zona: reciben solo los cambios transversales (marcado del negocio, marcado de sus preguntas actuales, migas que ya tienen); su texto no cambia.
- "Madrid capital" como nombre de zona: en el marcado del negocio la localidad servida se publica como "Madrid".
- Página con varias migas (material bajo "Gestión de metales"): posiciones consecutivas desde "Inicio".
- Archivos sustituidos sin cambiar su nombre (logo, imagen OG): se ven actualizados en un máximo de 30 días.
- Petición `http://www.<dominio>/contacto` (sin barra): se acepta una cadena de 2 redirecciones 301 hasta `https://<dominio>/contacto/`.
- La cabecera HSTS aparece también en la respuesta 301: es inocuo y aceptado.

## Fuera de alcance
- Todo lo de la spec 002 (Madrid capital, página de precios, "precio bajo consulta", anclas genéricas, enlaces desde portada y trabajos realizados, tarjetas de materiales sin página propia).
- **Contenido de las páginas de zona** (ampliar texto, preguntas locales, imágenes) y su marcado de servicio por localidad. Siguiente spec recomendada: "003 — contenido de zonas", con datos reales del dueño.
- Marcado de reseñas o valoraciones (`Review`, `AggregateRating`) sobre las reseñas que muestra la propia web: las pautas de Google no permiten marcar reseñas propias del negocio en su web.
- Datos opcionales del negocio en el marcado: coordenadas, rango de precios, redes sociales, nº de gestor de residuos.
- Cambiar títulos, H1, URLs o textos visibles, o crear redirecciones entre páginas (salvo `/favicon.ico`).
- Imágenes Open Graph por página y `twitter:title/description`.
- Acciones externas al código, que se recomiendan pero no se implementan: perfil de Google Business (categorías, fotos, publicaciones, reseñas; es lo que más pesa en Maps), Google Search Console y Bing Webmaster Tools (verificar, enviar sitemap, revisar cobertura y Core Web Vitals), citas NAP en directorios y backlinks locales.
- Texto del aviso de cookies y Consent Mode v2 de Google (tema legal/de medición; otra spec).

## Criterios de finalización
Bloquean el cierre:
- `npm run build` en verde y HTML generado revisado contra cada RF.
- Marcado validado sin errores según los RNF.
- Configuración del servidor incluida en la salida compilada inspeccionada: caché (RF-17 a RF-19), HSTS (RF-20), redirecciones y página de error (RF-13, RF-21 a RF-25).
- Checklist de la skill seo-tecnico completo en desktop y móvil (375 px).
- Ningún título, H1, URL ni texto visible cambiado.
- Las 6 meta descriptions revisadas y aprobadas por el dueño.
- `MEMORY.md` actualizado.

Verificación posterior al despliegue (no bloquea el cierre): cabeceras, redirecciones y 404 en el servidor real con `curl -I`, y Core Web Vitals con PageSpeed Insights en móvil.

## Correspondencia con la numeración anterior
Antes de dividir la spec, los RF iban del 1 al 43.

| Nuevo | Anterior | Nuevo | Anterior |
|---|---|---|---|
| RF-1 a RF-7 | RF-1 a RF-7 | RF-16 | RF-34 |
| RF-8 | RF-22 | RF-17 | RF-35 |
| RF-9 | RF-23 | RF-18 | RF-36 |
| RF-10 | RF-24 | RF-19 | RF-37 |
| RF-11 | RF-25 | RF-20 | RF-38 |
| RF-12 | RF-26 | RF-21 | RF-39 |
| RF-13 | RF-27 | RF-22 | RF-40 |
| RF-14 | RF-32 | RF-23 | RF-41 |
| RF-15 | RF-33 | RF-24 | RF-42 |
| | | RF-25 | RF-43 |

## Dudas abiertas
- Ninguna.
