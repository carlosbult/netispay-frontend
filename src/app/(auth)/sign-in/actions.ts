'use server';

import {
  type ILoginResponseSuccessfully,
  type LoginCredentials,
} from '@interfaces/auth.interface';
import { loginUser } from '@lib/request/auth_request';
import getUserById from '@lib/request/client/getUserById';
import { cookies } from 'next/headers';

interface ICookiesData {
  userId: number | undefined;
  userRole: string | undefined;
  token_expires: string;
}

type LoginActionResponse =
  | {
      success: true;
      data: ILoginResponseSuccessfully;
      cookiesData: ICookiesData;
    }
  | { success: false; error: string };

export async function handlerLoginAction(
  data: LoginCredentials,
): Promise<LoginActionResponse> {
  const response = await loginUser(data);
  if (response != null) {
    if ('errorCode' in response) {
      return {
        success: false,
        error: response.message,
      };
    }
    let userRole;
    let userId;
    const user = await getUserById(response.data.session.userId);
    if (user != null) {
      response.data.session.userRole = user.role;
      userId = user.id;
      userRole = user.role;
    }

    const expiresAt = response.data.session.expiresAt;
    const cookieData = {
      userId,
      userRole,
      token_expires: new Date(expiresAt).toUTCString(),
    };
    const cookieStore = await cookies();
    cookieStore.set({
      name: 'session_token',
      value: response.data.token,
      httpOnly: true,
      expires: new Date(expiresAt),
      path: '/',
    });
    cookieStore.set({
      name: 'auth_data',
      value: JSON.stringify(cookieData),
      expires: new Date(expiresAt),
      httpOnly: true,
      path: '/',
    });
    return {
      success: true,
      data: response,
      cookiesData: cookieData,
    };
  } else {
    return {
      success: false,
      error: 'unexpected error',
    };
  }
}
