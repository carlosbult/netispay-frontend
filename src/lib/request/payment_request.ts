/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type ApiErrorResponse,
  type CustomApiError,
} from '@interfaces/errors.interface';
import {
  type ICalculateMontToPay,
  type IPayInvoiceGeneric,
  type IPaymentResponse,
  type IPaymentResult,
} from '@interfaces/payment';
import { getSessionTokenOnServer } from '@lib/auth';
import { API_BASE_URL, ApiService } from './apiRequest';

const api = new ApiService(API_BASE_URL);

export interface IMontToPay {
  amountUSD: number;
  bankProductId: number;
}

// interface ICalculateMontToPayResponse {
//   amountUSD: number;
//   bankProductId: number;
//   commission: number;
// }

export async function calculateMontToPay(
  commission: IMontToPay,
): Promise<ICalculateMontToPay | ApiErrorResponse | CustomApiError | null> {
  try {
    const token = await getSessionTokenOnServer();
    if (token == null) {
      return null;
    }
    const response = await api.post<ICalculateMontToPay>(
      `/currency-rates/payment-calculator`,
      commission,
      {
        Cookie: `${token.name}=${token.value}`,
      },
    );
    return response;
  } catch (error) {
    console.error('Error update the isp commission', error);
    return null;
  }
}

export async function payInvoice(
  data: IPayInvoiceGeneric,
): Promise<IPaymentResponse | IPaymentResult | null> {
  try {
    const token = await getSessionTokenOnServer();
    if (token == null) {
      return null;
    }
    const response = await api.post<IPaymentResponse | IPaymentResult>(
      `/invoices/payInvoice`,
      data,
      {
        Cookie: `${token.name}=${token.value}`,
      },
    );
    return response;
  } catch (error) {
    console.error('Error paying the invoice', error);
    return null;
  }
}
