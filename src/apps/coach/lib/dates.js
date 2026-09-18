const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

export function formatDate(iso) {
  const d = new Date(iso);
  return d.getDate() + ' ' + MONTHS[d.getMonth()];
}

export function weeksSince(iso) {
  const weeks = Math.floor((Date.now() - new Date(iso).getTime()) / (7 * 86400000));
  return Math.max(0, weeks);
}

export function weeksLabel(n) {
  return n === 1 ? '1 semana' : n + ' semanas';
}

/** Rango de los últimos 7 días, para el modo "Semanal" del reporte. */
export function currentWeekRange() {
  const end = new Date();
  const start = new Date(end.getTime() - 6 * 86400000);
  return formatDate(start.toISOString()) + ' – ' + formatDate(end.toISOString()) + ' ' + end.getFullYear();
}
