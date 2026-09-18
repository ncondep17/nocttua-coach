import { useEffect, useState } from 'react';
import { Button } from '../../../components/core/Button';
import { getClientDetail } from '../../../data/coach';
import { weeksSince, weeksLabel } from '../lib/dates';
import { exportCasePng } from '../lib/exportCard';

const STRIPPED = ['Nombres de la familia y del bebé', 'Fechas exactas del acompañamiento', 'Fotos, notas y cualquier texto de la familia'];

function deriveHandle(name) {
  const clean = (name || 'asesora').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9\s]/g, '').trim();
  return '@' + clean.replace(/\s+/g, '.');
}

/**
 * 10 · Tarjeta de caso. Anonimizada por diseño: nunca nombre de familia/bebé, fechas
 * exactas ni fotos — acá directamente no existen esos datos, así que no hay nada que
 * filtrar por error. La cifra de resultado no tiene fuente todavía (sin motor de
 * sueño conectado): se muestra "—", nunca un número inventado.
 *
 * Sin puerta de consentimiento (ver nota en `09_CaseReportOverlay.jsx`): exporta
 * directo, un PNG real vía Canvas 2D, sin backend.
 */
export function CaseCardOverlay({ open, familyId, coach, onClose, onExported }) {
  const [detail, setDetail] = useState(undefined);
  const [format, setFormat] = useState('square');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!open || !familyId) return;
    setFormat('square');
    getClientDetail(familyId).then(setDetail);
  }, [open, familyId]);

  if (!open) return null;

  const weeks = detail ? weeksSince(detail.createdAt) : 0;
  const method = detail?.plan?.fields.find((f) => f.key === 'method')?.value;
  const context = method ? 'Método: ' + method.toLowerCase() : 'Datos del caso pendientes';
  const story = format === 'story';

  async function handleExport() {
    setBusy(true);
    await exportCasePng({
      format, weeksLabel: weeksLabel(weeks), context,
      bigValue: '—', unitLabel: 'despertares por noche', statLine: 'Sin datos de resultado todavía',
      coachName: coach?.name, coachHandle: deriveHandle(coach?.name),
    });
    setBusy(false);
    onExported && onExported(format);
  }

  const exportLabel = busy ? 'Generando…' : story ? 'Descargar 1080 × 1920' : 'Descargar 1080 × 1080';

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center overflow-auto bg-[rgba(22,22,43,.45)] p-10">
      <div onClick={onClose} className="fixed inset-0" />
      <div className="relative flex items-start gap-5">
        <div
          className="relative flex flex-col justify-between overflow-hidden rounded-3xl p-9 shadow-raised"
          style={{
            width: story ? 372 : 430, height: story ? 662 : 430,
            background: 'radial-gradient(120% 70% at 50% 106%, rgba(240,168,104,.24) 0%, rgba(240,168,104,0) 62%), linear-gradient(180deg,#16162B 0%,#22224A 58%,#332F5C 100%)',
          }}
        >
          <span className="absolute right-8 font-mono text-[11px] text-ambar-500 opacity-75" style={{ top: story ? '30%' : '42%' }}>✦</span>
          <span className="absolute left-8 font-mono text-[8.5px] text-violeta-300 opacity-55" style={{ bottom: story ? '22%' : '24%' }}>✦</span>

          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-eyebrow text-ambar-500">Caso cerrado · {weeksLabel(weeks)}</span>
            <span className="font-ui-app text-sm text-noite-suave">{context}</span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="flex items-baseline gap-3">
              <span className="font-display-app text-[76px] leading-none text-crema-paper">—</span>
              <span className="font-ui-app text-sm leading-tight text-noite-tenue">despertares<br />por noche</span>
            </span>
            <span className="font-mono text-sm text-violeta-200">Sin datos de resultado todavía</span>
          </div>

          <div className="flex items-end justify-between gap-4 border-t border-noche-600 pt-5">
            <div className="flex flex-col gap-1">
              <span className="font-ui-app text-md font-medium text-crema-paper">{coach?.name}</span>
              <span className="font-mono text-xs text-noite-tenue">{deriveHandle(coach?.name)}</span>
            </div>
            <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-eyebrow text-noite-apagado">Con Nocttua</span>
          </div>
        </div>

        <div className="flex w-[320px] flex-col gap-5 rounded-2xl bg-crema-paper px-8 py-8 shadow-raised">
          <div className="flex flex-col gap-1">
            <span className="font-ui-app text-lg font-medium text-tinta-fuerte">Tarjeta de caso</span>
            <span className="font-ui-app text-sm leading-relaxed text-tinta-tenue">Para tus redes o tu propuesta. Sale de los registros de la familia, anonimizada.</span>
          </div>

          <div className="flex gap-1 rounded-md bg-crema-sand p-1">
            <button type="button" onClick={() => setFormat('square')}
              className={['flex-1 rounded-[7px] py-3 text-center font-ui-app text-sm transition', !story ? 'bg-white text-tinta-fuerte shadow-card' : 'text-tinta-suave'].join(' ')}>
              Cuadrado
            </button>
            <button type="button" onClick={() => setFormat('story')}
              className={['flex-1 rounded-[7px] py-3 text-center font-ui-app text-sm transition', story ? 'bg-white text-tinta-fuerte shadow-card' : 'text-tinta-suave'].join(' ')}>
              Historia
            </button>
          </div>

          <div className="flex flex-col gap-2 border-t border-crema-line pt-5">
            <span className="font-mono text-xs uppercase tracking-eyebrow text-ambar-700">Qué se quita</span>
            {STRIPPED.map((s) => (
              <span key={s} className="font-ui-app text-sm text-tinta-cuerpo">— {s}</span>
            ))}
          </div>

          <Button variant="amber" onClick={handleExport} disabled={busy}>{exportLabel}</Button>
          <button type="button" onClick={onClose} className="text-center font-ui-app text-sm text-tinta-tenue">Cerrar</button>
        </div>
      </div>
    </div>
  );
}
export default CaseCardOverlay;
