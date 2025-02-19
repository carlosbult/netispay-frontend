import { API_BASE_URL, ApiService } from '@lib/request/apiRequest';
import {
  type ProcessPaymentRequest,
  type ProcessPaymentResponse,
} from '../types/payment.types';
import {
  type PaymentCalculatorRequest,
  type PaymentCalculatorResponse,
} from '../types/paymentCalculation.interface';
import {
  type BankProductsResponse,
  type getBankProductParams,
} from '../types/paymentProducts.interface';

const apiService = new ApiService(API_BASE_URL);

export const bankProductsService = {
  getBankProducts: async (params: getBankProductParams) =>
    await apiService.get<BankProductsResponse>('/bank-products', {
      ...params,
    }),

  calculatePayment: async (data: PaymentCalculatorRequest) =>
    await apiService.post<PaymentCalculatorResponse>(
      '/currency-rates/payment-calculator',
      data,
    ),

  processPayment: async (data: ProcessPaymentRequest) =>
    await apiService.post<ProcessPaymentResponse>('/users/payInvoice', data),
};
