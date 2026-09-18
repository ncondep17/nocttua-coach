/**
 * Respuestas de los pasos 01–06, guardadas en este navegador mientras no hay
 * cuenta. El paso 07 las persiste "en el servidor" (hoy: `session.js` /
 * `subscription.js`) al crear la cuenta — ver `nocttua.coach.onboarding` en
 * `ONBOARDING-COACH.md`.
 */
import { PLAN_DEFAULTS } from '../../../data/contract';

const KEY = 'nocttua.coach.onboarding.v1';

const DEFAULT_STATE = {
  step: 1,
  practice: { clients: 8, ages: ['13–26 sem', '27–52 sem'], twins: true, duration: '4 semanas' },
  planTemplate: { ...PLAN_DEFAULTS, guide: 'Silla equidistante entre las dos camas, se aleja cada 3 noches. Si despierta y no le toca toma, acompañar sin ofrecer pecho ni biberón.' },
  defaultAccessLevel: 'full',
  billing: { skipped: true, currency: '$', standardPrice: '', chargesThrough: 'nocttua' },
};

export function loadOnboarding() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    if (saved) return { ...DEFAULT_STATE, ...saved };
  } catch {
    /* localStorage corrupto o no disponible: seguimos con el default */
  }
  return { ...DEFAULT_STATE };
}

export function saveOnboarding(patch) {
  const next = { ...loadOnboarding(), ...patch };
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}
