# Plan — Spec 001: Auditoría SEO, marcado y técnico

Parte de `specs/001-auditoria-seo/spec.md` (aprobada). Stack según `AGENTS.md`: Astro 7 estático, TypeScript estricto, `.astro`, CSS propio. Sin dependencias nuevas.

## Evidencia por archivo (hallazgos de la spec)
| Hallazgo | Archivo | Evidencia |
|---|---|---|
| H-1 | `src/layouts/Layout.astro` | `{isHome && (<script type="application/ld+json" ...localBusinessSchema)}`: el `RecyclingCenter` solo se emite en la portada. |
| H-2 | `src/pages/vaciado-de-pisos-y-naves.astro`, `mudanzas.astro`, `compra-de-*.astro`, `gestion-de-metales.astro` | Ningún JSON-LD propio; el layout no acepta datos de servicio. |
| H-5 | `src/components/Faq.astro` | Pinta `<details>` sin marcado; se usa en `index`, 9 `chatarrero-*`, `precios-chatarra`, `mudanzas` (12 páginas). |
| H-9 | `compra-de-cobre.astro`, `compra-de-aluminio.astro`, `compra-de-baterias.astro`, `compra-de-hierro-y-acero.astro`, `vaciado-de-pisos-y-naves.astro`, `nuestros-trabajos.astro` | `const description` de ~118-128 caracteres. |
| H-10 | `src/layouts/Layout.astro`, `public/` | Solo `<link rel="icon" href="/favicon-32.png" sizes="32x32">`; existe `public/icon-512.png` sin declarar; no hay `favicon.ico`. |
| H-11 | `como-funciona.astro`, `mudanzas.astro`, `nuestros-trabajos.astro` | `breadcrumbs={[{ name: 'Cómo funciona', ... }]}` sin "Servicios"; `vaciado-de-pisos-y-naves.astro` sí cuelga de "Servicios". Además, cada página repite el array en `<Layout breadcrumbs>` y en `<Breadcrumbs items>` (riesgo de que visible y marcado diverjan). |
| H-12 | `src/layouts/Layout.astro` | `<link rel="canonical">` se emite siempre, también con `noindex` (404). |
| H-13 | `astro.config.mjs` | `sitemap({ ..., lastmod: new Date() })`. |
| H-14 | `public/.htaccess` | `<FilesMatch "\.(css|js|woff2?|svg|webp|avif|png|jpe?g|gif|ico)$">` → `max-age=31536000, immutable` para todo, incluidos `og-image.jpg`, iconos y `public/fonts/*` (sin hash); `xml`/`txt` sin regla. |
| H-15 | `public/.htaccess` | No hay `Strict-Transport-Security`. |

## Archivos y responsabilidades

| Archivo | Cambio | RF |
|---|---|---|
| `src/lib/schema.ts` (nuevo) | Funciones puras que construyen los objetos JSON-LD y los serializan de forma segura. Reciben `site` y URLs como parámetros; no leen `Astro`, fecha, red ni DOM. | RF-1 a RF-7, RF-15 |
| `src/layouts/Layout.astro` | Emite el negocio en toda página sin `noindex`; emite el servicio si recibe la prop `servicio`; no emite canónica con `noindex`; pinta `<Breadcrumbs>` a partir de su prop `breadcrumbs` (fuente única) y emite su marcado; declara `icon-512.png`. | RF-1, RF-4, RF-5, RF-10 a RF-12, RF-14, RF-15 |
| `src/components/Faq.astro` | Emite junto al acordeón el JSON-LD `FAQPage` con los mismos `items`. | RF-6 |
| 8 páginas con servicio (tabla abajo) | Pasan `servicio={{ nombre: '...' }}` al layout. | RF-4, RF-5 |
| 25 páginas con migas | Quitan su `<Breadcrumbs ... />` y el import (lo pinta el layout). `como-funciona`, `mudanzas` y `nuestros-trabajos` anteponen `{ name: 'Servicios', path: '/servicios/' }`. | RF-14, RF-15 |
| 6 páginas con meta corta | Nueva `const description` (textos abajo). | RF-8, RF-9 |
| `astro.config.mjs` | Quita `lastmod` (y su comentario). | RF-16 |
| `public/.htaccess` | Caché por tipo y huella, HSTS, 301 de `/favicon.ico`, 301 de barra final explícito. | RF-13, RF-17 a RF-25 |

