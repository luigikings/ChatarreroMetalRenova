// Fuente única de datos del negocio. Todo lo demás (cabecera, pie, schema,
// enlaces de contacto) lee de aquí para no tener que tocar 10 archivos
// cuando cambie un dato.

export const site = {
  name: 'MetalRenova',
  tagline: 'Chatarrería en Madrid',
  domain: 'chatarreriametalrenova.es',
  url: 'https://chatarreriametalrenova.es',

  // Fecha de apertura confirmada por el cliente (coincide con la ficha de Google).
  foundingDate: '2005-05-10',
  foundingYear: 2005,

  // Teléfono principal: se usa para WhatsApp y como botón "Llamar" por defecto.
  phonePrimary: '662 25 22 35',
  phonePrimaryTel: '+34662252235',
  phonePrimaryDigits: '34662252235',

  // Segundo teléfono: solo como alternativa de llamada (no tiene WhatsApp propio).
  phoneSecondary: '625 75 51 59',
  phoneSecondaryTel: '+34625755159',

  email: '', // vacío: no se muestra email de contacto en la web, solo teléfono/WhatsApp

  address: {
    street: 'Calle Pensamiento, 5',
    postalCode: '28903',
    city: 'Getafe',
    region: 'Madrid',
    country: 'ES',
    mapsUrl: 'https://maps.app.goo.gl/V32nE6ZpQvygY26YA',
  },

  hours: {
    label: 'Abierto 24 horas, todos los días',
    opens: '00:00',
    closes: '23:59',
    days: [
      'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
    ],
  },

  // Perfil de Google Business (para sameAs del schema y para el enlace de opiniones).
  googleBusinessUrl: 'https://maps.app.goo.gl/V32nE6ZpQvygY26YA',

  wasteManagerAuthNumber: '', // vacío: al rellenarlo aparece solo en el pie y el aviso legal

  // Seguimiento de conversiones de Google Ads para los clics en "Llamar" y "WhatsApp".
  // Sácalo de Google Ads: Herramientas y configuración → Conversiones → clic en la
  // acción "Contactos" → Configuración de la etiqueta → "Instalarla usted mismo".
  // id es el "ID de conversión" (AW-XXXXXXXXX) y label la parte que va después de la
  // barra en "Etiqueta de conversión". Mientras estén vacíos, no se carga ningún script.
  googleAdsConversion: {
    id: 'AW-18121827018',
    label: 'LnhWCKSCzIEdEMrFlMFD',
  },

  // Google Analytics 4 (Administrar → Flujos de datos → flujo Web → "ID de medición").
  // Mide TODOS los clics en "Llamar"/"WhatsApp", vengan o no de un anuncio de pago —
  // a diferencia de la conversión de Google Ads de arriba, que solo cuenta las que
  // vienen del anuncio.
  googleAnalyticsId: 'G-G63FSBJNTX',

  zones: [
    { slug: 'madrid', name: 'Madrid capital', principal: false, page: '/chatarrero-madrid/' },
    { slug: 'getafe', name: 'Getafe', principal: true, page: '/chatarrero-getafe/' },
    { slug: 'leganes', name: 'Leganés', principal: false, page: '/chatarrero-leganes/' },
    { slug: 'fuenlabrada', name: 'Fuenlabrada', principal: false, page: '/chatarrero-fuenlabrada/' },
    { slug: 'alcorcon', name: 'Alcorcón', principal: false, page: '/chatarrero-alcorcon/' },
    { slug: 'mostoles', name: 'Móstoles', principal: false, page: '/chatarrero-mostoles/' },
    { slug: 'pinto', name: 'Pinto', principal: false, page: '/chatarrero-pinto/' },
    { slug: 'parla', name: 'Parla', principal: false, page: '/chatarrero-parla/' },
    { slug: 'valdemoro', name: 'Valdemoro', principal: false, page: '/chatarrero-valdemoro/' },
  ],

  // Materiales con página propia (el resto de metales vive en /gestion-de-metales/).
  materials: [
    { slug: 'cobre', name: 'Cobre', page: '/compra-de-cobre/' },
    { slug: 'aluminio', name: 'Aluminio', page: '/compra-de-aluminio/' },
    { slug: 'laton', name: 'Latón', page: '/compra-de-laton/' },
    { slug: 'hierro-y-acero', name: 'Hierro y acero', page: '/compra-de-hierro-y-acero/' },
    { slug: 'baterias', name: 'Baterías usadas', page: '/compra-de-baterias/' },
  ],
} as const;

/**
 * Construye un enlace de WhatsApp con mensaje precargado.
 * Cada página pasa su propio mensaje para que el CTA tenga contexto.
 */
export function whatsappLink(message: string): string {
  const base = `https://wa.me/${site.phonePrimaryDigits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const defaultWhatsappMessage =
  'Hola MetalRenova, quiero que me valoréis mi chatarra.';
