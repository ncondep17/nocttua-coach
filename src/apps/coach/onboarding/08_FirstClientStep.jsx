import { useEffect, useState } from 'react';
import { createClientInvite } from '../../../data/coach';

/**
 * 08 · Tu primer cliente. El onboarding termina en el momento del valor: el
 * código ya es real (`create_client_family`), no una vista previa. A
 * diferencia de la ronda de prototipo, no hay invitar por correo acá —
 * `family_invites` no tiene esa columna; el código se comparte por fuera
 * (WhatsApp, texto), igual que ya hace `apps/mobile`'s TeamScreen.
 */
export function FirstClientStep({ defaultAccessLevel, onDone }) {
  const [invite, setInvite] = useState(undefined);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    createClientInvite(defaultAccessLevel)
      .then(setInvite)
      .catch((err) => setError(err.message || 'No se pudo crear el código.'));
  }, [defaultAccessLevel]);

  function copyCode() {
    if (!invite) return;
    navigator.clipboard?.writeText(invite.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="flex h-full max-w-[560px] animate-riseIn flex-col justify-center gap-7">
      <span className="font-mono text-xs uppercase tracking-eyebrow-wide text-ambar-700">Último paso</span>
      <span className="font-display-app text-display-xl leading-tight text-tinta-fuerte">Invita a tu primera familia.</span>
      <span className="font-ui-app text-md leading-relaxed text-tinta-cuerpo">
        Compartí este código por el medio que quieras. Al ponerlo en su app, el caso aparece en tu panel. Hasta entonces está vacío, y eso está bien.
      </span>

      <div className="flex flex-col gap-4 rounded-md border border-crema-line-strong bg-white px-7 py-6">
        <div className="flex items-center justify-between gap-5">
          <span className="flex flex-col gap-1">
            <span className="font-mono text-xs uppercase tracking-eyebrow text-ambar-700">Tu código</span>
            <span className="font-mono text-xl tracking-[.08em] text-tinta-fuerte">{invite ? invite.code : '······'}</span>
          </span>
          <button type="button" onClick={copyCode} disabled={!invite}
            className={['cursor-pointer rounded-md px-6 py-5 font-ui-app text-sm', copied ? 'bg-verde-100 text-verde-600' : 'bg-noche-900 text-crema-paper'].join(' ')}>
            {copied ? 'Copiado' : 'Copiar'}
          </button>
        </div>
        <span className="border-t border-crema-hairline pt-4 font-mono text-sm text-tinta-tenue">nocttua.app/c/{invite ? invite.code : ''}</span>
      </div>

      {error ? <span className="font-ui-app text-sm text-coral-700">{error}</span> : null}

      <div className="mt-2 flex items-center gap-6">
        <button type="button" onClick={onDone} disabled={!invite}
          className="cursor-pointer rounded-md bg-noche-900 px-9 py-6 font-ui-app text-md font-medium text-crema-paper disabled:cursor-default disabled:bg-crema-sand disabled:text-tinta-apagada">
          Abrir mi panel
        </button>
        <button type="button" onClick={onDone} className="cursor-pointer font-ui-app text-sm text-tinta-suave">Lo hago después</button>
      </div>
    </div>
  );
}
export default FirstClientStep;
