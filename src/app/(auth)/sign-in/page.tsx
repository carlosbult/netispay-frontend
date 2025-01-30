/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable @next/next/no-img-element */
import LoginForm from './_components/LoginForm';

const Page = () => {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-screen bg-white">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6 -mt-10">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Log in</h1>
            {/* <p className="text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p> */}
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <a href="/sign-up" className="underline">
                Sign up
              </a>
            </div>
          </div>
          <LoginForm />
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="/img/dino-reichmuth-A5rCN8626Ck-unsplash 1.jpg"
          alt="Image company"
          width="1920"
          height="1080"
          className="h-full w-full object-cover object-left dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default Page;
