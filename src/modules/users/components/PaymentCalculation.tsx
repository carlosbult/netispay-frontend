'use client';
import { ErrorCard } from '@components/ErrorCard';
import { LoadingState } from '@components/Loader';
import { Badge } from '@components/ui/badge';
import { formatCurrency } from 'src/lib/fomartCurrency';
import { usePaymentCalculator } from 'src/modules/payments/hooks/useCurrencyRates';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from 'src/shared/components/ui/card';
import { useInvoiceSelection } from 'src/shared/store/useInvoiceSelection';

export const PaymentCalculation = () => {
  const { totalAmount, selectedPaymentMethod } = useInvoiceSelection();

  const {
    data: calculatorData,
    isPending,
    error,
  } = usePaymentCalculator({
    bankProductId: selectedPaymentMethod?.id,
    amountUSD: totalAmount.total,
  });

  if (totalAmount.total === 0 || selectedPaymentMethod.id === 0) return null;
  if (isPending) return <LoadingState title="Calculando monto..." />;
  if (error !== null) return <ErrorCard error={error} />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monto a pagar</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          {calculatorData.currency === 'VES' && (
            <Badge className="text-sm w-full flex justify-between">
              <span>Tasa BCV:</span>
              {formatCurrency(calculatorData.exchangeRate, 'VES')}
            </Badge>
          )}

          <div className="flex justify-between">
            <span>Base imponible</span>
            <span>
              {formatCurrency(
                calculatorData.details.baseAmount,
                calculatorData.currency,
              )}
            </span>
          </div>
          <div className="flex justify-between">
            <span>IVA</span>
            <span>
              {formatCurrency(
                calculatorData.details.ivaAmount,
                calculatorData.currency,
              )}
            </span>
          </div>

          {calculatorData.currency === 'USD' && (
            <div className="flex justify-between">
              <span>IGTF</span>
              <span>
                {formatCurrency(
                  calculatorData.details.igtfAmount,
                  calculatorData.currency,
                )}
              </span>
            </div>
          )}

          {calculatorData.operationCost && (
            <div className="flex justify-between">
              <span>Costo plataforma</span>
              <span>
                {formatCurrency(
                  calculatorData.details.systemCommission,
                  calculatorData.currency,
                )}
              </span>
            </div>
          )}

          <div className="flex justify-between font-bold">
            <span>Total a pagar</span>
            <span>
              {formatCurrency(calculatorData.amount, calculatorData.currency)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
