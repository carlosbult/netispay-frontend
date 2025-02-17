'use client';

import { Button } from '@/components/ui/button';
import { usePayInvoiceStore } from '@/store/use-payment';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { Separator } from '@components/ui/separator';
import { type BankPaymentProduct } from '@interfaces/paymentMethods.interface';
import { ArrowLeft, type LucideProps } from 'lucide-react';
import Icons from 'src/components/Icons';
import CurrencyCard from './CurrencyCards';
import PaymentMethodContainer from './PayMethodContainer';

interface IStepByStepPaymentProps {
  bankProducts: BankPaymentProduct[];
}

const StepByStepPayment = (props: IStepByStepPaymentProps) => {
  const { bankProducts } = props;
  const payPalIcon = (props: LucideProps) => Icons.PayPal(props);
  const binanceIcon = (props: LucideProps) => Icons.Binance(props);
  const bankTransfer = (props: LucideProps) => Icons.CreditCard(props);
  const {
    categoryPayment,
    addCategoryPaymentMethodState,
    removeCategoryPaymentMethodState,
  } = usePayInvoiceStore();

  // useEffect(() => {
  //   if (categoryPayment != null) {
  //     addCategoryPaymentMethodState(categoryPayment);
  //   }
  // }, [categoryPayment]);

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Seleccioné un método de pago</CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {categoryPayment != null ? (
          <div>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                removeCategoryPaymentMethodState();
              }}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          </div>
        ) : (
          <div className="flex w-full gap-6 py-4">
            <CurrencyCard
              icon={payPalIcon}
              name="PayPal"
              callBack={() => {
                addCategoryPaymentMethodState('payPal');
              }}
            />
            <CurrencyCard
              icon={binanceIcon}
              name="Binance"
              callBack={() => {
                addCategoryPaymentMethodState('binance');
              }}
            />
            <CurrencyCard
              icon={bankTransfer}
              name="Bank Transfer"
              callBack={() => {
                addCategoryPaymentMethodState('bank-transfer');
              }}
            />
          </div>
        )}

        {categoryPayment != null && (
          <PaymentMethodContainer
            method={categoryPayment}
            bankProducts={bankProducts}
          />
        )}
      </CardContent>
      {categoryPayment != null ? null : (
        <CardFooter className="flex flex-col">
          <div className="flex items-center justify-center w-full mb-4">
            <Separator className=" w-[40%] opacity-35" />
            <span className="px-4">Or</span>
            <Separator className=" w-[40%] opacity-35" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl text-center font-medium leading-none tracking-tight">
              Contact our team
            </h3>
            <span className="text-sm py-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </span>
            <Button>Contact</Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default StepByStepPayment;
