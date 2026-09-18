/**
 * DesktopShell — cáscara del panel: barra lateral fija + área de contenido crema.
 * Ancho de contenido máximo 1320px, respiro 26px 34px.
 */
export function DesktopShell({ nav, children }) {
  return (
    <div className="flex min-h-screen bg-crema-base">
      {nav}
      <main className="flex min-w-0 flex-1 flex-col gap-9 overflow-auto px-[34px] py-11">{children}</main>
    </div>
  );
}
export default DesktopShell;
