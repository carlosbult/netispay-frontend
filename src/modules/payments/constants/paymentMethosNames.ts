export const PAYMENT_METHOD_NAMES = {
  PAY_BUTTON: 'Botón de Pago',
  C2P: 'Pago Móvil',
  B2P: 'Vuelto a cliente',
  P2P: 'Transferencia P2P',
  ZELLE: 'Pago con Zelle',
  VERIFICATION_API: 'Confirmar transacción',
} as const;

export type PaymentMethodType = keyof typeof PAYMENT_METHOD_NAMES;

export const getPaymentMethodName = (methodType: PaymentMethodType): string => {
  return PAYMENT_METHOD_NAMES[methodType];
};
