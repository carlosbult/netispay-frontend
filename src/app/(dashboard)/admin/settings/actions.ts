'use server';

import { type ApiErrorResponse } from '@interfaces/errors.interface';
import { type BankPaymentProduct } from '@interfaces/paymentMethods.interface';
import { requestGetTransaction } from '@lib/request/server/getTransactions';
import updateBankProduct from '@lib/request/server/updateBankProduct';
import updateIspConfig from '@lib/request/server/updateIspConfig';

export interface IBankPaymentMethodResponseSuccessfully {
  products: {
    BANK_TRANSFER: BankPaymentProduct[];
  };
}

type IBankPaymentMethodResponse =
  | ApiErrorResponse
  | IBankPaymentMethodResponseSuccessfully;

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

export interface IISPConfig {
  id: number;
  name: string;
  api_url: string;
  api_key: string;
  isp: IIsp[];
}

type IResponseSuccessfully = ApiErrorResponse | (IISPConfig[] | IISPConfig);

//*
//* Constants
//*
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
//*
//* Get invoices from the API
//*
export const handlerGetMyIspConfig = async (id?: string) => {
  let url = `${baseUrl}/settings/network-manager`;
  if (id != null) {
    url = `${url}/${id}`;
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorResponse: ApiErrorResponse = await response.json();
    return errorResponse;
  }

  const successfullyResponse: IResponseSuccessfully = await response.json();
  return successfullyResponse;
};

//*
//* Get bank payment methods from the API
//*
export const handlerGetPaymentMethods =
  async (): Promise<IBankPaymentMethodResponse> => {
    const url = `${baseUrl}/bank-products`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorResponse: ApiErrorResponse = await response.json();
      return errorResponse;
    }

    const successfullyResponse: IBankPaymentMethodResponseSuccessfully =
      await response.json();
    return successfullyResponse;
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
  const response = await updateBankProduct(data, id);
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
  return response;
};
