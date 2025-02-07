export interface ProcessPaymentRequest {
  userId: number;
  bankCode?: string;
  productType?: string;
  paymentData: {
    orderId: string;
    startTime: string;
    endTime: string;
  };
  invoices: Array<{
    id: string;
    amount: number;
  }>;
}

export interface ProcessPaymentResponse {
  message: string;
  status: string;
  transactionId?: string;
  // ... otros campos que devuelva tu API
}
