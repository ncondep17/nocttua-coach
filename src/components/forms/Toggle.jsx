/** Toggle — sí/no ("Le tocaba esta toma", "Se durmió durante la toma"). */
export function Toggle({ checked = false, onChange, label, hint, className = '' }) {
  return (
    <div className={['flex items-center justify-between gap-7 rounded-md border border-crema-line bg-crema-paper px-7 py-6', className].join(' ')}>
      <span className="flex flex-col gap-1">
        <span className="font-ui-app text-base text-tinta-cuerpo">{label}</span>
        {hint ? <span className="font-ui-app text-sm text-tinta-tenue">{hint}</span> : null}
      </span>
      <button
        type="button" role="switch" aria-checked={checked} onClick={onChange}
        className={['relative h-[26px] w-[46px] shrink-0 rounded-pill transition', checked ? 'bg-violeta-600' : 'bg-crema-line-strong'].join(' ')}
      >
        <span className={['absolute top-[3px] h-5 w-5 rounded-pill bg-white transition-all', checked ? 'left-[23px]' : 'left-[3px]'].join(' ')} />
      </button>
    </div>
  );
}
export default Toggle;
