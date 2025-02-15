import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { cn } from '@lib/utils';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import MaxWidthWrapper from 'src/components/MaxWidthWrapper';
import BillingCardContainer from './_components/BillingCardContainer';
import History from './_components/History';
import StepByStepPayment from './_components/StepByStepPayment';
import {
  handlerGetInvoices,
  handlerGetPaymentMethods,
  handlerGetUserSession,
} from './action';

const ClientPage = async ({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) => {
  const user = await handlerGetUserSession();
  console.log('user:', user);
  if (user == null) {
    return <div>Error fetching user session</div>;
  }
  const invoices = await handlerGetInvoices(user.user.id.toString(), '1');
  const allInvoices = await handlerGetInvoices(user.user.id.toString());
  const bankPaymentProducts = await handlerGetPaymentMethods();
  const bankPaymentMethods =
    typeof bankPaymentProducts === 'object' && 'products' in bankPaymentProducts
      ? bankPaymentProducts.products.BANK_TRANSFER
      : null;

  console.log(invoices);
  console.log(bankPaymentMethods);
  console.log('all invoices', allInvoices);

  if ('errorCode' in invoices) {
    // console.error('Error fetching invoices:', result.message);
    if (invoices.message === 'No existe ninguna factura.') {
      return (
        <MaxWidthWrapper>
          <div className="w-full min-h-screen flex items-center justify-center">
            <div className="-mt-14 max-w-[500px] mx-auto w-full space-y-4 px-2">
              <h1 className="text-2xl font-bold text-center">
                ¡No tienes facturas pendientes!
              </h1>
              <p className="text-muted-foreground md:text-pretty text-center">
                Todo está en orden. Actualmente no tienes facturas pendientes de
                pago en tu servicio de internet.
              </p>
              <p className="text-muted-foreground text-pretty text-center">
                Si esperabas ver una factura aquí, verifica tu historial de
                pagos o contacta con nuestro soporte.
              </p>

              <div className="w-full flex justify-center">
                <Link
                  href="/invoices-history"
                  className={cn(buttonVariants({ variant: 'link' }))}
                >
                  Ver historial <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      );
    }
    return <div>Error fetching invoices</div>;
  } else {
    // console.log('Invoices fetched successfully:', result.invoices);
    return (
      <div className="flex flex-col w-full h-full">
        <MaxWidthWrapper className="grid grid-cols-2 gap-10 pt-6">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Pick your billing</CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BillingCardContainer invoices={invoices.invoices} />
            </CardContent>
            <CardFooter>
              {'errorCode' in allInvoices ? (
                <div>
                  <p className="text-red-500">Error fetching invoices</p>
                </div>
              ) : (
                <History invoices={allInvoices.invoices} />
              )}
            </CardFooter>
          </Card>
          <StepByStepPayment bankProducts={bankPaymentMethods ?? []} />
        </MaxWidthWrapper>
      </div>
    );
  }
};

export default ClientPage;
