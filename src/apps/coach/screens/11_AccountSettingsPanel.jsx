import { useState } from 'react';
import { SidePanel } from '../../../components/feedback/Modal';
import { Button } from '../../../components/core/Button';
import { Eyebrow } from '../../../components/core/Eyebrow';
import { SegmentedControl } from '../../../components/forms/SegmentedControl';
import { TextField } from '../../../components/forms/TextArea';
import { listClients } from 'shared/store.js';
import { getCurrentCoach, updateCurrentCoach } from '../lib/session';
import { getSubscription, updatePaymentMethod, getPackage } from '../lib/subscription';
import { downloadCsv } from '../lib/exportCsv';
import { invoices } from '../data/mock';

const TABS = [{ id: 'perfil', label: 'Perfil' }, { id: 'suscripcion', label: 'Suscripción' }, { id: 'exportar', label: 'Exportar' }];

function ProfileTab({ onSaved }) {
  const [coach, setCoach] = useState(getCurrentCoach());
  const [saving, setSaving] = useState(false);

  function set(k, v) { setCoach((c) => ({ ...c, [k]: v })); }

  function save() {
    setSaving(true);
    updateCurrentCoach({ name: coach.name, role: coach.role, email: coach.email, initial: coach.name.trim().charAt(0).toUpperCase() || 'C' });
    setSaving(false);
    onSaved && onSaved();
  }

  return (
    <div className="flex flex-col gap-6">
      <TextField label="Nombre" value={coach.name} onChange={(v) => set('name', v)} />
      <TextField label="Rol / certificación" value={coach.role} onChange={(v) => set('role', v)} />
      <TextField label="Correo" value={coach.email} onChange={(v) => set('email', v)} />
      <Button variant="primary" onClick={save} disabled={saving}>{saving ? 'Guardando…' : 'Guardar cambios'}</Button>
    </div>
  );
}

function SubscriptionTab({ onSaved }) {
  const [sub, setSub] = useState(getSubscription());
  const [editing, setEditing] = useState(false);
  const [number, setNumber] = useState('');
  const [expiry, setExpiry] = useState('');

  function submitCard() {
    const digits = number.replace(/\D/g, '');
    if (digits.length < 4 || !expiry.trim()) return;
    const updated = updatePaymentMethod({ brand: 'Tarjeta', last4: digits.slice(-4), expiry: expiry.trim() });
    setSub(updated);
    setEditing(false);
    setNumber('');
    setExpiry('');
    onSaved && onSaved();
  }

  const pkg = getPackage(sub.tierId);
  const seatPct = Math.round((sub.seatsUsed / pkg.max) * 100);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 rounded-lg bg-noche-900 px-8 py-7">
        <Eyebrow tone="night">Plan actual</Eyebrow>
        <span className="font-display-app text-display-sm text-crema-paper">{pkg.name}</span>
        <span className="font-mono text-sm text-noite-suave">{pkg.price} / mes · próximo cobro {sub.renewsOn}</span>
        <div className="flex flex-col gap-2 border-t border-noche-600 pt-6">
          <div className="flex items-center justify-between">
            <span className="font-ui-app text-sm text-noite-suave">Cupos de clientes</span>
            <span className="font-mono text-sm text-crema-paper">{sub.seatsUsed} de {pkg.max}</span>
          </div>
          <span className="h-[6px] overflow-hidden rounded-pill bg-noche-700">
            <span style={{ width: seatPct + '%' }} className="block h-full rounded-pill bg-ambar-500" />
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Eyebrow>Método de pago</Eyebrow>
        <div className="flex items-center justify-between rounded-lg border border-crema-line-strong bg-white px-7 py-6">
          <span className="font-ui-app text-base text-tinta-fuerte">{sub.paymentMethod.brand} •••• {sub.paymentMethod.last4}</span>
          <span className="font-mono text-sm text-tinta-tenue">vence {sub.paymentMethod.expiry}</span>
        </div>
        {editing ? (
          <div className="flex flex-col gap-4 rounded-lg border border-crema-line bg-crema-paper px-7 py-6">
            <TextField label="Número de tarjeta" mono value={number} onChange={setNumber} placeholder="4242 4242 4242 4242" />
            <TextField label="Vencimiento" mono value={expiry} onChange={setExpiry} placeholder="MM/AA" />
            <div className="flex gap-4">
              <Button variant="secondary" className="flex-1" onClick={() => setEditing(false)}>Cancelar</Button>
              <Button variant="primary" className="flex-1" onClick={submitCard}>Guardar</Button>
            </div>
          </div>
        ) : (
          <Button variant="secondary" onClick={() => setEditing(true)}>Cambiar método de pago</Button>
        )}
      </div>
    </div>
  );
}

