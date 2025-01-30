import { type UseMutationResult } from '@tanstack/react-query';

export interface OTPVerification {
  email: string;
  token: string;
}

export interface GenerateLoginOTPResponse {
  message: string;
  jwt: string;
  role: string;
  id: number;
}

export interface createUserCredentials {
  email: string;
  password: string;
  network_manager_user_id: number;
  type_of_person: string;
}

export interface LoginFormState {
  showPassword: boolean;
  showPasswordConfirm?: boolean;
  showOTPInput: boolean;
  email: string;
}

export interface HotpFormProps {
  email: string;
  title: string;
  description: string;
  successTitle: string;
  successDescription: string;
  verifyMutation: UseMutationResult<
    {
      jwt: string;
      role: 'ADMIN' | 'ACCOUNTING' | 'CLIENT';
      id?: number;
      message?: string;
    },
    Error,
    { email: string; token: string }
  >;
  redirectPath?: string;
}
