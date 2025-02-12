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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { Separator } from '@components/ui/separator';
import { useToast } from '@components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  SignUpSchemaValidator,
  type TSignUpValidator,
} from '@lib/validators/register-validator';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Icons from 'src/components/Icons';
import { handlerCreateUser } from '../actions';

const RegisterForm = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const { toast } = useToast();

  const form = useForm<TSignUpValidator>({
    resolver: zodResolver(SignUpSchemaValidator),
    defaultValues: {
      email: '',
      password: '',
      address: '',
      name: '',
      phone: '',
      network_manager_user_id: '',
      confirm_password: '',
      dni: '',
    },
  });

  const onSubmit = async (formData: TSignUpValidator) => {
    // TO-DO
    // Make the redirect
    const createUser = await handlerCreateUser(formData);
    if (createUser.type === 'SUCCESS') {
      toast({
        title: createUser.title,
        description: createUser.description,
      });
    } else if (createUser.type === 'ERROR') {
      toast({
        title: createUser.title,
        description: createUser.description,
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

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          {/* Nombre */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel htmlFor="name">Nombre</FormLabel>
                <FormControl>
                  <Input
                    id="name"
                    placeholder="Tu nombre"
                    {...field}
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="text"
                    placeholder="m@example.com"
                    {...field}
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Contraseña */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <div className="flex items-center pb-1">
                  <FormLabel
                    htmlFor="password"
                    className="flex w-full justify-between"
                  >
                    Tu Contraseña
                    <button
                      type="button"
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
                      <span className="font-normal ">Ocultar</span>
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

          {/* Confirmar contraseña */}
          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <div className="flex items-center pb-1">
                  <FormLabel
                    htmlFor="confirm_password"
                    className="flex w-full justify-between"
                  >
                    Confirmar Contraseña
                    <button
                      type="button"
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
                      <span className="font-normal">Ocultar</span>
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

          {/* Tipo de persona */}
          <FormField
            control={form.control}
            name="type_of_person"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Persona</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="NATURAL">Natural</SelectItem>
                    <SelectItem value="JURIDIC">Jurídica</SelectItem>
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

          {/* ID Administrador de red */}
          <FormField
            control={form.control}
            name="network_manager_user_id"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel htmlFor="network_manager_user_id">
                  ID Administrador de Red
                </FormLabel>
                <FormControl>
                  <Input
                    id="network_manager_user_id"
                    type="text"
                    placeholder="123"
                    className="h-12"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* DNI */}
          <FormField
            control={form.control}
            name="dni"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel htmlFor="dni">CI - RIF</FormLabel>
                <FormControl>
                  <Input
                    id="dni"
                    placeholder="12345678"
                    {...field}
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Teléfono */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel htmlFor="phone">Teléfono</FormLabel>
                <FormControl>
                  <Input
                    id="phone"
                    placeholder="+58 123 456 7890"
                    {...field}
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Dirección */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel htmlFor="address">Dirección</FormLabel>
                <FormControl>
                  <Input
                    id="address"
                    placeholder="Tu dirección"
                    {...field}
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Botón de registro */}
        <Button type="submit" className="w-full">
          Registrarse
        </Button>

        {/* Separador */}
        <div className="flex items-center justify-center w-full">
          <Separator className="w-[40%] opacity-35" />
          <span className="px-4">O</span>
          <Separator className="w-[40%] opacity-35" />
        </div>

        {/* Registro con Google */}
        <Button variant="outline" className="w-full">
          <span className="mr-2">
            <Icons.GoogleIconColor className="h-4 w-4" />
          </span>
          Registrarse con Google
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
