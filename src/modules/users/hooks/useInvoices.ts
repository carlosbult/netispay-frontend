'use client';
import { useAuthStore } from '@/store/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import { type Invoice } from 'src/interfaces/invoice.interface';
import { userService } from '../api/users.service';

// Definimos la interfaz para la respuesta
interface InvoicesResponse {
  invoices: Invoice[];
}

// Definimos la interfaz para los parámetros de la petición
// interface GetInvoicesParams {
//   id: string;
//   status?: number;
//   limit: number;
// }

export function useInvoices(status?: number) {
  const { userId, role } = useAuthStore((state) => state);

  return useQuery<InvoicesResponse>({
    queryKey: ['invoices', userId, status],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    queryFn: async (): Promise<any> => {
      if (userId == null) throw new Error('Usuario no autenticado');

      const response = await userService.getInvoices({
        id: userId,
        status,
        limit: 10,
      });
      return response;
    },
    enabled: !(userId === 0) && role === 'CLIENT',
  });
}

interface InvoiceDetailsResponse {
  invoice: Invoice;
}

export function useInvoiceDetails(invoiceIds: number[]) {
  return useQuery<InvoiceDetailsResponse>({
    queryKey: ['invoice', invoiceIds],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    queryFn: async (): Promise<any> => {
      const response = await userService.getInvoiceById({
        invoiceIds,
      });
      return response;
    },
    enabled: invoiceIds.length > 0,
  });
}
