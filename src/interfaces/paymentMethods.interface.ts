import { type currencies } from './enums';

export interface BankPaymentProduct {
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
