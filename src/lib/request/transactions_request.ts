import {
  type ApiErrorResponse,
  type CustomApiError,
} from '@interfaces/errors.interface';
import { type IInvoiceResponseSuccessfully } from '@interfaces/invoice.interface';
import { type ITransactionResponseSuccessfully } from '@interfaces/transactions';
import { getSessionTokenOnServer } from '@lib/auth';
import { API_BASE_URL, ApiService } from './apiRequest';

const api = new ApiService(API_BASE_URL);

export async function requestGetTransaction(params: {
  limit: number;
  offset: number;
}): Promise<
  ITransactionResponseSuccessfully | ApiErrorResponse | CustomApiError | null
> {
  try {
    const token = await getSessionTokenOnServer();
    if (token == null) {
      return null;
    }
    const path = '/invoices/transactions';
    const { limit, offset } = params;
    const url = new URL(`${path}`);
    url.searchParams.append('limit', limit.toString());
    url.searchParams.append('offset', offset.toString());
    console.log('url', url.toString());
    const response = await api.get<ITransactionResponseSuccessfully>(
      url.toString(),
      undefined,
      {
        Cookie: `${token.name}=${token.value}`,
      },
    );
    return response;
  } catch (error) {
    console.error('Error when get the transactions', error);
    return null;
  }
}

export async function requestGetInvoices(params: {
  userId: string;
  status?: string;
}): Promise<
  IInvoiceResponseSuccessfully | ApiErrorResponse | CustomApiError | null
> {
  try {
    const token = await getSessionTokenOnServer();
    if (token == null) {
      return null;
    }
    const path = '/invoices';
    const { userId, status } = params;
    const url = new URL(`${path}`);
    url.searchParams.append('user_id', userId.toString());
    if (status != null) {
      url.searchParams.append('status', status.toString());
    }
    console.log('url', url.toString());
    const response = await api.get<IInvoiceResponseSuccessfully>(
      url.toString(),
      undefined,
      {
        Cookie: `${token.name}=${token.value}`,
      },
    );
    return response;
  } catch (error) {
    console.error('Error when get the invoices', error);
    return null;
  }
}
