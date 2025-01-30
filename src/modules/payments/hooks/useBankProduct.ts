'use client';
import { useQuery } from '@tanstack/react-query';
import { bankProductsService } from '../api/bankProducts.service';
import {
  type getBankProductParams,
  type BankProductsResponse,
} from '../types/paymentProducts.interface';

export function useBankProducts(params?: getBankProductParams) {
  return useQuery<BankProductsResponse>({
    queryKey: ['bankProducts', params?.status, params],
    queryFn: async (): Promise<BankProductsResponse> => {
      const response = await bankProductsService.getBankProducts({
        ...params,
      });

      return response;
    },
  });
}
