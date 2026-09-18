import { Eyebrow } from '../core/Eyebrow';

/** ScreenHeader — encabezado de pantalla móvil: fecha mono + titular serif + acción. */
export function ScreenHeader({ eyebrow, title, action, className = '' }) {
  return (
    <header className={['flex items-end justify-between gap-6', className].join(' ')}>
      <div className="flex flex-col gap-2">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h1 className="font-display-app text-display-md leading-tight text-tinta-fuerte">{title}</h1>
      </div>
      {action}
    </header>
  );
}

/** PageHeader — el mismo encabezado en el panel de escritorio, a mayor escala. */
export function PageHeader({ eyebrow, title, action, className = '' }) {
  return (
    <header className={['flex items-end justify-between gap-8', className].join(' ')}>
      <div className="flex flex-col gap-3">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h1 className="font-display-app text-display-lg leading-tight text-tinta-fuerte">{title}</h1>
      </div>
      {action}
    </header>
  );
}
export default ScreenHeader;
