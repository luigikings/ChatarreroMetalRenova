// Fuente única de datos del negocio. Todo lo demás (cabecera, pie, schema,
// enlaces de contacto) lee de aquí para no tener que tocar 10 archivos
// cuando cambie un dato.

export const site = {
  name: 'MetalRenova',
  legalName: '[TODO-CLIENTE: razón social completa]',
  nif: '[TODO-CLIENTE: NIF/CIF]',
  tagline: 'Chatarrero en Madrid',
  domain: 'chatarreriametalrenova.es',
  url: 'https://chatarreriametalrenova.es',

  // Teléfono principal: se usa para WhatsApp y como botón "Llamar" por defecto.
  phonePrimary: '662 25 22 35',
  phonePrimaryTel: '+34662252235',
  phonePrimaryDigits: '34662252235',

  // Segundo teléfono: solo como alternativa de llamada (no tiene WhatsApp propio).
  phoneSecondary: '625 75 51 59',
  phoneSecondaryTel: '+34625755159',

  email: '', // [TODO-CLIENTE: email de contacto, si quieren mostrarlo]

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

  wasteManagerAuthNumber: '', // [TODO-CLIENTE: nº autorización gestor de residuos, si lo tienen]

  zones: [
    { slug: 'getafe', name: 'Getafe', principal: true },
    { slug: 'leganes', name: 'Leganés', principal: false },
    { slug: 'fuenlabrada', name: 'Fuenlabrada', principal: false },
    { slug: 'alcorcon', name: 'Alcorcón', principal: false },
    { slug: 'mostoles', name: 'Móstoles', principal: false },
    { slug: 'pinto', name: 'Pinto', principal: false },
    { slug: 'parla', name: 'Parla', principal: false },
    { slug: 'madrid', name: 'Madrid capital', principal: false },
  ],

  materials: [
    { slug: 'cobre', name: 'Cobre' },
    { slug: 'aluminio', name: 'Aluminio' },
    { slug: 'laton', name: 'Latón' },
    { slug: 'hierro-y-acero', name: 'Hierro y acero inoxidable' },
    { slug: 'plomo', name: 'Plomo' },
    { slug: 'baterias', name: 'Baterías usadas' },
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
