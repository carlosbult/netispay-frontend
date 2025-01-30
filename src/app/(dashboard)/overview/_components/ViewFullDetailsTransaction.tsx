'use client';
import { Badge } from '@components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { type Invoice } from '@interfaces/invoice.interface';
import {
  CalendarIcon,
  CreditCardIcon,
  ReceiptIcon,
  SquareArrowOutUpRight,
} from 'lucide-react';
import { useState } from 'react';

interface IViewFullDetailsTransactionProps {
  invoice: Invoice;
}

interface Transaction {
  transactionId: number;
  paymentDate: string;
  amount: number;
  paymentMethod: string;
  reference: string;
  commission: number;
  description: string;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const formatDate = (dateString: string) => {
  if (dateString === '0000-00-00') return 'Not paid';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const TransactionsTable = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  if (transactions.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        No transactions recorded for this invoice.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Method</TableHead>
          <TableHead>Reference</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.transactionId}>
            <TableCell>{transaction.transactionId}</TableCell>
            <TableCell>{formatDate(transaction.paymentDate)}</TableCell>
            <TableCell>{formatCurrency(transaction.amount)}</TableCell>
            <TableCell>{transaction.paymentMethod}</TableCell>
            <TableCell>{transaction.reference}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const InvoiceDialog = (props: IViewFullDetailsTransactionProps) => {
  const { invoice } = props;
  const [isOpen, setIsOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pagado':
        return 'bg-green-500';
      case 'no pagado':
        return 'bg-red-500';
      default:
        return 'bg-yellow-500';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="hover:text-primary group transition-colors duration-300">
          <SquareArrowOutUpRight className="w-4 h-4" />
        </button>
        {/* <Button variant="outline">View Invoice #{invoice.invoiceId}</Button> */}
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Invoice #{invoice.invoiceId}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Invoice Details</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-2 gap-2 text-sm">
                  <dt className="font-medium">Status</dt>
                  <dd>
                    <Badge className={getStatusColor(invoice.status ?? '')}>
                      {invoice.status}
                    </Badge>
                  </dd>
                  <dt className="font-medium">Client ID</dt>
                  <dd>{invoice.clientId}</dd>
                  <dt className="font-medium">Payment Method</dt>
                  <dd>{invoice.paymentMethod ?? 'Not specified'}</dd>
                  <dt className="font-medium">Reference</dt>
                  <dd>{invoice.reference ?? 'N/A'}</dd>
                </dl>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Dates</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-2 gap-2 text-sm">
                  <dt className="font-medium">Issue Date</dt>
                  <dd>{formatDate(invoice.issueDate)}</dd>
                  <dt className="font-medium">Due Date</dt>
                  <dd>{formatDate(invoice.dueDate)}</dd>
                  <dt className="font-medium">Payment Date</dt>
                  <dd>
                    {invoice.paymentDate != null
                      ? formatDate(invoice.paymentDate)
                      : 'Not paid yet'}
                  </dd>
                </dl>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Financial Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                <div className="flex-col space-y-2">
                  <div className="flex items-center gap-2">
                    <ReceiptIcon className="h-4 w-4" />
                    <dt className="font-medium">Subtotal</dt>
                  </div>
                  <dd>{formatCurrency(invoice.subTotal)}</dd>
                </div>
                <div className="flex-col space-y-2">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    <dt className="font-medium">Tax</dt>
                  </div>
                  <dd>
                    {invoice.tax != null ? formatCurrency(invoice.tax) : ''}
                  </dd>
                </div>
                <div className="flex-col space-y-2">
                  <div className="flex items-center gap-2">
                    <CreditCardIcon className="h-4 w-4" />
                    <dt className="font-medium">Total</dt>
                  </div>
                  <dd className="font-bold">{formatCurrency(invoice.total)}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              {invoice.transactions != null &&
              invoice.transactions.length > 0 ? (
                <TransactionsTable transactions={invoice.transactions} />
              ) : (
                <p className="text-sm text-gray-500">
                  No transactions recorded for this invoice.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceDialog;
