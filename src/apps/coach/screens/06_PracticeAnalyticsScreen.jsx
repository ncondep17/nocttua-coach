import { useEffect, useState } from 'react';
import { PageHeader } from '../../../components/layout/ScreenHeader';
import { KpiRow } from '../../../components/data/KpiRow';
import { Card } from '../../../components/core/Card';
import { getPracticeStats } from '../../../data/coach';
import { ACCESS_LEVELS } from '../../../data/contract';

const ACCESS_LABEL = Object.fromEntries(ACCESS_LEVELS.map((a) => [a.id, a.label]));

/**
 * 06 · Analíticas de la práctica — versión real reducida. "Mejora media por
 * edad" e "Ingresos por mes" quedaron afuera a propósito: la primera
 * necesita el motor de cálculo de sueño (`apps/mobile/lib/derive.js`, 390
 * líneas, sin portar) y la segunda necesita Facturación (sin tabla en la
 * base real todavía). Mejor mostrar menos cifras y que todas sean ciertas.
 */
export function PracticeAnalyticsScreen() {
  const [stats, setStats] = useState(undefined);

  useEffect(() => { getPracticeStats().then(setStats); }, []);

  const loaded = stats !== undefined;

  return (
    <>
      <PageHeader eyebrow="Todos los clientes" title="Analíticas" />

      <KpiRow items={[
        { label: 'Casos activos', value: loaded ? String(stats.totalClients) : '…', display: true },
        { label: 'Noches registradas (7 días)', value: loaded ? String(stats.recentSleepEvents) : '…' },
      ]} columns={2} />

      <Card title="Cómo se reparte el acceso" eyebrow={loaded ? stats.totalClients + ' casos' : ''}>
        {!loaded ? null : stats.totalClients === 0 ? (
          <span className="font-ui-app text-sm text-tinta-tenue">Todavía ningún caso activo.</span>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {ACCESS_LEVELS.map((a) => (
              <div key={a.id} className="flex flex-col gap-1 rounded-md border border-crema-line bg-white px-6 py-5">
                <span className="font-mono text-lg text-tinta-fuerte">{stats.byAccess[a.id] || 0}</span>
                <span className="font-ui-app text-xs leading-snug text-tinta-tenue">{ACCESS_LABEL[a.id]}</span>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card surface="accent" title="Lo que falta para tener más">
        <span className="font-ui-app text-base leading-relaxed text-tinta-cuerpo">
          Mejora media por edad e ingresos por mes necesitan dos piezas que todavía no están conectadas a Coach: el motor de cálculo de sueño y Facturación. Se agregan cuando existan, sin inventar cifras mientras tanto.
        </span>
      </Card>
    </>
  );
}
export default PracticeAnalyticsScreen;
