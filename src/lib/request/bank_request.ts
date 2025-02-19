import {
  type ApiErrorResponse,
  type CustomApiError,
} from '@interfaces/errors.interface';
import {
  type BankPaymentProduct,
  type IBankPaymentMethodResponseSuccessfully,
  type IBankPaymentProductAdapter,
} from '@interfaces/paymentMethods.interface';
import { getSessionTokenOnServer } from '@lib/auth';
import { API_BASE_URL, ApiService } from './apiRequest';

const api = new ApiService(API_BASE_URL);

export async function getPaymentMethods(): Promise<
  | IBankPaymentMethodResponseSuccessfully
  | ApiErrorResponse
  | CustomApiError
  | null
> {
  try {
    const token = await getSessionTokenOnServer();
    if (token == null) {
      return null;
    }
    const response = await api.get<IBankPaymentMethodResponseSuccessfully>(
      '/bank-products',
      undefined,
      {
        Cookie: `${token.name}=${token.value}`,
      },
    );
    return response;
  } catch (error) {
    console.error('Error get the payment methods', error);
    return null;
  }
}

export async function updatePaymentMethod(
  data: Partial<IBankPaymentProductAdapter>,
  id: string,
): Promise<BankPaymentProduct | ApiErrorResponse | CustomApiError | null> {
  try {
    const token = await getSessionTokenOnServer();
    if (token == null) {
      return null;
    }
    const response = await api.patch<BankPaymentProduct>(
      `/bank-products/${id}`,
      data,
      {
        Cookie: `${token.name}=${token.value}`,
      },
    );
    return response;
  } catch (error) {
    console.error('Error update the payment method', error);
    return null;
  }
}
