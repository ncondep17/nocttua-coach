import { useState } from 'react';
import { ACCESS_LEVELS } from '../../../data/contract';

const SEES = {
  full: 'Cada registro de sueño y toma, los patrones de la semana y el detalle de cada noche.',
  reports: 'Los agregados de la semana y las señales, sin el registro noche por noche.',
  plan: 'Nada de su registro. Escribes el plan a ciegas, con lo que te cuente en sesión.',
  none: 'Nada. La familia sigue vinculada pero no compartes datos.',
};

/**
 * 06 · Qué ve cada una. El nivel que se propone por defecto en cada invitación
 * nueva (ver `defaultAccessLevel` en `08_FirstClientStep.jsx` / `InviteClientModal`).
 * La familia decide el nivel real al canjear el código — esto es solo la propuesta.
 */
export function AccessDefaultsStep({ data, onBack, onNext }) {
  const [access, setAccess] = useState(data);

  return (
    <div className="flex h-full animate-riseIn flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="font-display-app text-display-lg leading-tight text-tinta-fuerte">Qué ve cada una</span>
        <span className="font-ui-app text-sm leading-relaxed text-tinta-suave">El acceso que le vas a pedir a cada familia nueva. Ella decide y puede revocarlo cuando quiera.</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {ACCESS_LEVELS.map((a) => {
          const on = access === a.id;
          return (
            <button key={a.id} type="button" onClick={() => setAccess(a.id)}
              className={['flex flex-col gap-2 rounded-md border px-7 py-6 text-left transition', on ? 'border-[1.5px] border-violeta-600 bg-violeta-50' : 'border-crema-line bg-white'].join(' ')}>
              <span className="flex items-baseline justify-between gap-3">
                <span className="font-ui-app text-md font-medium text-tinta-fuerte">{a.label}</span>
                <span className={on ? 'text-sm text-violeta-600' : 'text-sm text-transparent'}>✓</span>
              </span>
              <span className="font-ui-app text-sm leading-relaxed text-tinta-tenue">{a.desc}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2 rounded-md bg-noche-900 px-7 py-6">
          <span className="font-mono text-xs uppercase tracking-eyebrow text-ambar-500">Lo que tú ves</span>
          <span className="font-ui-app text-sm leading-relaxed text-violeta-200">{SEES[access]}</span>
        </div>
        <div className="flex flex-col gap-2 rounded-md border border-crema-line bg-white px-7 py-6">
          <span className="font-mono text-xs uppercase tracking-eyebrow text-tinta-tenue">Lo que ve la familia</span>
          <span className="font-ui-app text-sm leading-relaxed text-tinta-cuerpo">Tu nombre, tu rol y el plan que publicas. Nunca tus notas internas ni tus otros casos.</span>
        </div>
      </div>

      <span className="font-ui-app text-sm leading-relaxed text-tinta-tenue">La receta de medicinas se ve, no se edita: es dato clínico de la familia.</span>

      <div className="mt-auto flex items-center justify-between gap-5">
        <button type="button" onClick={onBack} className="cursor-pointer font-ui-app text-sm text-tinta-suave">← Atrás</button>
        <button type="button" onClick={() => onNext(access)} className="cursor-pointer rounded-md bg-noche-900 px-8 py-6 font-ui-app text-base font-medium text-crema-paper">
          Seguir
        </button>
      </div>
    </div>
  );
}
export default AccessDefaultsStep;
