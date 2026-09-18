/**
 * Constantes de UI sin dependencia de base de datos. `permission_level` acá
 * espeja uno a uno el enum real `public.permission_level` de Supabase — no
 * inventar valores nuevos sin agregar el enum en una migración.
 */
export const ACCESS_LEVELS = [
  { id: 'full', label: 'Acceso total', desc: 'Ve registros, patrones y edita el plan.' },
  { id: 'reports', label: 'Solo reportes', desc: 'Ve patrones agregados, no el registro crudo.' },
  { id: 'plan', label: 'Solo plan', desc: 'Puede dejar el plan, sin ver datos.' },
  { id: 'none', label: 'Sin acceso', desc: 'Queda la relación, se corta la lectura.' },
];

export const PLAN_METHODS = ['Silla junto a la cuna', 'Retirada gradual', 'Presencia total', 'Ajuste de horarios'];

export function formatClock(minutes) {
  const m = ((minutes % 1440) + 1440) % 1440;
  const h = Math.floor(m / 60), mm = m % 60;
  return h + ':' + (mm < 10 ? '0' + mm : String(mm));
}
export function formatDuration(minutes) {
  const h = Math.floor(minutes / 60), mm = minutes % 60;
  return h > 0 ? h + 'h' + (mm < 10 ? '0' + mm : String(mm)) : mm + ' min';
}

/**
 * Campos del plan que escribe la asesora y lee la família — se guardan en
 * `plan_fields` (key/label/value/position). Los numéricos también alimentan
 * `plan_thresholds` (motor de cumplimiento) en una ronda siguiente: hoy
 * `publishPlan` solo escribe `plan_versions`/`plan_fields`, no thresholds.
 */
export const PLAN_FIELDS = [
  { key: 'wake', label: 'Hora de despertar objetivo', type: 'time', step: 5, min: 300, max: 540, format: formatClock },
  { key: 'napStart', label: 'Inicio de la siesta', type: 'time', step: 5, min: 540, max: 900, format: formatClock },
  { key: 'napMax', label: 'Duración máxima de siesta', type: 'duration', step: 5, min: 30, max: 180, format: formatDuration },
  { key: 'night', label: 'Hora de dormir', type: 'time', step: 5, min: 1020, max: 1320, format: formatClock },
  { key: 'nightFeeds', label: 'Tomas nocturnas permitidas', type: 'count', step: 1, min: 0, max: 4, format: String },
  { key: 'method', label: 'Método de acompañamiento', type: 'choice', options: PLAN_METHODS },
  { key: 'guide', label: 'Guía escrita para la familia', type: 'text', multiline: true },
];

export const PLAN_DEFAULTS = { wake: 385, napStart: 735, napMax: 100, night: 1170, nightFeeds: 1, method: PLAN_METHODS[3], guide: '' };
