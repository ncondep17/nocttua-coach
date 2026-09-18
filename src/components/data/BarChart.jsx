/** BarChart — barras verticales en HTML. El gráfico por defecto de Nocttua. */
export function BarChart({ data, height = 140, highlightLast = false, showValues = true, className = '' }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className={['flex items-end gap-4', className].join(' ')} style={{ height }}>
      {data.map((d, i) => {
        const last = highlightLast && i === data.length - 1;
        return (
          <div key={d.label + i} className="flex min-w-0 flex-1 flex-col items-center gap-3">
            {showValues ? <span className="font-mono text-2xs text-tinta-tenue">{d.display != null ? d.display : d.value}</span> : null}
            <div
              style={{ height: Math.round((d.value / max) * (height - 34)) || 2, background: d.color || (last ? '#6B5DD3' : '#C9C1D8') }}
              className="w-full animate-riseIn rounded-t-[5px]"
            />
            <span className={['font-mono text-2xs', last ? 'text-tinta-fuerte' : 'text-tinta-apagada'].join(' ')}>{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}
export default BarChart;
