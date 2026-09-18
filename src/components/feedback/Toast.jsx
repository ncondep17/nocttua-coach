/** Toast — confirmación breve. En móvil flota sobre la TabBar; en panel, al centro abajo. */
export function Toast({ open, children, variant = 'mobile' }) {
  if (!open) return null;
  const pos = variant === 'mobile' ? 'absolute bottom-[96px] left-9 right-9' : 'fixed bottom-12 left-1/2 -translate-x-1/2';
  return (
    <div className={[pos, 'z-40 animate-riseIn rounded-md bg-noche-900 px-8 py-6 font-ui-app text-base leading-normal text-crema-paper shadow-toast'].join(' ')}>
      {children}
    </div>
  );
}
export default Toast;
