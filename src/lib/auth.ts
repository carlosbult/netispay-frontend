'use server';

import { cookies } from 'next/headers';

//* Get user session token from cookies
export const getSessionTokenOnServer = async () => {
  const cookieStore = await cookies();
  return cookieStore.get('session_token');
};

export const deleteCookie = async (cookieName: string) => {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
};

export const closeSessionOnServer = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('session_token');
  cookieStore.delete('auth_data');
};
