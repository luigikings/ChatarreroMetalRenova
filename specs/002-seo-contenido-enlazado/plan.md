# Plan 002 — Auditoría SEO: contenido y enlazado

Fase 3 (plan). La spec está APROBADA, no se redacta de nuevo.
Base: `specs/002-seo-contenido-enlazado/spec.md`, `MEMORY.md`, `docs/constitution.md`, skill seo-tecnico.
Restricciones del dueño (vigentes): no cambiar títulos, H1 ni URLs; textos nuevos solo con
afirmaciones ya publicadas en la web; el dueño revisa los textos antes de publicar (van abajo);
sin dependencias nuevas; todo en español. Sin commit ni push hasta que lo pida.
Fuera de alcance: contenido de las otras 8 zonas (futura 003) y banner de cookies (spec legal aparte).

## Evidencia de los hallazgos (rutas reales)

- H-4: `src/pages/index.astro:12` título «Chatarrería en Madrid abierta 24 horas»,
  `:85` H1 «Chatarrería en Madrid: ...»; `src/pages/chatarrero-madrid.astro:9` título con
  «Madrid capital», `:29` H1 con «Madrid capital», `:13-22` 2 FAQ (solo 1 menciona la capital),
  `:52-62` 2 párrafos sin enlace a la portada, con ancla «zona de trabajo» a `/servicios/`.
- H-6: `src/data/precios.json:2` `actualizado: 2026-09-18`, todos los materiales con precio `null`;
  `src/pages/precios-chatarra.astro:10` meta con «Precios orientativos», `:46-47` entradilla con
  «precios orientativos», `:56` fecha en crudo `2026-09-18`;
  `src/pages/index.astro:135` «Precio orientativo por kilo.» sobre tarjetas que muestran
  «Consúltanos por WhatsApp» (`:34-37`, `:141`).
- H-7: anclas «Más información →» en `src/pages/index.astro:142`,
  `src/pages/precios-chatarra.astro:68`, `src/pages/gestion-de-metales.astro:64`.
- H-8: portada (`src/pages/index.astro`) sin enlaces a vaciados/mudanzas/servicios en su contenido;
  `src/pages/nuestros-trabajos.astro` sin enlace a `/vaciado-de-pisos-y-naves/` en su contenido.
- Tarjeta de plomo: `src/pages/index.astro:40-44` enlaza por defecto a `/gestion-de-metales/`
  (`m.pagina ?? '/gestion-de-metales/'`); en precios (`precios-chatarra.astro:68`) y metales
  (`gestion-de-metales.astro:64`) ya solo enlazan `si hay pagina`, correcto para RF-16.

## Archivos que se crean o modifican

| Archivo | Qué cambia | RF |
|---|---|---|
| `src/lib/fecha.ts` (nuevo) | `formatearFechaLegible(iso)` pura: `YYYY-MM-DD` → «18 de septiembre de 2026» sin `Date` (sin zona horaria); `null` si falta o no es válida | RF-11, RF-12 |
| `src/data/precios.json` | `actualizado` pasa a la fecha de publicación del nuevo contenido (a acordar con el dueño el día de la implementación) | RF-13 |
| `src/pages/precios-chatarra.astro` | Entradilla «bajo consulta», fecha legible, 5 bloques por material con factores + enlace descriptivo, anclas descriptivas, meta nueva | RF-7–RF-13, RF-14, RF-15 |
| `src/pages/chatarrero-madrid.astro` | Párrafos reescritos (enlace a portada + anclas descriptivas), 3 FAQ con mención a la capital; meta actual (151 caracteres, contiene «Madrid capital») SE MANTIENE | RF-2–RF-6, RF-14 |
| `src/pages/index.astro` | Título, H1 y URL intactos (RF-1); intro de materiales «bajo consulta», anclas descriptivas, plomo sin enlace, nueva sección con enlaces a vaciados/mudanzas/servicios | RF-1, RF-7, RF-14, RF-15, RF-16, RF-17 |
| `src/pages/gestion-de-metales.astro` | Solo anclas descriptivas (ya cumple RF-16) | RF-15 |
| `src/pages/nuestros-trabajos.astro` | Párrafo con enlace descriptivo a vaciados | RF-18 |

Ningún título, H1 ni URL cambia (RF-1 + RNF spec 001 RF-9). Las FAQ que cambien se pintan con
`Faq.astro`, cuyo `FAQPage` sale de lo visible (RNF). No se tocan `Layout`, `schema.ts`, sitemap,
robots ni `.htaccess` (ámbito de la 001).

## Lógica separada de la interfaz (constitución, punto 3)

