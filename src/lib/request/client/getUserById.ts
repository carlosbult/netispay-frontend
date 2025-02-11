import { type UserResponse } from 'src/modules/users/types/users.interface';

const getUserById = async (id: number) => {
  try {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${url}/users/${id.toString()}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Garantiza el manejo de cookies
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const responseData: UserResponse = await response.json();

    return responseData;
  } catch (error) {
    console.error('Error en payInvoiceInFetch:', error);
    throw error;
  }
};

export default getUserById;
