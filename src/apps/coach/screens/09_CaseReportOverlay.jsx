import { useEffect, useState } from 'react';
import { Logo } from '../../../components/brand/Logo';
import { getClientDetail } from '../../../data/coach';
import { formatDate, weeksSince, weeksLabel, currentWeekRange } from '../lib/dates';

/**
 * 09 · Reporte de caso. Un mismo documento, dos modos (Semanal / Cierre de caso).
 * Fuente visual: `referencia-diseno/Nocttua Coach.dc.html`. Las cifras de sueño
 * (despertares, adherencia, antes/después) no tienen fuente todavía — se
 * muestran como "sin datos", nunca inventadas. El plan vigente y las noches
 * registradas sí son reales, de `getClientDetail`.
 *
 * Sin puerta de consentimiento: el esquema real todavía no tiene dónde
 * registrar que la família autorizó esto (a diferencia del prototipo). Se
 * puede agregar cuando exista ese mecanismo, sin tocar el resto de esta vista.
 */
export function CaseReportOverlay({ open, familyId, coach, onClose, onDownload }) {
  const [detail, setDetail] = useState(undefined);
  const [mode, setMode] = useState('semanal');

  useEffect(() => {
    if (!open || !familyId) return;
    setMode('semanal');
    getClientDetail(familyId).then(setDetail);
  }, [open, familyId]);

  if (!open) return null;

  function handleDownload() {
    window.print();
    onDownload && onDownload();
  }

  const closing = mode === 'cierre';
  const weeks = detail ? weeksSince(detail.createdAt) : 0;
  const fieldValue = (key) => detail?.plan?.fields.find((f) => f.key === key)?.value || '';
  const babyNames = detail?.babies.map((b) => b.name).join(' y ') || 'Família sin bebés cargados';

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center overflow-auto bg-[rgba(22,22,43,.45)] p-10">
      <div onClick={onClose} className="fixed inset-0" />
      <div className="relative flex w-[720px] flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-1 rounded-md bg-[rgba(251,247,240,.12)] p-1">
            <button type="button" onClick={() => setMode('semanal')}
              className={['rounded-sm px-6 py-3 font-ui-app text-sm transition', !closing ? 'bg-crema-paper text-tinta-fuerte' : 'text-noite-suave'].join(' ')}>
              Semanal
            </button>
            <button type="button" onClick={() => setMode('cierre')}
              className={['rounded-sm px-6 py-3 font-ui-app text-sm transition', closing ? 'bg-crema-paper text-tinta-fuerte' : 'text-noite-suave'].join(' ')}>
              Cierre de caso
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button type="button" onClick={handleDownload}
              className="cursor-pointer rounded-md bg-ambar-500 px-6 py-3 font-ui-app text-sm font-medium text-noche-900 hover:brightness-105">
              {closing ? 'Descargar cierre' : 'Descargar PDF'}
            </button>
            <button type="button" onClick={onClose} className="rounded-md bg-[rgba(251,247,240,.15)] px-5 py-3 font-ui-app text-sm text-crema-paper">Cerrar</button>
          </div>
        </div>

        <div className="nocttua-print-sheet flex flex-col gap-7 rounded-lg bg-crema-paper px-13 py-12 shadow-raised">
          <div className="flex items-start justify-between border-b border-crema-line-strong pb-6">
            <div className="flex items-center gap-4">
              <span className="grid h-9 w-9 place-items-center rounded-sm bg-noche-900">
                <Logo variant="iso-crema" width={20} />
              </span>
              <div className="leading-tight">
                <div className="font-display-app text-lg text-tinta-fuerte">Nocttua</div>
                <div className="font-mono text-[9px] uppercase tracking-eyebrow-wide text-tinta-tenue">{coach?.name}</div>
              </div>
            </div>
            <div className="text-right leading-snug">
              <div className="font-mono text-xs uppercase tracking-eyebrow text-tinta-tenue">{closing ? 'Cierre de caso' : 'Reporte semanal'}</div>
              <div className="font-mono text-sm text-tinta-fuerte">
                {detail ? (closing ? formatDate(detail.createdAt) + ' – hoy · ' + weeksLabel(weeks) : currentWeekRange()) : '—'}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-display-app text-display-md leading-tight text-tinta-fuerte">{babyNames}</span>
            <span className="font-ui-app text-sm text-tinta-suave">{detail ? weeksLabel(weeks) + ' de acompañamiento' : ''}</span>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'Noches registradas (7 días)', value: detail ? String(detail.recentSleepEvents) : '—' },
              { label: 'Semana de plan', value: detail?.plan ? detail.plan.version : '—' },
              { label: 'Edad', value: '—' },
              { label: 'Reducción desde inicio', value: '—' },
            ].map((k) => (
              <div key={k.label} className="flex flex-col gap-1 rounded-md border border-crema-line bg-white px-6 py-5">
                <span className="font-mono text-lg text-tinta-apagada">{k.value}</span>
                <span className="font-ui-app text-xs leading-snug text-tinta-tenue">{k.label}</span>
              </div>
            ))}
          </div>

          {closing ? (
            <div className="flex flex-col gap-4 rounded-lg bg-noche-900 px-8 py-7">
              <span className="font-mono text-xs uppercase tracking-eyebrow text-ambar-500">Antes y después · {weeksLabel(weeks)}</span>
              <span className="font-ui-app text-sm leading-relaxed text-noite-suave">
                El antes y después se arma en cuanto haya al menos dos semanas de registro de esta familia.
              </span>
            </div>
          ) : null}

          <div className="flex flex-col gap-3">
            <span className="font-ui-app text-md font-medium text-tinta-fuerte">Despertares por semana</span>
            <span className="font-ui-app text-sm text-tinta-tenue">Sin noches registradas todavía para graficar.</span>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-ui-app text-md font-medium text-tinta-fuerte">Adherencia al plan</span>
            <span className="font-ui-app text-sm text-tinta-tenue">Se completa con los registros de la familia.</span>
          </div>

          {detail?.plan ? (
            <div className="flex flex-col gap-2 rounded-md border border-crema-line bg-white px-7 py-6">
              <span className="font-mono text-xs uppercase tracking-eyebrow text-ambar-700">Plan vigente {detail.plan.version} · {fieldValue('method')}</span>
              <span className="font-mono text-sm text-tinta-fuerte">
                Despertar {fieldValue('wake')} · siesta {fieldValue('napStart')} (máx {fieldValue('napMax')}) · noche {fieldValue('night')} · {fieldValue('nightFeeds')} toma(s)
              </span>
              {fieldValue('guide') ? <span className="font-ui-app text-sm leading-relaxed text-tinta-cuerpo">{fieldValue('guide')}</span> : null}
            </div>
          ) : null}

          <span className="border-t border-crema-line-strong pt-4 font-ui-app text-xs text-tinta-apagada">
            nocttua.app · Reporte generado automáticamente con los registros de la familia.
          </span>
        </div>
      </div>
    </div>
  );
}
export default CaseReportOverlay;
