/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { Switch } from '@components/ui/switch';
import { useToast } from '@components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { type IISPConfig } from '@interfaces/isp';
import updateIspConfigAdapter from '@lib/adapters/updateIspConfigAdapter';
import {
  ispConfigSchema,
  type TIspConfigSchema,
} from '@lib/validators/updateISPConfig-validator';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { handlerUpdateIspConfig } from '../actions';

const ISPConfigForm = ({
  data,
  update,
}: {
  data: IISPConfig;
  update: boolean;
}) => {
  console.log(update);
  const [showApiKey, setShowApiKey] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<TIspConfigSchema>({
    resolver: zodResolver(ispConfigSchema),
    defaultValues: {
      api_url: data.api_url,
      api_key: data.api_key,
      isp: {
        name: data.isp[0].name,
        email: data.isp[0].email,
        rif: data.isp[0].rif,
        is_active: data.isp[0].is_active,
      },
    },
  });

  async function onSubmit(values: TIspConfigSchema) {
    // Here you would typically send the updated data to your API
    console.log(updateIspConfigAdapter(values, data));
    const adapterData: Partial<IISPConfig> = updateIspConfigAdapter(
      values,
      data,
    );
    const response = await handlerUpdateIspConfig(adapterData, String(data.id));
    if (response == null) {
      toast({
        title: 'Error',
        description: 'An error occurred while updating the ISP',
        variant: 'destructive',
      });
      return;
    }
    if ('errorCode' in response) {
      toast({
        title: `Error al actualizar los datos`,
        description: response.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Successfully',
        description: 'The ISP is update successfully',
      });
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Edit ISP Data</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="api_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API URL</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="isp.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ISP Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isp.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ISP Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isp.rif"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RIF</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isp.is_active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Active Status</FormLabel>
                    <FormDescription>
                      Is this ISP currently active?
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
            <div className="w-full space-y-2">
              <Button className="w-full" type="submit">
                Save Changes
              </Button>
              <Button
                className="w-full"
                variant={'outline'}
                type="button"
                onClick={() => {
                  router.back();
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ISPConfigForm;
