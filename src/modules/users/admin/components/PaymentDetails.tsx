'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Copy, Download, X } from 'lucide-react';
import { formatCurrency } from 'src/lib/fomartCurrency';
import { type Payment } from './data';

interface PaymentDetailsProps {
  payment: Payment;
  onClose: () => void;
}

export const PaymentDetails = ({ payment, onClose }: PaymentDetailsProps) => {
  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Detalle de la transacción</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div
          className={`px-3 mt-2 py-1 rounded-full text-sm ${
            payment.estado === 'exitosa'
              ? 'bg-success text-success-foreground'
              : 'text-white bg-red-500'
          }`}
        >
          {payment.estado}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">ID de la operación</p>
            <div className="flex items-center gap-2">
              <p className="font-medium">{payment.detalles?.idOperacion}</p>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">A nombre de</p>
            <p className="font-medium flex items-center gap-2">
              {payment.detalles?.nombreCliente}
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                Cliente
              </span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Banco</p>
              <p className="font-medium">{payment.banco}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Producto bancario</p>
              <p className="font-medium">{payment.productoBancario}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Moneda</p>
              <p className="font-medium">{payment.moneda}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Fecha de la transacción</p>
              <p className="font-medium">{payment.fecha}</p>
            </div>
          </div>

          <div className="border-t pt-4 mt-6">
            <p className="text-sm text-gray-500">Total Pagado</p>
            <p className="text-2xl font-bold">
              {formatCurrency(payment.monto, payment.moneda)}
            </p>
          </div>
        </div>

        <Button className="w-full flex items-center justify-center gap-2">
          <Download className="h-4 w-4" />
          Visualizar comprobante
        </Button>
      </CardContent>
    </Card>
  );
};
