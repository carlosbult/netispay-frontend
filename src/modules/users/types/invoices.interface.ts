interface Transaction {
  transactionId: number;
  paymentDate: string;
  amount: number;
  paymentMethod: string;
  reference: string;
  commission: number;
  description: string;
}

interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  invoiceId: number;
  issueDate: string;
  dueDate: string;
  paymentDate: string | null;
  status: string;
  balance: number;
  discount: number;
  total: number;
  subTotal: number;
  tax: number;
  paymentMethod: string;
  clientId?: number;
  reference: string;
  transactions?: Transaction[];
  items?: InvoiceItem[];
}

export interface InvoicesResponse {
  invoices: Invoice[];
}

export interface GetInvoicesParams {
  id: number;
  status?: number;
  limit?: number;
}

export interface GetInvoiceByIdParams {
  invoiceIds: number[];
}
