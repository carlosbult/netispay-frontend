/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type ApiErrorResponse,
  type CustomApiError,
} from '@interfaces/errors.interface';
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
): Promise<any | ApiErrorResponse | CustomApiError | null> {
  try {
    const response = await api.post<any>(
      `/currency-rates/payment-calculator`,
      commission,
    );
    return response;
  } catch (error) {
    console.error('Error update the isp commission', error);
    return null;
  }
}
