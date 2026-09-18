import { useState } from 'react';

/**
 * 03 · Lo que puedes mostrar. Las tres piezas de material (09/10/12), con datos
 * de ejemplo — convierte el panel en argumento comercial antes de configurar nada.
 */
const CONTENT = {
  reporte: {
    title: 'Reporte de cierre de caso',
    why: 'La hoja que le mandas a la familia cuando termina el acompañamiento. Es lo que justifica tu precio y lo que te renueva el caso.',
    bullets: ['Antes y después de despertares y adherencia, con el plan que aplicaste', 'Sale del registro real, no de lo que la familia recuerda', 'Se descarga en PDF y se envía desde el panel'],
  },
  tarjeta: {
    title: 'Tarjeta de caso para redes',
    why: 'El mismo cierre, anonimizado, en cuadrado o historia. Para tu Instagram, tu web o una propuesta comercial.',
    bullets: ['Sin nombres, sin fechas exactas, sin fotos: edad en semanas y cifras', 'Lleva tu nombre y tu cuenta, no la nuestra', '1080×1080 y 1080×1920, listas para publicar'],
  },
  cifras: {
    title: 'Cifras de tu práctica',
    why: 'El agregado de todos tus casos. Es el argumento para cobrar lo que vales y para decir en qué eres especialista.',
    bullets: ['Casos atendidos, retención y reducción media de despertares', 'Desglose por edad, con mellizos como segmento propio', 'Se copian en un toque para tu web o tu propuesta'],
  },
};
const TABS = [['reporte', 'Reporte de cierre'], ['tarjeta', 'Tarjeta de caso'], ['cifras', 'Cifras']];
const CLOSE_ROWS = [
  { label: 'Despertares por noche', before: '5,2', after: '4,0', delta: '−1,2 por noche' },
  { label: 'Adherencia al plan', before: '48%', after: '62%', delta: '+14 puntos' },
];
const REPORT_LINES = [
  { label: 'Siestas en cuna', pct: 68, color: '#6B5DD3' },
  { label: 'Ventanas respetadas', pct: 82, color: '#3F7A62' },
  { label: 'Rutina de noche completa', pct: 54, color: '#B08A55' },
];
const AGE_ROWS = [
  { label: '0–12 sem', red: '−0,9 h', pct: 45, color: '#C2703F' },
  { label: '13–26 sem', red: '−1,8', pct: 78, color: '#6B5DD3' },
  { label: '27–52 sem', red: '−1,4', pct: 62, color: '#6B5DD3' },
  { label: 'Mellizos', red: '−2,1', pct: 88, color: '#3F7A62' },
];

