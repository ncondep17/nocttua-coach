/** Chip — opción seleccionable de una hoja de registro (lugar, factores, contacto). */
export function Chip({ selected = false, onClick, children, className = '' }) {
  return (
    <button
      type="button" onClick={onClick} aria-pressed={selected}
      className={[
        'rounded-pill border px-7 py-4 text-base font-ui-app transition min-h-[38px]',
        selected ? 'border-violeta-600 bg-violeta-50 text-violeta-600 border-[1.5px]' : 'border-crema-line-strong bg-white text-tinta-cuerpo hover:border-violeta-300',
        className,
      ].join(' ')}
    >
      {children}
    </button>
  );
}
export default Chip;
