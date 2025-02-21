'use client';

import { usePayInvoiceStore } from '@/store/use-payment';
import { useInvoiceSelection } from '@/store/useInvoiceSelection';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { Label } from '@components/ui/label';
import { Separator } from '@components/ui/separator';
import { Switch } from '@components/ui/switch';
import { useCallback, useEffect, useRef } from 'react';
import { handlerGetMountToPay } from '../action';

const PaymentDetailsCard = () => {
  // const [calculateToPayData, setcalculateToPayData] = useState<ICalculateMontToPay | null>(
  //   null,
  // );
  const { selectedInvoices, totalAmount } = useInvoiceSelection();
  const {
    methodId,
    clearPayInvoiceState,
    addCalculateToPayData,
    // removeTypePaymentMethodState,
    calculateToPayData,
    updatePayUsingBalance,
    payUsingBalance,
  } = usePayInvoiceStore();
  const previousRequestRef = useRef<{
    amountUSD: number;
    bankProductId: number;
  } | null>(null);

  // ✅ Memoized function to prevent re-creation on each render
  const viewTotalToPay = useCallback(
    async (paymentMethodId: number) => {
      try {
        const response = await handlerGetMountToPay({
          amountUSD: totalAmount.total,
          bankProductId: paymentMethodId,
        });
        console.log('Data to payment:', response);
        return response ?? null;
      } catch (error) {
        console.error('Error fetching payment data:', error);
        return null;
      }
    },
    [totalAmount.total],
  ); // Recreates only if `totalAmount.total` changes

  useEffect(() => {
    if (selectedInvoices.length === 0) {
      // removeTypePaymentMethodState(); // ✅ Reset payment data if no invoices are selected
      return;
    }

    if (methodId === null) {
      // removeTypePaymentMethodState(); // ✅ Reset payment data if no invoices are selected
      return;
    }

    // ✅ Prevent redundant API calls by tracking previous requests
    const requestParams = {
      amountUSD: totalAmount.total,
      bankProductId: methodId,
    };
    if (
      Boolean(previousRequestRef.current) &&
      JSON.stringify(previousRequestRef.current) ===
        JSON.stringify(requestParams)
    ) {
      return; // Skip API call if the parameters are the same
    }

    previousRequestRef.current = requestParams;

    void viewTotalToPay(methodId).then((data) => {
      if (
        data != null &&
        (previousRequestRef.current === null ||
          JSON.stringify(previousRequestRef.current) !== JSON.stringify(data))
      ) {
        addCalculateToPayData(data);
      }
    });
    // return () => {
    //   removeTypePaymentMethodState()
    // };
  }, [methodId, selectedInvoices, totalAmount.total, viewTotalToPay]);

  if (selectedInvoices.length === 0) return;

  return (
    <Card className="w-full h-fit">
      <CardHeader>
        <button onClick={clearPayInvoiceState}>clear test</button>
        <CardTitle>Detalles del pago a realizar</CardTitle>
        <CardDescription>
          Resumen de los detalles de su pago, incluyendo montos y facturas
          seleccionadas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className=" text-muted-foreground">
                Facturas seleccionadas:
              </span>
              <span className="font-medium">{selectedInvoices.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className=" text-muted-foreground">SubTotal:</span>
              <span className="font-medium">
                {totalAmount.subTotal} <span className="font-normal">$</span>
              </span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span>Monto total a pagar:</span>
              <span>
                {totalAmount.total} <span className="font-normal">$</span>
              </span>
            </div>
          </div>
          <Separator />
          {calculateToPayData != null ? (
            <div className="space-y-2">
              {calculateToPayData.operationCost && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Costo de la operación:
                  </span>
                  <span className="font-medium">
                    {calculateToPayData.details.systemCommission}{' '}
                    <span className="font-normal text-muted-foreground">
                      {calculateToPayData.currency === 'VES' ? 'Bs.' : '$'}
                    </span>
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <Label
                  htmlFor="balance-pay-mode"
                  className="text-muted-foreground"
                >
                  Usar tu saldo actual para pagar:
                </Label>
                <span className="">
                  <Switch
                    id="balance-pay-mode"
                    checked={payUsingBalance}
                    onCheckedChange={(checked) => {
                      updatePayUsingBalance(checked);
                    }}
                  />
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tasa de cambio:</span>
                <span className="font-medium">
                  {calculateToPayData.exchangeRate}{' '}
                  <span className="font-normal text-muted-foreground">
                    {calculateToPayData.currency === 'VES' ? 'Bs.' : '$'}
                  </span>
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">IVA:</span>
                <span className="font-medium">
                  {calculateToPayData.details.ivaAmount}{' '}
                  <span className="font-normal text-muted-foreground">
                    {calculateToPayData.currency === 'VES' ? 'Bs.' : '$'}
                  </span>
                </span>
              </div>
              <Separator />

              <div className="flex justify-between text-sm">
                <span className=" text-muted-foreground">
                  Sub total a pagar:
                </span>
                <span className="font-medium">
                  {calculateToPayData.details.baseAmount}{' '}
                  <span className="font-normal text-muted-foreground">
                    {calculateToPayData.currency === 'VES' ? 'Bs.' : '$'}
                  </span>
                </span>
              </div>
              {payUsingBalance ? (
                <>
                  <div className="flex justify-between text-sm">
                    <span className=" text-muted-foreground">
                      Total a pagar original:
                    </span>
                    <span className="font-medium">
                      {calculateToPayData.originalAmount}{' '}
                      <span className="font-normal text-muted-foreground">
                        {calculateToPayData.currency === 'VES' ? 'Bs.' : '$'}
                      </span>
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className=" text-muted-foreground">
                      Saldo aplicado:
                    </span>
                    <span className="font-medium">
                      - {calculateToPayData.balanceApplied}{' '}
                      <span className="font-normal text-muted-foreground">
                        {calculateToPayData.currency === 'VES' ? 'Bs.' : '$'}
                      </span>
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span className="font-medium">
                    {calculateToPayData.originalAmount}{' '}
                    <span className="font-normal text-muted-foreground">
                      {calculateToPayData.currency === 'VES' ? 'Bs.' : '$'}
                    </span>
                  </span>
                </div>
              )}
              {payUsingBalance && (
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total a pagar usando el saldo:</span>
                  <span className="font-medium">
                    {calculateToPayData.amount}{' '}
                    <span className="font-normal text-muted-foreground">
                      {calculateToPayData.currency === 'VES' ? 'Bs.' : '$'}
                    </span>
                  </span>
                </div>
              )}
              {/* <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Total a pagar:
                </span>
                <span className="font-medium">
                  {calculateToPayData.originalAmount}{' '}
                  <span className="font-normal text-muted-foreground">
                    {calculateToPayData.currency === 'VES' ? 'Bs.' : '$'}
                  </span>
                </span>
              </div> */}
            </div>
          ) : (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-center">
                Seleccione un método de pago
              </h3>
              {/* <ul className="space-y-1 text-sm">
                {selectedInvoices.map((invoice) => (
                  <li key={invoice.invoiceId} className="flex justify-between">
                    <span className="text-muted-foreground">
                      ID de Factura:
                    </span>
                    <span className="font-medium">{invoice.invoiceId}</span>
                  </li>
                ))}
              </ul> */}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentDetailsCard;
