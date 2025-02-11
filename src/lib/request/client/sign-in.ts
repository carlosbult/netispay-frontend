import {
  type ILoginResponseSuccessfully,
  type LoginCredentials,
} from '@interfaces/auth.interface';
import getUserById from './getUserById';

const signInFetch = async (data: LoginCredentials) => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL;
  try {
    const response = await fetch(`${url}/session-sign-in`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Garantiza el manejo de cookies
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    let userRole;
    let userId;
    const responseData: ILoginResponseSuccessfully = await response.json();
    if (responseData.data.session.userId != null) {
      const user = await getUserById(responseData.data.session.userId);
      if (user != null) {
        responseData.data.session.userRole = user.role;
        // localStorage.setItem('userRole', user.role);
        // localStorage.setItem('userId', user.id.toString());
        userId = user.id;
        userRole = user.role;
      }
    }

    const expiresAt = responseData.data.session.expiresAt;
    if (expiresAt != null) {
      // document.cookie = `token_expires=${new Date(expiresAt).toUTCString()}; path=/; expires=${new Date(expiresAt).toUTCString()};`;
      const cookieData = {
        userId,
        userRole,
        token_expires: new Date(expiresAt).toUTCString(),
      };
      document.cookie = `auth_data=${JSON.stringify(cookieData)}; path=/; expires=${new Date(expiresAt).toUTCString()};`;
    }

    return responseData;
  } catch (error) {
    console.error('Error en signInFetch:', error);
    throw error;
  }
};

export default signInFetch;
