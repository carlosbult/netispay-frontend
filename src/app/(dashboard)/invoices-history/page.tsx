import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import MaxWidthWrapper from 'src/components/MaxWidthWrapper';
import InvoiceDialog from '../overview/_components/ViewFullDetailsTransaction';
import { handlerGetInvoices, handlerGetUserSession } from '../overview/action';

const page = async () => {
  const user = await handlerGetUserSession();
  if (user == null) {
    return <div>Error fetching user session</div>;
  }
  const invoices = await handlerGetInvoices(user.user.id.toString());

  if ('errorCode' in invoices) {
    return <div>Error fetching invoices</div>;
  }

  return (
    <MaxWidthWrapper className="pt-20">
      <div className="h-full w-full">
        <div className="w-full h-full flex justify-center flex-col items-center">
          <h2 className="text-xl font-bold">Transaction History</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Currency</TableHead>
                <TableHead className="sr-only">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.invoices.map((invoice) => (
                <TableRow key={invoice.invoiceId}>
                  <TableCell className="font-medium">
                    {invoice.dueDate}
                  </TableCell>
                  <TableCell>{invoice.status}</TableCell>
                  <TableCell className="text-right">{invoice.total}</TableCell>
                  <TableCell className="text-right">USD</TableCell>
                  <TableCell className="text-right">
                    {/* <button className="hover:text-primary group transition-colors duration-300">
                  <SquareArrowOutUpRight className="w-4 h-4" />
                  </button> */}

                    <InvoiceDialog invoice={invoice} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
