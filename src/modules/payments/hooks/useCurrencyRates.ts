import { useQuery } from '@tanstack/react-query';
import { bankProductsService } from '../api/bankProducts.service';
import {
  type PaymentCalculatorRequest,
  type PaymentCalculatorResponse,
} from '../types/paymentCalculation.interface';

export function usePaymentCalculator(params: PaymentCalculatorRequest) {
  return useQuery<PaymentCalculatorResponse>({
    queryKey: ['paymentCalculator', params],
    queryFn: async () => {
      const response = await bankProductsService.calculatePayment(params);
      return response;
    },
    enabled:
      typeof params.bankProductId === 'number' &&
      params.bankProductId > 0 &&
      typeof params.amountUSD === 'number' &&
      params.amountUSD > 0,
  });
}
