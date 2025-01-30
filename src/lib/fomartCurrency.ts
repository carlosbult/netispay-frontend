export const formatCurrency = (
  amount: number = 0,
  currency: string = 'USD',
) => {
  return new Intl.NumberFormat('es-VE', {
    style: 'currency',
    currency,
  }).format(amount);
};
