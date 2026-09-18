import { useState } from 'react';
import { TextField } from '../../../components/forms/TextArea';
import { Chip } from '../../../components/core/Chip';
import { ACCESS_LEVELS } from '../../../data/contract';
import { PACKAGES, recommendPackage } from '../lib/subscription';

const ACCESS_LABEL = Object.fromEntries(ACCESS_LEVELS.map((a) => [a.id, a.label]));

/**
 * 07 · Tu cuenta y tu paquete. Recién acá se pide identidad y dinero — todo lo
 * anterior ya está a la vista arriba, para que el registro se sienta como
 * guardar, no como empezar. "Crear mi cuenta" crea la cuenta real de Supabase
 * (`onNext` → `signUpCoach` en `CoachOnboarding`) — no hay nada que precargar
 * de una sesión previa porque todavía no existe ninguna.
 */
export function AccountAndPlanStep({ data, onBack, onNext, onFlash }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [timezone, setTimezone] = useState('America/Bogotá');
  const recommended = recommendPackage(data.practice.clients);
  const [pkgId, setPkgId] = useState(recommended.id);
  const [billingOpen, setBillingOpen] = useState(false);
  const [standardPrice, setStandardPrice] = useState('');
  const [chargesThrough, setChargesThrough] = useState('nocttua');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const savedSummary = [
    data.practice.clients + ' casos en paralelo',
    data.practice.ages.length + (data.practice.ages.length === 1 ? ' edad' : ' edades') + (data.practice.twins ? ' · mellizos sí' : ''),
    'plantilla de plan lista',
    'acceso: ' + (ACCESS_LABEL[data.defaultAccessLevel] || data.defaultAccessLevel).toLowerCase(),
  ];

  async function submit() {
    if (!email.trim() || !password.trim() || !name.trim()) { setError('Completá correo, contraseña y nombre.'); return; }
    setError('');
    setBusy(true);
    try {
      await onNext({ email: email.trim(), password, name: name.trim(), role: role.trim(), timezone, pkgId, billing: { skipped: !billingOpen, standardPrice, chargesThrough } });
    } catch (err) {
      setError(err.message || 'No se pudo crear la cuenta.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex h-full animate-riseIn flex-col gap-5">
      <div className="flex flex-col gap-2">
        <span className="font-display-app text-display-lg leading-tight text-tinta-fuerte">Tu cuenta y tu paquete</span>
        <span className="font-ui-app text-sm leading-relaxed text-tinta-suave">Ahora sí. Guardamos lo que ya configuraste y abrimos tu panel.</span>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-2 rounded-md bg-crema-sand px-6 py-5">
        {savedSummary.map((s) => <span key={s} className="whitespace-nowrap font-mono text-xs text-tinta-cuerpo">✓ {s}</span>)}
      </div>

      <div className="grid flex-1 grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-6 overflow-auto">
        <div className="flex flex-col gap-4">
          <span className="font-ui-app text-md font-medium text-tinta-fuerte">Tu acceso</span>
          <TextField label="Correo profesional" mono value={email} onChange={setEmail} placeholder="vos@tuestudio.com" />
          <TextField label="Contraseña" type="password" mono value={password} onChange={setPassword} placeholder="••••••••••" />
          <button type="button" onClick={() => onFlash && onFlash('Continuar con Apple')}
            className="cursor-pointer rounded-md border border-noche-900 px-6 py-5 text-center font-ui-app text-sm text-tinta-fuerte">
            Continuar con Apple
          </button>

          <div className="flex flex-col gap-4 rounded-md border border-crema-line bg-white px-7 py-6">
            <span className="font-ui-app text-base font-medium text-tinta-fuerte">Tu perfil público</span>
            <div className="flex items-center gap-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-pill bg-violeta-100 font-display-app text-lg text-violeta-600">{name.trim().charAt(0).toUpperCase() || 'C'}</span>
              <span className="flex flex-col gap-[1px]">
                <span className="font-ui-app text-base text-tinta-fuerte">{name || 'Tu nombre'}</span>
                <span className="font-ui-app text-xs text-tinta-tenue">{role || 'Rol / certificación'}</span>
              </span>
            </div>
            <TextField label="Nombre" value={name} onChange={setName} placeholder="Tu nombre" />
            <TextField label="Rol / certificación" value={role} onChange={setRole} placeholder="Asesora de sueño certificada" />
            <TextField label="Zona horaria" value={timezone} onChange={setTimezone} placeholder="America/Bogotá" />
            <span className="border-t border-crema-hairline pt-3 font-ui-app text-xs leading-relaxed text-tinta-apagada">Esto es lo que ve tu cliente en su app.</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <span className="font-ui-app text-md font-medium text-tinta-fuerte">Tu paquete</span>
          {PACKAGES.map((p) => {
            const on = pkgId === p.id;
            return (
              <button key={p.id} type="button" onClick={() => setPkgId(p.id)}
                className={['flex flex-col gap-1 rounded-md border px-7 py-6 text-left transition', on ? 'border-[1.5px] border-violeta-600 bg-violeta-50' : 'border-crema-line bg-white'].join(' ')}>
                <span className="flex items-baseline justify-between gap-3">
                  <span className="font-ui-app text-md font-medium text-tinta-fuerte">{p.name}</span>
                  <span className="font-mono text-sm text-tinta-fuerte">{p.price}</span>
                </span>
                <span className="font-ui-app text-sm leading-relaxed text-tinta-tenue">{p.desc}</span>
                {p.id === recommended.id ? <span className="font-mono text-[10.5px] uppercase tracking-eyebrow text-violeta-600">Recomendado para {data.practice.clients} casos</span> : null}
              </button>
            );
          })}

          <button type="button" onClick={() => setBillingOpen((o) => !o)} className="cursor-pointer text-left font-ui-app text-sm text-violeta-600">
            {billingOpen ? '− Cómo cobras a tus clientes' : '+ Cómo cobras a tus clientes (opcional)'}
          </button>
          {billingOpen ? (
            <div className="flex flex-col gap-4 rounded-md border border-crema-line bg-white px-7 py-6">
              <TextField label="Precio estándar de tu paquete" mono value={standardPrice} onChange={setStandardPrice} placeholder="$210" />
              <div className="flex flex-col gap-2">
                <span className="font-ui-app text-sm text-tinta-tenue">Cobras...</span>
                <div className="flex gap-3">
                  <Chip selected={chargesThrough === 'nocttua'} onClick={() => setChargesThrough('nocttua')}>Por Nocttua</Chip>
                  <Chip selected={chargesThrough === 'afuera'} onClick={() => setChargesThrough('afuera')}>Por fuera</Chip>
                </div>
              </div>
            </div>
          ) : null}
          <span className="font-ui-app text-xs leading-relaxed text-tinta-apagada">Cómo cobras a tus clientes lo configuras después, en Facturación. Si lo dejas así, queda como registro manual.</span>
        </div>
      </div>

      {error ? <span className="font-ui-app text-sm text-coral-700">{error}</span> : null}

      <div className="mt-auto flex items-center justify-between gap-5">
        <button type="button" onClick={onBack} className="cursor-pointer font-ui-app text-sm text-tinta-suave">← Atrás</button>
        <button type="button" onClick={submit} disabled={busy || !email.trim() || !password.trim() || !name.trim()}
          className="cursor-pointer rounded-md bg-noche-900 px-8 py-6 font-ui-app text-base font-medium text-crema-paper disabled:cursor-default disabled:bg-crema-sand disabled:text-tinta-apagada">
          {busy ? 'Creando…' : 'Crear mi cuenta'}
        </button>
      </div>
    </div>
  );
}
export default AccountAndPlanStep;
