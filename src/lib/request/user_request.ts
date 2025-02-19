import { type IUser } from '@/modules/users/types/users.interface';
import {
  type ApiErrorResponse,
  type CustomApiError,
} from '@interfaces/errors.interface';
import { getSessionTokenOnServer } from '@lib/auth';
import { API_BASE_URL, ApiService } from './apiRequest';

const api = new ApiService(API_BASE_URL);

export async function getUserById(
  userId: number,
): Promise<IUser | ApiErrorResponse | CustomApiError | null> {
  try {
    const token = await getSessionTokenOnServer();
    if (token == null) {
      return null;
    }
    const response = await api.get<IUser>(
      `/users/${userId.toString()}`,
      undefined,
      {
        Cookie: `${token.name}=${token.value}`,
      },
    );
    return response;
  } catch (error) {
    console.error('Error when get the user', error);
    return null;
  }
}
