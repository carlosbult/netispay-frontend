'use server';

import { type IISPConfig } from '@interfaces/isp';
import { type BankPaymentProduct } from '@interfaces/paymentMethods.interface';
import {
  getPaymentMethods,
  updatePaymentMethod,
} from '@lib/request/bank_request';
import { getIspConfig, updateIspConfig } from '@lib/request/isp_request';
import { requestGetTransaction } from '@lib/request/transactions_request';

export interface IIsp {
  id: number;
  name: string;
  email: string;
  rif: string;
  network_manager_id: number;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
}

//*
//* Get invoices from the API
//*
export const handlerGetMyIspConfig = async (id?: string) => {
  const response = await getIspConfig(id);
  return response;
};

//*
//* Get bank payment methods from the API
//*
export const handlerGetPaymentMethods = async () => {
  const response = await getPaymentMethods();
  return response;
};

//*
//* Update isp config
//*
export const handlerUpdateIspConfig = async (
  data: Partial<IISPConfig>,
  id: string,
) => {
  const response = await updateIspConfig(data, id);
  return response;
};
//*
//* Update bank product
//*
export const handlerUpdateBankProduct = async (
  data: Partial<BankPaymentProduct>,
  id: string,
) => {
  const response = await updatePaymentMethod(data, id);
  return response;
};

//*
//* Get Transactions
//*
export const handlerGetTransactions = async (limit: number, offset: number) => {
  const response = await requestGetTransaction({
    limit,
    offset,
  });
  if (response == null) {
    return {
      transactions: [],
    };
  }
  if ('errorCode' in response) {
    return {
      transactions: [],
    };
  }
  return response;
};
