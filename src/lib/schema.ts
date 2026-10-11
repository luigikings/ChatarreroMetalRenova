// Constructores de datos estructurados (JSON-LD de schema.org).
// Funciones puras: reciben los datos del negocio y las URLs como parámetros y no
// leen Astro, la fecha, la red ni el DOM. Los componentes solo pintan el resultado.

/** Datos del negocio que necesita el marcado (subconjunto de `site` en src/config/site.ts). */
export interface DatosNegocio {
  readonly name: string;
  readonly url: string;
  readonly foundingDate: string;
  readonly foundingYear: number;
  readonly phonePrimaryTel: string;
  readonly phoneSecondaryTel: string;
  readonly address: {
    readonly street: string;
    readonly postalCode: string;
    readonly city: string;
    readonly region: string;
    readonly country: string;
    readonly mapsUrl: string;
  };
  readonly hours: {
    readonly opens: string;
    readonly closes: string;
    readonly days: readonly string[];
  };
  readonly googleBusinessUrl: string;
  readonly zones: readonly { readonly name: string }[];
}

export interface PreguntaFrecuente {
  question: string;
  answer: string;
}

export interface Miga {
  name: string;
  path: string;
}

type ObjetoJsonLd = Record<string, unknown>;

/** Identificador común del negocio, para que el resto de marcados lo referencien. */
export function idNegocio(siteUrl: string): string {
  return `${siteUrl}/#negocio`;
}

/** Marcado del negocio local (RecyclingCenter) con NAP, horario y zonas servidas. */
export function negocioSchema(site: DatosNegocio): ObjetoJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'RecyclingCenter',
    '@id': idNegocio(site.url),
    name: site.name,
    description: `Chatarrería en Madrid desde ${site.foundingYear}: compra de chatarra y metales con recogida a domicilio y pago inmediato.`,
    url: site.url,
    logo: `${site.url}/icon-512.png`,
    image: `${site.url}/og-image.jpg`,
    foundingDate: site.foundingDate,
    telephone: site.phonePrimaryTel,
    contactPoint: [site.phonePrimaryTel, site.phoneSecondaryTel].map((telephone) => ({
      '@type': 'ContactPoint',
      telephone,
      contactType: 'customer service',
      availableLanguage: 'es',
    })),
    hasMap: site.address.mapsUrl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Comunidad de Madrid' },
      ...site.zones.map((z) => ({
        '@type': 'City',
        name: z.name === 'Madrid capital' ? 'Madrid' : z.name,
      })),
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [...site.hours.days],
      opens: site.hours.opens,
      closes: site.hours.closes,
    },
    sameAs: [site.googleBusinessUrl],
  };
}

/** Marcado de un servicio concreto, prestado por el negocio (referencia por @id). */
export function servicioSchema(nombre: string, urlCanonica: string, siteUrl: string): ObjetoJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: nombre,
    serviceType: nombre,
    url: urlCanonica,
    provider: { '@id': idNegocio(siteUrl) },
    areaServed: { '@type': 'AdministrativeArea', name: 'Comunidad de Madrid' },
  };
}

/** Marcado FAQPage con las mismas preguntas y respuestas visibles. Sin preguntas, null. */
export function faqSchema(items: readonly PreguntaFrecuente[]): ObjetoJsonLd | null {
  if (items.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.answer },
    })),
  };
}

/** Marcado BreadcrumbList: "Inicio" en la posición 1 y después cada miga. Sin migas, null. */
export function migasSchema(migas: readonly Miga[], siteUrl: string): ObjetoJsonLd | null {
  if (migas.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${siteUrl}/` },
      ...migas.map((m, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: m.name,
        item: siteUrl + m.path,
      })),
    ],
  };
}

/**
 * Serializa un objeto JSON-LD para insertarlo en un <script>.
 * Sustituye "<" por su escape Unicode para que ningún texto pueda cerrar el script.
 */
export function aJsonLd(objeto: ObjetoJsonLd): string {
  return JSON.stringify(objeto).replace(/</g, '\\u003c');
}
