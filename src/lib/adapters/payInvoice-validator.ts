import {
  type IInvoiceDetailsToPay,
  type IPayInvoiceGeneric,
} from '@interfaces/payment';

const payInvoiceAdapter = (
  userId: number,
  payMethodName: string,
  payMethodCode: string,
  payData: {
    expectedAmount: number;
    allowPartialPayment: boolean;
    balanceApplied: number;
    amountPayByTheUser: number;
    currencyUseToPay: string;
    exchangeRate: number;
  },
  payVariableData: {
    bankCode?: string;
    otp?: string;
    transactionDate?: Date;
    documentId?: string;
    email?: string;
    phoneNumber?: string;
    reference?: string;
    ipClient?: string;
  },
  invoices: IInvoiceDetailsToPay[],
): IPayInvoiceGeneric => {
  // const oneDayMs = 24 * 60 * 60 * 1000;

  // Calculate the previous day and the next day
  // const previousDay = new Date(form.paymentData.date.getTime() - oneDayMs);
  // const nextDay = new Date(form.paymentData.date.getTime() + oneDayMs);

  // Format the dates as "MM/DD/YYYY"
  // const formatDate = (d: Date): string =>
  //   `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${d.getFullYear()}`;

  return {
    userId,
    bankCode: payMethodCode,
    productType: payMethodName,
    expectedAmount: payData.expectedAmount,
    allowPartialPayment: payData.allowPartialPayment,
    balanceApplied: payData.balanceApplied,
    paymentData: {
      amount: payData.amountPayByTheUser,
      currency: payData.currencyUseToPay,
      exchangeRate: payData.exchangeRate,
      bankCode: payVariableData.bankCode,
      otp: payVariableData.bankCode,
      transactionDate: payVariableData.transactionDate,
      documentId: payVariableData.documentId,
      email: payVariableData.email,
      phoneNumber: payVariableData.phoneNumber,
      reference: payVariableData.reference,
      ipClient: payVariableData.ipClient,
    },
    invoices,
  };
};

export default payInvoiceAdapter;
