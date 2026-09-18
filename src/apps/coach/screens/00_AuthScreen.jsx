import { useState } from 'react';
import { Button } from '../../../components/core/Button';
import { TextField } from '../../../components/forms/TextArea';
import { Logo } from '../../../components/brand/Logo';
import { signUpCoach, signInCoach } from '../../../data/coach';

/**
 * Acceso real de la asesora (Supabase Auth, correo + contraseña). No hay
 * "Apple" acá todavía: requiere configurar el proveedor OAuth de Apple para
 * web en el proyecto de Supabase, que no está confirmado — se agrega cuando
 * esté listo, sin tocar esta pantalla.
 */
export function AuthScreen({ onSignedIn, onBack }) {
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit() {
    setError('');
    if (!email.trim() || !password.trim() || (mode === 'signup' && !displayName.trim())) {
      setError('Completá todos los campos.');
      return;
    }
    setBusy(true);
    try {
      if (mode === 'signup') await signUpCoach({ email, password, displayName });
      else await signInCoach({ email, password });
      onSignedIn();
    } catch (err) {
      setError(err.message || 'No se pudo continuar.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-crema-base px-8">
      <div className="flex w-full max-w-[420px] flex-col gap-8 rounded-2xl border border-crema-line bg-white px-11 py-12 shadow-raised">
        <Logo variant="wordmark-tight-noche" width={104} />
        <div className="flex flex-col gap-2">
          <span className="font-display-app text-display-md text-tinta-fuerte">{mode === 'signup' ? 'Crear tu cuenta' : 'Entrar a tu panel'}</span>
          <span className="font-ui-app text-sm text-tinta-suave">Nocttua Coach</span>
        </div>

        <div className="flex flex-col gap-5">
          {mode === 'signup' ? <TextField label="Tu nombre" value={displayName} onChange={setDisplayName} placeholder="Carolina S." /> : null}
          <TextField label="Correo" mono value={email} onChange={setEmail} placeholder="vos@tuestudio.com" />
          <TextField label="Contraseña" type="password" mono value={password} onChange={setPassword} placeholder="••••••••••" />
        </div>

        {error ? <span className="font-ui-app text-sm text-coral-700">{error}</span> : null}

        <Button variant="primary" onClick={submit} disabled={busy}>
          {busy ? 'Un momento…' : mode === 'signup' ? 'Crear cuenta' : 'Entrar'}
        </Button>

        <button type="button" onClick={() => { setMode(mode === 'signup' ? 'signin' : 'signup'); setError(''); }}
          className="cursor-pointer font-ui-app text-sm text-tinta-suave">
          {mode === 'signup' ? 'Ya tengo cuenta' : 'Todavía no tengo cuenta'}
        </button>

        {onBack ? (
          <button type="button" onClick={onBack} className="cursor-pointer font-ui-app text-sm text-tinta-tenue">← Volver</button>
        ) : null}
      </div>
    </div>
  );
}
export default AuthScreen;
