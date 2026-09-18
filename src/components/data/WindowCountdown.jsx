import { Eyebrow } from '../core/Eyebrow';

/**
 * WindowCountdown — la tarjeta noche que corona la pantalla Hoy.
 * Responde la única pregunta de las 3 a.m.: cuánto falta para la próxima ventana.
 */
export function WindowCountdown({ eyebrow = 'Próxima ventana', baby, time, remaining, note, action, className = '' }) {
  return (
    <div className={['flex flex-col gap-7 rounded-3xl bg-noche-900 px-10 py-9 shadow-raised', className].join(' ')}>
      <div className="flex items-center justify-between gap-6">
        <Eyebrow tone="night">{eyebrow}</Eyebrow>
        {baby ? <span className="font-ui-app text-sm text-noite-suave">{baby}</span> : null}
      </div>
      <div className="flex items-baseline gap-6">
        <span className="font-display-app text-display-lg leading-tight text-crema-paper">{time}</span>
        {remaining ? <span className="font-mono text-base text-ambar-500">{remaining}</span> : null}
      </div>
      {note ? <span className="font-ui-app text-base leading-relaxed text-noite-suave">{note}</span> : null}
      {action}
    </div>
  );
}
export default WindowCountdown;
