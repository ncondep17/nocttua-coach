import { Badge } from '../core/Badge';

/**
 * TimelineEvent — fila del feed del día: sueño, toma, extracción.
 * La hora va en mono a la izquierda; el punto de color dice de qué bebé es.
 */
export function TimelineEvent({ time, title, meta, chip, chipTone = 'accent', baby = 'a', onClick, className = '' }) {
  const dot = { a: 'bg-violeta-600', b: 'bg-terracota-500', both: 'bg-noche-900' };
  return (
    <div onClick={onClick} className={['flex items-start gap-7 border-b border-crema-hairline py-6 last:border-0', onClick ? 'cursor-pointer' : '', className].join(' ')}>
      <span className="w-[46px] shrink-0 pt-1 font-mono text-sm text-tinta-tenue">{time}</span>
      <span className={['mt-[7px] h-[7px] w-[7px] shrink-0 rounded-pill', dot[baby]].join(' ')} />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex flex-wrap items-baseline gap-4">
          <span className="font-ui-app text-base font-medium text-tinta-fuerte">{title}</span>
          {chip ? <Badge tone={chipTone}>{chip}</Badge> : null}
        </div>
        {meta ? <span className="font-ui-app text-sm text-tinta-tenue">{meta}</span> : null}
      </div>
    </div>
  );
}
export default TimelineEvent;