Toda la lógica nueva vive en `src/lib/fecha.ts` (función pura, sin `Date`, red ni DOM).
Los `.astro` solo pintan: llaman a la función y condicionan la línea de fecha a `null`.
`priceLabel` (ya existente en portada y precios) no cambia: con todo a `null` muestra
«Consúltanos por WhatsApp» sin cifras (RF-8, ya cumplido, se conserva).

## Algoritmo (solo lógica no trivial: la fecha)

```
funcion formatearFechaLegible(iso):
  si iso es nulo/vacío → nulo
  si no casa con ^(\d{4})-(\d{2})-(\d{2})$ → nulo
  mes fuera de 1..12 → nulo
  día fuera de 1..días_del_mes(año, mes, bisiesto) → nulo
  devolver "{día sin cero} de {mes_en_español} de {año}"
  meses = [enero, febrero, marzo, abril, mayo, junio, julio,
           agosto, septiembre, octubre, noviembre, diciembre]
```

Sin `new Date()` ni `toLocaleDateString`: evita conversiones de zona horaria (RF-11).
En `precios-chatarra.astro`: `fecha = formatearFechaLegible(precios.actualizado)`;
solo se pinta «Última actualización: {fecha}» si `fecha` no es nulo (RF-12).

## Cómo se pinta (sin saltos de jerarquía, seo-tecnico)

- Precios: la entradilla cambia de sitio no; solo el texto. Debajo de las tarjetas se añade una
  sección `h2` («Qué influye en el precio de cada material») con 5 tarjetas `h3` (una por material
  con página propia), cada una con su texto de factores y su enlace. La línea de fecha usa el mismo
  `<p>` actual (`:55-57`) con el valor formateado.
- Portada: la intro de materiales cambia de texto; las tarjetas con página propia enlazan con su
  ancla descriptiva y la de plomo pasa a `span` sin `<a>`. Nueva sección `h2` («Vaciados, mudanzas
  y todos los servicios») entre zonas y galería, con un párrafo y 3 enlaces. Sin tocar `h1`.
- Madrid: mismos bloques y orden; solo cambian los 2 párrafos, se añade la frase de enlace a la
  portada en el `lead` y las FAQ pasan de 2 a 3. Sin tocar título, H1 ni URL.
- Trabajos: se añade un párrafo con enlace al final de la sección «Espacios», antes de la galería.

## Datos

`precios.json` mantiene su formato (`actualizado`, `materiales[]` con `precio_desde/hasta: null`,
`pagina: string|null`). Compatible: nada lee la fecha salvo la página de precios. RF-13: el valor
de `actualizado` se fija el día de la implementación/publicación (fecha a confirmar con el dueño;
en el plan figura como `AAAA-MM-DD` pendiente). Futuro material con precio confirmado: RF-7 deja
de aplicarse (caso límite de la spec).

## Decisiones técnicas (con alternativa descartada)

1. Función propia de fecha en vez de `toLocaleDateString` / `Intl`: las de `Date` aplican la zona
   horaria del servidor de build y pueden mover el día; el parseo manual garantiza «fecha de
   calendario» (RF-11). Descartada `Intl` por ese motivo.
2. Fecha de publicación manual en `precios.json` en vez de fecha de build: una fecha de build
   cambia en cada despliegue y es poco fiable (regla ya adoptada en la 001 para el sitemap).
   Descartado `new Date()` en build.
3. Anclas con el H1 exacto de destino («Compra de cobre en Madrid →») en vez de mantener
   «Más información»: cumple la definición de ancla descriptiva de la spec (palabras del H1).
   Descartado inventar anclas comerciales nuevas.
4. Nueva sección en portada en vez de forzar enlaces en secciones existentes: no rompe el diseño
   ni la jerarquía y agrupa los 3 destinos (RF-17). Descartado tocar hero o pasos.

## Estrategia de verificación (AGENTS.md: sin suite de tests)

`npx astro check` + `npm run build` en verde y revisión manual en desktop y móvil (375 px).
Matriz RF por RF en la fase de validación: inspección del HTML generado (grep de «orientativo»,
«Más información», «zona de trabajo», «2026-09-18», frase exacta «chatarrería en Madrid»),
conteo con herramienta de la meta de Madrid (130–160) y de la nueva de precios, comprobación de fecha legible y de su omisión con fecha
inválida (prueba temporal local, sin commitear), auditoría de todos los enlaces internos del
contenido principal incluidos `MaterialLinks`, `OtherZones` y CTAs de texto de Madrid/portada
(RF-4, RF-6, RF-15), y checklist seo-tecnico de las 5 páginas tocadas
(title único, description única, canonical, un H1, sin saltos, OG, alt/width/height, JSON-LD = visible,
sin `noindex`, 404 intacto). Bloquea el cierre: aprobación del dueño de los textos de abajo
(criterio de finalización de la spec).

