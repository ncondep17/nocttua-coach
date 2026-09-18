import { PACKAGES } from '../lib/subscription';

const LINES = [
  { n: '01', t: 'Registro continuo de la familia: sueño, tomas y despertares, sin cuadernos ni memoria.' },
  { n: '02', t: 'Patrones por caso y agregados de tu práctica: qué método te está funcionando de verdad.' },
  { n: '03', t: 'Reporte de cierre y tarjeta de caso: la prueba de tu trabajo, lista para mostrar.' },
];

/** 01 · Bienvenida. Sin formulario y sin login. */
export function WelcomeStep({ onNext, onSkipToApp }) {
  return (
    <div className="flex h-full max-w-[560px] animate-riseIn flex-col justify-center gap-8">
      <span className="font-mono text-xs uppercase tracking-eyebrow-wide text-ambar-700">Para asesoras de sueño</span>
      <span className="font-display-app text-display-xl leading-tight text-tinta-fuerte">Tu trabajo, por fin con datos que puedes mostrar.</span>
      <span className="font-ui-app text-lg leading-relaxed text-tinta-cuerpo">
        Ves lo que la familia registra de verdad — no lo que recuerda — y dejas el plan donde ya lo están mirando.
      </span>

      <div className="flex flex-col gap-4 border-t border-crema-line pt-7">
        {LINES.map((l) => (
          <div key={l.n} className="flex items-start gap-4">
            <span className="pt-[2px] font-mono text-xs text-violeta-600">{l.n}</span>
            <span className="font-ui-app text-md leading-relaxed text-tinta-fuerte">{l.t}</span>
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center gap-6">
        <button type="button" onClick={onNext} className="cursor-pointer rounded-md bg-noche-900 px-9 py-6 font-ui-app text-md font-medium text-crema-paper">
          Ver cómo funciona
        </button>
        <button type="button" onClick={onSkipToApp} className="cursor-pointer font-ui-app text-sm text-tinta-suave">Ya tengo cuenta</button>
      </div>
      <span className="font-ui-app text-sm text-tinta-tenue">
        Gratis hasta tu primer cliente. Después, desde {PACKAGES[0].price} al mes. No pedimos tarjeta para mirar.
      </span>
    </div>
  );
}
export default WelcomeStep;
