/** Modal — diálogo centrado del panel de escritorio (invitar, confirmar). */
export function Modal({ open, title, subtitle, onClose, children, footer, width = 460 }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 grid place-items-center p-13">
      <div onClick={onClose} className="absolute inset-0 bg-[rgba(22,22,43,.4)]" />
      <div style={{ width }} className="relative flex animate-riseIn flex-col gap-8 rounded-3xl bg-white px-12 py-11 shadow-raised">
        {title ? <h2 className="font-display-app text-display-sm leading-tight text-tinta-fuerte">{title}</h2> : null}
        {subtitle ? <p className="m-0 font-ui-app text-base leading-relaxed text-tinta-cuerpo">{subtitle}</p> : null}
        {children}
        {footer ? <div className="flex gap-5">{footer}</div> : null}
      </div>
    </div>
  );
}

/** SidePanel — panel lateral derecho del panel (gestión de acceso). */
export function SidePanel({ open, title, subtitle, onClose, children, footer, width = 420 }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <div onClick={onClose} className="flex-1 bg-[rgba(22,22,43,.4)]" />
      <aside style={{ width }} className="flex flex-col gap-8 overflow-auto bg-crema-paper px-12 py-12 shadow-raised">
        <header className="flex flex-col gap-2">
          {title ? <h2 className="font-display-app text-display-sm leading-tight text-tinta-fuerte">{title}</h2> : null}
          {subtitle ? <span className="font-ui-app text-sm text-tinta-tenue">{subtitle}</span> : null}
        </header>
        <div className="flex flex-1 flex-col gap-6">{children}</div>
        {footer}
      </aside>
    </div>
  );
}
export default Modal;
