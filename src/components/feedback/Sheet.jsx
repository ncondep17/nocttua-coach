/**
 * Sheet — hoja inferior del móvil: registro de sueño, toma, gestión de acceso.
 * El velo cierra al tocar; la botonera queda pegada al fondo.
 */
export function Sheet({ open, title, subtitle, onClose, children, footer, className = '' }) {
  if (!open) return null;
  return (
    <div className="absolute inset-0 z-30 flex flex-col justify-end">
      <div onClick={onClose} className="flex-1 bg-[rgba(22,22,43,.35)]" />
      <div className={['flex max-h-[86%] animate-riseIn flex-col gap-7 rounded-t-[24px] bg-white px-9 pb-10 pt-6', className].join(' ')}>
        <div className="mx-auto h-1 w-9 shrink-0 rounded-pill bg-crema-line-strong" />
        {(title || subtitle) && (
          <header className="flex shrink-0 flex-col gap-1">
            {title ? <h2 className="font-display-app text-display-sm leading-tight text-tinta-fuerte">{title}</h2> : null}
            {subtitle ? <span className="font-ui-app text-sm text-tinta-tenue">{subtitle}</span> : null}
          </header>
        )}
        <div className="flex min-h-0 flex-1 flex-col gap-7 overflow-auto">{children}</div>
        {footer ? <div className="flex shrink-0 gap-5 pt-1">{footer}</div> : null}
      </div>
    </div>
  );
}
export default Sheet;
