import {
  type ILoginResponseSuccessfully,
  type LoginCredentials,
} from '@interfaces/auth.interface';
import { getApiUrl } from '../../getApiUrl'

const signInFetch = async (data: LoginCredentials) => {
  try {
    const response = await fetch(getApiUrl('session-sign-in'), {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Garantiza el manejo de cookies
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const responseData: ILoginResponseSuccessfully = await response.json();

    // Si necesitas establecer manualmente una cookie adicional
    const expiresAt = responseData.data.session.expiresAt;
    if (expiresAt != null) {
      document.cookie = `token_expires=${new Date(expiresAt).toUTCString()}; path=/; expires=${new Date(expiresAt).toUTCString()};`;
    }

    return responseData;
  } catch (error) {
    console.error('Error en signInFetch:', error);
    throw error;
  }
};

export default signInFetch;
