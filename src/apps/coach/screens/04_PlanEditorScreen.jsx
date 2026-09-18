import { useEffect, useState } from 'react';
import { PageHeader } from '../../../components/layout/ScreenHeader';
import { Card } from '../../../components/core/Card';
import { Button } from '../../../components/core/Button';
import { Chip } from '../../../components/core/Chip';
import { Eyebrow } from '../../../components/core/Eyebrow';
import { EmptyState } from '../../../components/feedback/EmptyState';
import { Stepper } from '../../../components/forms/Stepper';
import { TextArea } from '../../../components/forms/TextArea';
import { getClientDetail, publishPlan } from '../../../data/coach';
import { PLAN_FIELDS, PLAN_DEFAULTS } from '../../../data/contract';

const NUMERIC_TYPES = ['time', 'duration', 'count'];
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

function rawFromExisting(existingFields) {
  const byKey = Object.fromEntries((existingFields || []).map((f) => [f.key, f.value]));
  const raw = { ...PLAN_DEFAULTS };
  PLAN_FIELDS.forEach((f) => {
    if (byKey[f.key] === undefined) return;
    if (f.type === 'choice' || f.type === 'text') { raw[f.key] = byKey[f.key]; return; }
    // los numéricos vienen ya formateados en `plan_fields.value` (texto para
    // la família) — al reabrir el editor, sirven de referencia visual pero
    // el stepper arranca del default hasta que haya un campo `raw` real
    // (mismo hueco que dejamos con `plan_thresholds`, ronda siguiente).
  });
  return raw;
}

const BackLink = ({ onBack, label }) => (
  <button type="button" onClick={onBack} className="flex w-fit items-center gap-5 font-ui-app text-base text-tinta-cuerpo">
    <span className="grid h-9 w-9 place-items-center rounded-pill border border-crema-line-strong bg-white">←</span>
    {label}
  </button>
);

/**
 * 04 · Editor del plan. Publica de verdad en `plan_versions`/`plan_fields`.
 * Los campos numéricos no tienen todavía un valor "crudo" persistido del
 * lado del servidor (`plan_fields.value` es el texto ya formateado para la
 * família) — al reabrir el editor de un plan ya publicado, los steppers
 * arrancan de la plantilla por defecto en vez del valor exacto anterior.
 * Se resuelve agregando una columna `raw_value` en una migración chica.
 */
export function PlanEditorScreen({ familyId, onBack, onPublish }) {
  const [state, setState] = useState(undefined);
  const [raw, setRaw] = useState(PLAN_DEFAULTS);
  const [publishing, setPublishing] = useState(false);

  useEffect(() => {
    setState(undefined);
    getClientDetail(familyId).then((detail) => {
      if (!detail) { setState(null); return; }
      setState({ email: detail.babies.map((b) => b.name).join(' y ') || 'Cliente', previousVersion: detail.plan?.version || null });
      setRaw(rawFromExisting(detail.plan?.fields));
    });
  }, [familyId]);

  const setField = (key, value) => setRaw((r) => ({ ...r, [key]: value }));

  async function handlePublish() {
    if (!state) return;
    setPublishing(true);
    const fields = PLAN_FIELDS.map((f) => ({
      key: f.key, label: f.label,
      value: f.type === 'choice' || f.type === 'text' ? raw[f.key] : f.format(raw[f.key]),
    }));
    const plan = await publishPlan({ familyId, fields });
    setPublishing(false);
    onPublish && onPublish(plan);
  }

  if (state === undefined) return <BackLink onBack={onBack} label="Clientes" />;
  if (state === null) {
    return (
      <>
        <BackLink onBack={onBack} label="Clientes" />
        <EmptyState title="Este cliente no existe" body="El vínculo no está o no sos miembro de esta família." />
      </>
    );
  }

  return (
    <>
      <BackLink onBack={onBack} label={state.email} />

      <PageHeader
        eyebrow={state.previousVersion ? 'Nueva versión · reemplaza ' + state.previousVersion : 'Primera versión de este plan'}
        title="Plan de sueño"
        action={
          <div className="flex gap-5">
            <Button variant="secondary" onClick={onBack} disabled={publishing}>Descartar</Button>
            <Button variant="primary" onClick={handlePublish} disabled={publishing}>
              {publishing ? 'Publicando…' : 'Publicar a la família'}
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-[1.4fr_1fr] items-start gap-8">
        <Card>
          <div className="grid grid-cols-2 gap-8">
            {PLAN_FIELDS.filter((f) => NUMERIC_TYPES.includes(f.type)).map((f) => (
              <Stepper
                key={f.key} label={f.label} value={f.format(raw[f.key])}
                onDecrement={() => setField(f.key, clamp(raw[f.key] - f.step, f.min, f.max))}
                onIncrement={() => setField(f.key, clamp(raw[f.key] + f.step, f.min, f.max))}
              />
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <span className="font-ui-app text-sm text-tinta-tenue">Método de acompañamiento</span>
            <div className="flex flex-wrap gap-3">
              {PLAN_FIELDS.find((f) => f.key === 'method').options.map((m) => (
                <Chip key={m} selected={raw.method === m} onClick={() => setField('method', m)}>{m}</Chip>
              ))}
            </div>
          </div>

          <TextArea label="Guía escrita para la família" value={raw.guide} onChange={(v) => setField('guide', v)} rows={4} />
        </Card>

        <Card surface="night" title="Cómo lo ve la família" eyebrow="Vista previa">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-eyebrow text-ambar-500">{raw.method}</span>
            <span className="font-mono text-sm text-crema-paper">
              Despertar {PLAN_FIELDS[0].format(raw.wake)} · siesta {PLAN_FIELDS[1].format(raw.napStart)} (máx {PLAN_FIELDS[2].format(raw.napMax)}) · noche {PLAN_FIELDS[3].format(raw.night)} · {raw.nightFeeds} toma(s)
            </span>
            {raw.guide ? <span className="font-ui-app text-base leading-relaxed text-noite-fuerte">{raw.guide}</span> : null}
          </div>
          <div className="flex flex-col gap-3 border-t border-noche-600 pt-7">
            <Eyebrow tone="night">Al publicar</Eyebrow>
            <span className="font-ui-app text-sm leading-relaxed text-noite-suave">La família ve la versión nueva la próxima vez que abra la app.</span>
          </div>
        </Card>
      </div>
    </>
  );
}
export default PlanEditorScreen;
