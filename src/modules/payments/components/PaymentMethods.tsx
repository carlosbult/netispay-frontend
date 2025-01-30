'use client';
import Image from 'next/image';
import { Card, CardContent } from 'src/shared/components/ui/card';
import { ErrorCard } from '@components/ErrorCard';
import { Input } from 'src/shared/components/ui/input';
import { Button } from 'src/shared/components/ui/button';
import { useBankProducts } from '../hooks/useBankProduct';
import { type PaymentProduct } from '../types/paymentProducts.interface';
import { LoadingState } from '@components/Loader';
import { Badge } from '@components/ui/badge';
import {
  getPaymentMethodName,
  type PaymentMethodType,
} from '../constants/paymentMethosNames';
import { PaymentCalculation } from 'src/modules/users/components/PaymentCalculation';
import { useInvoiceSelection } from 'src/shared/store/useInvoiceSelection';
import { Alert, AlertDescription } from '@components/ui/alert';
import { BinanceVerificationForm } from './BinanceVerificationForm';

interface PaymentMethod {
  id: number;
  name: string;
  icon: string;
  formType: string;
  bankName: string;
  bankCode: string;
}

const PagoMovilForm = () => (
  <Card className="p-4">
    <h3 className="font-medium mb-4">Pago Móvil</h3>
    <div className="space-y-4">
      <Input placeholder="Número de teléfono" />
      <Input placeholder="Cédula" />
      <Input placeholder="Referencia" />
      <Button className="w-full">Confirmar pago</Button>
    </div>
  </Card>
);

const BinanceForm = () => (
  <Card className="p-4">
    <h3 className="font-medium mb-4">Pago con Binance</h3>
    <div className="space-y-4">
      <Input placeholder="Wallet ID" />
      <Input placeholder="Transaction Hash" />
      <Button className="w-full">Confirmar pago</Button>
    </div>
  </Card>
);

export const PaymentMethods = () => {
  const { totalAmount, selectedPaymentMethod, setSelectedPaymentMethod } =
    useInvoiceSelection();

  const {
    data: bankProductsResponse,
    isPending,
    error,
  } = useBankProducts({ status: 'active' });

  if (isPending) return <LoadingState title="Cargando métodos de pago..." />;
  if (error !== null) return <ErrorCard error={error} />;

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedPaymentMethod({
      id: method.id,
      name: method.name,
      formType: method.formType,
      bankName: method.bankName,
      bankCode: method.bankCode,
    });
  };

  const mapBankProductsToPaymentMethods = (
    products: PaymentProduct[],
  ): PaymentMethod[] => {
    return products.map((product) => ({
      id: product.id,
      name: getPaymentMethodName(product.name as PaymentMethodType),
      icon: `/icons/${product.banks.code.toLowerCase()}-icon.svg`,
      formType: product.name,
      bankName: product.banks.name,
      bankCode: product.banks.code,
    }));
  };

  const renderPaymentForm = () => {
    if (selectedPaymentMethod === null) return null;

    switch (selectedPaymentMethod.formType) {
      case 'VERIFICATION_API':
        return <BinanceVerificationForm />;
      case 'C2P':
        return <PagoMovilForm />;
      case 'B2P':
        return <BinanceForm />;
      default:
        return null;
    }
  };

  const paymentMethods = mapBankProductsToPaymentMethods(
    bankProductsResponse?.products,
  );

  return (
    <Card className="p-0 border-none w-full bg-transparent sh">
      <h2 className="text-xl font-semibold mb-4">Métodos de pago</h2>

      <CardContent className="p-0 flex flex-col gap-4">
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-4">
          {paymentMethods.map((method) => (
            <Card
              key={method.id}
              className={`cursor-pointer transition-all hover:scale-105
              ${
                selectedPaymentMethod?.id === method.id
                  ? 'border-primary ring-1 ring-primary'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => {
                handleMethodSelect(method);
              }}
            >
              <CardContent
                className="p-2 flex flex-col items-center
              justify-center text-center gap-2"
              >
                <div className="size-16 bg-gray-200 rounded-full mb-2 ">
                  <Image
                    src={method.icon}
                    alt={method.name}
                    className="w-full h-full object-contain"
                    width={500}
                    height={500}
                  />
                </div>
                <span className="text-sm line-clamp-2">{method.name}</span>
                <Badge>{method.bankName}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedPaymentMethod.id !== 0 && totalAmount.total !== 0 ? (
          <div className="text-sm flex flex-col gap-4">
            <PaymentCalculation />
            {renderPaymentForm()}
          </div>
        ) : (
          <Alert>
            <AlertDescription>
              Seleccione al menos una factura y un método de pago
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};
