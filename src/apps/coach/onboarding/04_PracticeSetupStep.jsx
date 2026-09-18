import { useState } from 'react';
import { Stepper } from '../../../components/forms/Stepper';
import { Chip } from '../../../components/core/Chip';

const AGES = ['0–12 sem', '13–26 sem', '27–52 sem', '1–3 años', 'Mellizos'];
const DURATIONS = ['2 semanas', '4 semanas', '8 semanas'];

/** 04 · Cómo trabajas. Primer paso con input, y todavía sin cuenta. */
export function PracticeSetupStep({ data, onBack, onNext }) {
  const [clients, setClients] = useState(data.clients);
  const [ages, setAges] = useState(data.ages);
  const [twins, setTwins] = useState(data.twins);
  const [duration, setDuration] = useState(data.duration);

  const toggleAge = (a) => setAges((cur) => (cur.includes(a) ? cur.filter((x) => x !== a) : cur.concat([a])));

  return (
    <div className="flex h-full animate-riseIn flex-col gap-7">
      <div className="flex flex-col gap-2">
        <span className="font-display-app text-display-lg leading-tight text-tinta-fuerte">Cómo trabajas</span>
        <span className="font-ui-app text-sm leading-relaxed text-tinta-suave">Cuatro respuestas y el panel queda con tus umbrales, no con los de otra.</span>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between gap-6 rounded-md border border-crema-line bg-white px-7 py-6">
          <span className="flex flex-col gap-1">
            <span className="font-ui-app text-md font-medium text-tinta-fuerte">Casos en paralelo</span>
            <span className="font-ui-app text-sm text-tinta-tenue">Define cuándo el panel te avisa que son demasiados.</span>
          </span>
          <Stepper value={String(clients)} onDecrement={() => setClients((n) => Math.max(1, n - 1))} onIncrement={() => setClients((n) => Math.min(30, n + 1))} className="w-[150px]" />
        </div>

        <div className="flex flex-col gap-4 rounded-md border border-crema-line bg-white px-7 py-6">
          <span className="flex flex-col gap-1">
            <span className="font-ui-app text-md font-medium text-tinta-fuerte">Edades que atiendes</span>
            <span className="font-ui-app text-sm text-tinta-tenue">Son los segmentos de tus analíticas y de tus casos de éxito.</span>
          </span>
          <div className="flex flex-wrap gap-3">
            {AGES.map((a) => <Chip key={a} selected={ages.includes(a)} onClick={() => toggleAge(a)}>{a}</Chip>)}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div onClick={() => setTwins((t) => !t)}
            className={['flex cursor-pointer items-center justify-between gap-5 rounded-md border px-7 py-6 transition', twins ? 'border-[1.5px] border-violeta-600 bg-violeta-50' : 'border-crema-line bg-white'].join(' ')}>
            <span className="flex flex-col gap-1">
              <span className="font-ui-app text-md font-medium text-tinta-fuerte">Atiendes mellizos</span>
              <span className="font-ui-app text-sm leading-snug text-tinta-tenue">{twins ? 'Activa el desfase entre los dos y la comparación lado a lado.' : 'Sin desfase ni comparación: una sola línea por caso.'}</span>
            </span>
            <span className={['flex h-[27px] w-[46px] shrink-0 items-center rounded-pill p-[3px] transition', twins ? 'justify-end bg-violeta-600' : 'justify-start bg-crema-line-strong'].join(' ')}>
              <span className="h-[21px] w-[21px] rounded-pill bg-white" />
            </span>
          </div>

          <div className="flex flex-col gap-3 rounded-md border border-crema-line bg-white px-7 py-6">
            <span className="font-ui-app text-md font-medium text-tinta-fuerte">Duración típica</span>
            <div className="flex gap-1 rounded-md bg-crema-sand p-1">
              {DURATIONS.map((d) => (
                <button key={d} type="button" onClick={() => setDuration(d)}
                  className={['flex-1 whitespace-nowrap rounded-[7px] px-4 py-4 font-ui-app text-sm transition', duration === d ? 'bg-white text-tinta-fuerte shadow-card' : 'text-tinta-suave'].join(' ')}>
                  {d}
                </button>
              ))}
            </div>
            <span className="font-ui-app text-xs text-tinta-tenue">Con esto vencen los planes y se calcula tu retención.</span>
          </div>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between gap-5">
        <button type="button" onClick={onBack} className="cursor-pointer font-ui-app text-sm text-tinta-suave">← Atrás</button>
        <button type="button" onClick={() => onNext({ clients, ages, twins, duration })}
          className="cursor-pointer rounded-md bg-noche-900 px-8 py-6 font-ui-app text-base font-medium text-crema-paper">
          Seguir
        </button>
      </div>
    </div>
  );
}
export default PracticeSetupStep;
