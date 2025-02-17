'use client';

import { type ICalculateMontToPay } from '@interfaces/payment';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface TPayInvoiceState {
  methodId: number | null;
  categoryPayment: string | null;
  typePaymentMethod: string | null;
  calculateToPayData: ICalculateMontToPay | null;
  clearPayInvoiceState: () => void;
  addPayInvoiceIdMethodState: (id: number) => void;
  removePayInvoiceMethodIdState: () => void;
  addCategoryPaymentMethodState: (categoryPayment: string) => void;
  removeCategoryPaymentMethodState: () => void;
  addTypePaymentMethodState: (typePaymentMethod: string) => void;
  removeTypePaymentMethodState: () => void;
  addCalculateToPayData: (calculateToPayData: ICalculateMontToPay) => void;
}

export const usePayInvoiceStore = create<TPayInvoiceState>()(
  persist(
    (set) => ({
      // base state
      methodId: null,
      categoryPayment: null,
      typePaymentMethod: null,
      calculateToPayData: null,

      // functions
      // payment method id
      addPayInvoiceIdMethodState: (id) => {
        set({
          methodId: id,
        });
      },
      removePayInvoiceMethodIdState: () => {
        set({
          methodId: null,
        });
      },
      // category payment
      addCategoryPaymentMethodState: (categoryPayment) => {
        set({
          categoryPayment,
        });
      },
      removeCategoryPaymentMethodState: () => {
        set({
          categoryPayment: null,
        });
      },
      // type payment method
      addTypePaymentMethodState: (typePaymentMethod) => {
        set({
          typePaymentMethod,
        });
      },
      removeTypePaymentMethodState: () => {
        set({
          typePaymentMethod: null,
        });
      },
      // calculate to pay
      addCalculateToPayData: (calculateToPayData) => {
        set({
          calculateToPayData,
        });
      },
      removeCalculateToPayData: () => {
        set({
          calculateToPayData: null,
        });
      },
      clearPayInvoiceState: () => {
        set({
          methodId: null,
          categoryPayment: null,
          typePaymentMethod: null,
          calculateToPayData: null,
        });
      },
    }),

    // storage details
    {
      name: 'pay-invoice-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
