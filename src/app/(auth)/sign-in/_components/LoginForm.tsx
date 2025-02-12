/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { Separator } from '@components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  loginSchemaValidator,
  type TLoginSchemaValidator,
} from '@lib/validators/login-validator';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Icons from 'src/components/Icons';
import { useSessionLogin } from 'src/hooks/use-session-login';

const LoginForm = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();
  const signIn = useSessionLogin();
  const form = useForm<TLoginSchemaValidator>({
    resolver: zodResolver(loginSchemaValidator),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  if (signIn.isSuccess) {
    const isValid = signIn.data.data;
    if (isValid != null) {
      if (signIn.data.data.session.userRole === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/overview');
      }
    }
  }

  const onSubmit = async (formData: TLoginSchemaValidator) => {
    try {
      signIn.mutate(formData);
    } catch (error) {
      console.log(error);
    }
    // const result = await loginAction(formData);

    // if (result.success) {
    //   // Type narrowing - TypeScript knows result.data is ILoginResponseSuccessfully
    //   console.log(
    //     `Login successful! Session expires at ${result.data.data.session.expiresAt}`,
    //   );
    //   // Handle successful login
    // } else {
    //   // Type narrowing - TypeScript knows result.error is string
    //   console.error(`Login failed: ${result.error}`);
    //   // Handle error
    // }
  };

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel htmlFor="email" className="font-normal ">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    // required
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
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <div className="flex items-center pb-1">
                  <FormLabel
                    htmlFor="password"
                    className="font-normal flex w-full justify-between"
                  >
                    Tu Contraseña
                    <button
                      className="flex items-center justify-center"
                      onClick={() => {
                        setPasswordVisible((prev) => !prev);
                      }}
                    >
                      {isPasswordVisible ? (
                        <EyeIcon className="w-4 h-4 mr-1" />
                      ) : (
                        <EyeOffIcon className="w-4 h-4 mr-1" />
                      )}
                      Ocultar
                    </button>
                  </FormLabel>
                </div>
                <FormControl>
                  <Input
                    id="password"
                    type={!isPasswordVisible ? 'password' : 'text'}
                    placeholder="***********"
                    // required
                    className="h-12"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Link
          href="/forgot-password"
          className="ml-auto inline-block text-sm underline "
        >
          Olvidaste tu contraseña?
        </Link>
        <Button type="submit" className="w-full">
          Iniciar
        </Button>
        <div className="flex items-center justify-center w-full">
          <Separator className=" w-[40%] opacity-35" />
          <span className="px-4">O</span>
          <Separator className=" w-[40%] opacity-35" />
        </div>
        <Button variant="outline" className="w-full">
          <span className="mr-2">
            <Icons.GoogleIconColor className="h-4 w-4" />
          </span>
          Iniciar con Google
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
