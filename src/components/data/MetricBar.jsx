/** MetricBar — etiqueta + barra + valor: adherencia, correlaciones, resultados por edad. */
const TONES = { accent: 'bg-violeta-600', success: 'bg-verde-600', warning: 'bg-ambar-500', danger: 'bg-coral-500', neutral: 'bg-tinta-apagada' };

export function MetricBar({ label, value, pct = 0, tone = 'accent', caption, className = '' }) {
  return (
    <div className={['flex flex-col gap-4', className].join(' ')}>
      <div className="flex items-baseline justify-between gap-6">
        <span className="font-ui-app text-base text-tinta-cuerpo">{label}</span>
        {value != null ? <span className="font-mono text-base text-tinta-fuerte">{value}</span> : null}
      </div>
      <div className="h-[7px] overflow-hidden rounded-pill bg-crema-sand">
        <div style={{ width: Math.max(0, Math.min(100, pct)) + '%' }} className={['h-full animate-growW rounded-pill', TONES[tone]].join(' ')} />
      </div>
      {caption ? <span className="font-ui-app text-sm text-tinta-tenue">{caption}</span> : null}
    </div>
  );
}
export default MetricBar;
