'use client';

import { buttonVariants } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { type Invoice } from '@interfaces/invoice.interface';
import { cn } from '@lib/utils';
import { ChevronRight, ChevronsDown } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import InvoiceDialog from './ViewFullDetailsTransaction';

interface IHistoryProps {
  invoices: Invoice[];
}

const History = (props: IHistoryProps) => {
  const { invoices } = props;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-center">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="hover:text-primary group transition-colors duration-300 flex flex-col justify-center items-center"
        >
          View history
          <ChevronsDown className="group-hover:animate-bounce mt-2 -translate-y-[25%] " />
        </button>
      </div>

      {isOpen && (
        <div className="h-full max-h-[400px] w-full">
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
                {invoices.slice(0, 4).map((invoice) => (
                  <TableRow key={invoice.invoiceId}>
                    <TableCell className="font-medium">
                      {invoice.dueDate}
                    </TableCell>
                    <TableCell>{invoice.status}</TableCell>
                    <TableCell className="text-right">
                      {invoice.total}
                    </TableCell>
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
            <div className="w-full flex justify-center items-center py-2">
              <Link
                href="/invoices-history"
                className={cn(buttonVariants({ variant: 'link' }))}
              >
                View history <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
