import { useEffect, useState } from 'react';
import { PageHeader } from '../../../components/layout/ScreenHeader';
import { KpiRow } from '../../../components/data/KpiRow';
import { Card } from '../../../components/core/Card';
import { Button } from '../../../components/core/Button';
import { Badge } from '../../../components/core/Badge';
import { ListRow, Avatar } from '../../../components/core/ListRow';
import { EmptyState } from '../../../components/feedback/EmptyState';
import { listMyClientFamilies, listMyPendingInvites } from '../../../data/coach';
import { ACCESS_LEVELS } from '../../../data/contract';

const ACCESS_LABEL = Object.fromEntries(ACCESS_LEVELS.map((a) => [a.id, a.label]));

/**
 * 01 · Resumen. Todo lo que se ve acá sale de Supabase de verdad — nada de
 * "Qué revisar hoy" ni "Ingresos" de la ronda de prototipo: esos necesitan
 * agregados de sueño y facturación reales que todavía no están cableados.
 */
export function CoachOverviewScreen({ refreshToken, onOpenClient, onNewClient }) {
  const [clients, setClients] = useState(undefined);
  const [invites, setInvites] = useState(undefined);

  useEffect(() => {
    listMyClientFamilies().then(setClients);
    listMyPendingInvites().then(setInvites);
  }, [refreshToken]);

  const loaded = clients !== undefined && invites !== undefined;

  return (
    <>
      <PageHeader eyebrow="Tu práctica" title="Resumen" action={<Button variant="primary" onClick={onNewClient}>Nuevo cliente</Button>} />

      <KpiRow items={[
        { label: 'Clientes', value: loaded ? String(clients.length) : '…', display: true },
        { label: 'Invitaciones pendientes', value: loaded ? String(invites.length) : '…', tone: invites?.length ? 'accent' : 'default' },
      ]} columns={2} />

      {!loaded ? null : clients.length === 0 && invites.length === 0 ? (
        <EmptyState
          eyebrow="Todavía nada"
          title="Ningún cliente todavía"
          body="Creá tu primer cliente para generar un código real y compartirlo."
          action={<Button variant="primary" onClick={onNewClient}>Nuevo cliente</Button>}
        />
      ) : (
        <div className="grid grid-cols-[1.3fr_1fr] gap-8">
          <Card title="Tus clientes" eyebrow={clients.length + ' en total'}>
            {clients.length === 0 ? (
              <span className="font-ui-app text-sm text-tinta-tenue">Ninguno canjeó su código todavía.</span>
            ) : (
              <div className="flex flex-col gap-4">
                {clients.map((c) => (
                  <ListRow
                    key={c.familyId}
                    leading={<Avatar initial={(c.babies[0]?.initial) || '?'} tone={c.babies[0]?.tone === 'b' ? 'b' : 'a'} />}
                    title={c.babies.map((b) => b.name).join(' y ') || 'Sin bebés cargados'}
                    subtitle={ACCESS_LABEL[c.accessLevel] || c.accessLevel}
                    onClick={() => onOpenClient(c.familyId)}
                  />
                ))}
              </div>
            )}
          </Card>

          <Card title="Invitaciones pendientes" eyebrow={invites.length + ' sin canjear'}>
            {invites.length === 0 ? (
              <span className="font-ui-app text-sm text-tinta-tenue">Ninguna por ahora.</span>
            ) : (
              <div className="flex flex-col gap-4">
                {invites.map((inv) => (
                  <div key={inv.id} className="flex items-center justify-between gap-4">
                    <span className="font-mono text-sm tracking-[.08em] text-tinta-fuerte">{inv.code}</span>
                    <Badge tone="accent">Sin canjear</Badge>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      )}
    </>
  );
}
export default CoachOverviewScreen;
