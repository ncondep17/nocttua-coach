import { useEffect, useState } from 'react';
import { Modal } from '../../../components/feedback/Modal';
import { Button } from '../../../components/core/Button';
import { Eyebrow } from '../../../components/core/Eyebrow';
import { createClientInvite } from '../../../data/coach';

/**
 * 08 · Nuevo cliente. Distinto de la ronda de prototipo: acá no hay campo de
 * correo — `family_invites` no tiene esa columna. El código es real
 * (`create_client_family`) y listo para compartir por fuera de la app
 * (WhatsApp, texto), igual que hace hoy `apps/mobile`'s TeamScreen con los
 * códigos de niñera.
 */
export function InviteClientModal({ open, onClose, onCreated }) {
  const [creating, setCreating] = useState(false);
  const [invite, setInvite] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) { setInvite(null); setError(''); setCreating(false); }
  }, [open]);

  async function handleCreate() {
    setCreating(true);
    setError('');
    try {
      const created = await createClientInvite('reports');
      setInvite(created);
    } catch (err) {
      setError(err.message || 'No se pudo crear el cliente.');
    } finally {
      setCreating(false);
    }
  }

  function handleCopy() {
    if (invite) navigator.clipboard?.writeText(invite.code);
  }

  if (invite) {
    return (
      <Modal
        open={open} onClose={onClose} title="Cliente creado"
        subtitle="Compartí este código con la família — al ponerlo en su app, el caso queda vinculado a tu panel con acceso total para ellos."
        footer={<Button variant="primary" className="flex-1" onClick={() => onCreated && onCreated(invite)}>Listo</Button>}
      >
        <div className="flex flex-col gap-3 rounded-lg bg-crema-paper px-8 py-7">
          <Eyebrow>Código de esta invitación</Eyebrow>
          <div className="flex items-center justify-between gap-5">
            <span className="font-mono text-display-sm tracking-[.1em] text-tinta-fuerte">{invite.code}</span>
            <Button variant="ghost" size="sm" onClick={handleCopy}>Copiar</Button>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      open={open} onClose={onClose} title="Nuevo cliente"
      subtitle="Se crea un código de un solo uso. Se lo pasás a la família por el medio que quieras — al ponerlo en su app, el caso aparece acá."
      footer={
        <>
          <Button variant="secondary" className="flex-1" onClick={onClose} disabled={creating}>Cancelar</Button>
          <Button variant="primary" className="flex-1" onClick={handleCreate} disabled={creating}>
            {creating ? 'Creando…' : 'Crear cliente'}
          </Button>
        </>
      }
    >
      {error ? <span className="font-ui-app text-sm text-coral-700">{error}</span> : null}
    </Modal>
  );
}
export default InviteClientModal;
