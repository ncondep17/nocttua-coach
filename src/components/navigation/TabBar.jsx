/** TabBar — barra de pestañas fija al pie del teléfono. Toque mínimo 44px. */
export function TabBar({ items, active, onSelect, className = '' }) {
  return (
    <nav className={['flex shrink-0 items-center justify-around border-t border-crema-line bg-white px-6 pb-7 pt-6', className].join(' ')}>
      {items.map((it) => {
        const on = active === it.id;
        return (
          <button
            key={it.id} type="button" onClick={() => onSelect && onSelect(it.id)}
            className={['flex min-h-[44px] min-w-[56px] cursor-pointer flex-col items-center gap-1 font-ui-app text-2xs transition', on ? 'font-medium text-tinta-fuerte' : 'text-tinta-apagada'].join(' ')}
          >
            <span className="text-lg leading-none" aria-hidden="true">{it.icon}</span>
            {it.label}
          </button>
        );
      })}
    </nav>
  );
}
export default TabBar;
