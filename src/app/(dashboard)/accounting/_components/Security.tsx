/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import { Button } from '@components/ui/button';
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
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ClientPasswordSchema,
  type TClientPassword,
} from '@lib/validators/clientSettings-validator';
import { useForm } from 'react-hook-form';

const Security = () => {
  const form = useForm<TClientPassword>({
    resolver: zodResolver(ClientPasswordSchema),
  });

  const formSubmit = (data: TClientPassword) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(formSubmit)}
        className="xl:col-span-5 space-y-8 p-5 h-full bg-white rounded-lg"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter a new password"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Your password must be at least 8 characters long.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password_confirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Re-enter the new password"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Re-enter your new password to confirm it.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save Changes</Button>
      </form>
    </Form>
  );
};

export default Security;
