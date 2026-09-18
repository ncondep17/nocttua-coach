import { useEffect, useState } from 'react';
import { PageHeader } from '../../../components/layout/ScreenHeader';
import { Card } from '../../../components/core/Card';
import { Button } from '../../../components/core/Button';
import { EmptyState } from '../../../components/feedback/EmptyState';
import { Eyebrow } from '../../../components/core/Eyebrow';
import { getClientDetail } from '../../../data/coach';
import { ACCESS_LEVELS } from '../../../data/contract';
import { AccessManagementPanel } from './07_AccessManagementPanel';
import { CaseReportOverlay } from './09_CaseReportOverlay';
import { CaseCardOverlay } from './10_CaseCardOverlay';

const ACCESS_LABEL = Object.fromEntries(ACCESS_LEVELS.map((a) => [a.id, a.label]));
const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const formatDate = (iso) => { const d = new Date(iso); return d.getDate() + ' ' + MONTHS[d.getMonth()]; };
const weeksSince = (iso) => Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / (7 * 86400000)));

/**
 * 03 · Caso. Se pide por `familyId`; `getClientDetail` ya filtra por RLS —
 * si la asesora no es miembro real de esa família, Supabase no devuelve nada,
 * no hace falta un chequeo de acceso aparte acá.
 */
export function ClientDetailScreen({ familyId, refreshToken, onBack, onEditPlan, coach }) {
  const [detail, setDetail] = useState(undefined);
  const [showAccess, setShowAccess] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    setDetail(undefined);
    getClientDetail(familyId).then(setDetail);
  }, [familyId, refreshToken]);

  const BackLink = (
    <button type="button" onClick={onBack} className="flex w-fit items-center gap-5 font-ui-app text-base text-tinta-cuerpo">
      <span className="grid h-9 w-9 place-items-center rounded-pill border border-crema-line-strong bg-white">←</span>
      Clientes
    </button>
  );

  if (detail === undefined) return <>{BackLink}</>;

  if (detail === null) {
    return (
      <>
        {BackLink}
        <EmptyState title="Este caso no existe" body="El vínculo no está o no sos miembro de esta família." />
      </>
    );
  }

  const canPublishPlan = detail.accessLevel !== 'none';
  const showFigures = detail.accessLevel === 'full' || detail.accessLevel === 'reports';
  const fieldValue = (key) => detail.plan?.fields.find((f) => f.key === key)?.value || '';
  const weeks = weeksSince(detail.createdAt);
  const babyNames = detail.babies.map((b) => b.name).join(' y ') || 'Sin bebés cargados';

  return (
    <>
      {BackLink}

      <PageHeader
        eyebrow={ACCESS_LABEL[detail.accessLevel] || detail.accessLevel}
        title={babyNames}
        action={canPublishPlan ? <Button variant="primary" onClick={onEditPlan}>Editar plan</Button> : null}
      />

      <div className="grid grid-cols-[1.4fr_1fr] items-start gap-8">
        <div className="flex flex-col gap-8">
          {showFigures ? (
            <Card eyebrow="Sueño y señales" title={detail.recentSleepEvents + ' noches registradas en los últimos 7 días'}>
              <span className="font-ui-app text-base leading-relaxed text-tinta-cuerpo">
                Los patrones y correlaciones todavía no están portados a Coach — esto es la primera cifra real, directo de los registros de la família.
              </span>
            </Card>
          ) : (
            <Card surface="accent" eyebrow="Nivel de acceso" title="Sin cifras con este acceso">
              <span className="font-ui-app text-base leading-relaxed text-tinta-cuerpo">
                {detail.accessLevel === 'none'
                  ? 'La família cortó el acceso. El vínculo sigue existiendo, pero no se te entrega nada.'
                  : 'Con "Solo plan" no ves patrones ni registros de esta família, solo el plan que publicás.'}
              </span>
            </Card>
          )}

          {detail.plan ? (
            <Card surface="cream" eyebrow={'Plan vigente · ' + detail.plan.version} title="Lo que ve la família"
              action={canPublishPlan ? <Button variant="ghost" onClick={onEditPlan}>Editar</Button> : null}>
              <div className="flex flex-col gap-3">
                <span className="font-mono text-xs uppercase tracking-eyebrow text-ambar-700">{fieldValue('method')}</span>
                <span className="font-mono text-sm text-tinta-fuerte">
                  Despertar {fieldValue('wake')} · siesta {fieldValue('napStart')} (máx {fieldValue('napMax')}) · noche {fieldValue('night')} · {fieldValue('nightFeeds')} toma(s)
                </span>
                {fieldValue('guide') ? <span className="font-ui-app text-base leading-relaxed text-tinta-cuerpo">{fieldValue('guide')}</span> : null}
              </div>
            </Card>
          ) : canPublishPlan ? (
            <Card>
              <div className="flex flex-col gap-3">
                <Eyebrow>Plan</Eyebrow>
                <span className="font-ui-app text-base leading-relaxed text-tinta-cuerpo">Todavía no publicaste un plan para esta família.</span>
                <Button variant="primary" className="w-fit" onClick={onEditPlan}>Escribir el primer plan</Button>
              </div>
            </Card>
          ) : null}
        </div>

        <div className="flex flex-col gap-6">
          <Card title="Perfil">
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between gap-6">
                <span className="font-ui-app text-sm text-tinta-tenue">Nivel de acceso</span>
                <button type="button" onClick={() => setShowAccess(true)} className="cursor-pointer font-ui-app text-sm text-violeta-600">
                  {ACCESS_LABEL[detail.accessLevel] || detail.accessLevel}
                </button>
              </div>
              <div className="flex items-center justify-between gap-6">
                <span className="font-ui-app text-sm text-tinta-tenue">Cliente desde</span>
                <span className="font-ui-app text-sm text-tinta-fuerte">{formatDate(detail.createdAt)}</span>
              </div>
              <div className="flex items-center justify-between gap-6">
                <span className="font-ui-app text-sm text-tinta-tenue">Tiempo de acompañamiento</span>
                <span className="font-ui-app text-sm text-tinta-fuerte">{weeks === 1 ? '1 semana' : weeks + ' semanas'}</span>
              </div>
              {detail.babies.map((b) => (
                <div key={b.id} className="flex items-center justify-between gap-6 border-t border-crema-hairline pt-5">
                  <span className="font-ui-app text-sm text-tinta-tenue">{b.name}</span>
                  <span className="font-ui-app text-sm text-tinta-fuerte">{b.birth_date ? formatDate(b.birth_date) : 'Sin fecha'}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Documentos">
            <div className="flex flex-col gap-3">
              <button type="button" onClick={() => setShowReport(true)} className="cursor-pointer text-left font-ui-app text-sm text-violeta-600">Ver reporte de caso →</button>
              <button type="button" onClick={() => setShowCard(true)} className="cursor-pointer text-left font-ui-app text-sm text-violeta-600">Ver tarjeta de caso →</button>
            </div>
          </Card>

          <span className="font-ui-app text-xs leading-relaxed text-tinta-apagada">
            El acceso lo decide la família desde su app; acá todavía no hay forma de pedir un cambio (siguiente ronda).
          </span>
        </div>
      </div>

      <AccessManagementPanel open={showAccess} currentLevel={detail.accessLevel} onClose={() => setShowAccess(false)} />
      <CaseReportOverlay open={showReport} familyId={familyId} coach={coach} onClose={() => setShowReport(false)} />
      <CaseCardOverlay open={showCard} familyId={familyId} coach={coach} onClose={() => setShowCard(false)} />
    </>
  );
}
export default ClientDetailScreen;
