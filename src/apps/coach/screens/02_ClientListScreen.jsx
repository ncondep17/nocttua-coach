import { useEffect, useState } from 'react';
import { PageHeader } from '../../../components/layout/ScreenHeader';
import { Card } from '../../../components/core/Card';
import { Button } from '../../../components/core/Button';
import { Badge } from '../../../components/core/Badge';
import { EmptyState } from '../../../components/feedback/EmptyState';
import { Avatar } from '../../../components/core/ListRow';
import { listMyClientFamilies, listMyPendingInvites, revokeClientInvite } from '../../../data/coach';
import { ACCESS_LEVELS } from '../../../data/contract';

const ACCESS_LABEL = Object.fromEntries(ACCESS_LEVELS.map((a) => [a.id, a.label]));

/** 02 · Clientes. Família real (canjeó el código) o invitación real sin canjear — sin datos de ejemplo. */
export function ClientListScreen({ refreshToken, onOpenClient, onNewClient }) {
  const [clients, setClients] = useState(undefined);
  const [invites, setInvites] = useState(undefined);
  const [revoking, setRevoking] = useState(null);

  useEffect(() => {
    listMyClientFamilies().then(setClients);
    listMyPendingInvites().then(setInvites);
  }, [refreshToken]);

  async function handleRevoke(inviteId) {
    setRevoking(inviteId);
    try {
      await revokeClientInvite(inviteId);
      setInvites((prev) => prev.filter((i) => i.id !== inviteId));
    } finally {
      setRevoking(null);
    }
  }

  if (clients === undefined || invites === undefined) return null;

  return (
    <>
      <PageHeader eyebrow={clients.length + ' clientes'} title="Clientes" action={<Button variant="primary" onClick={onNewClient}>Nuevo cliente</Button>} />

      {invites.length > 0 ? (
        <Card title="Invitaciones pendientes" eyebrow={invites.length + ' sin canjear'}>
          <div className="flex flex-col gap-4">
            {invites.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between gap-4 rounded-lg border border-crema-line bg-white px-8 py-7">
                <span className="font-mono text-base tracking-[.08em] text-tinta-fuerte">{inv.code}</span>
                <span className="flex items-center gap-4">
                  <Badge tone="accent">{ACCESS_LABEL[inv.permission_level] || inv.permission_level}</Badge>
                  <button type="button" onClick={() => handleRevoke(inv.id)} disabled={revoking === inv.id}
                    className="cursor-pointer font-ui-app text-sm text-coral-700 disabled:cursor-default disabled:text-tinta-apagada">
                    {revoking === inv.id ? 'Revocando…' : 'Revocar'}
                  </button>
                </span>
              </div>
            ))}
          </div>
        </Card>
      ) : null}

      {clients.length === 0 ? (
        <EmptyState
          eyebrow="Todavía nada"
          title="Ninguna família canjeó tu código todavía"
          body="En cuanto una família use el código de una invitación, va a aparecer acá."
          action={<Button variant="primary" onClick={onNewClient}>Invitar cliente</Button>}
        />
      ) : (
        <Card compact>
          <div className="grid grid-cols-[2fr_1fr_1fr] items-center gap-7 border-b border-crema-line pb-6">
            {['Família', 'Bebés', 'Acceso'].map((h) => (
              <span key={h} className="font-mono text-xs uppercase tracking-eyebrow text-tinta-tenue">{h}</span>
            ))}
          </div>
          {clients.map((c) => (
            <div key={c.familyId} onClick={() => onOpenClient(c.familyId)}
              className="grid cursor-pointer grid-cols-[2fr_1fr_1fr] items-center gap-7 border-b border-crema-hairline py-7 transition last:border-0 hover:bg-crema-paper">
              <span className="flex items-center gap-5">
                <Avatar initial={c.babies[0]?.initial || '?'} tone={c.babies[0]?.tone === 'b' ? 'b' : 'a'} size={30} />
                <span className="font-ui-app text-base font-medium text-tinta-fuerte">{c.babies.map((b) => b.name).join(' y ') || 'Sin bebés cargados'}</span>
              </span>
              <span className="font-ui-app text-base text-tinta-cuerpo">{c.babies.map((b) => b.tone).join('/') || '—'}</span>
              <Badge tone="neutral">{ACCESS_LABEL[c.accessLevel] || c.accessLevel}</Badge>
            </div>
          ))}
        </Card>
      )}
    </>
  );
}
export default ClientListScreen;
