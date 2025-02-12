import { type TSignUpValidator } from '@lib/validators/register-validator';

export function adaptSignUpData(input: TSignUpValidator) {
  const adaptedData = {
    ...input,
    network_manager_user_id: Number(input.network_manager_user_id),
  };

  return adaptedData;
}

export type TAdaptedSignUp = ReturnType<typeof adaptSignUpData>;
