import { API_BASE_URL, ApiService } from '@services/api/api.service';
import {
  type GetInvoiceByIdParams,
  type GetInvoicesParams,
  type InvoicesResponse,
} from '../types/invoices.interface';
import {
  type UserQueryParams,
  type UserResponse,
  type UsersListResponse,
} from '../types/users.interface';

const apiService = new ApiService(API_BASE_URL);

export const userService = {
  // Obtener usuario por ID
  getUserById: async (id: number) =>
    await apiService.get<UserResponse>('/users', id),

  // Obtener usuarios con filtros
  getUsers: async (params?: UserQueryParams) =>
    await apiService.get<UsersListResponse[]>('/users', {
      ...params,
      page: params?.page != null || 1,
      pageSize: params?.pageSize != null || 10,
    }),

  // Nuevos métodos para facturas
  getInvoices: async (params: GetInvoicesParams) =>
    await apiService.get<InvoicesResponse>('/users/invoices', {
      id: params.id,
      status: params.status,
      limit: params.limit != null || 10,
    }),

  getInvoiceById: async (params: GetInvoiceByIdParams) =>
    await apiService.get<InvoicesResponse>('/users/invoiceById', {
      invoiceIds: params.invoiceIds.join(','),
    }),
};
