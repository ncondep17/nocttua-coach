/**
 * PhoneFrame — marco noche del teléfono (402×856, radio 44).
 * Solo para la vista de catálogo/preview: en la app nativa no existe.
 */
export function PhoneFrame({ children, width = 402, height = 856, className = '' }) {
  return (
    <div style={{ width, height }} className={['shrink-0 rounded-phone bg-noche-900 p-[11px] shadow-phone', className].join(' ')}>
      <div className="relative flex h-full flex-col overflow-hidden rounded-[34px] bg-crema-paper">{children}</div>
    </div>
  );
}
export default PhoneFrame;
