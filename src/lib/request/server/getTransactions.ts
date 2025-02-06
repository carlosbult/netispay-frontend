import { type ApiErrorResponse } from '@interfaces/errors.interface';
import {
  generateFakeTransactions,
  type Transaction,
} from 'src/app/(dashboard)/admin/_components/fakeData';

interface ITransactionResponseSuccessfully {
  transactions: Transaction[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

type TResponseRequestGetTransaction =
  | ITransactionResponseSuccessfully
  | ApiErrorResponse;

export const requestGetTransaction = async (params: {
  limit: number;
  offset: number;
}): Promise<TResponseRequestGetTransaction> => {
  const { limit, offset } = params;
  const baseUrl = process.env.BASE_API_URL;
  const url = new URL(`${baseUrl}/invoices/transactions`);
  console.log('baseUrl', url);
  url.searchParams.append('limit', limit.toString());
  url.searchParams.append('offset', offset.toString());

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json();
    if (response.status === 401) {
      console.error('Unauthorized: ', errorData.message);
      throw new Error(`Unauthorized: ${errorData.message}`);
    }
    console.error('API Error: ', errorData);
    throw new Error(`API Error: ${errorData.message}`);
  }

  const data: ITransactionResponseSuccessfully = await response.json();
  data.transactions = generateFakeTransactions(limit);
  return data;
};
