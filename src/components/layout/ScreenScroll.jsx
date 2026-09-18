/** ScreenScroll — cuerpo scrolleable de una pantalla móvil, con el respiro del sistema. */
export function ScreenScroll({ children, className = '' }) {
  return <div className={['flex min-h-0 flex-1 flex-col gap-7 overflow-auto px-9 pb-9 pt-6', className].join(' ')}>{children}</div>;
}
export default ScreenScroll;
