import { useState } from 'react';
import { OnboardingShell } from './OnboardingShell';
import { WelcomeStep } from './01_WelcomeStep';
import { PanelPreviewStep } from './02_PanelPreviewStep';
import { ProofStep } from './03_ProofStep';
import { PracticeSetupStep } from './04_PracticeSetupStep';
import { PlanTemplateStep } from './05_PlanTemplateStep';
import { AccessDefaultsStep } from './06_AccessDefaultsStep';
import { AccountAndPlanStep } from './07_AccountAndPlanStep';
import { FirstClientStep } from './08_FirstClientStep';
import { loadOnboarding, saveOnboarding } from './state';
import { signUpCoach } from '../../../data/coach';
import { setSubscriptionTier } from '../lib/subscription';
import { Toast } from '../../../components/feedback/Toast';

/**
 * Orquestador de los 8 pasos. 01–06 corren sin cuenta, con el estado en
 * localStorage (`onboarding/state.js`); 07 crea la cuenta real de Supabase
 * (`signUpCoach`). A partir de ahí ya existe una sesión real — `CoachEntry`
 * no debe saltar solo a la app hasta que el paso 8 llame a `onComplete`
 * (por eso `CoachEntry` ignora los cambios de sesión mientras esto está
 * montado; ver el comentario ahí).
 */
export function CoachOnboarding({ onSignIn, onComplete }) {
  const initial = loadOnboarding();
  const [step, setStep] = useState(initial.step || 1);
  const [maxReached, setMaxReached] = useState(initial.step || 1);
  const [data, setData] = useState(initial);
  const [toast, setToast] = useState(null);

  const flash = (t) => { setToast(t); setTimeout(() => setToast(null), 2400); };

  function goTo(n) {
    setStep(n);
    saveOnboarding({ step: n });
  }
  function advance(patch) {
    const merged = patch ? saveOnboarding(patch) : data;
    if (patch) setData(merged);
    const n = Math.min(8, step + 1);
    setMaxReached((m) => Math.max(m, n));
    goTo(n);
  }
  function back() { goTo(Math.max(1, step - 1)); }

  async function createAccount(account) {
    await signUpCoach({ email: account.email, password: account.password, displayName: account.name });
    setSubscriptionTier(account.pkgId, data.practice.clients);
    saveOnboarding({ account: { ...account, password: undefined } });
    setMaxReached(8);
    goTo(8);
  }

  return (
    <>
      <OnboardingShell step={step} maxReached={maxReached} onGoStep={goTo}>
        {step === 1 ? <WelcomeStep onNext={() => advance()} onSkipToApp={onSignIn} /> : null}
        {step === 2 ? <PanelPreviewStep onBack={back} onNext={() => advance()} /> : null}
        {step === 3 ? <ProofStep onBack={back} onNext={() => advance()} /> : null}
        {step === 4 ? <PracticeSetupStep data={data.practice} onBack={back} onNext={(practice) => advance({ practice })} /> : null}
        {step === 5 ? <PlanTemplateStep data={data.planTemplate} onBack={back} onNext={(planTemplate) => advance({ planTemplate })} /> : null}
        {step === 6 ? <AccessDefaultsStep data={data.defaultAccessLevel} onBack={back} onNext={(defaultAccessLevel) => advance({ defaultAccessLevel })} /> : null}
        {step === 7 ? <AccountAndPlanStep data={data} onBack={back} onNext={createAccount} onFlash={flash} /> : null}
        {step === 8 ? <FirstClientStep defaultAccessLevel={data.defaultAccessLevel} onDone={onComplete} /> : null}
      </OnboardingShell>
      <Toast open={!!toast} variant="desktop">{toast}</Toast>
    </>
  );
}
export default CoachOnboarding;
