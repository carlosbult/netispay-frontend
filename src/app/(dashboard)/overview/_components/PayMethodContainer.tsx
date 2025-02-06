import { type BankPaymentProduct } from '@interfaces/paymentMethods.interface';
import BankTransfer from './BankTransfer';
import Crypto from './Crypto';
import PayPal from './PayPal';

interface IPaymentMethodContainerProps {
  method: string;
  bankProducts: BankPaymentProduct[];
}

const PaymentMethodContainer = (props: IPaymentMethodContainerProps) => {
  const { method, bankProducts } = props;
  // const typeVerificationApi = bankProducts.find(
  //   (product) => product.name === 'VERIFICATION_API',
  // );
  // const typeC2P = bankProducts.find((product) => product.name === 'C2P');

  if (method === 'bank-transfer')
    return <BankTransfer bankProducts={bankProducts} />;

  if (method === 'binance') return <Crypto bankProducts={bankProducts} />;

  if (method === 'payPal') return <PayPal />;

  return <div>PaymethodContainer</div>;
};

export default PaymentMethodContainer;