Sin cambios: `src/config/site.ts` (ya es la fuente del NAP y horario; `wasteManagerAuthNumber` y `email` vacíos no se publican), `public/robots.txt`, textos visibles, títulos, H1 y URLs (RF-9).

## Lógica (`src/lib/schema.ts`)
Separada de la interfaz (constitución, punto 3). Tipos explícitos, todo en español.

```
ID_NEGOCIO(siteUrl) = siteUrl + '/#negocio'

negocioSchema(site) -> objeto RecyclingCenter
  // mismo contenido que hoy en Layout.astro: @id, name, description, url, logo, image,
  // foundingDate, telephone, contactPoint[2], hasMap, address (PostalAddress completa),
  // areaServed (Comunidad de Madrid + zonas; 'Madrid capital' -> 'Madrid'),
  // openingHoursSpecification (dayOfWeek = 7 días, opens '00:00', closes '23:59'), sameAs.
  // No añade geo, priceRange, redes ni gestor de residuos (RF-7).

servicioSchema(nombre, urlCanonica, siteUrl) -> objeto Service
  { @type: 'Service', name: nombre, serviceType: nombre, url: urlCanonica,
    provider: { @id: ID_NEGOCIO(siteUrl) },
    areaServed: { @type: 'AdministrativeArea', name: 'Comunidad de Madrid' } }

faqSchema(items[{question, answer}]) -> objeto FAQPage | null
  si items vacío -> null
  mainEntity = items.map(q -> { @type: 'Question', name: q.question,
                                acceptedAnswer: { @type: 'Answer', text: q.answer } })

migasSchema(migas[{name, path}], siteUrl) -> objeto BreadcrumbList | null
  si migas vacío -> null
  itemListElement = [ {position 1, name 'Inicio', item siteUrl + '/'},
                      ...migas.map((m, i) -> {position i + 2, name m.name, item siteUrl + m.path}) ]

aJsonLd(objeto) -> string
  JSON.stringify(objeto) con '<' sustituido por '<'  // evita cerrar el <script> por accidente
```

## Interfaz
- `Layout.astro`
  - Props nuevas: `servicio?: { nombre: string }`. Se mantienen `title`, `description`, `breadcrumbs`, `noindex`; `isHome` deja de condicionar el marcado (se puede conservar la prop sin uso o eliminarla de `index.astro`).
  - `<head>`: `{!noindex && <link rel="canonical" ...>}`; `<link rel="icon" href="/icon-512.png" type="image/png" sizes="512x512" />` además del de 32 px; `{!noindex && <script type="application/ld+json" set:html={aJsonLd(negocioSchema(site))} />}`; servicio si `servicio`; migas si hay `breadcrumbs`.
  - `<main id="main">`: `{breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}` antes de `<slot />`. Hoy todas las páginas pintan `<Breadcrumbs>` como primer hijo de `main`, así que el HTML resultante es el mismo.
- `Faq.astro`: tras el acordeón, `{faq && <script type="application/ld+json" set:html={aJsonLd(faq)} />}` (JSON-LD en `body` es válido).

### Páginas con servicio (RF-4) y sin él (RF-5)
| Página | `servicio.nombre` |
|---|---|
| `/vaciado-de-pisos-y-naves/` | Vaciado de pisos, locales y naves |
| `/mudanzas/` | Mudanzas y portes |
| `/compra-de-cobre/` | Compra de cobre |
| `/compra-de-aluminio/` | Compra de aluminio |
| `/compra-de-laton/` | Compra de latón |
| `/compra-de-hierro-y-acero/` | Compra de hierro y acero |
| `/compra-de-baterias/` | Compra de baterías usadas |
| `/gestion-de-metales/` | Compra de metales y chatarra |

El resto de páginas no pasa `servicio`.

