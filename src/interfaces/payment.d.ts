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
  systemCommission?: number;
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

export interface IPaymentResult {
  transactionId: number;
  bankReference: string;
  amount: number;
  currency: string;
  status: string;
  errorCode?: string;
  errorMessage?: string;
  paymentMethod: string;
  isDuplicate?: boolean;
  success: boolean;
}

interface OriginalInvoiceData {
  estado: string;
  salida: string;
  id: number;
}

interface IInvoiceItem {
  descrp: string;
  unidades: number;
  imp: string;
  precio: string;
  total: string;
  precio2: string;
  total2: string;
}

interface IInvoicePaymentResponse {
  invoiceId: string;
  status: string;
  paidAmount: number;
  transactionReference: string;
  paymentDate: string;
  originalInvoiceData: OriginalInvoiceData;
  updatedInvoiceData: {
    estado: string;
    factura: {
      id: number;
      legal: number;
      idcliente: number;
      emitido: string;
      vencimiento: string;
      total: string;
      estado: string;
      cobrado: string;
      impuesto: string;
      oxxo_id: string;
      oxxo_referencia: string;
      barcode_cobro_digital: string;
      otros_impuestos: string;
      siro: number;
      hashsiro: string;
      siroconcepto: number;
      barcode_siro: string;
      percepcion_afip: string;
      saldo: string;
      moneda: number;
      urlpdf: string;
      fechapago: string;
      subtotal: string;
      subtotal2: string;
      total2: string;
      impuesto2: string;
      formapago: string;
    };
    items: InvoiceItem[];
  };
}

interface INetworkManagerResponse {
  invoices: IInvoicePaymentResponse[];
}

interface IPaymentResponse {
  success: boolean;
  paymentResult: IPaymentResult;
  networkManagerResponse: INetworkManagerResponse;
}
