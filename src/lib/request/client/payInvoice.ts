import { type ILoginResponseSuccessfully } from '@interfaces/auth.interface';
import { type IPayInvoiceAdapter } from '@lib/adapters/payInvoice-validator';
import { getApiUrl } from '../../getApiUrl';

const payInvoiceInFetch = async (data: IPayInvoiceAdapter) => {
  try {
    const response = await fetch(getApiUrl('invoices/payInvoice'), {
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
