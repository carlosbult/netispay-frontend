'use server';

import { cookies } from 'next/headers';

//* Get user session token from cookies
export const getSessionTokenOnServer = async () => {
  const cookieStore = cookies();
  return cookieStore.get('session_token');
};
