# MetalRenova — web

Web estática de [MetalRenova](https://chatarreriametalrenova.es), chatarrero en Getafe
y el sur de Madrid. Hecha con [Astro](https://astro.build) en modo `static`: no hay
backend, ni base de datos, ni formularios. El contacto es siempre por teléfono o
WhatsApp.

## Cómo hacer el build

```bash
npm install
npm run build
```

Esto genera la carpeta `dist/` con la web ya lista para subir (HTML, CSS, JS mínimo,
fuentes, `robots.txt`, `sitemap-index.xml` y `.htaccess`). Puedes revisarla en local
antes de subirla con:

```bash
npm run preview
```

Y para desarrollar con recarga en caliente:

```bash
npm run dev
```

## Qué subir a Hostinger

**Todo el contenido de `dist/`** (no la carpeta `dist/` en sí, sino lo que hay dentro)
va directo a `public_html/` por FTP o por el Administrador de archivos de Hostinger.
Incluye el archivo `.htaccess`: asegúrate de que tu cliente FTP muestre los archivos
ocultos (los que empiezan por punto) para no dejarlo fuera.

Si `public_html/` ya tiene una versión antigua de la web (la de WordPress), bórrala
entera antes de subir la nueva — no deben quedar archivos PHP ni carpetas de
WordPress mezclados con esta web estática.

## Cómo cambiar los datos del negocio

Casi todo el sitio (teléfonos, WhatsApp, dirección, horario, zonas, enlace a Google)
sale de un único archivo:

**`src/config/site.ts`**

Cambia el valor que necesites (por ejemplo `phonePrimary`) y vuelve a hacer
`npm run build`. No hace falta tocar ningún otro archivo — el header, el footer, los
botones de WhatsApp y el schema de Google leen todos de aquí.

## Cómo cambiar los precios

**`src/data/precios.json`**

Cada material tiene `precio_desde` y `precio_hasta`. Si están en `null` (como ahora),
la web muestra "Consúltanos por WhatsApp". Para publicar un precio real, pon los dos
números, por ejemplo:

```json
{ "material": "Cobre", "slug": "cobre", "precio_desde": 5, "precio_hasta": 6.5, "pagina": "/compra-de-cobre/" }
```

Actualiza también el campo `"actualizado"` de arriba del todo con la fecha del día.
Este archivo alimenta la home, `/precios-chatarra/` y `/gestion-de-metales/` a la vez.

## Estructura del proyecto

```
src/
  config/site.ts       ← datos del negocio (fuente única)
  data/precios.json    ← precios de los materiales
  layouts/Layout.astro ← plantilla base (SEO, header, footer, barra móvil)
  components/          ← Header, Footer, Icon, Faq, Breadcrumbs, etc.
  pages/                ← una página por archivo .astro = una URL
  styles/global.css    ← todo el CSS del sitio (sin librerías)
public/
  fonts/                ← Inter y Barlow Condensed en .woff2, autoalojadas
  .htaccess             ← config de Apache/LiteSpeed (se copia a dist/ tal cual)
  robots.txt
  favicon.svg
```

## Pendientes del cliente (TODO-CLIENTE)

Busca `TODO-CLIENTE` en el código (`grep -rn "TODO-CLIENTE" src/`) para encontrarlos
todos marcados en contexto. Resumen de lo que queda:

- **Email de contacto**, si queréis mostrarlo en la web (`site.ts` → `email`).
- **Nº de autorización como gestor de residuos**, si lo tenéis (`site.ts` →
  `wasteManagerAuthNumber`). Si lo rellenas, aparece automáticamente en el pie y en
  el aviso legal; si no, esas frases no se muestran.
- **Una foto de un vaciado de local u oficina** para completar la galería de
  "Nuestros trabajos" (las otras dos ya están puestas).
- **Barrios o polígonos concretos** de las 8 zonas, si soléis trabajar en sitios
  específicos — ayuda al SEO local. Ya hay página propia para las 8 zonas
  (Getafe, Leganés, Fuenlabrada, Alcorcón, Móstoles, Pinto, Parla y Madrid capital).
- **Reseñas reales de Google**: no se ha podido acceder a Google desde este
  entorno para copiarlas automáticamente. Manda una captura de pantalla de las
  reseñas (o el texto tal cual) y se transcriben literalmente, con enlace a tu
  ficha de Google — nunca se inventa ninguna.

La razón social, el NIF/CIF y el resto de datos legales que no se han dado se
han omitido directamente del aviso legal y la política de privacidad (en vez de
dejar un hueco a rellenar), para que esas páginas ya se puedan publicar tal cual.

## Si en el futuro añadís Google Ads / Analytics

Ahora mismo la web no carga ningún script de terceros ni usa cookies de
seguimiento, así que no hace falta banner de cookies. El día que añadáis el tag de
Google Ads (la ficha antigua tenía uno, `AW-18121827018`) o Analytics, hace falta:

1. Añadir un banner de consentimiento de cookies antes de cargar el script.
2. Crear la página `/politica-de-cookies/` (ya está reservada en el mapa de URLs).
3. Enlazarla desde el pie de página junto a Aviso legal y Privacidad.

## Checklist post-lanzamiento

- [ ] Confirmar que `https://chatarreriametalrenova.es` carga bien (sin `www`, con
      candado HTTPS).
- [ ] Probar que `http://` y `https://www...` redirigen automáticamente a la versión
      buena (lo hace el `.htaccess`).
- [ ] Dar de alta la propiedad en **Google Search Console** (si no lo estaba ya) y
      enviar el nuevo sitemap: `https://chatarreriametalrenova.es/sitemap-index.xml`.
- [ ] Pedir la **reindexación** de las páginas principales desde Search Console.
- [ ] Revisar en Search Console que no haya errores 404 de páginas antiguas que ya
      no existan.
- [ ] Comprobar a mano las URLs que ya estaban indexadas: `/`, `/contacto/`,
      `/mudanzas/`, `/nuestros-trabajos/`, `/como-funciona/`, `/gestion-de-metales/`,
      `/servicios/` — todas deben responder con 200, no con 404 ni redirecciones raras.
- [ ] Vaciar la caché de Hostinger/LiteSpeed (y la del navegador) tras subir los
      archivos, para no seguir viendo la web vieja.
- [ ] Comprobar los botones de llamar y WhatsApp desde un móvil real.
- [ ] Revisar la ficha de Google Business Profile: que el teléfono y la dirección
      coincidan exactamente con los de la web.
- [ ] Pasar la web por PageSpeed Insights (móvil) para confirmar que el LCP baja de
      los 9,5 s que tenía la web anterior.
