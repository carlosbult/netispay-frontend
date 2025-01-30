'use client';

import { type Invoice } from '@interfaces/invoice.interface';
import BillingCard from './BillingCard';

interface IBillingCardContainerProps {
  invoices: Invoice[];
}

const BillingCardContainer = (props: IBillingCardContainerProps) => {
  const { invoices } = props;
  return (
    <div className="flex w-full gap-6 flex-shrink-0">
      {invoices.map((element) => (
        <BillingCard key={element.invoiceId} invoice={element} />
      ))}
    </div>
  );
};

export default BillingCardContainer;
