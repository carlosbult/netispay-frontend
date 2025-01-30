import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { type CustomApiError } from 'src/interfaces/errors.interface';
import { bankProductsService } from '../api/bankProducts.service';
// import { useToast } from 'src/shared/components/ui/use-toast';
import {
  type ProcessPaymentRequest,
  type ProcessPaymentResponse,
} from '../types/payment.types';

export const useProcessPayment = (): UseMutationResult<
  ProcessPaymentResponse,
  CustomApiError,
  ProcessPaymentRequest
> => {
  // const { toast } = useToast();

  return useMutation({
    mutationFn: async (paymentData: ProcessPaymentRequest) =>
      await bankProductsService.processPayment(paymentData),

    // onSuccess: (data: ProcessPaymentResponse) => {
    //   toast({
    //     title: 'Pago procesado exitosamente',
    //     description: data.message,
    //   });
    // },

    // onError: (error: CustomApiError) => {
    //   toast({
    //     title: 'Error al procesar el pago',
    //     description: error.message,
    //     variant: 'destructive',
    //   });
    // },
  });
};
