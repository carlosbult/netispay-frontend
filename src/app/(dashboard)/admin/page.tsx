import { DataTable } from 'src/app/(dashboard)/admin/_components/DataTable';
import MaxWidthWrapper from 'src/components/MaxWidthWrapper';
import { handlerGetTransactions } from './settings/actions';

const Page = async () => {
  const payments = await handlerGetTransactions(10, 1);

  return (
    <MaxWidthWrapper className="space-y-4">
      <div className="w-full ">
        {payments.transactions.length > 0 ? (
          <DataTable data={payments.transactions} />
        ) : (
          <div className="text-center flex justify-center items-center h-[300px]">
            <span>No se encontraron Transacciones registradas</span>
          </div>
        )}
      </div>
    </MaxWidthWrapper>
  );
};
export default Page;
