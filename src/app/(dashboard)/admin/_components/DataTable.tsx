'use client';

import { Badge } from '@components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import { ScrollArea } from '@components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { type ITransaction } from '@interfaces/transactions';
import { format } from 'date-fns';
import { useState } from 'react';

interface DataTableProps {
  data: ITransaction[];
}

export const DataTable = (props: DataTableProps) => {
  const { data } = props;
  const [selectedTransaction, setSelectedTransaction] =
    useState<ITransaction | null>(null);

  const handleViewDetails = (transaction: ITransaction) => {
    setSelectedTransaction(transaction);
  };

  const handleCloseModal = () => {
    setSelectedTransaction(null);
  };

  console.log('data: ', data);

  return (
    <div className="flex flex-col h-[calc(100vh-17rem)] ">
      <div className="rounded-lg flex-1 overflow-hidden flex flex-col">
        <ScrollArea className=" flex-1 pr-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>

                <TableHead className="hidden sm:table-cell">Banco</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Producto Bancario
                </TableHead>
                <TableHead className="hidden sm:table-cell">Estado</TableHead>
                <TableHead className="hidden md:table-cell">Fecha</TableHead>
                <TableHead className="text-right">Moneda</TableHead>
                <TableHead className="text-right">Monto</TableHead>
                <TableHead className="sr-only">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((element) => (
                <TableRow className="bg-card" key={element.id}>
                  <TableCell>
                    <div className="font-medium">
                      {element.client_profile != null
                        ? element.client_profile.name
                        : element.admin_profile != null
                          ? element.admin_profile.name
                          : 'No disponible'}
                    </div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      <span className="flex">
                        <span className="mr-2">
                          {element.client_profile != null
                            ? element.client_profile.isp.network_manager.name
                            : 'No disponible'}{' '}
                          ID:
                        </span>
                        <span className="font-bold">
                          {element.client_profile != null
                            ? element.client_profile.network_manager_user_id
                            : 'No disponible'}
                        </span>
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {element.bank_product != null
                      ? element.bank_product.name
                      : 'No disponible'}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {element.payment_status === 'SUCCESS' && (
                      <Badge className="text-xs" variant="default">
                        Exitoso
                      </Badge>
                    )}
                    {element.payment_status === 'PENDING' && (
                      <Badge className="text-xs" variant="secondary">
                        Pendiente
                      </Badge>
                    )}
                    {element.payment_status === 'FAILED' && (
                      <Badge className="text-xs" variant="destructive">
                        Fallido
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {element.created_at.toISOString().split('T')[0]}
                  </TableCell>
                  <TableCell className="text-right">
                    {element.currency}
                  </TableCell>
                  <TableCell className="text-right">{element.amount}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => {
                          handleViewDetails(element);
                        }}
                      >
                        Ver detalles
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
      <Dialog
        open={selectedTransaction !== null}
        onOpenChange={handleCloseModal}
      >
        <DialogTrigger />
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalles de la transacción</DialogTitle>
          </DialogHeader>
          {selectedTransaction !== null && (
            <div className="space-y-4">
              <div>
                <span className="font-bold">ID:</span> {selectedTransaction.id}
              </div>
              <div>
                <span className="font-bold">Monto:</span>{' '}
                {selectedTransaction.amount} {selectedTransaction.currency}
              </div>
              <div>
                <span className="font-bold">Estado:</span>{' '}
                {selectedTransaction.payment_status}
              </div>
              <div>
                <span className="font-bold">Fecha:</span>{' '}
                {format(new Date(selectedTransaction.created_at), 'dd/MM/yyyy')}
              </div>
              <div>
                <span className="font-bold">Respuesta del banco:</span>
                <pre>
                  {JSON.stringify(selectedTransaction.bank_response, null, 2)}
                </pre>
              </div>
              {selectedTransaction.invoice_payments.length > 0 && (
                <div>
                  <span className="font-bold">Pagos de facturas:</span>
                  <pre>
                    {JSON.stringify(
                      selectedTransaction.invoice_payments,
                      null,
                      2,
                    )}
                  </pre>
                </div>
              )}
              {selectedTransaction.client_balance.length > 0 && (
                <div>
                  <span className="font-bold">Saldo del cliente:</span>
                  <pre>
                    {JSON.stringify(
                      selectedTransaction.client_balance,
                      null,
                      2,
                    )}
                  </pre>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
