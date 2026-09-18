import { Eyebrow } from '../core/Eyebrow';

/** EmptyState — vacío honesto, sin dramatismo. */
export function EmptyState({ eyebrow, title, body, action, className = '' }) {
  return (
    <div className={['flex flex-col items-start gap-6 rounded-2xl border border-dashed border-violeta-200 bg-crema-paper px-10 py-11', className].join(' ')}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <span className="font-display-app text-display-sm leading-tight text-tinta-fuerte">{title}</span>
      {body ? <p className="m-0 font-ui-app text-base leading-relaxed text-tinta-cuerpo">{body}</p> : null}
      {action}
    </div>
  );
}
export default EmptyState;
