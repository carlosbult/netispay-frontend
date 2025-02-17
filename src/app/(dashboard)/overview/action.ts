'use server';

import { type IHandlerResponseToToast } from '@/app/(auth)/sign-up/actions';
import { type ApiErrorResponse } from '@interfaces/errors.interface';
import { type Invoice } from '@interfaces/invoice.interface';
import {
  type ICalculateMontToPay,
  type IPayInvoiceGeneric,
} from '@interfaces/payment';
import { type BankPaymentProduct } from '@interfaces/paymentMethods.interface';
import { getSessionTokenOnServer } from '@lib/auth';
import {
  calculateMontToPay,
  payInvoice,
  type IMontToPay,
} from '@lib/request/payment_request';
import { requestUserLogged } from '@lib/request/server/getUserLogged';
import { cookies } from 'next/headers';

//* Interfaces
export interface IInvoiceResponseSuccessfully {
  invoices: Invoice[];
}
export interface IBankPaymentMethodResponseSuccessfully {
  products: {
    BANK_TRANSFER: BankPaymentProduct[];
  };
}
type IResponseSuccessfully =
  | ApiErrorResponse
  | IBankPaymentMethodResponseSuccessfully;

//* Constants
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

//* Get invoices from the API
export const handlerGetInvoices = async (userId: string, status?: string) => {
  const url = `${baseUrl}/invoices?id=${userId}${status != null ? `&status=${status}` : ''} `;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorResponse: ApiErrorResponse = await response.json();
    return errorResponse;
  }

  const successfullyResponse: IInvoiceResponseSuccessfully =
    await response.json();
  return successfullyResponse;
};

//* Get bank payment methods from the API
export const handlerGetPaymentMethods =
  async (): Promise<IResponseSuccessfully> => {
    const url = `${baseUrl}/bank-products`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorResponse: ApiErrorResponse = await response.json();
      return errorResponse;
    }

    const successfullyResponse: IBankPaymentMethodResponseSuccessfully =
      await response.json();
    return successfullyResponse;
  };

//* Get user session token from cookies
export const handlerGetUserSession = async () => {
  try {
    const token = await getSessionTokenOnServer();
    if (token == null) {
      return null;
    }
    const response = await requestUserLogged(token);
    if (response != null) {
      // Additional checks or processing of the response can go here
      console.log('User session retrieved successfully:', response);
    }

    return response;
  } catch (error) {
    // Handle the error here
    if (error instanceof Error) {
      console.error(
        'Error occurred while fetching user session:',
        error.message,
      );

      // Check if the error is specifically due to an unauthorized session (401)
      if (error.message.includes('Unauthorized')) {
        console.log('Deleting token');
        (await cookies()).delete('session_token');
        console.warn('Session is invalid or expired. Redirecting to login...');
        // You can add custom logic here, e.g., redirect to the login page
      }
    } else {
      console.error('An unknown error occurred:', error);
    }

    return null; // Return null or a fallback value in case of an error
  }
};

export const handlerGetMountToPay = async (
  data: IMontToPay,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<ICalculateMontToPay | null> => {
  const response = await calculateMontToPay(data);
  if (response == null) {
    console.error('Error calculating the mount to pay');
    return null;
  }
  if ('errorCode' in response) {
    console.error('Error calculating the mount to pay');
    return null;
  }
  return response;
};

export const handlerPayInvoices = async (
  data: IPayInvoiceGeneric,
): Promise<IHandlerResponseToToast> => {
  const response = await payInvoice(data);
  if (response != null) {
    if ('errorCode' in response) {
      console.error(response);
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
};
