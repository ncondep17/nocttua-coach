import { getSession, onAuthChange, getMyCoachProfile, signOutCoach } from '../../../data/coach';

/**
 * Sesión real de Supabase Auth — reemplaza el `localStorage` fingido de la
 * ronda anterior. Async a propósito: toda pantalla que la use necesita
 * `useEffect` + estado, no puede leerla en el render directo.
 */
export { getSession, onAuthChange, getMyCoachProfile as getCurrentCoach, signOutCoach };
