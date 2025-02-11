'use client';
import { Button } from '@/components/ui/button';
import { ErrorCard } from '@components/ErrorCard';
import { LoadingState } from '@components/Loader';
import { MoreVertical } from 'lucide-react';
import { Card } from 'src/shared/components/ui/card';
import { useInvoices } from '../hooks/useInvoices';

interface InvoicesListProps {
  status?: number;
  title: string;
}

export const InvoicesList = ({ status, title }: InvoicesListProps) => {
  const { data, isPending, error } = useInvoices(status);

  if (isPending) return <LoadingState title="Cargando facturas pagadas..." />;

  if (error !== null) return <ErrorCard error={error} />;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency,
    }).format(amount);
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>

      <div className="">
        {data?.invoices.map((invoice) => (
          <div
            key={invoice.invoiceId}
            className="flex justify-between items-center border-t"
          >
            <div className="text-sm">{formatDate(invoice.dueDate)}</div>

            <div className="text-sm font-medium">
              {formatCurrency(invoice.total)}
            </div>

            <Button variant="ghost" size="icon">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      {data?.invoices.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No hay facturas disponibles
        </div>
      )}
    </Card>
  );
};
