import { useState } from 'react';
import { DesktopShell } from '../../components/layout/DesktopShell';
import { SideNav } from '../../components/navigation/SideNav';
import { Logo } from '../../components/brand/Logo';
import { Toast } from '../../components/feedback/Toast';
import { Avatar } from '../../components/core/ListRow';
import { CoachOverviewScreen } from './screens/01_CoachOverviewScreen';
import { ClientListScreen } from './screens/02_ClientListScreen';
import { ClientDetailScreen } from './screens/03_ClientDetailScreen';
import { PlanEditorScreen } from './screens/04_PlanEditorScreen';
import { PracticeAnalyticsScreen } from './screens/06_PracticeAnalyticsScreen';
import { InviteClientModal } from './screens/08_InviteClientModal';

/**
 * Nocttua Coach — panel real contra Supabase.
 *
 * En este nav: Resumen · Clientes · Analíticas. Caso, Editor de plan,
 * gestión de acceso (solo lectura) y reporte/tarjeta de caso cuelgan del
 * detalle de un cliente, no del nav. Facturación queda afuera: no existe
 * tabla de cobros en la base real todavía — necesita una decisión de
 * producto antes de tocar el esquema.
 */
const NAV = [
  { id: 'resumen', label: 'Resumen', icon: '◈' },
  { id: 'clientes', label: 'Clientes', icon: '⚭' },
  { id: 'analiticas', label: 'Analíticas', icon: '◑' },
];

export function CoachApp({ coach, onSignOut }) {
  const [section, setSection] = useState('resumen');
  const [clientId, setClientId] = useState(null);
  const [editing, setEditing] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [refreshToken, setRefreshToken] = useState(0);
  const [toast, setToast] = useState(null);

  const say = (m) => { setToast(m); setTimeout(() => setToast(null), 2600); };

  const brand = (
    <div className="flex items-center gap-5">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-sm bg-crema-paper">
        <Logo variant="iso-noche" width={20} />
      </span>
      <span className="flex flex-col items-start leading-tight">
        <Logo variant="wordmark-tight-crema" width={86} className="mb-1" />
        <span className="font-mono text-xs uppercase tracking-eyebrow text-noite-tenue">Coach</span>
      </span>
    </div>
  );

  const footer = (
    <button type="button" onClick={onSignOut} className="flex cursor-pointer items-center gap-5 border-t border-noche-600 pt-8 text-left">
      <Avatar initial={coach.initial} tone="good" size={32} />
      <span className="flex min-w-0 flex-col">
        <span className="truncate font-ui-app text-base text-crema-paper">{coach.name || coach.email}</span>
        <span className="truncate font-ui-app text-xs text-noite-tenue">Cerrar sesión</span>
      </span>
    </button>
  );

  const nav = (
    <SideNav
      items={NAV} active={section} brand={brand} footer={footer}
      onSelect={(id) => { setSection(id); setClientId(null); setEditing(false); }}
    />
  );

  let content = null;
  if (section === 'resumen') {
    content = <CoachOverviewScreen refreshToken={refreshToken} onOpenClient={(id) => { setSection('clientes'); setClientId(id); }} onNewClient={() => setShowInvite(true)} />;
  } else if (section === 'clientes') {
    if (editing) {
      content = (
        <PlanEditorScreen
          familyId={clientId}
          onBack={() => setEditing(false)}
          onPublish={(plan) => { setEditing(false); setRefreshToken((n) => n + 1); say('Plan ' + plan.version + ' publicado'); }}
        />
      );
    } else if (clientId) {
      content = (
        <ClientDetailScreen
          familyId={clientId} refreshToken={refreshToken} coach={coach}
          onBack={() => setClientId(null)} onEditPlan={() => setEditing(true)}
        />
      );
    } else {
      content = <ClientListScreen refreshToken={refreshToken} onOpenClient={setClientId} onNewClient={() => setShowInvite(true)} />;
    }
  } else if (section === 'analiticas') {
    content = <PracticeAnalyticsScreen />;
  }

  return (
    <>
      <DesktopShell nav={nav}>{content}</DesktopShell>
      <InviteClientModal
        open={showInvite}
        onClose={() => setShowInvite(false)}
        onCreated={(invite) => { setShowInvite(false); setRefreshToken((n) => n + 1); say('Cliente nuevo creado · código ' + invite.code); }}
      />
      <Toast open={!!toast} variant="desktop">{toast}</Toast>
    </>
  );
}
export default CoachApp;