function ExportTab({ onCsv, onOpenPractice }) {
  const coach = getCurrentCoach();

  async function exportClients() {
    const clients = await listClients(coach.id);
    const rows = [
      ['Familia (correo)', 'Nivel de acceso', 'Estado', 'Plan vigente'],
      ...clients.map((c) => [c.email || 'Sin correo', c.accessLevel, c.status, c.plan ? c.plan.version : 'Sin publicar']),
    ];
    downloadCsv('nocttua-clientes.csv', rows);
    onCsv && onCsv('clientes');
  }

  function exportInvoices() {
    const rows = [['Nº', 'Cliente', 'Monto', 'Fecha', 'Estado'], ...invoices.map((i) => [i.id, i.client, i.amount, i.date, i.status])];
    downloadCsv('nocttua-facturacion.csv', rows);
    onCsv && onCsv('facturación');
  }

  return (
    <div className="flex flex-col gap-5">
      <span className="font-ui-app text-sm leading-relaxed text-tinta-tenue">Descargá tu información en el formato que necesites.</span>

      <div className="flex flex-col gap-3 rounded-lg border border-crema-line bg-white px-7 py-6">
        <span className="font-ui-app text-md font-medium text-tinta-fuerte">Clientes (CSV)</span>
        <span className="font-ui-app text-sm text-tinta-tenue">Familia, nivel de acceso, estado y plan vigente de cada vínculo.</span>
        <Button variant="secondary" className="w-fit" onClick={exportClients}>Descargar CSV</Button>
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-crema-line bg-white px-7 py-6">
        <span className="font-ui-app text-md font-medium text-tinta-fuerte">Facturación (CSV)</span>
        <span className="font-ui-app text-sm text-tinta-tenue">Facturas emitidas, monto, fecha y estado.</span>
        <Button variant="secondary" className="w-fit" onClick={exportInvoices}>Descargar CSV</Button>
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-violeta-200 bg-violeta-50 px-7 py-6">
        <span className="font-ui-app text-md font-medium text-tinta-fuerte">Resultados de tu práctica (PDF)</span>
        <span className="font-ui-app text-sm leading-relaxed text-tinta-tenue">
          Un resumen de una hoja con tus cifras agregadas, listo para mostrar como caso de éxito propio ante clientes nuevos.
        </span>
        <Button variant="primary" className="w-fit" onClick={onOpenPractice}>Generar PDF</Button>
      </div>
    </div>
  );
}

/** 11 · Tu cuenta. Perfil, suscripción/método de pago y exportación de datos. */
export function AccountSettingsPanel({ open, onClose, onToast, onOpenPractice }) {
  const [tab, setTab] = useState('perfil');

  return (
    <SidePanel open={open} onClose={onClose} title="Tu cuenta" width={440}>
      <SegmentedControl items={TABS} active={tab} onSelect={setTab} />
      {tab === 'perfil' ? <ProfileTab onSaved={() => onToast && onToast('Perfil actualizado')} /> : null}
      {tab === 'suscripcion' ? <SubscriptionTab onSaved={() => onToast && onToast('Método de pago actualizado')} /> : null}
      {tab === 'exportar' ? (
        <ExportTab
          onCsv={(what) => onToast && onToast('Descargando ' + what + '…')}
          onOpenPractice={() => { onClose(); onOpenPractice && onOpenPractice(); }}
        />
      ) : null}
    </SidePanel>
  );
}
export default AccountSettingsPanel;
