import {
  type ILoginResponseSuccessfully,
  type LoginCredentials,
  type LoginResponse,
} from '@interfaces/auth.interface';
import signInFetch from '@lib/request/client/sign-in';
import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { type CustomApiError } from 'src/interfaces/errors.interface';
import { useToast } from 'src/shared/components/ui/use-toast';
import { useAuthStore } from 'src/shared/store/useAuthStore';
import { authService } from '../api/auth.service';
import {
  type GenerateLoginOTPResponse,
  type OTPVerification,
  type createUserCredentials,
} from '../types/auth.types';

/** Register User */
export function useCreateUser(): UseMutationResult<
  LoginResponse,
  CustomApiError,
  createUserCredentials
> {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (userData: createUserCredentials) =>
      await authService.generateCreateUserOTP(userData),

    onSuccess: (data: LoginResponse) => {
      toast({
        title: 'Data recibida',
        description: data.message,
      });
    },

    onError: (error: CustomApiError) => {
      toast({
        title: 'Error al crear usuario',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useVerifyUserRegister(): UseMutationResult<
  LoginResponse,
  CustomApiError,
  OTPVerification
> {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (userData: OTPVerification) =>
      await authService.verifyUserCreationOTP(userData),

    onSuccess: (data: LoginResponse) => {
      toast({
        title: 'Email confirmado - Puede inicar sesión',
        description: data.message,
      });
    },

    onError: (error: CustomApiError) => {
      toast({
        title: 'Error al verificar al usuario',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

/** Login User otp */
export function useGenerateOTPLogin(): UseMutationResult<
  LoginResponse,
  CustomApiError,
  LoginCredentials
> {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) =>
      await authService.generateLoginOTP(credentials),

    onSuccess: (data: LoginResponse) => {
      toast({
        title: 'Data recibida',
        description: data.message,
      });
    },

    onError: (error: CustomApiError) => {
      toast({
        title: `Error al verificar los datos enviados`,
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

/** Session Login User */
export function useSessionLogin(): UseMutationResult<
  ILoginResponseSuccessfully,
  CustomApiError,
  LoginCredentials
> {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) =>
      await signInFetch(credentials),

    onSuccess: (data: ILoginResponseSuccessfully) => {
      console.log(data);
      toast({
        title: 'Data recibida',
        description: data.message,
      });
    },

    onError: (error: CustomApiError) => {
      toast({
        title: `Error al verificar los datos enviados`,
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export const useVerifyOTPLogin = (): UseMutationResult<
  GenerateLoginOTPResponse,
  CustomApiError,
  OTPVerification
> => {
  const { toast } = useToast();
  const { setUserId, setToken, setRole } = useAuthStore();

  return useMutation({
    mutationFn: async (userData: OTPVerification) =>
      await authService.verifyLoginOTP(userData),

    onSuccess: (data: GenerateLoginOTPResponse) => {
      setUserId(data.id);
      setToken(data.jwt);
      setRole(data.role);
      toast({
        title: 'Bienvenido - Clave OTP Confirmada',
        description: data.message,
      });
    },

    onError: (error: CustomApiError) => {
      toast({
        title: 'Error al verificar al usuario',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};
