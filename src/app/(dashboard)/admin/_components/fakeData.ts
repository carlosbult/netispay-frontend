import { faker } from '@faker-js/faker';

// Define types
type PaymentType = 'CREDIT_CARD' | 'BANK_TRANSFER' | 'CASH';
type CurrencyType = 'USD' | 'EUR' | 'VES';
type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED';
type TypeOfPerson = 'INDIVIDUAL' | 'COMPANY';

interface ClientProfile {
  id: number;
  network_manager_user_id: number;
  user_id: number;
  isp_id?: number | null;
  name?: string;
  dni?: string;
  phone?: string;
  address?: string;
  type_of_person: TypeOfPerson;
  invoice_payments: InvoicePayment[];
  configuration: unknown[];
  client_balance: unknown[];
}

interface InvoicePayment {
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
  client_profile?: ClientProfile;
  admin_profile?: unknown;
  balance_movement: unknown[];
  transactionsId?: number;
}

export interface Transaction {
  id: number;
  bank_product_id: number;
  dolar_rate_id: number;
  bank_reference?: string | null;
  intermediate_id?: string | null;
  amount: number;
  currency: CurrencyType;
  payment_status: PaymentStatus;
  error_code?: string | null;
  error_message?: string | null;
  bank_response: object;
  month_year: string;
  created_at: Date;
  invoice_payments: InvoicePayment[];
  client_balance: unknown[];
}

// Function to generate fake client profiles
function generateFakeClientProfile(): ClientProfile {
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    network_manager_user_id: faker.number.int({ min: 1, max: 10000 }),
    user_id: faker.number.int({ min: 1, max: 10000 }),
    isp_id: faker.datatype.boolean()
      ? faker.number.int({ min: 1, max: 100 })
      : null,
    name: faker.person.fullName(),
    dni: faker.string.alphanumeric(10),
    phone: faker.phone.number(),
    address: faker.location.streetAddress(),
    type_of_person: faker.helpers.arrayElement<TypeOfPerson>([
      'INDIVIDUAL',
      'COMPANY',
    ]),
    invoice_payments: [],
    configuration: [],
    client_balance: [],
  };
}

// Function to generate fake invoice payments
function generateFakeInvoicePayments(
  transactionId: number,
  clientProfile: ClientProfile,
): InvoicePayment {
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    invoice_id: faker.string.uuid(),
    transaction_id: transactionId,
    network_manager: faker.internet.userName(),
    payment_type: faker.helpers.arrayElement<PaymentType>([
      'CREDIT_CARD',
      'BANK_TRANSFER',
      'CASH',
    ]),
    amount: faker.number.float({ min: 10, max: 1000, fractionDigits: 2 }),
    invoice_data: {},
    client_profile_id: clientProfile.id,
    admin_profile_id: faker.datatype.boolean()
      ? faker.number.int({ min: 1, max: 1000 })
      : null,
    created_at: faker.date.past(),
    client_profile: clientProfile,
    admin_profile: undefined,
    balance_movement: [],
    transactionsId: transactionId,
  };
}

// Function to generate fake transactions
export function generateFakeTransactions(count: number = 10): Transaction[] {
  return Array.from({ length: count }, () => {
    const transactionId = faker.number.int({ min: 1, max: 1000 });
    const clientProfile = generateFakeClientProfile();
    const invoicePayments = Array.from(
      { length: faker.number.int({ min: 1, max: 3 }) },
      () => generateFakeInvoicePayments(transactionId, clientProfile),
    );

    return {
      id: transactionId,
      bank_product_id: faker.number.int({ min: 1, max: 100 }),
      dolar_rate_id: faker.number.int({ min: 1, max: 100 }),
      bank_reference: faker.datatype.boolean()
        ? faker.string.alphanumeric(10)
        : null,
      intermediate_id: faker.datatype.boolean() ? faker.string.uuid() : null,
      amount: faker.number.float({ min: 10, max: 10000, fractionDigits: 2 }),
      currency: faker.helpers.arrayElement<CurrencyType>(['USD', 'EUR', 'VES']),
      payment_status: faker.helpers.arrayElement<PaymentStatus>([
        'PENDING',
        'COMPLETED',
        'FAILED',
      ]),
      error_code: faker.datatype.boolean()
        ? faker.string.alphanumeric(5)
        : null,
      error_message: faker.datatype.boolean() ? faker.lorem.sentence() : null,
      bank_response: {},
      month_year: faker.date.past().toISOString().slice(0, 7),
      created_at: faker.date.past(),
      invoice_payments: invoicePayments,
      client_balance: [],
    };
  });
}
