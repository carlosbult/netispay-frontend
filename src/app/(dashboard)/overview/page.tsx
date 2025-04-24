import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { ScrollArea } from '@components/ui/scroll-area';
import { cn } from '@lib/utils';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import MaxWidthWrapper from 'src/components/MaxWidthWrapper';
import UpdateStorageComponent from '../../../components/UdapteStorageComponent';
import BillingCardContainer from './_components/BillingCardContainer';
import History from './_components/History';
import PaymentDetailsCard from './_components/PaymentDetailsCard';
import StepByStepPayment from './_components/StepByStepPayment';
import {
  handlerGetInvoices,
  handlerGetPaymentMethods,
  handlerGetUserBalance,
  handlerGetUserSession,
} from './action';

const ClientPage = async ({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) => {
  const user = await handlerGetUserSession();

  if (user == null) {
    return <div>Error fetching user session</div>;
  }
  const invoices = await handlerGetInvoices(user.user.id.toString(), '1');
  const allInvoices = await handlerGetInvoices(user.user.id.toString());
  const clientBalance = await handlerGetUserBalance(user.user.id);
  const bankPaymentProducts = await handlerGetPaymentMethods();
  const bankPaymentMethods =
    typeof bankPaymentProducts === 'object' &&
    bankPaymentProducts != null &&
    'products' in bankPaymentProducts
      ? bankPaymentProducts.products.BANK_TRANSFER
      : null;

  if (invoices == null) {
    return (
      <MaxWidthWrapper className="flex items-center justify-center">
        <div className="w-full min-h-screen flex items-center justify-center">
          <div className="-mt-14 max-w-[500px] mx-auto w-full space-y-4 px-2">
            <h1 className="text-2xl font-bold text-center">
              ¡Ocurrió un error!
            </h1>
            <p className="text-muted-foreground md:text-pretty text-center">
              Hubo un error al cargar las facturas. Por favor, intenta
              nuevamente.
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
    );
  }

  if ('errorCode' in invoices) {
    // console.error('Error fetching invoices:', result.message);
    if (invoices.message === 'No existe ninguna factura.') {
      return (
        <MaxWidthWrapper>
          <UpdateStorageComponent
            data={[
              {
                key: 'user-balance',
                value: clientBalance?.totalBalance.toString() ?? '0',
              },
            ]}
          />
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
        <UpdateStorageComponent
          data={[
            {
              key: 'user-balance',
              value: clientBalance?.totalBalance.toString() ?? '0',
            },
          ]}
        />
        {/* <ScrollArea className="h-[90vh] w-full"> */}
        <MaxWidthWrapper className="flex gap-10 pt-6">
          <div className="space-y-8 w-[50%]">
            <Card className="h-fit">
              <CardContent>
                <div className="flex flex-col gap-2 pt-4">
                  <div className="flex justify-between gap-2">
                    <p>Nombre: </p> {user.user.client_profile?.name}
                  </div>

                  <p>
                    ID Mikrowisp:{' '}
                    {user.user.client_profile?.network_manager_user_id}
                  </p>
                  <p>DNI: {user.user.client_profile?.dni}</p>
                  <p>Email: {user.user.email}</p>
                  <p>Teléfono: {user.user.client_profile?.phone}</p>
                </div>
              </CardContent>
            </Card>

            {/* <Card className="h-fit">
                <CardHeader>
                  <CardTitle>Selecciona tus facturas</CardTitle>
                  <CardDescription>
                    Aquí puedes ver y seleccionar las facturas que deseas pagar.
                    Revisa los detalles y procede con el pago de forma segura y
                    rápida.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <BillingCardContainer invoices={invoices.invoices} />
                </CardContent>
                <CardFooter>
                  {allInvoices == null || 'errorCode' in allInvoices ? (
                    <div>
                      <p className="text-red-500">
                        Hubo un error al cargar las facturas. Por favor, intenta
                        nuevamente.
                      </p>
                    </div>
                  ) : (
                    <History invoices={allInvoices.invoices} />
                  )}
                </CardFooter>
              </Card> */}
            <PaymentDetailsCard />
          </div>
          <div className="w-[50%]">
            <ScrollArea className="h-[90vh] w-full">
              <Card className="h-fit mb-10">
                <CardHeader>
                  <CardTitle>Selecciona tus facturas</CardTitle>
                  <CardDescription>
                    Aquí puedes ver y seleccionar las facturas que deseas pagar.
                    Revisa los detalles y procede con el pago de forma segura y
                    rápida.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <BillingCardContainer invoices={invoices.invoices} />
                </CardContent>
                <CardFooter>
                  {allInvoices == null || 'errorCode' in allInvoices ? (
                    <div>
                      <p className="text-red-500">
                        Hubo un error al cargar las facturas. Por favor, intenta
                        nuevamente.
                      </p>
                    </div>
                  ) : (
                    <History invoices={allInvoices.invoices} />
                  )}
                </CardFooter>
              </Card>
              <StepByStepPayment bankProducts={bankPaymentMethods ?? []} />
            </ScrollArea>
          </div>
        </MaxWidthWrapper>
        {/* </ScrollArea> */}
      </div>
    );
  }
};

export default ClientPage;
