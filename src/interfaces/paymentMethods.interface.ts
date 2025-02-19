import { type currencies } from './enums';

export interface IBankProductSpecificConfig {
  id?: number;
  property_key: string;
  property_value: string;
  title: string;
  description: string;
}

export interface IBanksDetails {
  id: number;
  name: string;
  code: string;
}

export interface BankPaymentProduct {
  id: number;
  bank_id: number;
  name: string;
  label: string;
  bank_product_specific_config: IBankProductSpecificConfig[];
  is_active: boolean;
  payment_category: null;
  api_url: string;
  api_key: string;
  properties: IBankProductSpecificConfig[];
  configurations: Array<{
    id: number;
    bank_product_id: number;
    description: string | null;
    bank_commission_rate: number;
    bank_operation_rate: number;
    currency: currencies;
  }>;
  banks: IBanksDetails;
}

export interface IBankPaymentProductAdapter extends BankPaymentProduct {
  properties: IBankProductSpecificConfig[];
}

export interface IBankPaymentMethodResponseSuccessfully {
  products: {
    BANK_TRANSFER: BankPaymentProduct[];
  };
}