### Migas finales (RF-14)
- Servicios › {Cómo funciona, Vaciado de pisos y naves, Mudanzas, Nuestros trabajos}: cambian 3 (cómo funciona, mudanzas, nuestros trabajos).
- Gestión de metales y sus 5 materiales; precios, contacto, 9 zonas y 3 legales: ya cumplen, sin cambios de contenido.
- Portada y 404: sin migas (ya es así).

### Meta descriptions propuestas (RF-8) — las revisa el dueño al aprobar este plan
Solo usan afirmaciones ya publicadas en la web. Longitudes aproximadas; la tarea verifica el recuento exacto (130-160) y, si alguna se sale, solo se recorta o amplía con frases ya publicadas.

| Página | Texto propuesto | ≈ car. |
|---|---|---|
| Compra de cobre | Compramos cobre en todo Madrid: cable pelado o sin pelar, tuberías, motores y restos eléctricos. Recogida a domicilio gratuita y pago inmediato en efectivo. | 156 |
| Compra de aluminio | Compramos aluminio en todo Madrid: perfiles, ventanas, chapa y piezas industriales. Recogida a domicilio sin coste y pago inmediato. Pide precio por WhatsApp. | 158 |
| Compra de baterías | Compramos baterías usadas de coche, moto y maquinaria en todo Madrid. Recogida a domicilio sin coste y pago inmediato. Te damos el precio por WhatsApp. | 151 |
| Compra de hierro y acero | Compramos hierro y acero en todo Madrid: estructuras, vigas, radiadores y chatarra pesada. Nos encargamos de la carga y el transporte, y pagamos al momento. | 155 |
| Vaciado de pisos y naves | Vaciamos pisos, locales y naves en todo Madrid: desmontaje, clasificación y retirada completa, dejando el espacio limpio. Presupuesto sin compromiso. | 147 |
| Nuestros trabajos | Fotos y ejemplos de vaciados de naves, locales, bares, talleres y pisos que hemos hecho en Madrid. Pide tu presupuesto sin compromiso por WhatsApp. | 146 |

## Configuración del servidor (`public/.htaccess`)
Se copia tal cual a `dist/.htaccess`. Bloques resultantes (orden importa):

```apache
RewriteEngine On
# 1) HTTPS + sin www (ya existe; RF-21, RF-22)
RewriteCond %{HTTPS} off [OR]
RewriteCond %{HTTP_HOST} ^www\.(.+)$ [NC]
RewriteRule ^ https://chatarreriametalrenova.es%{REQUEST_URI} [L,R=301,NE]

# 2) /favicon.ico -> icono PNG grande (RF-13)
RewriteRule ^favicon\.ico$ /icon-512.png [L,R=301]

# 3) Barra final en directorios existentes (RF-23; explícito en vez de depender de mod_dir)
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^(.*[^/])$ /$1/ [L,R=301]

# 4) Marca los archivos con huella (Astro los genera en /_astro/)
RewriteRule ^_astro/ - [E=CON_HUELLA:1]

ErrorDocument 404 /404.html   # ya existe (RF-25)

<IfModule mod_headers.c>
  <FilesMatch "\.(css|js|woff2?|svg|webp|avif|png|jpe?g|gif|ico)$">
    Header set Cache-Control "public, max-age=2592000" env=!CON_HUELLA          # RF-18 (30 días)
    Header set Cache-Control "public, max-age=31536000, immutable" env=CON_HUELLA # RF-17
  </FilesMatch>
  <FilesMatch "\.(html|xml|txt)$">
    Header set Cache-Control "public, max-age=0, must-revalidate"               # RF-19
  </FilesMatch>
  Header always set Strict-Transport-Security "max-age=31536000"                 # RF-20
  # cabeceras de seguridad existentes sin cambios
</IfModule>
```
- RF-24: `http://www…/contacto` → regla 1 (HTTPS sin www, sin barra) → regla 3 (barra) = 2 saltos, aceptado.
- `Header always` también envía HSTS en los 301 (aceptado) y en HTTP (los navegadores lo ignoran; inocuo).

