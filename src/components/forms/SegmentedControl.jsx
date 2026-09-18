/** SegmentedControl — filtro de 2-4 opciones. Vive en el hueco crema hundido. */
export function SegmentedControl({ items, active, onSelect, className = '' }) {
  return (
    <div className={['flex w-fit gap-1 rounded-sm bg-crema-sand p-1', className].join(' ')}>
      {items.map((it) => (
        <button
          key={it.id} type="button" onClick={() => onSelect && onSelect(it.id)}
          className={['rounded-[7px] px-7 py-4 font-ui-app text-base transition', active === it.id ? 'bg-white text-tinta-fuerte shadow-card' : 'text-tinta-suave hover:text-tinta-fuerte'].join(' ')}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}
export default SegmentedControl;
