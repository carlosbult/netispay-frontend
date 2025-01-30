export interface Invoice {
  invoiceId: number;
  issueDate: string;
  dueDate: string;
  paymentDate?: string;
  status?: string;
  balance?: number;
  discount?: number;
  total: number;
  subTotal: number;
  tax?: number;
  paymentMethod?: string;
  platformFee?: number;
  clientId?: number;
  reference?: string;
  transactions?: [];
}

export interface PaymentMethodSelection {
  id: number;
  name: string;
  bankName: string;
  formType: string;
  bankCode: string;
}

export interface TotalAmount {
  total: number;
  subTotal: number;
}

export interface InvoiceSelectionStore {
  selectedInvoices: Invoice[];
  setSelectedInvoices: (invoices: Invoice[]) => void;
  removeInvoices: (invoices: Invoice[]) => void;
  toggleInvoice: (invoice: Invoice) => void;
  selectedPaymentMethod: PaymentMethodSelection;
  setSelectedPaymentMethod: (method: PaymentMethodSelection) => void;
  totalAmount: TotalAmount;
  clearSelection: () => void;
}
