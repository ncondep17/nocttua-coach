import { StatCard } from '../core/StatCard';

/** KpiRow — la fila de 4 cifras que abre casi todas las vistas de panel. */
export function KpiRow({ items, columns = 4, className = '' }) {
  return (
    <div className={['grid gap-8', className].join(' ')} style={{ gridTemplateColumns: 'repeat(' + columns + ', minmax(0, 1fr))' }}>
      {items.map((it) => <StatCard key={it.label} {...it} />)}
    </div>
  );
}
export default KpiRow;
