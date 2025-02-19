'use server';

import { type IHandlerResponseToToast } from '@/app/(auth)/sign-up/actions';
import { type ICommissionISP } from '@interfaces/isp';
import {
  getAllISPCommissions,
  updateISPCommission,
} from '@lib/request/isp_request';

export const handlerGetAllIspCommissions = async () => {
  const response = await getAllISPCommissions();
  if (response == null) {
    console.error('Error get the all isp commissions');
    return [];
  }
  if ('errorCode' in response) {
    console.error(
      'Error get the all isp commissions',
      response.errorCode,
      response.message,
    );
    return [];
  }

  return response;
};

export const handlerUpdateISPCommission = async (
  data: Partial<ICommissionISP>,
  id: string,
): Promise<IHandlerResponseToToast> => {
  console.log('data', data);
  console.log('id', id);
  try {
    const response = await updateISPCommission(data, id);
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
        title: 'Actualización completada',
        message: 'Actualización completada con exito',
        description:
          'La configuración de comisiones para esta isp ha sido creado correctamente',
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
  } catch (error) {
    console.error('Error in handlerUpdateISPCommission', error);
    return {
      type: 'ERROR',
      title: 'Error Inesperado',
      description:
        'Ha ocurrido un error inesperado, verifica los datos o ponte en contacto con nuestro equipo ',
      message: 'An unknown error occurred',
    };
  }
};
