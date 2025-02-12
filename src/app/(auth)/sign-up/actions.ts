'use server';

import { adaptSignUpData } from '@lib/adapters/createClientUser-validator';
import createUser from '@lib/request/auth_request';
import { type TSignUpValidator } from '@lib/validators/register-validator';

export interface IHandlerResponseToToast {
  type: 'ERROR' | 'SUCCESS';
  title: string;
  description: string;
  message: string | unknown;
}

export const handlerCreateUser = async (
  data: TSignUpValidator,
): Promise<IHandlerResponseToToast> => {
  const response = await createUser(adaptSignUpData(data));
  if (response != null) {
    if ('errorCode' in response) {
      return {
        type: 'ERROR',
        title: 'Ha ocurrido un error',
        description: response.message,
        message: response.details,
      };
    }
    return {
      type: 'SUCCESS',
      title: 'Usuario creado',
      description: 'El usuario ha sido creado correctamente',
      message: response.message,
    };
  } else {
    return {
      type: 'ERROR',
      title: 'Error Inesperado',
      description:
        'Ha ocurrido un error inesperado, verifica los datos o ponte en contacto con nuestro equipo ',
      message: 'An unknown error occurred',
    };
  }
};
