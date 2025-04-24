type PaymentType = 'CREDIT_CARD' | 'BANK_TRANSFER' | 'CASH';
type CurrencyType = 'USD' | 'EUR' | 'VES';

type TypeOfPerson = 'INDIVIDUAL' | 'COMPANY';

interface IClientProfile {
  id: number;
  network_manager_user_id: number;
  user_id: number;
  isp_id?: number | null;
  name?: string;
  dni?: string;
  phone?: string;
  address?: string;
  type_of_person: TypeOfPerson;
  invoice_payments: IInvoicePayment[];
  configuration: unknown[];
  client_balance: unknown[];
  isp: {
    network_manager: {
      name: string;
    };
  };
}

interface IInvoicePayment {
  id: number;
  invoice_id: string;
  transaction_id: number;
  network_manager: string;
  payment_type: PaymentType;
  amount: number;
  invoice_data: object;
  client_profile_id?: number | null;
  admin_profile_id?: number | null;
  created_at: Date;
  client_profile?: IClientProfile;
  admin_profile?: unknown;
  balance_movement: unknown[];
  transactionsId?: number;
}

export interface ITransaction {
  id: number;
  bank_product_id: number;
  dolar_rate_id: number;
  bank_reference?: string | null;
  intermediate_id?: string | null;
  amount: number;
  currency: CurrencyType;
  payment_status: string;
  error_code?: string | null;
  error_message?: string | null;
  bank_response: object;
  month_year: string;
  created_at: Date;
  invoice_payments: IInvoicePayment[];
  client_balance: unknown[];
  client_profile_id: number | null;
  admin_profile_id: number | null;
  // TO-DO
  dolar_rate: unknown;
  bank_product: {
    name: string;
    banks: {
      name: string;
    };
  };
  client_profile: IClientProfile | null;
  admin_profile: IClientProfile | null;
}

interface ITransactionResponseSuccessfully {
  transactions: ITransaction[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}
