import {
  type LoginCredentials,
  type LoginResponse,
} from '@interfaces/auth.interface';
import { API_BASE_URL, ApiService } from '@services/api/api.service';
import {
  type GenerateLoginOTPResponse,
  type OTPVerification,
  type createUserCredentials,
} from '../types/auth.types';

const apiService = new ApiService(API_BASE_URL);

export const authService = {
  /** Registro de ususario (Envio de data principal) */
  generateCreateUserOTP: async (user: createUserCredentials) =>
    await apiService.post<LoginResponse>('/users/userCreate', user),

  /** Registro de ususario (Confirmar clave OTP) */
  verifyUserCreationOTP: async (user: OTPVerification) =>
    await apiService.post<LoginResponse>('/users/verify-userCreation', user),

  /** Obtener clave OTP para ingresar al sistema (Login - Sign In) */
  generateLoginOTP: async (user: LoginCredentials) =>
    await apiService.post<LoginResponse>('/auth/hotp/generate', user),

  /** Session login (Login - Sign In) */
  loginWithEmail: async (user: LoginCredentials) => {
    const response = await apiService.post<LoginResponse>(
      '/session-sign-in',
      user,
    );
    return response;
  },

  /** Verificar clave OTP para ingresar al sistema (Login - Sign In) */
  verifyLoginOTP: async (user: OTPVerification) =>
    await apiService.post<GenerateLoginOTPResponse>('/auth/hotp/verify', user),
};
