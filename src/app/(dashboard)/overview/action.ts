'use server';

import {
  type ICalculateMontToPay,
  type IPayInvoiceGeneric,
  type IPaymentResult,
} from '@interfaces/payment';
import { getSessionTokenOnServer } from '@lib/auth';
import { getPaymentMethods } from '@lib/request/bank_request';
import {
  calculateMontToPay,
  payInvoice,
  type IMontToPay,
} from '@lib/request/payment_request';
import { requestUserLogged } from '@lib/request/server/getUserLogged';
import { requestGetInvoices } from '@lib/request/transactions_request';
import { getUserById } from '@lib/request/user_request';
import { cookies } from 'next/headers';

//* Interfaces

//* Get invoices from the API
export const handlerGetInvoices = async (userId: string, status?: string) => {
  const response = await requestGetInvoices({ userId, status });
  return response;
};

//* Get bank payment methods from the API
export const handlerGetPaymentMethods = async () => {
  const response = await getPaymentMethods();
  return response;
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

// interface IPaymentResultResponse extends IHandlerResponseToToast {
//   paymentResult?: IPaymentResult;
// }

export const handlerPayInvoices = async (
  data: IPayInvoiceGeneric,
): Promise<IPaymentResult | null> => {
  const response = await payInvoice(data);
  console.log('response pay', response);
  if (response != null) {
    if ('networkManagerResponse' in response) {
      return response.paymentResult;
    }
    return response;
  } else {
    return null;
  }
};

export const handlerGetUserBalance = async (
  userId: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<{
  totalBalance: number;
} | null> => {
  const response = await getUserById(userId);
  if (response == null) {
    console.error('Error calculating the mount to pay');
    return null;
  }
  if ('errorCode' in response) {
    console.error('Error calculating the mount to pay');
    return null;
  }
  const balance = response.client_profile.client_balance
    .filter((element) => element.status === 'AVAILABLE')
    .reduce((total, balance) => total + balance.current_amount, 0);

  return { totalBalance: balance };
};
