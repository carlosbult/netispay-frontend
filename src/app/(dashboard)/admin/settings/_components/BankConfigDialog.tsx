/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { Input } from '@components/ui/input';
import { ScrollArea } from '@components/ui/scroll-area';
import { Switch } from '@components/ui/switch';
import { Textarea } from '@components/ui/textarea';
import { useToast } from '@components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { type BankPaymentProduct } from '@interfaces/paymentMethods.interface';
import updateBankProductAdapter from '@lib/adapters/updateBankProductAdapter';
import {
  updateBankProductSchema,
  type TUpdateBankProduct,
} from '@lib/validators/updateBankProduct-validator';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Eye, EyeOff, SquareArrowOutUpRight } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { handlerUpdateBankProduct } from '../actions';

interface IBankConfigDialogProps {
  bank: BankPaymentProduct;
}

const BankConfigDialog = (props: IBankConfigDialogProps) => {
  const { bank } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const { toast } = useToast();

  const form = useForm<TUpdateBankProduct>({
    resolver: zodResolver(updateBankProductSchema),
    defaultValues: {
      api_url: bank.api_url,
      api_key: bank.api_key,
      is_active: bank.is_active,
      bank_commission_rate: bank.configurations[0].bank_commission_rate,
      bank_operation_rate: bank.configurations[0].bank_operation_rate,
      description: bank.configurations[0].description,
    },
  });

  async function onSubmit(values: TUpdateBankProduct) {
    const adapterData = updateBankProductAdapter(values, bank);
    console.log(adapterData);
    const response = await handlerUpdateBankProduct(
      adapterData,
      bank.id.toString(),
    );
    if ('errorCode' in response) {
      toast({
        title: `Error al actualizar los datos`,
        description: response.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Successfully',
        description: 'The Bank Product is update successfully',
      });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="hover:text-primary group transition-colors duration-300">
          <SquareArrowOutUpRight className="w-4 h-4" />
        </button>
        {/* <Button variant="outline">View Invoice #{invoice.invoiceId}</Button> */}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="font-bold text-xl">
            Bank Product Config
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[90vh] pb-5">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 max-w-2xl mx-auto pb-[10vh]"
            >
              {/* <h2 className="text-2xl font-bold mb-6">Bank bank Form</h2> */}

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="api_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="api_url">API URL</FormLabel>
                      {/* <Input
                        id="name"
                        name="name"
                        value={bank.name}
                        onChange={handleInputChange}
                      /> */}
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="api_key"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Key</FormLabel>
                      <FormControl>
                        <div className="flex">
                          <Input
                            {...field}
                            type={showApiKey ? 'text' : 'password'}
                            className="rounded-r-none border-r-0"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            className="rounded-md rounded-l-none border-l-0"
                            onClick={() => {
                              setShowApiKey(!showApiKey);
                            }}
                          >
                            {showApiKey ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center space-x-2">
                <FormField
                  control={form.control}
                  name="is_active"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 w-full">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Active Status
                        </FormLabel>
                        <FormDescription>
                          Is this product current available?
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* <div className="space-y-2">
                <Label htmlFor="payment_category">Payment Category</Label>
                <Input
                  id="payment_category"
                  name="payment_category"
                  value={bank.payment_category || ''}
                  onChange={handleInputChange}
                />
              </div> */}

              {/* <div className="space-y-2">
                <Label htmlFor="api_url">API URL</Label>
                <Input
                  id="api_url"
                  name="api_url"
                  value={bank.api_url}
                  onChange={handleInputChange}
                />
              </div> */}

              {/* <div className="space-y-2">
                <Label htmlFor="api_key">API Key</Label>
                <Input
                  id="api_key"
                  name="api_key"
                  value={bank.api_key}
                  onChange={handleInputChange}
                />
              </div> */}

              <fieldset className="border rounded-md p-4 space-y-4">
                <legend className="font-semibold px-2">Configuration</legend>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="description">Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} value={field.value ?? ''} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="bank_commission_rate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="bank_commission_rate">
                          Bank Commission Rate
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="bank_operation_rate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="bank_operation_rate">
                          Bank Operation Rate
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </fieldset>

              <Button type="submit" className="w-full">
                Save Changes
              </Button>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default BankConfigDialog;