---

## TEXTOS NUEVOS PARA REVISIÓN DEL DUEÑO (bloquean la publicación)

Todos redactados SOLO con afirmaciones ya publicadas en la web (origen entre paréntesis),
salvo la fórmula «bajo consulta», que es nueva pero la exige RF-7 en esos 3 sitios.
Sin cifras, sin barrios, sin plazos, sin datos locales nuevos. Títulos, H1 y URLs intactos.

### 1. Meta description de precios (nueva, 142 caracteres)

> Consulta cuánto pagamos por cobre, aluminio, latón, hierro y otros metales en Madrid. Precio
> bajo consulta, confirmado por WhatsApp con fotos.

(Origen: lista de materiales de `gestion-de-metales.astro:12-21`; «confirmado por WhatsApp con
fotos» de `precios-chatarra.astro:31` y `como-funciona.astro:16`. Sustituye a la actual con
«Precios orientativos».)

### 2. Meta description de Madrid capital (SE MANTIENE, 151 caracteres, ya cumple RF-2)

> Compramos chatarra y metales en Madrid capital, con recogida a domicilio y pago inmediato.
> Cobre, aluminio, hierro y más, desde nuestra base en Getafe.

Sin cambios: contiene «Madrid capital» y mide 130–160. No necesita aprobación.

### 3. Entradilla de precios (sustituye a «Estos son precios orientativos…»)

> Precios bajo consulta: el valor real de cada metal cambia día a día según el mercado. Te
> confirmamos el precio exacto por WhatsApp con fotos de tu material.

(Origen: `precios-chatarra.astro:21` cotización diaria; `:31` confirmación por WhatsApp con fotos.)

### 4. Intro de materiales de la portada (sustituye a «Precio orientativo por kilo…»)

> Precio bajo consulta. Te confirmamos el precio final por WhatsApp con fotos del material.

(Origen: `index.astro:34-37` «Consúltanos por WhatsApp»; `precios-chatarra.astro:31`.)

### 5. Madrid capital: frase de enlace a la portada (en el `lead`, tras lo actual)

> Si buscas nuestra [chatarrería en Madrid](/), esta es la página de la capital.

(El ancla contiene «chatarrería en Madrid» = H1/título de la portada, excepción permitida por RF-4/RF-5.)

### 6. Madrid capital: los 2 párrafos reescritos

> Compramos los mismos materiales que en el resto de zonas: cobre, aluminio, hierro, latón y más,
> detallados en [gestión de metales](/gestion-de-metales/). Al ser una zona más grande, el tiempo
> de respuesta puede variar algo según la zona exacta, pero el proceso es idéntico al del resto de
> nuestros [servicios en todo Madrid](/servicios/).
>
> Si tu necesidad es vaciar un piso, un local o una oficina en Madrid capital, también hacemos
> [vaciado de pisos, locales y naves](/vaciado-de-pisos-y-naves/).

(Origen frase a frase: mismos materiales `chatarrero-madrid.astro:53-54`; «gestión de metales» =
nombre en el menú `Header.astro:11`; tiempo de respuesta `chatarrero-madrid.astro:16,55-56`;
proceso idéntico `:56-57`; «servicios en todo Madrid» = palabras del H1 de `/servicios/`;
vaciados `:60-61` + H1 de la página de vaciados. Desaparece el ancla «zona de trabajo».)

### 7. Madrid capital: 3 FAQ (mínimo exigido por RF-3)

1. **¿Llegáis a cualquier zona de Madrid capital?** (se mantiene)
   Trabajamos habitualmente en Madrid capital, aunque el tiempo de respuesta puede variar algo
   según la zona exacta. Escríbenos con tu dirección y te confirmamos disponibilidad.
2. **¿El servicio en Madrid capital es igual que en Getafe o el resto de zonas?** (reescrita)
   Sí, es el mismo: nos mandas fotos por WhatsApp, te confirmamos el precio y hacemos la recogida
   con pago al momento. (Origen: `:20` + `precios-chatarra.astro:31` + `:35` pago al momento.)
3. **¿También hacéis vaciados en Madrid capital?** (nueva)
   Sí. Si necesitas vaciar un piso, un local o una oficina en Madrid capital, hacemos vaciado de
   pisos, locales y naves con presupuesto sin compromiso por WhatsApp. (Origen: `:60-61` +
   presupuesto sin compromiso de `vaciado-de-pisos-y-naves.astro:8` y `servicios.astro:38-39`;
   «por WhatsApp» de `nuestros-trabajos.astro:11`.)

