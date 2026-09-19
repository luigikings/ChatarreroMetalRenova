# MetalRenova — Scrap Metal Business Website

[![Astro](https://img.shields.io/badge/Astro-static-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![No backend](https://img.shields.io/badge/backend-none-lightgrey)]()
[![License](https://img.shields.io/badge/license-private-informational)]()

🌐 **Live site:** [chatarreriametalrenova.es](https://chatarreriametalrenova.es)

> Read this in [English](#english) or [Español](#español).

---

## English

### Overview

A full rebuild, from the ground up, of the website for **MetalRenova**, a
scrap-metal collection business (chatarrero) operating in Getafe and the
Madrid region, Spain. The previous site ran on WordPress; this version is a
static site built with **Astro**, designed around three constraints: it had
to be fast, it had to rank locally, and it had to ship with zero moving
parts to maintain (no CMS, no database, no server-side code).

The project covers the full scope of a small local-business site: 25 static
pages (home, 6 material-specific landing pages, 8 city/zone landing pages,
service pages, legal pages, and a custom 404), all driven from a single
source-of-truth config file so business data (phone numbers, address,
hours, service areas) never has to be edited in more than one place.

### Key features

- **Static output, zero backend** — `astro build` produces plain HTML/CSS/JS.
  No database, no API routes, no contact forms (all contact happens through
  `tel:` links and pre-filled WhatsApp deep links).
- **Performance budget enforced by design** — CSS and JS are hand-written,
  no UI framework or component library; fonts (Inter, Barlow Condensed) are
  self-hosted as subset `.woff2` files instead of pulled from Google Fonts.
- **Local SEO built in** — per-page `<title>`/meta description, canonical
  URLs, `LocalBusiness` and `BreadcrumbList` JSON-LD structured data, an
  auto-generated XML sitemap (`@astrojs/sitemap`), and eight dedicated
  landing pages for the towns the business actually serves.
- **Image pipeline** — real business photos processed through Astro's
  built-in `<Image>` component (automatic `WebP` conversion, explicit
  dimensions, lazy loading); favicons and the Open Graph share image were
  generated from the client's real logo with Sharp and Playwright.
- **Accessible dark theme** — a custom dark palette (cyan/copper accents on
  a near-black background) with contrast ratios checked against WCAG AA.
- **Deployment-ready for shared hosting** — ships its own `.htaccess`
  (HTTPS + non-www redirect, compression, cache headers, security headers)
  so it can be dropped straight into an Apache/LiteSpeed host like
  Hostinger, replacing a WordPress install with static files only.

### Tech stack

| Layer       | Choice                                             |
| ----------- | --------------------------------------------------- |
| Framework   | [Astro](https://astro.build) (static output, `astro build`) |
| Language    | TypeScript, `.astro` components                     |
| Styling     | Hand-written CSS (custom properties / design tokens), no framework |
| Images      | `astro:assets`, Sharp (favicons), Playwright (OG image render) |
| SEO         | `@astrojs/sitemap`, JSON-LD (LocalBusiness, BreadcrumbList) |
| Hosting     | Static files on shared hosting (Apache/LiteSpeed), via `.htaccess` |

### Project structure

```
src/
  config/site.ts       ← single source of truth for business data
  data/precios.json    ← material prices (optional, falls back to "ask us")
  layouts/Layout.astro ← base template: SEO head, header, footer, mobile CTA bar
  components/          ← Header, Footer, Logo, Faq, Breadcrumbs, OtherZones, etc.
  pages/                ← one .astro file = one route (25 pages total)
  styles/global.css    ← all site CSS, no external UI library
public/
  fonts/                ← self-hosted Inter & Barlow Condensed (.woff2)
  .htaccess             ← Apache/LiteSpeed config, copied into the build output
  robots.txt
```

### Getting started

```bash
npm install
npm run dev       # local dev server with hot reload
npm run build     # outputs the static site to dist/
npm run preview   # serve the production build locally
```

Business details (phone numbers, address, opening hours, service areas,
WhatsApp link) live in `src/config/site.ts` — every page, the header,
footer, and structured data all read from that single file.

### About this project

Built end-to-end (planning, UI, copy, SEO, and deployment) as a real
client project. No statistics, reviews, or claims appear anywhere on the
site unless they were explicitly confirmed by the business owner or
verified from a real source (e.g. Google Business Profile reviews,
transcribed verbatim with a link back to the original listing).

---

## Español

### Descripción general

Reconstrucción completa, desde cero, de la web de **MetalRenova**, un
negocio de compra y recogida de chatarra (chatarrero) que opera en Getafe y
la zona sur de Madrid. La web anterior estaba hecha en WordPress; esta
versión es un sitio estático construido con **Astro**, pensado alrededor de
tres condiciones: tenía que ser rápida, tenía que posicionar bien a nivel
local, y tenía que funcionar sin ninguna pieza que mantener (sin CMS, sin
base de datos, sin código de servidor).

El proyecto cubre el alcance completo de una web de negocio local: 25
páginas estáticas (home, 6 páginas específicas por material, 8 páginas de
zona/ciudad, páginas de servicios, páginas legales y un 404 personalizado),
todo controlado desde un único archivo de configuración para que los datos
del negocio (teléfonos, dirección, horario, zonas de servicio) nunca haya
que tocarlos en más de un sitio.

### Características principales

- **Salida estática, sin backend** — `astro build` genera HTML/CSS/JS
  planos. Sin base de datos, sin rutas de API, sin formularios de contacto
  (todo el contacto se hace por enlaces `tel:` y enlaces directos de
  WhatsApp con mensaje precargado).
- **Presupuesto de rendimiento por diseño** — el CSS y el JS están escritos
  a mano, sin framework de UI ni librería de componentes; las fuentes
  (Inter, Barlow Condensed) están autoalojadas como `.woff2` en vez de
  cargarse desde Google Fonts.
- **SEO local integrado** — `<title>` y meta description por página, URLs
  canónicas, datos estructurados JSON-LD (`LocalBusiness` y
  `BreadcrumbList`), sitemap XML autogenerado (`@astrojs/sitemap`), y ocho
  páginas de aterrizaje dedicadas a las ciudades donde realmente trabaja
  el negocio.
- **Pipeline de imágenes** — fotos reales del negocio procesadas con el
  componente `<Image>` de Astro (conversión automática a `WebP`,
  dimensiones explícitas, carga diferida); los favicons y la imagen de
  vista previa para redes sociales (Open Graph) se generaron a partir del
  logo real del cliente con Sharp y Playwright.
- **Tema oscuro accesible** — paleta oscura personalizada (acentos cian y
  cobre sobre fondo casi negro) con los contrastes comprobados contra el
  estándar WCAG AA.
- **Lista para desplegar en hosting compartido** — incluye su propio
  `.htaccess` (redirección a HTTPS sin `www`, compresión, cabeceras de
  caché, cabeceras de seguridad) para poder subirla directamente a un
  hosting Apache/LiteSpeed como Hostinger, sustituyendo una instalación de
  WordPress por archivos puramente estáticos.

### Stack tecnológico

| Capa        | Elección                                            |
| ----------- | ---------------------------------------------------- |
| Framework   | [Astro](https://astro.build) (salida estática, `astro build`) |
| Lenguaje    | TypeScript, componentes `.astro`                     |
| Estilos     | CSS escrito a mano (custom properties / design tokens), sin framework |
| Imágenes    | `astro:assets`, Sharp (favicons), Playwright (render de la imagen OG) |
| SEO         | `@astrojs/sitemap`, JSON-LD (LocalBusiness, BreadcrumbList) |
| Hosting     | Archivos estáticos en hosting compartido (Apache/LiteSpeed), vía `.htaccess` |

### Estructura del proyecto

```
src/
  config/site.ts       ← fuente única de datos del negocio
  data/precios.json    ← precios de materiales (opcional, si no hay dato muestra "consúltanos")
  layouts/Layout.astro ← plantilla base: SEO, header, footer, barra CTA móvil
  components/          ← Header, Footer, Logo, Faq, Breadcrumbs, OtherZones, etc.
  pages/                ← un archivo .astro = una URL (25 páginas en total)
  styles/global.css    ← todo el CSS del sitio, sin librería externa
public/
  fonts/                ← Inter y Barlow Condensed autoalojadas (.woff2)
  .htaccess             ← configuración de Apache/LiteSpeed, se copia al build
  robots.txt
```

### Cómo arrancar el proyecto

```bash
npm install
npm run dev       # servidor local con recarga en caliente
npm run build     # genera la web estática en dist/
npm run preview   # sirve en local el build de producción
```

Los datos del negocio (teléfonos, dirección, horario, zonas de servicio,
enlace de WhatsApp) viven en `src/config/site.ts` — todas las páginas, el
header, el footer y los datos estructurados leen de ese único archivo.

### Sobre este proyecto

Desarrollado de principio a fin (planificación, interfaz, textos, SEO y
despliegue) como proyecto real para un cliente. En ningún punto de la web
aparecen estadísticas, reseñas o afirmaciones que no hayan sido confirmadas
explícitamente por el propietario del negocio o verificadas desde una
fuente real (por ejemplo, las reseñas de Google Business Profile están
transcritas de forma literal, con enlace a la ficha original).
