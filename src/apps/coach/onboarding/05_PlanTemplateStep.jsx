import { useState } from 'react';
import { Stepper } from '../../../components/forms/Stepper';
import { Chip } from '../../../components/core/Chip';
import { TextArea } from '../../../components/forms/TextArea';
import { PLAN_FIELDS } from '../../../data/contract';

const NUMERIC_TYPES = ['time', 'duration', 'count'];
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

/**
 * 05 · Tu plantilla de plan. Mismos campos que `04_PlanEditorScreen`: se
 * escribe una vez y alimenta el estado inicial del primer plan real que
 * publique la asesora (ver `getStartingPlan` en `04_PlanEditorScreen.jsx`).
 */
export function PlanTemplateStep({ data, onBack, onNext }) {
  const [raw, setRaw] = useState(data);
  const setField = (key, value) => setRaw((r) => ({ ...r, [key]: value }));

  return (
    <div className="flex h-full animate-riseIn flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="font-display-app text-display-lg leading-tight text-tinta-fuerte">Tu plantilla de plan</span>
        <span className="font-ui-app text-sm leading-relaxed text-tinta-suave">Lo que la familia lee. Escríbelo como lo dirías tú; cada caso nuevo arranca de acá.</span>
      </div>

      <div className="flex flex-1 flex-col gap-6 overflow-auto">
        <div className="grid grid-cols-2 gap-6">
          {PLAN_FIELDS.filter((f) => NUMERIC_TYPES.includes(f.type)).map((f) => (
            <Stepper
              key={f.key} label={f.label} value={f.format(raw[f.key])}
              onDecrement={() => setField(f.key, clamp(raw[f.key] - f.step, f.min, f.max))}
              onIncrement={() => setField(f.key, clamp(raw[f.key] + f.step, f.min, f.max))}
            />
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-ui-app text-sm text-tinta-tenue">Método de acompañamiento</span>
          <div className="flex flex-wrap gap-3">
            {PLAN_FIELDS.find((f) => f.key === 'method').options.map((m) => (
              <Chip key={m} selected={raw.method === m} onClick={() => setField('method', m)}>{m}</Chip>
            ))}
          </div>
        </div>

        <TextArea label="Guía escrita para la familia" value={raw.guide} onChange={(v) => setField('guide', v)} rows={3} />

        <div className="flex items-start gap-3 rounded-md border border-violeta-200 bg-violeta-50 px-5 py-4">
          <span className="text-xs text-violeta-600">✦</span>
          <span className="font-ui-app text-sm leading-relaxed text-tinta-cuerpo">
            Es una plantilla, no un plan. Cada familia va a necesitar algo distinto — esto solo te ahorra escribir lo mismo ocho veces.
          </span>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between gap-5">
        <button type="button" onClick={onBack} className="cursor-pointer font-ui-app text-sm text-tinta-suave">← Atrás</button>
        <button type="button" onClick={() => onNext(raw)} className="cursor-pointer rounded-md bg-noche-900 px-8 py-6 font-ui-app text-base font-medium text-crema-paper">
          Guardar plantilla
        </button>
      </div>
    </div>
  );
}
export default PlanTemplateStep;
