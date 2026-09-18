import { Logo } from '../../../components/brand/Logo';
import { getCurrentCoach } from '../lib/session';
import { practiceKpis, outcomeByAge } from '../data/mock';

/**
 * 12 · Resultados de tu práctica. Un one-pager con las cifras agregadas de
 * `06_PracticeAnalyticsScreen` (mismos datos, sin filtrar por cliente: no hace
 * falta consentimiento porque no identifica a ninguna familia puntual), para
 * que la asesora lo use como caso de éxito propio ante clientes nuevos.
 * "Descargar PDF" imprime de verdad, mismo mecanismo que el reporte de caso.
 */
export function PracticeSuccessOverlay({ open, onClose, onDownload }) {
  if (!open) return null;
  const coach = getCurrentCoach();

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center overflow-auto bg-[rgba(22,22,43,.45)] p-10">
      <div onClick={onClose} className="fixed inset-0" />
      <div className="relative flex w-[640px] flex-col gap-4">
        <div className="flex justify-end gap-4">
          <button type="button" onClick={() => { window.print(); onDownload && onDownload(); }}
            className="rounded-md bg-ambar-500 px-6 py-3 font-ui-app text-sm font-medium text-noche-900 hover:brightness-105">
            Descargar PDF
          </button>
          <button type="button" onClick={onClose} className="rounded-md bg-[rgba(251,247,240,.15)] px-5 py-3 font-ui-app text-sm text-crema-paper">Cerrar</button>
        </div>

        <div className="nocttua-print-sheet flex flex-col gap-8 rounded-lg bg-crema-paper px-13 py-12 shadow-raised">
          <div className="flex items-center gap-4 border-b border-crema-line-strong pb-6">
            <span className="grid h-9 w-9 place-items-center rounded-sm bg-noche-900">
              <Logo variant="iso-crema" width={20} />
            </span>
            <div className="leading-tight">
              <div className="font-display-app text-lg text-tinta-fuerte">{coach.name}</div>
              <div className="font-mono text-[9px] uppercase tracking-eyebrow-wide text-tinta-tenue">{coach.role}</div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-eyebrow text-ambar-700">Resultados de la práctica</span>
            <span className="font-display-app text-display-md leading-tight text-tinta-fuerte">Prueba de trabajo, no promesa de resultado.</span>
            <span className="font-ui-app text-sm leading-relaxed text-tinta-cuerpo">
              Cifras agregadas y anonimizadas de todos los casos acompañados. Ningún nombre, ninguna fecha exacta.
            </span>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {practiceKpis.map((k) => (
              <div key={k.label} className="flex flex-col gap-1 rounded-md border border-crema-line bg-white px-6 py-5">
                <span className="font-mono text-lg text-tinta-fuerte">{k.value}</span>
                <span className="font-ui-app text-xs leading-snug text-tinta-tenue">{k.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <span className="font-ui-app text-md font-medium text-tinta-fuerte">Mejora media por edad</span>
            {outcomeByAge.map((o) => (
              <div key={o.label} className="flex flex-col gap-2">
                <div className="flex items-baseline justify-between">
                  <span className="font-ui-app text-sm text-tinta-cuerpo">{o.label}</span>
                  <span className="font-mono text-sm text-tinta-fuerte">{o.value}</span>
                </div>
                <span className="h-[6px] overflow-hidden rounded-pill bg-crema-sand">
                  <span style={{ width: o.pct + '%' }} className="block h-full rounded-pill bg-violeta-600" />
                </span>
              </div>
            ))}
          </div>

          <span className="border-t border-crema-line-strong pt-4 font-ui-app text-xs text-tinta-apagada">
            nocttua.app · Cifras agregadas de la práctica de {coach.name}. Describe lo que pasó, no promete un resultado.
          </span>
        </div>
      </div>
    </div>
  );
}
export default PracticeSuccessOverlay;
