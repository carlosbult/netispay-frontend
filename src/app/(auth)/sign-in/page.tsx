/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import LoginForm from './_components/LoginForm';

const Page = () => {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-screen bg-background">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6 -mt-10">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Iniciar sesión</h1>
            {/* <p className="text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p> */}
            <div className="mt-4 text-center text-sm">
              Aun no tienes una cuenta?{' '}
              <Link href="/sign-up" className="underline">
                Registrarse
              </Link>
            </div>
          </div>
          <LoginForm />
        </div>
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
