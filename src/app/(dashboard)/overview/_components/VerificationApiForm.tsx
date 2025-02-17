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
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface IVerificationApiFormProps {
  paymentMethod?: BankPaymentProduct;
}

const VerificationApiForm = (props: IVerificationApiFormProps) => {
  const { paymentMethod } = props;
  const { selectedInvoices, totalAmount } = useInvoiceSelection();
  const FormSchema = z.object({
    transaction_date: z.date({
      required_error: 'A date of birth is required.',
    }),
    reference_number: z.string({
      required_error: 'A reference number is required.',
    }),
    amount: z.number().min(1, {
      message: 'Amount must be greater than 0.',
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const idLocalStorage = localStorage.getItem('userId');
    console.log(idLocalStorage);
    console.log(data);
    if (paymentMethod == null) {
      return;
    }
    console.log(
      payInvoiceAdapter({
        userId: idLocalStorage != null ? parseInt(idLocalStorage) : 0,
        bankCode: paymentMethod.banks.code,
        productType: paymentMethod.name,
        expectedAmount: totalAmount.total,
        allowPartialPayment: false,
        balanceApplied: 0,
        paymentData: {
          date: data.transaction_date,
          orderId: data.reference_number,
          amount: data.amount,
          exchangeRate: 1,
          currency: 'USD',
        },
        invoices: selectedInvoices.map((invoice) => ({
          id: invoice.invoiceId.toString(),
          amount: invoice.total,
        })),
      }),
    );
    // toast({
    //   title: 'You submitted the following values:',
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="transaction_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of Transaction</FormLabel>
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
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
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
                Please select the date of the transaction.
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
              <FormLabel>Transaction reference</FormLabel>
              <FormControl>
                <Input placeholder="xxxxxxxxxxxxxx" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input placeholder="0.00" type="text" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default VerificationApiForm;
