import { useState } from 'react';

/**
 * 02 · Así se ve tu panel. El panel real, con datos de ejemplo — no es un tour,
 * es el producto. Tres vistas navegables; la familia Ruiz no existe.
 */
const VIEWS = {
  resumen: {
    note: 'Lo primero que abres cada día.',
    title: 'Qué revisar hoy',
    kpis: [{ v: '8', l: 'Casos activos' }, { v: '3', l: 'Con alerta' }, { v: '75%', l: 'Casos en mejora' }, { v: '1,1', l: 'Reducción prom.' }],
    rows: [
      { a: 'Familia Ruiz', b: 'Sin registros hace 3 días · la data se enfría', c: 'S2', tone: '#D9705A' },
      { a: 'Familia Mora', b: 'Adherencia al plan en 41% · revisar umbrales', c: 'S6', tone: '#B08A55' },
      { a: 'Familia Peña', b: 'Plan v2 vence mañana', c: 'S4', tone: '#B08A55' },
      { a: 'Familia Díaz', b: 'Pago vencido desde el 24 jul', c: 'S3', tone: '#D9705A' },
    ],
    annotation: 'El panel ordena por urgencia, no por fecha. Nunca califica a la familia: dice qué pasó y qué conviene mirar.',
  },
  cliente: {
    note: 'Lo que miras cinco minutos antes de una sesión.',
    title: 'Familia Ruiz · mellizas de 19 semanas',
    kpis: [{ v: '4,0', l: 'Despertares/noche' }, { v: '−1,2', l: 'Desde el inicio' }, { v: '62%', l: 'Adherencia' }, { v: '15 min', l: 'Desfase entre las dos' }],
    rows: [
      { a: 'Siestas en cuna', b: 'Sube desde la semana 2', c: '68%', tone: '#6B5DD3' },
      { a: 'Ventanas respetadas', b: 'Lo que más se cumple', c: '82%', tone: '#3F7A62' },
      { a: 'Noches con desfase > 30 min', b: 'Dos de siete', c: '28%', tone: '#B08A55' },
      { a: 'Toma nocturna fuera de plan', b: 'Jueves y sábado', c: '2', tone: '#D9705A' },
    ],
    annotation: 'Un factor solo aparece con tres o más noches registradas. Se nombra la asociación, nunca la causa.',
  },
  plan: {
    note: 'Lo escribes tú; la familia solo lo lee.',
    title: 'Plan v3 · 12 ago · lo que ve la familia',
    kpis: [{ v: 'v3', l: 'Versión vigente' }, { v: '4 sem', l: 'Acompañamiento' }, { v: '1', l: 'Toma nocturna' }, { v: '19:25', l: 'Cuna' }],
    rows: [
      { a: 'Objetivo de estas dos semanas', b: 'Las dos siestas largas en la cuna y sostener 9 h de noche', c: '', tone: '#6B5DD3' },
      { a: 'Ventanas por edad', b: '1h 45m — 2h 15m', c: '', tone: '#6B5DD3' },
      { a: 'Rutina de noche', b: 'Baño 18:40 · toma 19:00 · luz baja y cuna 19:25', c: '', tone: '#F0A868' },
      { a: 'Qué no hacer', b: 'No estirar la vigilia para cansarlas: sale al revés', c: '', tone: '#D9705A' },
    ],
    annotation: 'Publicar crea una versión con fecha. La familia lee la última publicada, nunca un borrador.',
  },
};
const TABS = [['resumen', 'Resumen'], ['cliente', 'Un cliente'], ['plan', 'El plan que ve la familia']];

export function PanelPreviewStep({ onBack, onNext }) {
  const [pv, setPv] = useState('resumen');
  const v = VIEWS[pv];

  return (
    <div className="flex h-full animate-riseIn flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div className="flex flex-col gap-1">
          <span className="font-display-app text-display-lg leading-tight text-tinta-fuerte">Así se ve tu panel</span>
          <span className="font-ui-app text-sm text-tinta-suave">{v.note}</span>
        </div>
        <div className="flex gap-1 rounded-md bg-crema-sand p-1">
          {TABS.map(([id, label]) => (
            <button key={id} type="button" onClick={() => setPv(id)}
              className={['whitespace-nowrap rounded-[7px] px-6 py-4 font-ui-app text-sm transition', pv === id ? 'bg-white text-tinta-fuerte shadow-card' : 'text-tinta-suave'].join(' ')}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden rounded-lg border border-crema-line-strong bg-crema-base p-5">
        <span className="font-mono text-xs uppercase tracking-eyebrow text-ambar-700">Datos de ejemplo · la familia Ruiz no existe</span>
        <div className="grid grid-cols-4 gap-3">
          {v.kpis.map((k) => (
            <div key={k.l} className="flex flex-col gap-1 rounded-md border border-crema-line bg-white px-4 py-4">
              <span className="font-display-app text-display-sm text-tinta-fuerte">{k.v}</span>
              <span className="font-ui-app text-xs leading-snug text-tinta-tenue">{k.l}</span>
            </div>
          ))}
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden rounded-lg border border-crema-line bg-white px-6 py-6">
          <span className="font-ui-app text-md font-medium text-tinta-fuerte">{v.title}</span>
          {v.rows.map((r) => (
            <div key={r.a} className="flex items-center gap-4 border-b border-crema-hairline pb-3">
              <span style={{ background: r.tone }} className="h-2 w-2 shrink-0 rounded-pill" />
              <span className="flex flex-1 flex-col gap-[1px]">
                <span className="font-ui-app text-base text-tinta-fuerte">{r.a}</span>
                <span className="font-ui-app text-sm text-tinta-tenue">{r.b}</span>
              </span>
              {r.c ? <span className="font-mono text-sm text-tinta-cuerpo">{r.c}</span> : null}
            </div>
          ))}
          <div className="mt-auto flex items-start gap-3 rounded-md bg-violeta-50 px-5 py-4">
            <span className="text-xs text-violeta-600">✦</span>
            <span className="font-ui-app text-sm leading-relaxed text-tinta-cuerpo">{v.annotation}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-5">
        <button type="button" onClick={onBack} className="cursor-pointer font-ui-app text-sm text-tinta-suave">← Atrás</button>
        <div className="flex items-center gap-5">
          <span className="font-ui-app text-sm text-tinta-suave">Esto también es tu portafolio.</span>
          <button type="button" onClick={onNext} className="cursor-pointer rounded-md bg-noche-900 px-7 py-5 font-ui-app text-base font-medium text-crema-paper">
            Ver qué puedo mostrar
          </button>
        </div>
      </div>
    </div>
  );
}
export default PanelPreviewStep;
