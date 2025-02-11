'use client';

import { Button } from '@/components/ui/button';
import { CheckCircle2, CircleAlert, XCircle } from 'lucide-react';
import { formatCurrency } from 'src/lib/fomartCurrency';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'src/shared/components/ui/dialog';

interface PaymentResponseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  paymentResult: {
    success: boolean;
    amount: number;
    currency: string;
    errorMessage?: string;
    transactionId?: string;
    isDuplicated?: boolean;
  };
}

export const PaymentResponseDialog = ({
  isOpen,
  onClose,
  paymentResult,
}: PaymentResponseDialogProps) => {
  console.log('paymentResult:', paymentResult);
  const isSuccess = paymentResult.success;
  const isDuplicated = paymentResult.isDuplicated ?? false;

  const getIcon = () => {
    if (isSuccess) return <CheckCircle2 className="h-12 w-12 text-success" />;
    if (isDuplicated) return <CircleAlert className="h-12 w-12 text-warning" />;
    return <XCircle className="h-12 w-12 text-destructive" />;
  };

  const getTitle = () => {
    if (isSuccess) return 'Pago Exitoso';
    if (isDuplicated) return 'Pago Duplicado';
    return 'Error en el Pago';
  };

  const getMessage = () => {
    if (isSuccess) return 'Tu pago ha sido procesado exitosamente';
    if (isDuplicated) return 'Este pago ya fue procesado anteriormente';
    return (
      paymentResult.errorMessage ?? 'Ha ocurrido un error al procesar el pago'
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-4">{getIcon()}</div>
          <DialogTitle className="text-center text-xl">
            {getTitle()}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">{getMessage()}</p>
          </div>

          <div className="rounded-lg bg-muted p-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Monto</span>
                <span className="font-medium">
                  {formatCurrency(paymentResult.amount, paymentResult.currency)}
                </span>
              </div>
              {paymentResult.transactionId != null && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    ID de Transacción
                  </span>
                  <span className="font-medium">
                    {paymentResult.transactionId}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-center">
          <Button onClick={onClose}>{isSuccess ? 'Aceptar' : 'Cerrar'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
