import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { DataTable } from 'src/app/(dashboard)/admin/_components/DataTable';
import MaxWidthWrapper from 'src/components/MaxWidthWrapper';
import { formatCurrency } from 'src/lib/fomartCurrency';
import { handlerGetTransactions } from './settings/actions';

const Page = async () => {
  const payments = await handlerGetTransactions(10, 1);
  // const [selectedPayment, setSelectedPayment] = useState<Transaction | null>(
  //   null,
  // );
  if ('errorCode' in payments) {
    return <div>Error: {payments.message}</div>;
  }
  return (
    // <div className="h-screen flex flex-col p-2 gap-4">
    <MaxWidthWrapper className="space-y-4">
      {/* <div className="flex justify-between items-center pt-4">
        <h1 className="text-3xl font-bold">Pagos</h1>
        <div className="flex items-center space-x-4">
          <Button variant="outline">
            <Banknote className="mr-2 h-4 w-4" />
            Moneda
          </Button>
          <Button variant="outline">
            <Landmark className="mr-2 h-4 w-4" />
            Banco
          </Button>
          <Button variant="outline">
            <CreditCard className="mr-2 h-4 w-4" />
            Producto bancario
          </Button>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Fecha
          </Button>
        </div>
      </div> */}

      <div className="grid md:grid-cols-5 grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">127</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Exitosos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">120</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Errores</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">7</p>
          </CardContent>
        </Card>
        <Card className=" col-span-2 ">
          <CardHeader>
            <CardTitle>Total ingresado</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between">
            <p className="text-xl font-bold">
              {formatCurrency(2454653, 'VES')}
            </p>
            <p className="text-xl font-bold">{formatCurrency(17456, 'USD')}</p>
          </CardContent>
        </Card>
      </div>

      <div
      // className={`grid transition-all duration-300 ${
      //   selectedPayment !== null ? 'grid-cols-[3fr_1fr]' : 'grid-cols-1'
      // } gap-4 overflow-hidden`}
      >
        {/* Panel izquierdo con la tabla */}
        <DataTable
          // columns={columns}
          data={payments.transactions}
          // onRowClick={(payment) => {
          //   setSelectedPayment(payment);
          // }}
        />

        {/* Panel derecho con detalles */}
        {/* {selectedPayment !== null && (
          <PaymentDetails
            payment={selectedPayment}
            onClose={() => {
              setSelectedPayment(null);
            }}
          />
        )} */}
      </div>
    </MaxWidthWrapper>
  );
};
export default Page;
