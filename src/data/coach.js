import { supabase } from '../lib/supabase';

/**
 * Capa de datos real de Nocttua Coach contra Supabase. Reemplaza al
 * `shared/store.js` de localStorage de la ronda anterior — mismas formas de
 * pantalla donde se pudo, pero contra las tablas reales que ya usa
 * `apps/mobile` en el teléfono.
 */

async function currentUserId() {
  const { data } = await supabase.auth.getSession();
  return data.session?.user?.id ?? null;
}

/* ---------- sesión / cuenta ---------- */

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export function onAuthChange(cb) {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => cb(session));
  return () => data.subscription.unsubscribe();
}

export async function signUpCoach({ email, password, displayName }) {
  const { data, error } = await supabase.auth.signUp({ email: email.trim(), password });
  if (error) throw error;
  if (data.user) {
    const initial = displayName.trim().charAt(0).toUpperCase() || 'A';
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ role: 'coach', display_name: displayName.trim(), initial })
      .eq('id', data.user.id);
    if (profileError) throw profileError;
  }
  return data;
}

export async function signInCoach({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
  if (error) throw error;
  return data;
}

export async function signOutCoach() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getMyCoachProfile() {
  const userId = await currentUserId();
  if (!userId) return null;
  const { data, error } = await supabase.from('profiles').select('id, display_name, initial, role').eq('id', userId).single();
  if (error) throw error;
  const { data: session } = await supabase.auth.getSession();
  return { id: data.id, name: data.display_name, initial: data.initial, role: data.role, email: session.session?.user?.email ?? '' };
}

export async function updateMyCoachProfile({ displayName }) {
  const userId = await currentUserId();
  const initial = displayName.trim().charAt(0).toUpperCase() || 'A';
  const { error } = await supabase.from('profiles').update({ display_name: displayName.trim(), initial }).eq('id', userId);
  if (error) throw error;
}

/* ---------- clientes ---------- */

/** Crea la família del cliente nuevo + código real (`create_client_family`, migración 20260825140000). */
export async function createClientInvite(permissionLevel = 'reports') {
  const { data, error } = await supabase.rpc('create_client_family', { coach_requested_level: permissionLevel });
  if (error) throw error;
  const row = Array.isArray(data) ? data[0] : data;
  return { familyId: row.family_id, code: row.invite_code };
}

/** Invitaciones que la asesora generó y todavía nadie canjeó. */
export async function listMyPendingInvites() {
  const userId = await currentUserId();
  const { data, error } = await supabase
    .from('family_invites')
    .select('id, family_id, code, permission_level, created_at, expires_at')
    .eq('created_by', userId)
    .is('redeemed_at', null)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

/** Borra una invitación sin canjear y la família vacía que quedó atrás (create_client_family, migración 20260825180000). */
export async function revokeClientInvite(inviteId) {
  const { error } = await supabase.rpc('revoke_client_invite', { target_invite_id: inviteId });
  if (error) throw error;
}

/**
 * Familias donde la asesora ya es miembro Y donde ya se sumó alguien más
 * (la família real canjeó el código). `create_client_family` deja a la
 * asesora como único miembro de una família vacía hasta ese momento — sin
 * este filtro, cada "Nuevo cliente" aparecería en la lista antes de que
 * exista un cliente de verdad.
 */
export async function listMyClientFamilies() {
  const userId = await currentUserId();
  const { data: mine, error } = await supabase
    .from('family_members')
    .select('family_id, permission_level, created_at, families(babies(id, name, initial, tone, birth_date))')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  if (mine.length === 0) return [];

  const familyIds = mine.map((row) => row.family_id);
  const { data: allMembers, error: membersError } = await supabase
    .from('family_members').select('family_id').in('family_id', familyIds);
  if (membersError) throw membersError;
  const memberCounts = {};
  allMembers.forEach((m) => { memberCounts[m.family_id] = (memberCounts[m.family_id] || 0) + 1; });

  return mine
    .filter((row) => (memberCounts[row.family_id] || 0) > 1)
    .map((row) => ({
    familyId: row.family_id,
    accessLevel: row.permission_level,
    createdAt: row.created_at,
    babies: row.families?.babies ?? [],
  }));
}

/** Detalle de un caso: bebés, mi nivel de acceso, plan vigente, y una cifra real simple de actividad. */
export async function getClientDetail(familyId) {
  const userId = await currentUserId();

  const { data: membership, error: membershipError } = await supabase
    .from('family_members')
    .select('permission_level, created_at')
    .eq('family_id', familyId)
    .eq('user_id', userId)
    .maybeSingle();
  if (membershipError) throw membershipError;
  if (!membership) return null;

  const { data: babies, error: babiesError } = await supabase
    .from('babies').select('id, name, initial, tone, birth_date').eq('family_id', familyId);
  if (babiesError) throw babiesError;

  const plan = await getLatestPlan(familyId);

  // Cifra real y honesta: cuántas noches se registraron en los últimos 7 días.
  // No hay agregados más finos todavía (correlaciones, cumplimiento) — eso
  // necesita compliance()/derive.js portado a Coach, ronda siguiente.
  const since = new Date(Date.now() - 7 * 86400000).toISOString();
  const { count: recentSleepEvents, error: countError } = await supabase
    .from('events').select('id', { count: 'exact', head: true })
    .eq('family_id', familyId).eq('type', 'sleep').gte('started_at', since);
  if (countError) throw countError;

  return {
    familyId, accessLevel: membership.permission_level, createdAt: membership.created_at,
    babies: babies ?? [], plan, recentSleepEvents: recentSleepEvents ?? 0,
  };
}

/**
 * Cifras reales y simples de la práctica completa: casos activos, cómo se
 * reparten por nivel de acceso, y noches registradas en los últimos 7 días
 * sumadas entre los casos donde ese nivel permite verlas (misma regla que
 * `showFigures` en `ClientDetailScreen`: full/reports sí, plan/none no —
 * aunque RLS técnicamente deja leer los `events` de cualquier família donde
 * la asesora es miembro, no mostramos esa cifra si el nivel dice que no).
 * "Mejora media" e "ingresos" quedan afuera: necesitan el motor de sueño
 * (`apps/mobile/lib/derive.js`) y Facturación, ninguno de los dos portado.
 */
export async function getPracticeStats() {
  const clients = await listMyClientFamilies();
  const byAccess = { full: 0, reports: 0, plan: 0, none: 0 };
  clients.forEach((c) => { byAccess[c.accessLevel] = (byAccess[c.accessLevel] || 0) + 1; });

  const visibleIds = clients.filter((c) => c.accessLevel === 'full' || c.accessLevel === 'reports').map((c) => c.familyId);
  let recentSleepEvents = 0;
  if (visibleIds.length > 0) {
    const since = new Date(Date.now() - 7 * 86400000).toISOString();
    const { count, error } = await supabase
      .from('events').select('id', { count: 'exact', head: true })
      .in('family_id', visibleIds).eq('type', 'sleep').gte('started_at', since);
    if (error) throw error;
    recentSleepEvents = count ?? 0;
  }

  return { totalClients: clients.length, byAccess, recentSleepEvents, visibleClients: visibleIds.length };
}

/* ---------- plan ---------- */

/** Última versión publicada del plan (mismo shape que usa apps/mobile). */
export async function getLatestPlan(familyId) {
  const { data: version, error: versionError } = await supabase
    .from('plan_versions')
    .select('id, version_label, published_at, profiles(display_name)')
    .eq('family_id', familyId)
    .order('published_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  if (versionError) throw versionError;
  if (!version) return null;

  const { data: fields, error: fieldsError } = await supabase
    .from('plan_fields')
    .select('key, label, value, position')
    .eq('plan_version_id', version.id)
    .order('position', { ascending: true });
  if (fieldsError) throw fieldsError;

  return { id: version.id, version: version.version_label, publishedAt: version.published_at, authorName: version.profiles?.display_name ?? 'Tu asesora', fields };
}

/** Publica una versión nueva: `plan_versions` + `plan_fields`. Solo el coach vinculado puede (RLS). */
export async function publishPlan({ familyId, fields }) {
  const userId = await currentUserId();
  const previous = await getLatestPlan(familyId);
  const nextN = previous ? Number(String(previous.version).replace(/\D/g, '')) + 1 : 1;
  const versionLabel = 'v' + nextN;

  const { data: version, error: versionError } = await supabase
    .from('plan_versions')
    .insert({ family_id: familyId, coach_id: userId, version_label: versionLabel })
    .select('id, version_label, published_at')
    .single();
  if (versionError) throw versionError;

  const rows = fields.map((f, i) => ({ plan_version_id: version.id, key: f.key, label: f.label, value: f.value, position: i }));
  const { error: fieldsError } = await supabase.from('plan_fields').insert(rows);
  if (fieldsError) throw fieldsError;

  return { id: version.id, version: version.version_label, publishedAt: version.published_at };
}
