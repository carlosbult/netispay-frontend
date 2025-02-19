import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert';
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import { type IPaymentResult } from '@interfaces/payment';
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

interface IShowsSuccessPayResultsProps {
  state: 'SUCCESS' | 'FAILED';
  paymentResult: IPaymentResult | null;
  setIsOpen: (isOpen: boolean) => void;
}

const ShowsSuccessPayResults = (props: IShowsSuccessPayResultsProps) => {
  const { state, paymentResult, setIsOpen } = props;
  const isError = state === 'FAILED';
  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <DialogHeader>
        <div className="w-full flex justify-center">
          {isError ? (
            <XCircle className="h-8 w-8 text-destructive" />
          ) : (
            <CheckCircle2 className="h-8 w-8 text-success" />
          )}
        </div>
        <DialogTitle>{isError ? 'Pago Fallido' : 'Pago Exitoso'}</DialogTitle>
        <DialogDescription>
          {isError
            ? 'Hubo un problema con tu pago.'
            : 'Tu pago se ha procesado correctamente.'}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        {paymentResult != null ? (
          <Alert variant={isError ? 'destructive' : 'default'}>
            <AlertTitle>
              {isError ? 'Detalles del Error' : 'Detalles del Pago'}
            </AlertTitle>
            <AlertDescription>
              <div className="mt-2 grid gap-2">
                <div className="flex justify-between">
                  <span className="font-medium">ID de Transacción:</span>
                  <span>{paymentResult.transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Referencia Bancaria:</span>
                  <span>{paymentResult.bankReference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Monto:</span>
                  <span>{`${paymentResult.currency} ${paymentResult.amount.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Estado:</span>
                  <span>{paymentResult.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Método de Pago:</span>
                  <span>{paymentResult.paymentMethod}</span>
                </div>
                {isError && (
                  <>
                    <div className="flex justify-between">
                      <span className="font-medium">Código de Error:</span>
                      <span className="text-end">
                        {paymentResult.errorCode}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Mensaje de Error:</span>
                      <span className="text-end">
                        {paymentResult.errorMessage}
                      </span>
                    </div>
                    {(paymentResult.isDuplicate ?? false) && (
                      <div className="flex justify-between">
                        <span className="font-medium">Duplicado:</span>
                        <span>Sí</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </AlertDescription>
          </Alert>
        ) : (
          <Alert variant={isError ? 'destructive' : 'default'}>
            <AlertTitle>
              {isError ? 'Error en el Pago' : 'Pago Procesado'}
            </AlertTitle>
            <AlertDescription>
              {isError
                ? 'No se pudo obtener información detallada del pago.'
                : 'El pago se ha procesado, pero no hay detalles disponibles en este momento.'}
            </AlertDescription>
          </Alert>
        )}
      </div>
      <DialogFooter>
        <Button onClick={onClose}>
          {isError ? (
            <>
              <AlertCircle className="mr-2 h-4 w-4" /> Cerrar
            </>
          ) : (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4" /> Listo
            </>
          )}
        </Button>
      </DialogFooter>
    </>
  );
};

export default ShowsSuccessPayResults;
