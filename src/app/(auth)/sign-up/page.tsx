/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable @next/next/no-img-element */

import { ScrollArea } from '@components/ui/scroll-area';
import Link from 'next/link';
import RegisterForm from './_components/RegisterForm';

const Page = () => {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-screen bg-background">
      <div className="flex items-center justify-center pr-2 pt-16">
        <ScrollArea className="h-[82vh] pr-4 w-full ">
          <div className="mx-auto grid w-full pl-4 md:pl-0 md:w-[450px] gap-6 py-12">
            <div className="grid gap-2 ">
              <h1 className="text-3xl text-center font-black">Registrarse</h1>
              <div className="mt-4 text-center text-sm">
                Ya tienes una cuenta?{' '}
                <Link href="/sign-in" className="underline">
                  Iniciar sesión
                </Link>
              </div>
            </div>
            <RegisterForm />
          </div>
        </ScrollArea>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="/img/loginImg2.jpg"
          alt="Image company"
          width="1920"
          height="1080"
          className="h-full w-full object-cover object-center dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default Page;
