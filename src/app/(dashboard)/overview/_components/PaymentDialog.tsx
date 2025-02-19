'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePayInvoiceStore } from '@/store/use-payment';
import { useInvoiceSelection } from '@/store/useInvoiceSelection';
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import { Label } from '@components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import {
  type IInvoiceDetailsToPay,
  type IPaymentResult,
} from '@interfaces/payment';
import {
  type BankPaymentProduct,
  type IBanksDetails,
} from '@interfaces/paymentMethods.interface';
import payInvoiceAdapter from '@lib/adapters/payInvoice-validator';
import { type TC2PValidator } from '@lib/validators/c2p-validator';
import { AlertCircle, CreditCard, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { handlerGetUserSession, handlerPayInvoices } from '../action';
import ShowsSuccessPayResults from './ShowSuccessPayResults';

interface IPaymentDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  paymentMethod: BankPaymentProduct[];
  banksAvailable: IBanksDetails[];
  formData: TC2PValidator | null;
}

const PaymentDialog = (props: IPaymentDialogProps) => {
  const { isOpen, setIsOpen, formData, banksAvailable, paymentMethod } = props;
  const { selectedInvoices } = useInvoiceSelection();
  const { methodId, calculateToPayData, payUsingBalance } =
    usePayInvoiceStore();
  const [paymentStatus, setPaymentStatus] = useState<
    'SUCCESS' | 'FAILED' | 'PENDING' | null
  >(null);
  const [paymentResult, setPaymentResult] = useState<IPaymentResult | null>(
    null,
  );

  // const { toast } = useToast();

  const handlePayment = async () => {
    try {
      setPaymentStatus('PENDING');
      if (formData == null) return;
      const user = await handlerGetUserSession();
      const userId = user?.user.id;
      if (userId == null) return;
      if (calculateToPayData == null) return;
      const selectedMethod = paymentMethod.find(
        (element) => element.id === methodId,
      );
      if (selectedMethod == null) return;
      const invoicesToPay: IInvoiceDetailsToPay[] = selectedInvoices.map(
        (invoice) => {
          return {
            id: invoice.invoiceId.toString(),
            amount: invoice.total,
          };
        },
      );

      //  ** use and adapter for the information
      const adapterData = payInvoiceAdapter(
        userId,
        selectedMethod?.name,
        selectedMethod?.banks.code,
        {
          expectedAmount: calculateToPayData.originalAmount,
          allowPartialPayment: calculateToPayData?.allowPartialPayment ?? false,
          balanceApplied: payUsingBalance
            ? calculateToPayData.balanceApplied
            : 0,
          amountPayByTheUser: payUsingBalance
            ? calculateToPayData.amount
            : calculateToPayData.originalAmount,
          currencyUseToPay: calculateToPayData.currency,
          exchangeRate: calculateToPayData.exchangeRate,
        },
        {
          bankCode: formData.bank_code,
          otp: formData.otp,
          documentId: formData.document_id,
          phoneNumber: formData.phone_number,
        },
        invoicesToPay,
      );
      console.log('adapterData', adapterData);

      const response = await handlerPayInvoices(adapterData);

      if (response == null) {
        setPaymentStatus('FAILED');
        return;
      }

      if (response.success) {
        setPaymentResult(response);
        setPaymentStatus('SUCCESS');
      } else {
        setPaymentResult(response);
        setPaymentStatus('FAILED');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('FAILED');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* <DialogTrigger asChild>
        <button className="hover:text-primary group transition-colors duration-300">
          <SquareArrowOutUpRight className="w-4 h-4" />
        </button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px]">
        {paymentStatus === 'PENDING' ? (
          <div className="flex flex-col items-center justify-center gap-4 py-8">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <div className="text-center">
              <h3 className="text-lg font-semibold">Procesando tu pago</h3>
              <p className="text-muted-foreground">
                Esto puede tomar unos segundos...
              </p>
            </div>
          </div>
        ) : paymentStatus != null ? (
          <ShowsSuccessPayResults
            state={paymentStatus}
            paymentResult={paymentResult}
            setPaymentStatus={setPaymentStatus}
            setIsOpen={setIsOpen}
          />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Detalles de pago</DialogTitle>
              <DialogDescription>
                Revisa tus datos de pago antes de proceder.
              </DialogDescription>
            </DialogHeader>
            {calculateToPayData != null && formData != null && (
              <div className="grid gap-4 py-4">
                <div className="items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    Monto
                  </Label>
                  <Input
                    id="amount"
                    value={`${calculateToPayData.currency} ${
                      payUsingBalance
                        ? calculateToPayData.amount.toFixed(2)
                        : calculateToPayData.originalAmount.toFixed(2)
                    }`}
                    readOnly
                  />
                </div>
                <div className="items-center gap-4">
                  <Label htmlFor="bank" className="text-right">
                    Banco
                  </Label>
                  <Input
                    id="bank"
                    value={
                      banksAvailable.find(
                        (element) => (element.code = formData.bank_code),
                      )?.name
                    }
                    readOnly
                  />
                </div>
                {/* <div className="items-center gap-4">
              <Label htmlFor="product" className="text-right">
                Product
              </Label>
              <Input id="product" value={selectedMethod} readOnly />
            </div> */}
                {/* {dataToPay.paymentData.transactionDate != null && (
              <div className="items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input
                  id="date"
                  value={format(dataToPay.paymentData.transactionDate, 'PPP')}
                  readOnly
                />
              </div>
            )} */}
              </div>
            )}

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Facturas para pagar</AlertTitle>
              <AlertDescription>
                {selectedInvoices != null ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">ID Factura</TableHead>
                        <TableHead>Monto</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedInvoices.map((invoice) => (
                        <TableRow key={invoice.invoiceId}>
                          <TableCell className="font-medium">
                            {invoice.invoiceId}
                          </TableCell>
                          <TableCell>{`$ ${invoice.total.toFixed(2)}`}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p>Sin facturas para pagar</p>
                )}
              </AlertDescription>
            </Alert>
            <DialogFooter>
              <Button
                type="submit"
                onClick={() => {
                  void handlePayment();
                }}
              >
                <CreditCard className="mr-2 h-4 w-4" /> Pagar
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