### 8. Precios: 5 bloques por material (RF-9 + enlace RF-10, sin cifras)

- **Cobre.** Cable pelado o sin pelar, tuberías, motores y restos eléctricos. El cobre limpio, sin
  funda de plástico ni mezclado con otros metales, suele valer más que el cable con recubrimiento,
  por su pureza. → [Compra de cobre en Madrid](/compra-de-cobre/)
  (Origen: `compra-de-cobre.astro:12,52-61`.)
- **Aluminio.** Perfiles y marcos de ventanas, chapa, llantas, estructuras y piezas industriales.
  Pesa poco pero, en cantidad, tiene buen valor; si viene con otros materiales de la misma reforma
  u obra, nos lo llevamos todo en la misma visita. → [Compra de aluminio en Madrid](/compra-de-aluminio/)
  (Origen: `compra-de-aluminio.astro:18-20,43-47,76-78`.)
- **Latón.** Grifería, válvulas, piezas mecánicas y de cerrajería, y restos de producción. Se
  reconoce por su color dorado y porque no es magnético; si las piezas vienen mezcladas con otros
  metales, las clasificamos en la recogida. → [Compra de latón en Madrid](/compra-de-laton/)
  (Origen: `compra-de-laton.astro:20-22,47-51,61,79-81`.)
- **Hierro y acero.** Estructuras, vigas, electrodomésticos, maquinaria y acero inoxidable de
  hostelería. Por su peso y volumen coordinamos la recogida con antelación para llevar el vehículo
  y las herramientas adecuadas; también recogemos piezas sueltas como bañeras, radiadores o
  calderas. → [Compra de hierro y acero en Madrid](/compra-de-hierro-y-acero/)
  (Origen: `compra-de-hierro-y-acero.astro:20-22,47-51,54-56,59-61`.)
- **Baterías usadas.** Baterías de coche, moto, maquinaria y equipos estacionarios, también
  agotadas o dañadas siempre que no tengan roturas graves que provoquen derrames. Dinos cuántas
  tienes y de qué tipo y te damos el precio antes de venir. → [Compra de baterías usadas en Madrid](/compra-de-baterias/)
  (Origen: `compra-de-baterias.astro:18-20,43-51,54-56`.)

### 9. Portada: nueva sección (RF-17)

H2: **Vaciados, mudanzas y todos los servicios**
Párrafo: Además de comprar chatarra, hacemos [vaciado de pisos, locales y naves](/vaciado-de-pisos-y-naves/)
y [mudanzas y portes en Madrid](/mudanzas/): mudanzas de casas y oficinas y portes de muebles
sueltos. Cuéntanos qué necesitas y te damos un presupuesto sin compromiso por WhatsApp. Ver
[todos nuestros servicios](/servicios/).
(Origen: `servicios.astro:14,20,26`; `mudanzas.astro:8,57-58,101-102`; `vaciado-de-pisos-y-naves.astro:8`.)

### 10. Trabajos realizados: párrafo nuevo (RF-18)

> Cada uno de estos espacios lo tratamos como un [vaciado de pisos, locales y naves](/vaciado-de-pisos-y-naves/):
> desmontaje, clasificación y retirada completa con nuestro propio vehículo y herramientas. Cuéntanos
> tu caso y te damos un presupuesto sin compromiso.
> (Origen: `vaciado-de-pisos-y-naves.astro:32-34,57-59`; `nuestros-trabajos.astro:43-44`;
> presupuesto sin compromiso de `vaciado-de-pisos-y-naves.astro:8`.)

### 11. Anclas descriptivas (RF-6, RF-15)

- «Más información →» → «Compra de cobre en Madrid →», «Compra de aluminio en Madrid →»,
  «Compra de latón en Madrid →», «Compra de hierro y acero en Madrid →»,
  «Compra de baterías usadas en Madrid →» (H1 exactos de destino).
- «Ver todos los materiales y precios →» (portada) y «Ver la tabla de precios →» (metales) →
  «Ver precios de la chatarra en Madrid →» (palabras del H1 de `/precios-chatarra/`).
- Tarjetas sin página propia (bronce, plomo, níquel, zinc, virutas): sin `<a>` (RF-16); en portada
  la tarjeta de plomo pierde su enlace a metales.

### 12. Fecha (RF-11–RF-13)

Línea de precios: «Última actualización: 18 de septiembre de 2026» (ejemplo con el valor actual;
el definitivo será la fecha de publicación que confirme el dueño). Si la fecha falta o no es válida,
la línea no se muestra y la compilación no falla.
