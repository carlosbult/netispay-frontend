import { ApiService, API_BASE_URL } from '@services/api/api.service';
import {
  type getBankProductParams,
  type BankProductsResponse,
} from '../types/paymentProducts.interface';
import {
  type PaymentCalculatorRequest,
  type PaymentCalculatorResponse,
} from '../types/paymentCalculation.interface';
import {
  type ProcessPaymentRequest,
  type ProcessPaymentResponse,
} from '../types/payment.types';

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
