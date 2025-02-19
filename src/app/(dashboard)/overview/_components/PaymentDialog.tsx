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
import { AlertCircle, CreditCard } from 'lucide-react';
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
    'SUCCESS' | 'FAILED' | null
  >(null);
  const [paymentResult, setPaymentResult] = useState<IPaymentResult | null>(
    null,
  );

  // const { toast } = useToast();

  const handlePayment = async () => {
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
        balanceApplied: payUsingBalance ? calculateToPayData.balanceApplied : 0,
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
    setPaymentStatus('SUCCESS');
    const response = await handlerPayInvoices(adapterData);
    console.log(response);
    if (response == null) {
      setPaymentStatus('FAILED');

      return;
    } else if (!response.success) {
      setPaymentResult(response);
      setTimeout(() => {
        setPaymentStatus('FAILED');
      }, 500);
      return;
    } else {
      setPaymentResult(response);
      setTimeout(() => {
        setPaymentStatus('SUCCESS');
      }, 500);
    }

    console.log('this is the info for the pay', adapterData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* <DialogTrigger asChild>
        <button className="hover:text-primary group transition-colors duration-300">
          <SquareArrowOutUpRight className="w-4 h-4" />
        </button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px]">
        {paymentStatus != null ? (
          <ShowsSuccessPayResults
            state={paymentStatus}
            paymentResult={paymentResult}
            setIsOpen={setIsOpen}
          />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Payment Details</DialogTitle>
              <DialogDescription>
                Review your payment information before proceeding.
              </DialogDescription>
            </DialogHeader>
            {calculateToPayData != null && formData != null && (
              <div className="grid gap-4 py-4">
                <div className="items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    Amount
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
                    Bank
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
              <AlertTitle>Invoices to Pay</AlertTitle>
              <AlertDescription>
                {selectedInvoices != null ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Invoice ID</TableHead>
                        <TableHead>Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedInvoices.map((invoice) => (
                        <TableRow key={invoice.invoiceId}>
                          <TableCell className="font-medium">
                            {invoice.invoiceId}
                          </TableCell>
                          <TableCell>{`${calculateToPayData?.currency} ${invoice.total.toFixed(2)}`}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p>No invoices to pay</p>
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
                <CreditCard className="mr-2 h-4 w-4" /> Proceed to Payment
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
