'use client';

import { DataTable } from '@components/DataTable';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Banknote, Calendar, CreditCard, Landmark } from 'lucide-react';
import { useState } from 'react';
import { formatCurrency } from 'src/lib/fomartCurrency';
import { PaymentDetails } from 'src/modules/users/admin/components/PaymentDetails';
import { columns } from 'src/modules/users/admin/components/PaymentTableColumns';
import {
  type Payment,
  payments,
} from 'src/modules/users/admin/components/data';

const Component = () => {
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  return (
    <div className="h-screen flex flex-col p-2 gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Pagos</h1>
        <div className="flex items-center space-x-4">
          <Button variant="outline">
            <Banknote className="mr-2 h-4 w-4" />
            Moneda
          </Button>
          <Button variant="outline">
            <Landmark className="mr-2 h-4 w-4" />
            Banco
          </Button>
          <Button variant="outline">
            <CreditCard className="mr-2 h-4 w-4" />
            Producto bancario
          </Button>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Fecha
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-5 grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">127</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Exitosos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">120</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Errores</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">7</p>
          </CardContent>
        </Card>
        <Card className=" col-span-2 ">
          <CardHeader>
            <CardTitle>Total ingresado</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between">
            <p className="text-xl font-bold">
              {formatCurrency(2454653, 'VES')}
            </p>
            <p className="text-xl font-bold">{formatCurrency(17456, 'USD')}</p>
          </CardContent>
        </Card>
      </div>

      <div
        className={`grid transition-all duration-300 ${
          selectedPayment !== null ? 'grid-cols-[3fr_1fr]' : 'grid-cols-1'
        } gap-4 overflow-hidden`}
      >
        {/* Panel izquierdo con la tabla */}
        <DataTable
          columns={columns}
          data={payments}
          onRowClick={(payment) => {
            setSelectedPayment(payment);
          }}
        />

        {/* Panel derecho con detalles */}
        {selectedPayment !== null && (
          <PaymentDetails
            payment={selectedPayment}
            onClose={() => {
              setSelectedPayment(null);
            }}
          />
        )}
      </div>
    </div>
  );
};
export default Component;
