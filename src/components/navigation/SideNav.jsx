/** SideNav — barra lateral noche de 248px del panel de escritorio. */
export function SideNav({ items, active, onSelect, brand, footer, className = '' }) {
  return (
    <aside className={['flex w-[248px] shrink-0 flex-col justify-between bg-noche-900 px-8 py-10', className].join(' ')}>
      <div className="flex flex-col gap-11">
        {brand}
        <nav className="flex flex-col gap-1">
          {items.map((it) => {
            const on = active === it.id;
            return (
              <button
                key={it.id} type="button" onClick={() => onSelect && onSelect(it.id)}
                className={['flex cursor-pointer items-center gap-5 rounded-sm px-5 py-5 text-left font-ui-app text-base transition', on ? 'bg-noche-800 text-crema-paper' : 'text-noite-suave hover:text-crema-paper'].join(' ')}
              >
                <span className="text-md leading-none" aria-hidden="true">{it.icon}</span>
                {it.label}
              </button>
            );
          })}
        </nav>
      </div>
      {footer}
    </aside>
  );
}
export default SideNav;
