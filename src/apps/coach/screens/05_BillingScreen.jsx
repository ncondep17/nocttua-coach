import { PageHeader } from '../../../components/layout/ScreenHeader';
import { KpiRow } from '../../../components/data/KpiRow';
import { Card } from '../../../components/core/Card';
import { Button } from '../../../components/core/Button';
import { Badge } from '../../../components/core/Badge';
import { billingKpis, invoices } from '../data/mock';

/** 05 · Facturación. Cobros del mes y estado de cada factura. */
export function BillingScreen({ onNewInvoice }) {
  return (
    <>
      <PageHeader eyebrow="Agosto 2025" title="Facturación" action={<Button variant="primary" onClick={onNewInvoice}>Nueva factura</Button>} />

      <KpiRow items={billingKpis} />

      <Card compact title="Facturas recientes">
        <div className="grid grid-cols-[auto_2fr_1fr_1fr_auto] items-center gap-7 border-b border-crema-line pb-6">
          {['Nº', 'Cliente', 'Monto', 'Fecha', 'Estado'].map((h) => (
            <span key={h} className="font-mono text-xs uppercase tracking-eyebrow text-tinta-tenue">{h}</span>
          ))}
        </div>
        {invoices.map((i) => (
          <div key={i.id} className="grid grid-cols-[auto_2fr_1fr_1fr_auto] items-center gap-7 border-b border-crema-hairline py-7 last:border-0">
            <span className="font-mono text-sm text-tinta-suave">{i.id}</span>
            <span className="font-ui-app text-base text-tinta-fuerte">{i.client}</span>
            <span className="font-mono text-base text-tinta-fuerte">{i.amount}</span>
            <span className="font-ui-app text-base text-tinta-tenue">{i.date}</span>
            <Badge tone={i.tone}>{i.status}</Badge>
          </div>
        ))}
      </Card>
    </>
  );
}
export default BillingScreen;
