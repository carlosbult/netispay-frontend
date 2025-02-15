import {
  type ApiErrorResponse,
  type CustomApiError,
} from '@interfaces/errors.interface';
import { type ICommissionISPConfig } from '@interfaces/isp';
import { API_BASE_URL, ApiService } from './apiRequest';

const api = new ApiService(API_BASE_URL);

export async function getAllISPCommissions(): Promise<
  ICommissionISPConfig[] | ApiErrorResponse | CustomApiError | null
> {
  try {
    const response = await api.get<ICommissionISPConfig[]>(
      '/settings/isp-configuration',
    );
    return response;
  } catch (error) {
    console.error('Error get the all isp commissions', error);
    return null;
  }
}

export async function updateISPCommission(
  commission: Partial<ICommissionISPConfig>,
  id: string,
): Promise<ICommissionISPConfig | ApiErrorResponse | CustomApiError | null> {
  try {
    const response = await api.patch<ICommissionISPConfig>(
      `/settings/isp-configuration/${id}`,
      commission,
    );
    return response;
  } catch (error) {
    console.error('Error update the isp commission', error);
    return null;
  }
}
