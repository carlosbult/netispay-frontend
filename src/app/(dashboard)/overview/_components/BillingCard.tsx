'use client';

import { useInvoiceSelection } from '@/store/useInvoiceSelection';
import { CheckIcon, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { type Invoice } from 'src/interfaces/invoice.interface';
import { cn } from 'src/lib/utils';

// interface IBillingCard {
//   id: string;
//   startDate: string;
//   endDate: string;
//   amount: number;
//   currency: string;
// }

interface IBillingCardProps {
  invoice: Invoice;
}

const BillingCard = (props: IBillingCardProps) => {
  const { invoice } = props;
  const { setSelectedInvoices, selectedInvoices, removeInvoices } =
    useInvoiceSelection();
  const [cardSelected, setCardSelected] = useState(false);

  const handlerClick = () => {
    if (cardSelected) {
      removeInvoices([invoice]);
      console.log('remove', invoice);
    } else {
      setSelectedInvoices([invoice]);
      console.log('add', invoice);
    }
  };

  useEffect(() => {
    if (selectedInvoices.length > 0) {
      const findInvoice = selectedInvoices.find(
        (selectedInvoice) => selectedInvoice.invoiceId === invoice.invoiceId,
      );
      if (findInvoice != null) {
        setCardSelected(true);
      } else {
        setCardSelected(false);
      }
    } else {
      setCardSelected(false);
    }
  }, [selectedInvoices]);

  return (
    <button
      className={cn(
        `p-2 flex items-center justify-between flex-col border w-full max-w-[200px]  rounded-xl group duration-300 transition-all 
      ${cardSelected ? 'border-primary hover:border-border ' : 'border-border hover:border-primary'}
      active:scale-[0.98] active:duration-75 `,
      )}
      onClick={handlerClick}
    >
      <span className="flex justify-between items-center w-full">
        <span
          className={cn(
            `group-hover:text-primary duration-300 transition-all ${cardSelected ? 'text-primary group-hover:text-foreground' : ''}`,
          )}
        >
          {invoice.dueDate}
        </span>
        <i
          className={cn(
            `h-6 w-6 rounded-full bg-primary flex justify-center items-center transition-all duration-300 ${cardSelected ? 'opacity-100 group-hover:bg-foreground' : 'opacity-0 group-hover:opacity-100'}`,
          )}
        >
          <CheckIcon
            className={cn(
              `h-4 w-4 text-white transition-all duration-300  ${cardSelected ? 'group-hover:opacity-0  group-hover:h-0 group-hover:w-0 group-hover:hidden animate-appear' : ''}`,
            )}
          />
          <X
            className={cn(
              `h-4 w-4 text-white opacity-0 hidden transition-all duration-500 animate-appear  ${cardSelected ? 'group-hover:opacity-100 group-hover:h-4 group-hover:w-4 group-hover:block ' : ''}`,
            )}
          />
        </i>
      </span>
      <span
        className={cn(
          `text-2xl font-bold mt-2 duration-300 transition-all  ${cardSelected ? 'group-hover:text-foreground text-primary' : 'group-hover:text-primary'}`,
        )}
      >
        $ {invoice.total}
      </span>
    </button>
  );
};
export default BillingCard;
