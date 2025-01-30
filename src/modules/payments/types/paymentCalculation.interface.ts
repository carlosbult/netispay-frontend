interface PaymentCalculatorDetails {
  baseAmount: number;
  igtfAmount?: number;
  ivaAmount: number;
  systemCommission: number;
}

export interface PaymentCalculatorResponse {
  amount: number;
  details: PaymentCalculatorDetails;
  includesIGTF: boolean;
  includesIVA: boolean;
  operationCost: boolean;
  currency: string;
  exchangeRate: number;
}

export interface PaymentCalculatorRequest {
  bankProductId: number;
  amountUSD: number;
}
