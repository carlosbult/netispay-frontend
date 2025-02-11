'use server';

import { type IUserLoggedResponseSuccessfully } from '@interfaces/auth.interface';
import { type RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

interface IErrorResponse {
  statusCode: number;
  errorCode: string;
  message: string;
  details: null;
  timestamp: string;
  path: string;
}

export const requestUserLogged = async (cookieToken: RequestCookie) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  console.log(`token = ${cookieToken.name}=${cookieToken.value}`);

  const response = await fetch(`${baseUrl}/session-sign-in/login-test`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `${cookieToken.name}=${cookieToken.value}`,
    },
  });

  if (!response.ok) {
    const errorData: IErrorResponse = await response.json();
    if (response.status === 401) {
      console.error('Unauthorized: ', errorData.message);
      throw new Error(`Unauthorized: ${errorData.message}`);
    }
    console.error('API Error: ', errorData);
    throw new Error(`API Error: ${errorData.message}`);
  }

  const data: IUserLoggedResponseSuccessfully = await response.json();
  return data;
};