## Decisiones técnicas
| Decisión | Alternativa descartada y por qué |
|---|---|
| Builders JSON-LD en `src/lib/schema.ts` | Objetos dentro de cada `.astro`: duplicación y contra la constitución (lógica fuera de los componentes). |
| Marcado del negocio completo en cada página (mismo `@id`) | Solo referencia `@id` fuera de la portada: la spec pide NAP completo en todas (RF-1). |
| El layout pinta las migas visibles a partir de su prop | Mantener el array duplicado en cada página: riesgo de que visible y marcado diverjan (RF-15). |
| `FAQPage` emitido por `Faq.astro` | Pasar las FAQs al layout por prop: obliga a tocar las 12 páginas y duplicar los datos. |
| Diferenciar caché con `E=CON_HUELLA` por ruta `/_astro/` | `<If>` de Apache 2.4: soporte dudoso en LiteSpeed. `.htaccess` dentro de `public/_astro/`: puede chocar con la carpeta que genera Astro. Si tras desplegar `curl -I` muestra que la variable no se aplica en Hostinger, se usará esta segunda opción. |
| Quitar `lastmod` del sitemap | Fecha real por página: exige lógica nueva (fechas de git o manuales) sin beneficio claro; Google ignora `lastmod` poco fiable. |
| `/favicon.ico` → 301 a `icon-512.png` | Crear un `.ico` real: necesita una herramienta o dependencia para generarlo. |
| Barra final con regla explícita | Depender de `DirectorySlash` de mod_dir: no se puede comprobar en `dist/`. |

## Estrategia de verificación
`AGENTS.md`: no hay suite de tests; verificación = `npm run build` + revisión manual (desktop y 375 px). No se añade framework de tests (vitest sería una dependencia nueva; `node --test` con TypeScript depende de la versión de Node instalada). Las funciones puras se comprueban a través del HTML generado.

Comprobaciones por tarea (PowerShell, desde la raíz):
- Tipos: `npx astro check` (ya es dependencia de desarrollo).
- Build: `npm run build` en verde.
- Negocio en 26 páginas indexables: `(Get-ChildItem dist -Recurse -Filter index.html | Select-String '#negocio"' -List).Count` → 26; y `Select-String dist\404.html 'ld\+json|rel="canonical"'` → sin resultados.
- Servicio: `... | Select-String '"@type":"Service"' -List` → exactamente las 8 páginas de la tabla.
- FAQPage: `... | Select-String '"@type":"FAQPage"' -List` → 12 páginas (portada, 9 zonas, precios, mudanzas).
- Migas: revisar en `dist/` que el `BreadcrumbList` y el `<nav class="breadcrumbs">` de cómo funciona, mudanzas, nuestros trabajos, cobre y una zona coinciden.
- Sitemap: `Select-String dist\sitemap-*.xml 'lastmod'` → sin resultados.
- Servidor: inspeccionar `dist\.htaccess` contra el bloque de arriba.
- Validadores: pegar el HTML de `dist/` (modo código) de portada, una zona, compra de cobre, mudanzas y precios en validator.schema.org (sin errores) y en la Prueba de resultados enriquecidos (negocio local y migas sin errores).
- Visual: `npm run preview`, desktop y 375 px: migas en el mismo sitio, sin saltos de diseño, iconos correctos.
- Post-despliegue (no bloquea el cierre): `curl -I` a `http://`, `http://www.`, `/contacto`, `/favicon.ico`, una URL inexistente, un archivo de `/_astro/`, `/og-image.jpg`, `/sitemap-index.xml`; PageSpeed Insights en móvil.

## Cobertura de RF
| RF | Dónde |
|---|---|
| RF-1, RF-2, RF-3, RF-7 | `schema.ts` (`negocioSchema`) + `Layout.astro` |
| RF-4, RF-5 | `schema.ts` (`servicioSchema`) + `Layout.astro` + 8 páginas |
| RF-6 | `schema.ts` (`faqSchema`) + `Faq.astro` |
| RF-8 | 6 páginas |
| RF-9 | Restricción transversal; verificación final |
| RF-10, RF-11, RF-12 | `Layout.astro` |
| RF-13 | `.htaccess` |
| RF-14, RF-15 | `Layout.astro` + `schema.ts` (`migasSchema`) + 25 páginas |
| RF-16 | `astro.config.mjs` |
| RF-17 a RF-25 | `.htaccess` |
