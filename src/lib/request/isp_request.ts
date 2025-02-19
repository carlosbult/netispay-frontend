import {
  type ApiErrorResponse,
  type CustomApiError,
} from '@interfaces/errors.interface';
import { type ICommissionISPConfig, type IISPConfig } from '@interfaces/isp';
import { getSessionTokenOnServer } from '@lib/auth';
import { API_BASE_URL, ApiService } from './apiRequest';

const api = new ApiService(API_BASE_URL);

export async function getAllISPCommissions(): Promise<
  ICommissionISPConfig[] | ApiErrorResponse | CustomApiError | null
> {
  try {
    const token = await getSessionTokenOnServer();
    if (token == null) {
      return null;
    }
    const response = await api.get<ICommissionISPConfig[]>(
      '/settings/isp-configuration',
      undefined,
      {
        Cookie: `${token.name}=${token.value}`,
      },
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
    const token = await getSessionTokenOnServer();
    if (token == null) {
      return null;
    }
    const response = await api.patch<ICommissionISPConfig>(
      `/settings/isp-configuration/${id}`,
      commission,
      {
        Cookie: `${token.name}=${token.value}`,
      },
    );
    return response;
  } catch (error) {
    console.error('Error update the isp commission', error);
    return null;
  }
}

export async function getIspConfig(
  id?: string,
): Promise<
  (IISPConfig[] | IISPConfig) | ApiErrorResponse | CustomApiError | null
> {
  try {
    const token = await getSessionTokenOnServer();
    if (token == null) {
      return null;
    }
    let path = '/settings/network-manager';
    if (id != null) {
      path = `/settings/network-manager/${id}`;
    }
    const response = await api.get<IISPConfig[] | IISPConfig>(path, undefined, {
      Cookie: `${token.name}=${token.value}`,
    });
    console.log('response isp configs', response);
    return response;
  } catch (error) {
    console.error('Error get the all isp commissions', error);
    return null;
  }
}

export async function updateIspConfig(
  newConfig: Partial<IISPConfig>,
  id: string,
): Promise<IISPConfig | ApiErrorResponse | CustomApiError | null> {
  try {
    const token = await getSessionTokenOnServer();
    if (token == null) {
      return null;
    }
    const response = await api.patch<IISPConfig>(
      `/settings/network-manager/${id}`,
      newConfig,
      {
        Cookie: `${token.name}=${token.value}`,
      },
    );
    console.log('response', response);
    return response;
  } catch (error) {
    console.error('Error update the isp config', error);
    return null;
  }
}
