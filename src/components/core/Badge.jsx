/** Badge — píldora de estado (Pagado, Pendiente, Acceso total…). */
const TONES = {
  neutral: 'bg-crema-sand text-tinta-suave',
  accent: 'bg-violeta-100 text-violeta-600',
  success: 'bg-verde-100 text-verde-600',
  warning: 'bg-ambar-100 text-ambar-700',
  danger: 'bg-coral-100 text-coral-700',
  night: 'bg-noche-800 text-crema-paper',
};
export function Badge({ tone = 'neutral', children, className = '' }) {
  return <span className={['inline-flex items-center rounded-pill px-5 py-1 text-xs font-ui-app', TONES[tone], className].join(' ')}>{children}</span>;
}
export default Badge;
