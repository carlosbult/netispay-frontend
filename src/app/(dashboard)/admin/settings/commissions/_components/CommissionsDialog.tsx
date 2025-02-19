/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { ScrollArea } from '@components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { Switch } from '@components/ui/switch';
import { useToast } from '@components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { type ICommissionISPConfig } from '@interfaces/isp';
import updateISPCommissionAdapter from '@lib/adapters/updateIspCommissionConfigs';
import {
  CommissionSchema,
  type TCommissionSchema,
} from '@lib/validators/commissionsUpdate-validator';
import { SquareArrowOutUpRight } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { handlerUpdateISPCommission } from '../actions';

interface ICommissionDialogProps {
  commissionConfig: ICommissionISPConfig;
}

const CommissionsDialog = (props: ICommissionDialogProps) => {
  const { commissionConfig } = props;
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<TCommissionSchema>({
    resolver: zodResolver(CommissionSchema),
    defaultValues: {
      add_igtf: commissionConfig.add_igtf,
      add_iva_usd: commissionConfig.add_iva_usd,
      add_iva_ves: commissionConfig.add_iva_ves,
      iva_rate: commissionConfig.iva_rate,
      igtf_rate: commissionConfig.igtf_rate,
      allow_partial_payment: commissionConfig.allow_partial_payment,
      commission_type: commissionConfig.commission_type,
    },
  });

  async function onSubmit(values: TCommissionSchema) {
    const adapterData = updateISPCommissionAdapter(values, commissionConfig);
    const updateCommission = await handlerUpdateISPCommission(
      adapterData,
      commissionConfig.id.toString(),
    );
    if (updateCommission.type === 'SUCCESS') {
      toast({
        title: updateCommission.title,
        description: updateCommission.description,
      });
    } else if (updateCommission.type === 'ERROR') {
      toast({
        title: updateCommission.title,
        description: updateCommission.description,
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
            Configuración de comisiones
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[90vh] pb-5">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 max-w-2xl mx-auto pb-[10vh]"
            >
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="igtf_rate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="api_url">IGT rate</FormLabel>
                      {/* <Input
                        id="name"
                        name="name"
                        value={bank.name}
                        onChange={handleInputChange}
                      /> */}
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="iva_rate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="iva_rate">IVA rate</FormLabel>
                      {/* <Input
                        id="name"
                        name="name"
                        value={bank.name}
                        onChange={handleInputChange}
                      /> */}
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center space-x-2 w-full">
                <FormField
                  control={form.control}
                  name="commission_type"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Tipo de comisión</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Seleccione como desea que sean asumidas las comisiones" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ISP_ASSUMES">
                            Asumida por la ISP
                          </SelectItem>
                          <SelectItem value="CLIENT_ASSUMES">
                            Asumida por el cliente
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {/* <FormDescription>
                You can manage email addresses in your{" "}
                <Link href="/examples/forms">email settings</Link>.
              </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center space-x-2">
                <FormField
                  control={form.control}
                  name="allow_partial_payment"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 w-full">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Permitir pagos parciales
                        </FormLabel>
                        <FormDescription>
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Rerum, magnam?
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center space-x-2">
                <FormField
                  control={form.control}
                  name="add_igtf"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 w-full">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Agregar IGTF
                        </FormLabel>
                        <FormDescription>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Harum optio possimus quo.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center space-x-2">
                <FormField
                  control={form.control}
                  name="add_iva_usd"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 w-full">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Agregar IVA a los precios en USD
                        </FormLabel>
                        <FormDescription>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Harum optio possimus quo.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center space-x-2">
                <FormField
                  control={form.control}
                  name="add_iva_ves"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 w-full">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Agregar IVA a los precios en VES
                        </FormLabel>
                        <FormDescription>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Harum optio possimus quo.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full">
                Guardar cambios
              </Button>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CommissionsDialog;
