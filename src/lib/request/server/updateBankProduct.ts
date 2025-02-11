import { type ApiErrorResponse } from '@interfaces/errors.interface';
import { type BankPaymentProduct } from '@interfaces/paymentMethods.interface';

type IUpdateBankProductResponse = BankPaymentProduct | ApiErrorResponse;

const updateBankProduct = async (
  data: Partial<BankPaymentProduct>,
  id: string,
): Promise<IUpdateBankProductResponse> => {
  try {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${url}/bank-products/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (!response.ok) {
      console.error('Error en la solicitud:', response.status);
      return await response.json();
    }

    const responseData: BankPaymentProduct = await response.json();

    return responseData;
  } catch (error) {
    console.error('Error en updateBankProduct:', error);
    throw error;
  }
};

export default updateBankProduct;
