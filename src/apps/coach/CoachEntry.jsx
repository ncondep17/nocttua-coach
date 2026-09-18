import { useEffect, useRef, useState } from 'react';
import { getSession, onAuthChange, getMyCoachProfile, signOutCoach } from '../../data/coach';
import { AuthScreen } from './screens/00_AuthScreen';
import { CoachOnboarding } from './onboarding/CoachOnboarding';
import { CoachApp } from './CoachApp';

/**
 * Punto de entrada real. Sin sesión → onboarding de 8 pasos (paso 07 crea la
 * cuenta real). Con sesión pero sin perfil de asesora → aviso. Con las dos
 * cosas → el panel.
 *
 * El paso 07 del onboarding crea la sesión de Supabase a mitad de flujo —
 * antes de que el paso 08 (código del primer cliente) llegue a mostrarse.
 * Por eso el listener de auth NO salta solo a la app mientras `phase` es
 * 'onboarding' o 'auth': esas dos pantallas controlan su propia salida
 * llamando a `onComplete`/`onSignedIn` cuando de verdad terminaron.
 */
export function CoachEntry() {
  const [phase, setPhase] = useState('loading'); // loading | onboarding | auth | app | wrong-role
  const [profile, setProfile] = useState(null);
  const phaseRef = useRef('loading');
  useEffect(() => { phaseRef.current = phase; }, [phase]);

  async function afterAuth() {
    const p = await getMyCoachProfile();
    setProfile(p);
    setPhase(p?.role === 'coach' ? 'app' : 'wrong-role');
  }

  async function reset() {
    await signOutCoach();
    setProfile(null);
    setPhase('onboarding');
  }

  useEffect(() => {
    (async () => {
      const s = await getSession();
      if (!s) { setPhase('onboarding'); return; }
      await afterAuth();
    })();

    return onAuthChange((session) => {
      if (phaseRef.current === 'onboarding' || phaseRef.current === 'auth') return;
      if (!session) { setProfile(null); setPhase('onboarding'); return; }
      afterAuth();
    });
  }, []);

  if (phase === 'loading') return <div className="min-h-screen bg-crema-base" />;

  if (phase === 'onboarding') return <CoachOnboarding onSignIn={() => setPhase('auth')} onComplete={afterAuth} />;

  if (phase === 'auth') return <AuthScreen onSignedIn={afterAuth} onBack={() => setPhase('onboarding')} />;

  if (phase === 'wrong-role') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-crema-base px-8 text-center">
        <span className="font-display-app text-display-md text-tinta-fuerte">Esta cuenta no es de asesora</span>
        <span className="font-ui-app text-sm text-tinta-suave">Entraste con una cuenta de família. Nocttua Coach es solo para asesoras.</span>
        <button type="button" onClick={reset} className="cursor-pointer font-ui-app text-sm text-violeta-600">Cerrar sesión</button>
      </div>
    );
  }

  return <CoachApp coach={profile} onSignOut={reset} />;
}
export default CoachEntry;
