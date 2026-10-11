// Formatea una fecha ISO (YYYY-MM-DD) como fecha legible en español.
// Función pura: no usa Date (evita conversiones de zona horaria), red ni DOM.
// Devuelve null cuando la fecha falta o no es una fecha de calendario válida.

/** Nombres de los meses en español, en orden de enero a diciembre. */
const MESES = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
] as const;

/** Indica si un año es bisiesto (regla gregoriana). */
function esBisiesto(anio: number): boolean {
  return anio % 4 === 0 && (anio % 100 !== 0 || anio % 400 === 0);
}

/** Días que tiene un mes en un año dado (febrero depende de si es bisiesto). */
function diasDelMes(anio: number, mes: number): number {
  if (mes === 2) {
    return esBisiesto(anio) ? 29 : 28;
  }
  if (mes === 4 || mes === 6 || mes === 9 || mes === 11) {
    return 30;
  }
  return 31;
}

/**
 * Convierte «2026-09-18» en «18 de septiembre de 2026».
 * Devuelve null si falta o no es una fecha de calendario válida
 * (incluidos días imposibles como el 30 de febrero).
 */
export function formatearFechaLegible(iso: string | null | undefined): string | null {
  if (iso === null || iso === undefined || iso === '') {
    return null;
  }
  const coincidencia = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (coincidencia === null) {
    return null;
  }
  const anio = Number(coincidencia[1]);
  const mes = Number(coincidencia[2]);
  const dia = Number(coincidencia[3]);
  if (mes < 1 || mes > 12) {
    return null;
  }
  if (dia < 1 || dia > diasDelMes(anio, mes)) {
    return null;
  }
  return `${dia} de ${MESES[mes - 1]} de ${anio}`;
}
