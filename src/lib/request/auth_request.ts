import {
  type ILoginResponseSuccessfully,
  type LoginCredentials,
} from '@interfaces/auth.interface';
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

export async function loginUser(
  data: LoginCredentials,
): Promise<
  ILoginResponseSuccessfully | ApiErrorResponse | CustomApiError | null
> {
  try {
    const response = await api.post<
      ILoginResponseSuccessfully | ApiErrorResponse | CustomApiError
    >('/session-sign-in', data);
    return response;
  } catch (error) {
    console.error('Error logging in user:', error);
    return null;
  }
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
