'use client';

import { usePayInvoiceStore } from '@/store/use-payment';
import { useEffect } from 'react';

interface IUpdateStorageComponentProps {
  data: Array<{ key: string; value: string }>;
}

const UpdateStorageComponent = ({ data }: IUpdateStorageComponentProps) => {
  const { addClientBalance } = usePayInvoiceStore();
  useEffect(() => {
    if (data == null) return;
    data.forEach((item) => {
      if (item.key === 'user-balance') {
        const balance = Number(item.value);
        if (balance > 0) {
          addClientBalance(balance);
        }
      } else {
        localStorage.setItem(item.key, item.value);
      }
    });
  }, [data]);

  return null;
};

export default UpdateStorageComponent;
