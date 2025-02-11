import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { type BankPaymentProduct } from '@interfaces/paymentMethods.interface';
import { useState } from 'react';
import VerificationApiForm from './VerificationApiForm';

interface ICryptoProps {
  bankProducts: BankPaymentProduct[];
}

const payMethods = [
  {
    id: '1',
    name: 'VERIFICATION_API',
    label: 'Verification API',
  },
  {
    id: '4',
    name: 'PAY_BUTTON',
    label: 'Pay Button',
  },
];

const Crypto = (props: ICryptoProps) => {
  const { bankProducts } = props;
  const [CryptoType, setCryptoType] = useState<null | string>(null);
  // const [methods, setMethods] = useState<BankPaymentProduct[]>([]);
  // const [banksSelected, setBanksSelected] = useState<null | number>(null);

  // const getBankMethods = async () => {
  //   const response = await handlerGetPaymentMethods();
  //   if ('errorCode' in response) {
  //     console.log('error: ', response.errorCode);
  //   } else {
  //     console.log('this are my products', response.products);
  //     setMethods(response.products.null);
  //   }
  // };

  // const banksAvailable = useMemo(() => {
  //   const banks = [];
  //   if (methods.length > 0) {
  //     const findCurrent = methods.find((method) => method.name === CryptoType);
  //     banks.push(findCurrent?.banks);
  //   }
  //   return banks;
  // }, [methods, CryptoType]);

  // useEffect(() => {
  //   const targetBanks = ['BNB'];

  //   // Buscar productos que coincidan con los bancos objetivo
  //   const CryptoProducts = bankProducts.filter((product) =>
  //     targetBanks.some((bank) => product.banks.name.includes(bank)),
  //   );

  //   // Establecer métodos si se encuentra un producto válido
  //   if (CryptoProducts != null) {
  //     setMethods(CryptoProducts);
  //   }
  // }, [bankProducts]);

  return (
    <div className="pt-4">
      <p className="text-muted-foreground text-pretty text-xs">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <div className="inline-flex flex-wrap gap-4  py-4">
        {payMethods.map((method) => (
          <Button
            key={method.id}
            variant={CryptoType === method.name ? 'default' : 'outline'}
            onClick={() => {
              setCryptoType(method.name);
            }}
          >
            {method.label}
          </Button>
        ))}
      </div>
      {CryptoType != null && CryptoType === 'VERIFICATION_API' && (
        <VerificationApiForm
          paymentMethod={bankProducts.find(
            (element) =>
              element.banks.name === 'BINANCE' &&
              element.name === 'VERIFICATION_API',
          )}
        />
      )}
      {CryptoType != null && CryptoType === 'C2P' && (
        <div className="space-y-4">
          <Input placeholder="Número de teléfono" />
          <Input placeholder="Cédula" />
          <Input placeholder="Referencia" />
          <Button className="w-full">Confirmar pago</Button>
        </div>
      )}
      {CryptoType != null && CryptoType === 'PAY_BUTTON' && (
        <div className="flex flex-col gap-4">
          <div className="w-full flex flex-col items-center justify-center h-full pt-10">
            <h3 className="text-muted-foreground text-pretty text-lg">
              Not available for this moment, please try again later or contact
            </h3>
          </div>
          {/* <p className="text-muted-foreground text-pretty text-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p> */}
          {/* <div className="ml-auto flex flex-col items-end">
            <Label className="pb-2">Chose your bank:</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="max-w-[100px] h-7">
                <Button variant="outline">Chose</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                // value="top"
                // onValueChange={setPosition}
                >
                  {banksAvailable.length > 0 &&
                    banksAvailable.map((bank) => (
                      <DropdownMenuCheckboxItem
                        checked={banksSelected === bank?.id}
                        onCheckedChange={(checked) => {
                          setBanksSelected(bank?.id != null ? bank?.id : null);
                        }}
                        key={bank?.id}
                      >
                        {bank?.name}
                      </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div> */}
          {/* {banksSelected != null && (
            <div className="w-full space-y-2">
              {banksSelected === parseFloat(banksSelected.toString()) && (
                <Button className="w-full">Pay Banesco</Button>
              )}
              <p className="text-muted-foreground/90 text-center text-pretty text-xs">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          )} */}
        </div>
      )}
    </div>
  );
};

export default Crypto;
