import {
  type ApiErrorResponse,
  type CustomApiError,
} from '@interfaces/errors.interface';
import { type TAdaptedSignUp } from '@lib/adapters/createClientUser-validator';
import { API_BASE_URL, ApiService } from './apiRequest';

const api = new ApiService(API_BASE_URL);

interface IUserResponse {
  message: string;
}

async function createUser(
  data: TAdaptedSignUp,
): Promise<IUserResponse | ApiErrorResponse | CustomApiError | null> {
  try {
    const response = await api.post<IUserResponse>('/users/userCreate', data);
    return response;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
}

export default createUser;
