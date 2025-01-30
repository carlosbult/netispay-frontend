'use server';

import { type ApiErrorResponse } from '@interfaces/errors.interface';
import { cookies } from 'next/headers';

interface ILoginFormData {
  email: string;
  password: string;
}

interface ILoginResponseSuccessfully {
  message: string;
  data: {
    session: {
      id: string;
      userId: number;
      expiresAt: string;
    };
  };
}

type LoginActionResponse =
  | { success: true; data: ILoginResponseSuccessfully }
  | { success: false; error: string };

export async function loginAction(
  data: ILoginFormData,
): Promise<LoginActionResponse> {
  console.log('loginAction', data);
  try {
    const response = await fetch(
      'http://localhost:3000/api/v1/session-sign-in',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('server response', response);

    if (!response.ok) {
      const errorData = (await response.json()) as ApiErrorResponse;
      const errorMessage =
        typeof errorData.message === 'string' && errorData.message.length > 0
          ? errorData.message
          : 'Login failed';
      return {
        success: false,
        error: errorMessage,
      };
    }

    const responseData = (await response.json()) as ILoginResponseSuccessfully;

    // Handle cookies from response
    const setCookie = response.headers.get('set-cookie');
    if (setCookie != null) {
      setCookie.split(',').forEach((cookie) => {
        const [cookieName, ...cookieValue] = cookie.split('=');
        cookies().set(cookieName.trim(), cookieValue.join('='), {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
        });
      });
    }

    // Store session ID in a cookie if needed
    cookies().set('sessionId', responseData.data.session.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(responseData.data.session.expiresAt),
    });

    // handle set cookie to expire time
    const expiresAt = new Date(responseData.data.session.expiresAt);
    const now = new Date();
    const timeUntilExpiration = expiresAt.getTime() - now.getTime();
    console.log('timeUntilExpiration', timeUntilExpiration);

    cookies().set('expiresAt', responseData.data.session.expiresAt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(responseData.data.session.expiresAt),
    });

    return {
      success: true,
      data: responseData,
    };
  } catch (error) {
    console.error('Error during login:', error);
    return {
      success: false,
      error: 'An error occurred during login',
    };
  }
}
