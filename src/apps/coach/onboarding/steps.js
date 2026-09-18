/**
 * Metadatos de los 8 pasos: título/por-qué/nota de la columna noche.
 * Copy exacto de `referencia-diseno/Nocttua Coach - Onboarding.dc.html`.
 */
export const ONBOARDING_STEPS = [
  { t: 'Antes de pedirte nada, mira lo que hace.', w: 'No hay cuenta, no hay tarjeta. Recorre el panel y decide después.', f: 'Guardamos tus respuestas en este navegador hasta que crees la cuenta.' },
  { t: 'El panel, con datos de ejemplo.', w: 'Lo que verías un martes cualquiera: quién necesita atención y por qué.', f: '' },
  { t: 'Lo que puedes mostrar.', w: 'Tu trabajo, con datos: para la familia, para tu propuesta y para tus redes.', f: '' },
  { t: 'Cómo trabajas.', w: 'Con esto ajustamos umbrales, segmentos y vencimientos del plan.', f: 'Todo esto se cambia después desde el panel.' },
  { t: 'Tu plantilla de plan.', w: 'Lo escribes una vez y cada caso nuevo arranca de ahí.', f: 'Es una plantilla, no un plan: cada familia lo va a necesitar distinto.' },
  { t: 'Qué ve cada una.', w: 'El nivel de acceso que le vas a pedir a cada familia nueva.', f: 'La familia puede revocarlo cuando quiera, sin avisarte.' },
  { t: 'Tu cuenta y tu paquete.', w: 'Recién ahora: con todo lo que ya configuraste guardado.', f: 'Cancelas cuando quieras. Los datos de tus casos son tuyos.' },
  { t: 'Tu primer cliente.', w: 'El panel se llena cuando una familia acepta tu código.', f: '' },
];

/** Pasos que muestran el panel: la columna noche se encoge y el panel toma el resto. */
export const WIDE_STEPS = new Set([2, 3]);
