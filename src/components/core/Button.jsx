/**
 * Button — variantes primary (noche), amber (señal), secondary, ghost, danger.
 * Altura mínima 44px siempre: es un producto que se usa a las 3 de la mañana.
 */
const VARIANTS = {
  primary: 'bg-noche-900 text-crema-paper border-transparent hover:bg-noche-800',
  amber: 'bg-ambar-500 text-noche-900 border-transparent hover:brightness-105',
  secondary: 'bg-white text-tinta-cuerpo border-crema-line-strong hover:bg-crema-paper',
  ghost: 'bg-transparent text-violeta-600 border-transparent hover:text-noche-900',
  danger: 'bg-white text-coral-700 border-[#E3A6A6] hover:bg-coral-100',
};
const SIZES = { sm: 'text-sm px-6 py-4 min-h-[36px]', md: 'text-md px-8 py-6 min-h-[44px]', lg: 'text-[16.5px] px-9 py-7 min-h-[52px]' };

export function Button({ variant = 'primary', size = 'md', full = false, disabled = false, icon, children, onClick, className = '', type = 'button' }) {
  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center gap-4 rounded-md border font-ui-app font-medium leading-none transition',
        'focus-visible:outline-none focus-visible:shadow-ring',
        SIZES[size], disabled ? 'bg-crema-sand text-tinta-apagada border-transparent cursor-default' : VARIANTS[variant] + ' cursor-pointer',
        full ? 'w-full' : '', className,
      ].join(' ')}
    >
      {icon ? <span aria-hidden="true">{icon}</span> : null}
      {children}
    </button>
  );
}
export default Button;
