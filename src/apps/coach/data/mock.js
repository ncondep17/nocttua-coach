/** Datos de ejemplo de Nocttua Coach. Reemplazar por la API real. */

export const coach = { name: 'Carolina S.', role: 'Asesora de sueño certificada', initial: 'C', code: 'CRS-2481' };

export const overviewKpis = [
  { label: 'Clientes activos', value: '14', display: true },
  { label: 'Planes por revisar', value: '3', tone: 'accent' },
  { label: 'Adherencia media', value: '78%', tone: 'success' },
  { label: 'Ingresos del mes', value: '$2.940' },
];

export const attention = [
  { id: 1, name: 'Familia Ruiz · Emilia y Julieta', reason: 'Tres noches sin registro', tone: 'warning', badge: 'Sin datos' },
  { id: 2, name: 'Familia Mora · Tomás', reason: 'Adherencia cayó a 41%', tone: 'danger', badge: 'Baja' },
  { id: 3, name: 'Familia Peña · Lucía', reason: 'Plan v2 vence mañana', tone: 'accent', badge: 'Revisar' },
];

export const clients = [
  { id: 'ruiz', family: 'Familia Ruiz', babies: 'Emilia y Julieta · 19 sem', status: 'activo', adherence: 82, plan: 'v3', paid: true },
  { id: 'mora', family: 'Familia Mora', babies: 'Tomás · 31 sem', status: 'activo', adherence: 41, plan: 'v2', paid: true },
  { id: 'pena', family: 'Familia Peña', babies: 'Lucía · 11 sem', status: 'activo', adherence: 76, plan: 'v2', paid: false },
  { id: 'diaz', family: 'Familia Díaz', babies: 'Mateo y Sofía · 26 sem', status: 'pausa', adherence: 58, plan: 'v1', paid: true },
  { id: 'soto', family: 'Familia Soto', babies: 'Valentina · 44 sem', status: 'cerrado', adherence: 91, plan: 'v4', paid: true },
];

export const clientDetail = {
  id: 'ruiz', family: 'Familia Ruiz', babies: 'Emilia y Julieta · 19 semanas',
  since: 'Cliente desde el 2 de julio', contact: 'ruiz@correo.com',
  kpis: [
    { label: 'Sueño nocturno', value: '8,4 h' },
    { label: 'Adherencia', value: '82%', tone: 'success' },
    { label: 'Despertares', value: '1,4', hint: 'Promedio por noche' },
    { label: 'Desfase', value: '15 min' },
  ],
  nights: [
    { label: 'L', value: 8.2, display: '8,2' }, { label: 'M', value: 7.4, display: '7,4' },
    { label: 'M', value: 9.1, display: '9,1' }, { label: 'J', value: 8.8, display: '8,8' },
    { label: 'V', value: 6.9, display: '6,9' }, { label: 'S', value: 9.4, display: '9,4' },
    { label: 'D', value: 9.1, display: '9,1' },
  ],
  signals: [
    { label: 'Siestas en cuna', value: '68%', pct: 68, tone: 'accent' },
    { label: 'Ventanas respetadas', value: '82%', pct: 82, tone: 'success' },
    { label: 'Noches con desfase > 30 min', value: '2 de 7', pct: 28, tone: 'warning' },
  ],
  planVersion: 'v3 · 12 ago',
  planFields: [
    { key: 'objetivo', label: 'Objetivo de estas dos semanas', value: 'Llevar las dos siestas largas a la cuna y sostener el bloque nocturno de 9 h.' },
    { key: 'ventanas', label: 'Ventanas por edad', value: '1h 45m — 2h 15m' },
    { key: 'rutina', label: 'Rutina de noche', value: 'Baño 18:40 · toma 19:00 · luz baja y cuna 19:25' },
    { key: 'nocturna', label: 'Toma nocturna', value: 'Una sola, alineando a las dos, entre 02:00 y 03:30' },
    { key: 'evitar', label: 'Qué no hacer', value: 'No estirar la vigilia para “cansarlas”: sale al revés.' },
  ],
};

export const accessLevels = [
  { id: 'full', label: 'Acceso total', desc: 'Ve registros, patrones y edita el plan.' },
  { id: 'reports', label: 'Solo reportes', desc: 'Ve patrones agregados, no el registro crudo.' },
  { id: 'plan', label: 'Solo plan', desc: 'Puede dejar el plan, sin ver datos.' },
  { id: 'none', label: 'Sin acceso', desc: 'Queda la relación, se corta la lectura.' },
];

export const billingKpis = [
  { label: 'Cobrado este mes', value: '$2.940' },
  { label: 'Pendiente', value: '$480', tone: 'danger' },
  { label: 'Ticket medio', value: '$210' },
  { label: 'Renovaciones', value: '9' },
];

export const invoices = [
  { id: 'F-104', client: 'Familia Ruiz', amount: '$210', date: '12 ago', status: 'Pagado', tone: 'success' },
  { id: 'F-103', client: 'Familia Mora', amount: '$180', date: '10 ago', status: 'Pagado', tone: 'success' },
  { id: 'F-102', client: 'Familia Peña', amount: '$240', date: '8 ago', status: 'Pendiente', tone: 'warning' },
  { id: 'F-101', client: 'Familia Díaz', amount: '$210', date: '2 ago', status: 'Pagado', tone: 'success' },
];

export const practiceKpis = [
  { label: 'Clientes atendidos', value: '38', display: true },
  { label: 'Retención a 8 sem', value: '71%', tone: 'success' },
  { label: 'Mejora media noche', value: '+1,6 h', tone: 'success' },
  { label: 'Altas del mes', value: '5' },
];

export const outcomeByAge = [
  { label: '0-12 sem', value: '+0,9 h', pct: 45, tone: 'accent' },
  { label: '13-26 sem', value: '+1,8 h', pct: 78, tone: 'success' },
  { label: '27-52 sem', value: '+1,4 h', pct: 62, tone: 'accent' },
  { label: 'Mellizos', value: '+2,1 h', pct: 88, tone: 'success' },
];

export const monthlyRevenue = [
  { label: 'Mar', value: 1820 }, { label: 'Abr', value: 2100 }, { label: 'May', value: 2380 },
  { label: 'Jun', value: 2240 }, { label: 'Jul', value: 2760 }, { label: 'Ago', value: 2940 },
];
