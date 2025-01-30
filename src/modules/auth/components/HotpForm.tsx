'use client';
import { useState } from 'react';
import { Button } from 'src/shared/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'src/shared/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from 'src/shared/components/ui/input-otp';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from 'src/shared/components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';
import { CheckCircledIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { setAuthCookie } from '../../../app/authServer';
import { OtpSchema } from '../schema/auth.schema';
import { type HotpFormProps } from '../types/auth.types';
// import { type RoleRoutes } from 'src/shared/interfaces/users.interface';

const HotpForm = ({
  email,
  title,
  description,
  successTitle,
  successDescription,
  verifyMutation,
  redirectPath,
}: HotpFormProps) => {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof OtpSchema>>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      otp: '',
    },
  });

  // 1. Corregir la función handleSubmit
  const onSubmit = async (formData: z.infer<typeof OtpSchema>) => {
    try {
      const body = {
        email,
        token: formData.otp,
      };

      const response = await verifyMutation.mutateAsync(body);
      console.log('response: ', response);

      if (response.jwt !== null) {
        await setAuthCookie(response.jwt);
        setIsSuccess(true);

        const ROLE_ROUTES = {
          ADMIN: '/dashboard/client',
          ACCOUNTING: '/dashboard/admin',
          CLIENT: '/dashboard/accounting',
        } as const;

        const redirectTo = ROLE_ROUTES[response.role] ?? '/';
        router.push(redirectTo);
      }
    } catch (error) {
      console.error('Error verificando OTP:', error);
    }
  };

  if (isSuccess) {
    return (
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>{successTitle}</CardTitle>
          <CardDescription>{successDescription}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <CheckCircledIcon className="h-16 w-16 text-success" />
          <h5>¡Bienvenido!</h5>
          <p>
            {redirectPath !== undefined
              ? 'Redirigiendo...'
              : 'Ya puedes iniciar sesión en tu cuenta.'}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void form.handleSubmit(onSubmit)(e);
            }}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código OTP</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CardFooter className="w-full mt-4 p-0">
              <Button type="submit" disabled={verifyMutation.isPending}>
                {verifyMutation.isPending ? 'Verificando...' : 'Verificar'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default HotpForm;
