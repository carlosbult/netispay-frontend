import { useToast } from '@components/ui/use-toast';
import {
  type ILoginResponseSuccessfully,
  type LoginCredentials,
} from '@interfaces/auth.interface';
import { type CustomApiError } from '@interfaces/errors.interface';
import signInFetch from '@lib/request/client/sign-in';
import { useMutation, type UseMutationResult } from '@tanstack/react-query';

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
