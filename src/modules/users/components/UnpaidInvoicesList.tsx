'use client';
import { Button } from '@/components/ui/button';
import { ErrorCard } from '@components/ErrorCard';
import { LoadingState } from '@components/Loader';
import { type Invoice } from 'src/interfaces/invoice.interface';
import { formatCurrency } from 'src/lib/fomartCurrency';
import { useInvoices } from 'src/modules/users/hooks/useInvoices';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'src/shared/components/ui/card';
import { useInvoiceSelection } from 'src/shared/store/useInvoiceSelection';

export const UnpaidInvoicesList = () => {
  const { data, isPending, error } = useInvoices(1);
  const { selectedInvoices, toggleInvoice, setSelectedInvoices } =
    useInvoiceSelection();

  if (isPending)
    return <LoadingState title="Cargando facturas pendientes..." />;

  if (error !== null)
    return (
      <ErrorCard
        title="Parece que no cuenta con facturas pendientes"
        error={error}
      />
    );

  const handleInvoiceSelect = (invoice: Invoice) => {
    toggleInvoice(invoice);
  };

  const handleSelectAll = () => {
    setSelectedInvoices(data?.invoices);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Facturas por pagar</CardTitle>
        <CardDescription>
          Por favor, seleccione las facturas que desea pagar. Le recordamos que
          para poder activar su servicio debe pagar el total de las facturas
          pendientes.
        </CardDescription>
      </CardHeader>

      {/* Grid container con 3 columnas en desktop, 2 en tablet y 1 en móvil */}
      <CardContent className="grid grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {data?.invoices?.map((invoice) => {
          const isSelected = selectedInvoices.some(
            (inv) => inv.invoiceId === invoice.invoiceId,
          );

          return (
            <Card
              key={invoice.invoiceId}
              className={`cursor-pointer transition-all hover:scale-105 ${
                isSelected
                  ? 'border-primary ring-1 ring-primary'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => {
                handleInvoiceSelect(invoice);
              }}
            >
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex flex-col md:flex-row justify-between md:items-center">
                    <span className="text-sm text-gray-500">
                      Fecha de emisión:
                    </span>
                    <span className="font-medium">
                      {new Date(invoice.issueDate).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between md:items-center">
                    <span className="text-sm text-gray-500">
                      Nro de factura:
                    </span>
                    <span className="font-semibold">{invoice.invoiceId}</span>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between md:items-center">
                    <span className="text-sm text-gray-500">
                      Monto a pagar:
                    </span>
                    <span className="font-bold text-primary">
                      {formatCurrency(invoice.total)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </CardContent>

      <div className="p-4">
        <Button onClick={handleSelectAll} className="w-full">
          Seleccionar todas las facturas
        </Button>
      </div>
    </Card>
  );
};