export function ProofStep({ onBack, onNext }) {
  const [pf, setPf] = useState('reporte');
  const c = CONTENT[pf];

  return (
    <div className="flex h-full animate-riseIn flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div className="flex flex-col gap-1">
          <span className="font-display-app text-display-lg leading-tight text-tinta-fuerte">Lo que puedes mostrar</span>
          <span className="font-ui-app text-sm text-tinta-suave">Sale del registro de la familia, no de la percepción.</span>
        </div>
        <div className="flex gap-1 rounded-md bg-crema-sand p-1">
          {TABS.map(([id, label]) => (
            <button key={id} type="button" onClick={() => setPf(id)}
              className={['whitespace-nowrap rounded-[7px] px-6 py-4 font-ui-app text-sm transition', pf === id ? 'bg-white text-tinta-fuerte shadow-card' : 'text-tinta-suave'].join(' ')}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_300px] gap-5">
        <div className="flex items-center justify-center overflow-hidden rounded-lg border border-crema-line-strong bg-crema-base p-5">
          {pf === 'reporte' ? (
            <div className="flex w-full flex-col gap-4 rounded-sm bg-crema-paper px-7 py-6 shadow-card">
              <div className="flex items-start justify-between border-b border-crema-line-strong pb-3">
                <span className="font-display-app text-lg text-tinta-fuerte">Cierre de caso</span>
                <span className="font-mono text-xs text-tinta-tenue">14 jul – 11 ago 2026 · 4 sem</span>
              </div>
              <div className="grid grid-cols-2 gap-5 rounded-md bg-noche-900 px-6 py-5">
                {CLOSE_ROWS.map((r) => (
                  <div key={r.label} className="flex flex-col gap-1">
                    <span className="font-ui-app text-xs text-noite-suave">{r.label}</span>
                    <span className="flex items-baseline gap-2">
                      <span className="font-mono text-sm text-noite-tenue line-through">{r.before}</span>
                      <span className="font-display-app text-2xl leading-none text-crema-paper">{r.after}</span>
                    </span>
                    <span className="font-mono text-xs text-verde-400">{r.delta}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                {REPORT_LINES.map((l) => (
                  <div key={l.label} className="grid grid-cols-[minmax(0,1fr)_120px_40px] items-center gap-3">
                    <span className="font-ui-app text-sm text-tinta-cuerpo">{l.label}</span>
                    <span className="h-[7px] overflow-hidden rounded-pill bg-crema-sand">
                      <span style={{ width: l.pct + '%', background: l.color }} className="block h-full rounded-pill" />
                    </span>
                    <span className="font-mono text-xs text-tinta-tenue">{l.pct}%</span>
                  </div>
                ))}
              </div>
              <span className="border-t border-crema-line-strong pt-3 font-ui-app text-xs leading-relaxed text-tinta-apagada">
                Plan v3 · silla junto a la cuna. Se lo envías a la familia al cerrar el acompañamiento.
              </span>
            </div>
          ) : null}

          {pf === 'tarjeta' ? (
            <div className="relative flex h-[348px] w-[348px] flex-col justify-between overflow-hidden rounded-[18px] p-7 shadow-raised"
              style={{ background: 'radial-gradient(120% 70% at 50% 106%, rgba(240,168,104,.24) 0%, rgba(240,168,104,0) 62%), linear-gradient(180deg,#16162B 0%,#22224A 58%,#332F5C 100%)' }}>
              <span className="absolute right-6 top-[44%] text-[10px] text-ambar-500 opacity-75">✦</span>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-xs uppercase tracking-eyebrow text-ambar-500">Caso cerrado · 4 semanas</span>
                <span className="font-ui-app text-sm text-noite-suave">Mellizas de 19 semanas</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="flex items-baseline gap-2">
                  <span className="font-display-app text-[60px] leading-none text-crema-paper">−1,2</span>
                  <span className="font-ui-app text-sm leading-tight text-noite-tenue">despertares<br />por noche</span>
                </span>
                <span className="font-mono text-sm text-violeta-200">De 5,2 a 4,0 · 62% de adherencia</span>
              </div>
              <div className="flex items-end justify-between gap-3 border-t border-noche-600 pt-4">
                <span className="flex flex-col gap-[1px]">
                  <span className="font-ui-app text-sm font-medium text-crema-paper">Tu nombre</span>
                  <span className="font-mono text-xs text-noite-tenue">@tu.cuenta</span>
                </span>
                <span className="whitespace-nowrap font-mono text-[9px] uppercase tracking-eyebrow text-noite-apagado">Con Nocttua</span>
              </div>
            </div>
          ) : null}

          {pf === 'cifras' ? (
            <div className="flex w-full flex-col gap-3">
              <div className="flex flex-col gap-2 rounded-lg bg-noche-900 px-7 py-6">
                <span className="font-mono text-xs uppercase tracking-eyebrow text-ambar-500">El titular de tu práctica</span>
                <span className="flex items-baseline gap-2">
                  <span className="font-display-app text-4xl leading-none text-crema-paper">−1,1</span>
                  <span className="font-ui-app text-sm text-noite-tenue">despertares / noche en 38 casos</span>
                </span>
              </div>
              <div className="flex flex-col gap-4 rounded-lg border border-crema-line bg-white px-7 py-6">
                <span className="font-ui-app text-md font-medium text-tinta-fuerte">Resultados por edad</span>
                {AGE_ROWS.map((a) => (
                  <div key={a.label} className="flex flex-col gap-1">
                    <div className="flex items-baseline justify-between">
                      <span className="font-ui-app text-sm text-tinta-fuerte">{a.label}</span>
                      <span className="font-mono text-sm text-verde-600">{a.red}</span>
                    </div>
                    <span className="h-2 overflow-hidden rounded-pill bg-crema-sand">
                      <span style={{ width: a.pct + '%', background: a.color }} className="block h-full rounded-pill" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="font-ui-app text-lg font-medium text-tinta-fuerte">{c.title}</span>
            <span className="font-ui-app text-sm leading-relaxed text-tinta-suave">{c.why}</span>
          </div>
          <div className="flex flex-col gap-2 border-t border-crema-line pt-4">
            {c.bullets.map((b) => <span key={b} className="font-ui-app text-sm leading-relaxed text-tinta-cuerpo">— {b}</span>)}
          </div>
          <div className="mt-auto flex flex-col gap-1 rounded-md border border-violeta-200 bg-violeta-50 px-5 py-4">
            <span className="font-ui-app text-sm font-medium text-tinta-fuerte">Nada sale sin autorización</span>
            <span className="font-ui-app text-xs leading-relaxed text-tinta-suave">Se pide a la familia al cerrar el caso, queda con fecha y se puede revocar. Sin eso, el botón de exportar no existe.</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-5">
        <button type="button" onClick={onBack} className="cursor-pointer font-ui-app text-sm text-tinta-suave">← Atrás</button>
        <button type="button" onClick={onNext} className="cursor-pointer rounded-md bg-noche-900 px-7 py-5 font-ui-app text-base font-medium text-crema-paper">
          Configurarlo a mi práctica
        </button>
      </div>
    </div>
  );
}
export default ProofStep;
