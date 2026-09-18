import { SidePanel } from '../../../components/feedback/Modal';
import { Button } from '../../../components/core/Button';
import { Badge } from '../../../components/core/Badge';
import { ACCESS_LEVELS } from '../../../data/contract';

/**
 * 07 · Acceso (solo lectura). El nivel lo decide y lo cambia la família desde
 * su app — hoy no existe en la base real ninguna forma de que la asesora pida
 * un cambio (a diferencia del prototipo). Esta vista es informativa: explica
 * qué significa cada nivel y cuál rige para este caso. Cuando exista un
 * mecanismo real de pedido, esto se extiende sin tocar lo demás.
 */
export function AccessManagementPanel({ open, currentLevel, onClose }) {
  if (!open) return null;

  return (
    <SidePanel
      open={open} onClose={onClose} title="Acceso a este caso"
      subtitle="Lo decide la família, no vos"
      footer={<Button variant="secondary" className="w-full" onClick={onClose}>Cerrar</Button>}
    >
      {ACCESS_LEVELS.map((a) => {
        const isCurrent = currentLevel === a.id;
        return (
          <div key={a.id}
            className={['flex flex-col gap-2 rounded-lg border bg-white px-8 py-7 text-left', isCurrent ? 'border-[1.5px] border-violeta-600 bg-violeta-50' : 'border-crema-line-strong'].join(' ')}>
            <span className="flex items-center gap-4">
              <span className="font-ui-app text-md font-medium text-tinta-fuerte">{a.label}</span>
              {isCurrent ? <Badge tone="neutral">Actual</Badge> : null}
            </span>
            <span className="font-ui-app text-sm leading-normal text-tinta-tenue">{a.desc}</span>
          </div>
        );
      })}
      <span className="font-ui-app text-sm leading-relaxed text-tinta-apagada">
        La família puede cambiarlo o cortarlo en cualquier momento desde su app. Todavía no hay forma de pedirle un cambio desde acá.
      </span>
    </SidePanel>
  );
}
export default AccessManagementPanel;
