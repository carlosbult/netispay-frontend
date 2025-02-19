import {
  CustomApiError,
  type ApiErrorResponse,
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
    const queryParams: Record<string, string> = {
      limit: limit.toString(),
      offset: offset.toString(),
    };
    const response = await api.get<ITransactionResponseSuccessfully>(
      path,
      queryParams,
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

    const { userId, status } = params;
    const queryParams: Record<string, string> = { id: userId };

    if (status != null) {
      queryParams.status = status;
    }

    const response = await api.get<IInvoiceResponseSuccessfully>(
      '/invoices',
      queryParams, // Parámetros se envían aquí
      {
        Cookie: `${token.name}=${token.value}`,
      },
    );

    console.log('response de invoices', response);

    return response;
  } catch (error) {
    console.error('Error when get the invoices', error);
    if (error instanceof CustomApiError) {
      return error;
    }
    return null;
  }
}
