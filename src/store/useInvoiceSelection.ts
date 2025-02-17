import { create } from 'zustand';
import { type InvoiceSelectionStore } from '../interfaces/invoice.interface';

export const useInvoiceSelection = create<InvoiceSelectionStore>((set) => ({
  selectedInvoices: [],
  selectedPaymentMethod: {
    id: 0,
    name: '',
    bankName: '',
    formType: '',
    bankCode: '',
  },
  totalAmount: {
    total: 0,
    subTotal: 0,
  },

  setSelectedPaymentMethod: (method) => {
    set({ selectedPaymentMethod: method });
  },

  setSelectedInvoices: (newInvoices) => {
    set((state) => {
      const updatedInvoices = [
        ...state.selectedInvoices.filter(
          (invoice) =>
            !newInvoices.some(
              (newInvoice) => newInvoice.invoiceId === invoice.invoiceId,
            ),
        ),
        ...newInvoices,
      ];

      const totalAmount = updatedInvoices.reduce(
        (acc, curr) => ({
          total: acc.total + curr.total,
          subTotal: acc.subTotal + curr.subTotal,
        }),
        { total: 0, subTotal: 0 },
      );

      return { selectedInvoices: updatedInvoices, totalAmount };
    });
  },

  removeInvoices: (invoiceIdsToRemove) => {
    set((state) => {
      const updatedInvoices = state.selectedInvoices.filter(
        (invoice) => !invoiceIdsToRemove.includes(invoice),
      );

      const totalAmount = updatedInvoices.reduce(
        (acc, curr) => ({
          total: acc.total + curr.total,
          subTotal: acc.subTotal + curr.subTotal,
        }),
        { total: 0, subTotal: 0 },
      );

      return { selectedInvoices: updatedInvoices, totalAmount };
    });
  },

  toggleInvoice: (invoice) => {
    set((state) => {
      const isSelected = state.selectedInvoices.some(
        (inv) => inv.invoiceId === invoice.invoiceId,
      );
      const newSelection = isSelected
        ? state.selectedInvoices.filter(
            (inv) => inv.invoiceId !== invoice.invoiceId,
          )
        : [...state.selectedInvoices, invoice];

      const totalAmount = newSelection.reduce(
        (acc, curr) => ({
          total: acc.total + curr.total,
          subTotal: acc.subTotal + curr.subTotal,
        }),
        { total: 0, subTotal: 0 },
      );

      return { selectedInvoices: newSelection, totalAmount };
    });
  },

  clearSelection: () => {
    set({
      selectedInvoices: [],
      selectedPaymentMethod: {
        id: 0,
        name: '',
        bankName: '',
        formType: '',
        bankCode: '',
      },
      totalAmount: { total: 0, subTotal: 0 },
    });
  },
}));
