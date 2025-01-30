import { type currencies } from 'src/interfaces/enums';

export interface getBankProductParams {
  status?: string;
}

export interface PaymentProduct {
  id: number;
  bank_id: number;
  name: string;
  is_active: boolean;
  configurations: Array<{
    id: number;
    bank_product_id: number;
    description: string | null;
    bank_commission_rate: number;
    bank_operation_rate: number;
    currency: currencies;
  }>;
  banks: {
    id: number;
    name: string;
    code: string;
  };
}

// Interfaz para la respuesta de productos bancarios
export interface BankProductsResponse {
  products: PaymentProduct[];
}

export interface PaymentResponse {
  success: boolean;
  transactionId: number;
  bankReference?: string;
  amount: number;
  currency: currencies;
  status: string;
  errorCode?: string;
  errorMessage?: string;
  paymentMethod: string;
  bankCode?: string;
}
