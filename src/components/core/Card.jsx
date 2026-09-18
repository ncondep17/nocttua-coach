import { Eyebrow } from './Eyebrow';

/** Card — el contenedor base del sistema. */
const SURFACES = {
  white: 'bg-white border-crema-line',
  cream: 'bg-crema-paper border-crema-line',
  night: 'bg-noche-900 border-noche-600',
  accent: 'bg-violeta-50 border-violeta-200',
  warm: 'bg-ambar-50 border-ambar-200',
  good: 'bg-verde-50 border-verde-200',
};

export function Card({ surface = 'white', title, eyebrow, action, compact = false, children, className = '', onClick }) {
  const night = surface === 'night';
  return (
    <section
      onClick={onClick}
      className={['flex flex-col gap-6 rounded-2xl border', SURFACES[surface], compact ? 'px-8 py-7' : 'px-10 py-9', onClick ? 'cursor-pointer' : '', className].join(' ')}
    >
      {(eyebrow || title || action) && (
        <header className="flex items-start justify-between gap-6">
          <div className="flex flex-col gap-2">
            {eyebrow ? <Eyebrow tone={night ? 'night' : 'muted'}>{eyebrow}</Eyebrow> : null}
            {title ? <h3 className={'font-ui-app text-lg font-medium ' + (night ? 'text-crema-paper' : 'text-tinta-fuerte')}>{title}</h3> : null}
          </div>
          {action}
        </header>
      )}
      {children}
    </section>
  );
}
export default Card;
