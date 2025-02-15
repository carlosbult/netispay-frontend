/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@components/ui/form';
import { Label } from '@components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { type BankPaymentProduct } from '@interfaces/paymentMethods.interface';
import {
  c2PValidator,
  type TC2PValidator,
} from '@lib/validators/c2p-validator';
import { useForm } from 'react-hook-form';

interface IMobilePayFormProps {
  paymentMethod?: BankPaymentProduct[];
}

const MobilePayForm = (props: IMobilePayFormProps) => {
  const form = useForm<TC2PValidator>({
    resolver: zodResolver(c2PValidator),
    defaultValues: {},
  });
  const onSubmit = (data: TC2PValidator) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="document_id"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <Label htmlFor="document" className="font-normal ">
                  Documento de identidad
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
        </div>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <Label htmlFor="phoneNumber" className="font-normal ">
                  Número de celular
                </Label>
                <FormControl>
                  <Input
                    id="phoneNumber"
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
        </div>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="refNumber"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <Label htmlFor="refNumber" className="font-normal ">
                  Numero de referencia
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
        </div>

        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </Form>
  );
};

export default MobilePayForm;
