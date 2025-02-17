/* eslint-disable @typescript-eslint/no-misused-promises */

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePayInvoiceStore } from '@/store/use-payment';
import { useInvoiceSelection } from '@/store/useInvoiceSelection';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@components/ui/form';
import { Label } from '@components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { useToast } from '@components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { type IInvoiceDetailsToPay } from '@interfaces/payment';
import {
  type BankPaymentProduct,
  type IBanksDetails,
} from '@interfaces/paymentMethods.interface';
import payInvoiceAdapter from '@lib/adapters/payInvoice-validator';
import {
  c2PValidator,
  type TC2PValidator,
} from '@lib/validators/c2p-validator';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { handlerGetUserSession, handlerPayInvoices } from '../action';

interface IMobilePayFormProps {
  paymentMethod: BankPaymentProduct[];
  banksAvailable: IBanksDetails[];
}

const MobilePayForm = (props: IMobilePayFormProps) => {
  const { banksAvailable, paymentMethod } = props;
  const { addPayInvoiceIdMethodState, methodId, calculateToPayData } =
    usePayInvoiceStore();
  const { toast } = useToast();
  const { selectedInvoices, totalAmount } = useInvoiceSelection();
  const form = useForm<TC2PValidator>({
    resolver: zodResolver(c2PValidator),
    defaultValues: {},
  });
  const onSubmit = async (data: TC2PValidator) => {
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
        expectedAmount: totalAmount.total,
        allowPartialPayment: calculateToPayData?.allowPartialPayment ?? false,
        balanceApplied: 0,
        amountPayByTheUser: parseFloat(data.amount),
        currencyUseToPay: calculateToPayData.currency,
        exchangeRate: calculateToPayData.exchangeRate,
      },
      {
        bankCode: data.bank_code,
        otp: data.otp,
        documentId: data.document_id,
        phoneNumber: data.phone_number,
      },
      invoicesToPay,
    );
    console.log('htis is the info for the pay', adapterData);
    const response = await handlerPayInvoices(adapterData);

    if (response.type === 'SUCCESS') {
      toast({
        title: response.title,
        description: response.description,
      });
    } else if (response.type === 'ERROR') {
      toast({
        title: response.title,
        description: response.description,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Error Inesperado',
        description:
          'Ha ocurrido un error inesperado, verifica los datos o ponte en contacto con nuestro equipo ',
        variant: 'destructive',
      });
    }
  };

  const watchBankCode = form.watch('bank_code');

  const methodSelected = useMemo(() => {
    if (watchBankCode != null && watchBankCode !== '') {
      return paymentMethod.find(
        (element) => element.banks.code === watchBankCode,
      );
    }
    return null;
  }, [watchBankCode, paymentMethod]);

  const addPaymentMethod = useCallback(() => {
    if (methodSelected != null) {
      addPayInvoiceIdMethodState(methodSelected.id);
    }
  }, [methodSelected, addPayInvoiceIdMethodState]);

  useEffect(() => {
    addPaymentMethod();
  }, [addPaymentMethod]);

  useEffect(() => {
    if (methodId == null) return;

    const selectedMethod = paymentMethod.find(
      (element) => element.id === methodId,
    );
    const bankCode = selectedMethod?.banks.code ?? '';

    if (form.getValues('bank_code') !== bankCode) {
      form.setValue('bank_code', bankCode);
    }
  }, [methodId, paymentMethod, form]);

  return (
    <Form {...form}>
      {/* <h3 className="text-xl font-medium leading-none tracking-tight">
      </h3> */}
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="bank_code"
          render={({ field }) => (
            <FormItem className="space-y-1 my-0">
              <Label htmlFor="bank_code" className="font-normal ">
                Banco
              </Label>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Seleccione como desea que sean asumidas las comisiones" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {banksAvailable.map((element) => (
                    <SelectItem
                      value={element.code}
                      key={element.id + element.code}
                    >
                      {element.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="document_id"
          render={({ field }) => (
            <FormItem className="space-y-1 my-0">
              <Label htmlFor="document_id" className="font-normal ">
                Documento de identidad (CI / RIF)
              </Label>
              <FormControl>
                <Input
                  id="document"
                  type="text"
                  placeholder="123456789"
                  className="h-12"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem className="space-y-1 my-0">
              <Label htmlFor="phone_number" className="font-normal ">
                Número de celular
              </Label>
              <FormControl>
                <Input
                  id="phone_number"
                  type="tel"
                  placeholder="123456789"
                  className="h-12"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="space-y-1 my-0">
              <Label htmlFor="amount" className="font-normal ">
                Monto a pagar
              </Label>
              <FormControl>
                <Input
                  id="amount"
                  placeholder="123456789"
                  className="h-12"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="space-y-1 my-0">
              <Label htmlFor="otp" className="font-normal ">
                Código OTP
              </Label>
              <FormControl>
                <Input
                  id="refNumber"
                  type="text"
                  placeholder="123456789"
                  className="h-12"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full mt-4">
          Pagar
        </Button>
      </form>
    </Form>
  );
};

export default MobilePayForm;
