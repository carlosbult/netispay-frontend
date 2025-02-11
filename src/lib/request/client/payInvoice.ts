import { type ILoginResponseSuccessfully } from '@interfaces/auth.interface';
import { type IPayInvoiceAdapter } from '@lib/adapters/payInvoice-validator';

const payInvoiceInFetch = async (data: IPayInvoiceAdapter) => {
  try {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${url}/invoices/payInvoice`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Garantiza el manejo de cookies
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const responseData: ILoginResponseSuccessfully = await response.json();

    return responseData;
  } catch (error) {
    console.error('Error en payInvoiceInFetch:', error);
    throw error;
  }
};

export default payInvoiceInFetch;
