import { Logo } from '../../../components/brand/Logo';
import { ONBOARDING_STEPS, WIDE_STEPS } from './steps';

/**
 * Marco de dos columnas del onboarding: columna noche (logo, paso, ticks) +
 * panel crema con el contenido. Marco de revisión 1180×748, radio 22.
 * En los pasos 2 y 3 la columna noche se encoge a 196px (muestran el panel).
 */
export function OnboardingShell({ step, maxReached, onGoStep, children }) {
  const s = ONBOARDING_STEPS[step - 1];
  const wide = WIDE_STEPS.has(step);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-crema-base p-7">
      <div className="flex overflow-hidden rounded-[22px] bg-crema-paper shadow-raised" style={{ width: 1180, height: 748 }}>
        <div
          className="flex shrink-0 flex-col"
          style={{
            width: wide ? 196 : 412, padding: wide ? '34px 26px' : '44px 42px',
            background: 'radial-gradient(120% 70% at 50% 108%, rgba(240,168,104,.22) 0%, rgba(240,168,104,0) 62%), linear-gradient(180deg,#16162B 0%,#22224A 58%,#332F5C 100%)',
          }}
        >
          <Logo variant="wordmark-tight-crema" width={104} className="opacity-90" />

          <div className="mt-auto flex flex-col gap-4">
            <span className="font-mono text-xs uppercase tracking-eyebrow-wide text-ambar-500">Paso {step} de 8</span>
            {!wide ? (
              <>
                <span className="font-display-app text-[30px] leading-[1.12] text-crema-paper">{s.t}</span>
                <span className="text-sm leading-relaxed text-noite-suave">{s.w}</span>
              </>
            ) : null}
          </div>

          <div className="mt-6 flex gap-[5px]">
            {ONBOARDING_STEPS.map((_, i) => {
              const n = i + 1;
              const canGo = n <= maxReached && n !== step;
              return (
                <span
                  key={n}
                  onClick={() => canGo && onGoStep(n)}
                  style={{
                    width: n === step ? 26 : 7, height: 4, borderRadius: 99,
                    cursor: canGo ? 'pointer' : 'default',
                    background: n === step ? '#FBF7F0' : n < step ? '#8E87B5' : '#4A4A7A',
                  }}
                />
              );
            })}
          </div>

          {!wide && s.f ? <span className="mt-5 text-[11.5px] leading-relaxed text-[#6E6890]">{s.f}</span> : null}
        </div>

        <div className="flex min-w-0 flex-1 flex-col overflow-auto" style={{ padding: wide ? '30px 34px' : '44px 48px' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
export default OnboardingShell;
