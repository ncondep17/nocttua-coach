/**
 * Suscripción y método de pago de la asesora. No hay procesador de pagos real
 * conectado todavía — igual que el resto de Facturación en esta ronda, esto
 * persiste localmente lo que la asesora ve/edita en su panel. Cuando exista un
 * backend de cobros real, este archivo se reemplaza por el adaptador correspondiente.
 */
const KEY = 'nocttua.coach.subscription.v1';

/** Paquetes del paso 07 del onboarding. `max` es el tope de casos activos incluidos. */
export const PACKAGES = [
  { id: 'solo', name: 'Solo', price: '$38.000', desc: 'Hasta 5 casos activos. Reportes y tarjetas incluidos.', max: 5 },
  { id: 'pro', name: 'Pro', price: '$68.000', desc: 'Hasta 12 casos activos. Analíticas de práctica completas.', max: 12 },
  { id: 'estudio', name: 'Estudio', price: '$120.000', desc: 'Casos ilimitados y hasta 3 asesoras en la misma cuenta.', max: 99 },
];

export function getPackage(tierId) {
  return PACKAGES.find((p) => p.id === tierId) || PACKAGES[1];
}

/** Recomienda el paquete más chico que alcanza para `clientCount` casos en paralelo. */
export function recommendPackage(clientCount) {
  return PACKAGES.find((p) => clientCount <= p.max) || PACKAGES[PACKAGES.length - 1];
}

const DEFAULT_SUBSCRIPTION = {
  tierId: 'pro',
  seatsUsed: 8,
  renewsOn: '14 sep',
  paymentMethod: { brand: 'Visa', last4: '4242', expiry: '08/27' },
};

export function getSubscription() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    if (saved && saved.paymentMethod) return saved;
  } catch {
    /* localStorage corrupto o no disponible: seguimos con el default */
  }
  localStorage.setItem(KEY, JSON.stringify(DEFAULT_SUBSCRIPTION));
  return DEFAULT_SUBSCRIPTION;
}

export function updatePaymentMethod(patch) {
  const sub = getSubscription();
  const next = { ...sub, paymentMethod: { ...sub.paymentMethod, ...patch } };
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

/** El paso 07 del onboarding la llama al elegir paquete. */
export function setSubscriptionTier(tierId, seatsUsed = 0) {
  const sub = getSubscription();
  const next = { ...sub, tierId, seatsUsed };
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}
