/** TextArea — nota libre de una hoja de registro o de un plan. */
export function TextArea({ label, value, onChange, placeholder, rows = 3, className = '' }) {
  return (
    <label className={['flex flex-col gap-4', className].join(' ')}>
      {label ? <span className="font-ui-app text-sm text-tinta-tenue">{label}</span> : null}
      <textarea
        rows={rows} value={value} placeholder={placeholder}
        onChange={(e) => onChange && onChange(e.target.value)}
        className="resize-none rounded-md border border-crema-line-strong bg-white px-7 py-6 font-ui-app text-base text-tinta-cuerpo placeholder:text-tinta-apagada focus:border-violeta-600 focus:outline-none focus:shadow-ring"
      />
    </label>
  );
}

/** TextField — una línea. Misma piel que TextArea. */
export function TextField({ label, value, onChange, placeholder, mono = false, className = '' }) {
  return (
    <label className={['flex flex-col gap-4', className].join(' ')}>
      {label ? <span className="font-ui-app text-sm text-tinta-tenue">{label}</span> : null}
      <input
        value={value} placeholder={placeholder}
        onChange={(e) => onChange && onChange(e.target.value)}
        className={['rounded-md border border-crema-line-strong bg-white px-7 py-6 text-base text-tinta-fuerte placeholder:text-tinta-apagada focus:border-violeta-600 focus:outline-none focus:shadow-ring', mono ? 'font-mono tracking-[.08em]' : 'font-ui-app'].join(' ')}
      />
    </label>
  );
}
export default TextArea;
