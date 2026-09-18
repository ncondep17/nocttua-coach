/**
 * Stepper — ±paso para horas, duraciones y cantidades.
 * El control firma de Nocttua: se usa con una mano, sin teclado.
 */
export function Stepper({ label, value, onDecrement, onIncrement, dark = false, className = '' }) {
  const btn = ['grid h-11 w-11 shrink-0 place-items-center rounded-pill border text-lg transition',
    dark ? 'border-noche-600 text-crema-paper hover:bg-noche-800' : 'border-crema-line-strong text-tinta-cuerpo hover:bg-crema-paper'].join(' ');
  return (
    <div className={['flex flex-col gap-4', className].join(' ')}>
      {label ? <span className={['font-ui-app text-sm', dark ? 'text-noite-suave' : 'text-tinta-tenue'].join(' ')}>{label}</span> : null}
      <div className="flex items-center gap-6">
        <button type="button" onClick={onDecrement} aria-label="Restar" className={btn}>−</button>
        <span className={['flex-1 text-center font-mono text-xl', dark ? 'text-crema-paper' : 'text-tinta-fuerte'].join(' ')}>{value}</span>
        <button type="button" onClick={onIncrement} aria-label="Sumar" className={btn}>+</button>
      </div>
    </div>
  );
}
export default Stepper;
