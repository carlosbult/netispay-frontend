interface IInvoiceDetailsToPay {
  id: string;
  amount: number;
}
interface IPayInvoiceGeneric {
  userId: number;
  bankCode: string;
  productType: string;
  expectedAmount: number;
  allowPartialPayment: boolean;
  balanceApplied: number;
  paymentData: {
    // Datos fijos
    amount: number;
    currency: string;
    exchangeRate: number;
    // Datos variables
    bankCode?: string;
    otp?: string;
    transactionDate?: Date;
    documentId?: string;
    email?: string;
    phoneNumber?: string;
    reference?: string;
    ipClient?: string;
  };
  invoices: IInvoiceDetailsToPay[];
}
export interface IPaymentDetailsToPay {
  baseAmount: number;
  ivaAmount: number;
}

export interface ICalculateMontToPay {
  amount: number;
  details: IPaymentDetailsToPay;
  includesIGTF: boolean;
  includesIVA: boolean;
  allowPartialPayment: boolean;
  originalAmount: number;
  balanceApplied: number;
  currency: string;
  exchangeRate: number;
  operationCost: boolean;
}
