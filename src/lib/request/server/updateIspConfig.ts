import { type ApiErrorResponse } from '@interfaces/errors.interface';
import { type IISPConfig } from 'src/app/(dashboard)/admin/settings/actions';
import { getApiUrl } from '../../getApiUrl';

type IUpdateIspConfigResponse = IISPConfig | ApiErrorResponse;

const updateIspConfig = async (
  data: Partial<IISPConfig>,
  id: string,
): Promise<IUpdateIspConfigResponse> => {
  try {
    const response = await fetch(getApiUrl(`/settings/network-manager/${id}`), {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (!response.ok) {
      console.error('Error en la solicitud:', response.status);
      return await response.json();
    }

    const responseData: IISPConfig = await response.json();

    return responseData;
  } catch (error) {
    console.error('Error en updateIspConfig:', error);
    throw error;
  }
};

export default updateIspConfig;
