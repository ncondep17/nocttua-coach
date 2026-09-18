/** ListRow — fila de lista tocable: cliente, integrante del equipo, evento del feed. */
export function ListRow({ leading, title, subtitle, trailing, onClick, className = '' }) {
  return (
    <div
      onClick={onClick}
      className={['flex items-center gap-7 rounded-lg border border-crema-line bg-white px-8 py-7 transition', onClick ? 'cursor-pointer hover:border-violeta-300' : '', className].join(' ')}
    >
      {leading}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="truncate font-ui-app text-md font-medium text-tinta-fuerte">{title}</span>
        {subtitle ? <span className="truncate font-ui-app text-sm text-tinta-tenue">{subtitle}</span> : null}
      </div>
      {trailing}
    </div>
  );
}

/** Avatar circular con inicial. Bebé A violeta, bebé B terracota. */
export function Avatar({ initial, tone = 'a', size = 34 }) {
  const tones = { a: 'bg-violeta-100 text-violeta-600', b: 'bg-terracota-100 text-terracota-500', neutral: 'bg-crema-sand text-tinta-suave', good: 'bg-verde-100 text-verde-600' };
  return (
    <span style={{ width: size, height: size }} className={['grid shrink-0 place-items-center rounded-pill font-ui-app text-sm font-medium', tones[tone]].join(' ')}>
      {initial}
    </span>
  );
}
export default ListRow;
