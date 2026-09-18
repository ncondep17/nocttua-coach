import { Eyebrow } from './Eyebrow';

/** StatCard — cifra grande + etiqueta. La unidad mínima de un panel Nocttua. */
const TONES = { default: 'text-tinta-fuerte', accent: 'text-violeta-600', success: 'text-verde-600', danger: 'text-coral-700' };

export function StatCard({ value, label, hint, tone = 'default', display = false, className = '' }) {
  return (
    <div className={['flex flex-col gap-3 rounded-2xl border border-crema-line bg-white px-8 py-7', className].join(' ')}>
      <Eyebrow>{label}</Eyebrow>
      <span className={[display ? 'font-display-app text-display-md' : 'font-mono text-display-sm', TONES[tone], 'leading-tight'].join(' ')}>{value}</span>
      {hint ? <span className="font-ui-app text-sm text-tinta-tenue">{hint}</span> : null}
    </div>
  );
}
export default StatCard;
