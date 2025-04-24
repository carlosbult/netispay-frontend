/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useInvoiceSelection } from '@/store/useInvoiceSelection';
import { Calendar } from '@components/ui/calendar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { zodResolver } from '@hookform/resolvers/zod';
import { type BankPaymentProduct } from '@interfaces/paymentMethods.interface';
import payInvoiceAdapter from '@lib/adapters/payInvoice-validator';
import { cn } from '@lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  apiBinanceValidator,
  type TApiBinanceValidator,
} from '@lib/validators/api-binance-validator';
import PaymentDialog from './PaymentDialog';
import { Label } from '@components/ui/label';

interface IVerificationApiFormProps {
  paymentMethod?: BankPaymentProduct[];
}

const VerificationApiForm = (props: IVerificationApiFormProps) => {
  console.log('props: ', props);
  const { paymentMethod } = props;
  const { selectedInvoices, totalAmount } = useInvoiceSelection();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formValues, setFormValues] = useState<TApiBinanceValidator | null>(
    null,
  );
  console.log('formValues: ', formValues);

  const form = useForm<TApiBinanceValidator>({
    resolver: zodResolver(apiBinanceValidator),
    defaultValues: {},
  });

  const onSubmit = async (data: TApiBinanceValidator) => {
    console.log('data on submit: ', data);
    setIsDialogOpen(true);
    setFormValues(data);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="transaction_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Label htmlFor="transaction_date">
                  Fecha de la transacción
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          field.value == null && 'text-muted-foreground',
                        )}
                      >
                        {field.value != null ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Seleccionar fecha</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      id="transaction_date"
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Por favor seleccione la fecha de la transacción.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reference_number"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Label className="font-normal" htmlFor="reference_number">
                  Referencia de la transacción
                </Label>
                <FormControl>
                  <Input
                    id="reference_number"
                    placeholder="xxxxxxxxxxxxxx"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Label className="font-normal" htmlFor="amount">
                  Monto
                </Label>
                <FormControl>
                  <Input
                    id="amount"
                    placeholder="0.00"
                    type="text"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Enviar
          </Button>
        </form>
      </Form>
      {/* <PaymentDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        paymentMethod={paymentMethod}
        formData={formValues}
      /> */}
    </>
  );
};

export default VerificationApiForm;
