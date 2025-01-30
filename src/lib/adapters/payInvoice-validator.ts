interface PaymentData {
  orderId: string;
  amount: number;
  currency: string;
  exchangeRate: number;
  date: Date;
  startTime?: string;
  endTime?: string;
}

interface Invoice {
  id: string;
  amount: number;
}

interface InputData {
  userId: number;
  bankCode: string;
  productType: string;
  expectedAmount: number;
  allowPartialPayment: boolean;
  balanceApplied: number;
  paymentData: PaymentData;
  invoices: Invoice[];
}

export interface IPayInvoiceAdapter {
  userId: number;
  bankCode: string;
  productType: string;
  expectedAmount: number;
  allowPartialPayment: boolean;
  balanceApplied: number;
  paymentData: PaymentData;
  invoices: Invoice[];
}

const payInvoiceAdapter = (input: InputData) => {
  const oneDayMs = 24 * 60 * 60 * 1000;

  // Calculate the previous day and the next day
  const previousDay = new Date(input.paymentData.date.getTime() - oneDayMs);
  const nextDay = new Date(input.paymentData.date.getTime() + oneDayMs);

  // Format the dates as "MM/DD/YYYY"
  const formatDate = (d: Date): string =>
    `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${d.getFullYear()}`;

  return {
    userId: input.userId,
    bankCode: input.bankCode,
    productType: input.productType,
    expectedAmount: input.expectedAmount,
    allowPartialPayment: input.allowPartialPayment,
    balanceApplied: input.balanceApplied,
    paymentData: {
      startTime: formatDate(previousDay),
      endTime: formatDate(nextDay),
      orderId: input.paymentData.orderId,
      amount: input.paymentData.amount,
      currency: input.paymentData.currency,
      exchangeRate: input.paymentData.exchangeRate,
    },
    invoices: input.invoices.map((invoice) => ({
      id: invoice.id,
      amount: invoice.amount,
    })),
  };
};

export default payInvoiceAdapter;
