interface IPayInvoiceGeneric {
  userId: number;
  bankCode: string;
  productType: string;
  expectedAmount: number;
  allowPartialPayment: boolean;
  balanceApplied: number;
  paymentData: {
    transactionDate: string;
    reference: string;

    // "bankCode": "0138",
    // "documentId": "V00018184460",
    // "phoneNumber": "4244445566",
    // "otp": "40110069",
    amount: number;
    currency: string;
    exchangeRate: number;
  };
  invoices: [
    {
      id: string;
      amount: number;
    },
  ];
}
