import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { Label } from '@components/ui/label';
import { type BankPaymentProduct } from '@interfaces/paymentMethods.interface';
import { useMemo, useState } from 'react';
import MobilePayForm from './C2pForm';
import VerificationApiForm from './VerificationApiForm';

interface IBankTransferProps {
  bankProducts: BankPaymentProduct[];
}

// const payMethods = [
//   {
//     id: '1',
//     name: 'VERIFICATION_API',
//     label: 'Verification API',
//   },
//   {
//     id: '2',
//     name: 'C2P',
//     label: 'Mobile Payment',
//   },
//   // {
//   //   id: '3',
//   //   name: 'BANK_TRANSFER',
//   //   label: 'Bank Transfer',
//   // },
//   {
//     id: '3',
//     name: 'PAY_BUTTON',
//     label: 'Pay Button',
//   },
// ];

const BankTransfer = (props: IBankTransferProps) => {
  const { bankProducts } = props;
  const [bankTransferType, setBankTransferType] = useState<null | string>(null);
  // const [methods, setMethods] = useState<BankPaymentProduct[]>([]);
  const [banksSelected, setBanksSelected] = useState<null | number>(null);

  // const getBankMethods = async () => {
  //   const response = await handlerGetPaymentMethods();
  //   if ('errorCode' in response) {
  //     console.log('error: ', response.errorCode);
  //   } else {
  //     console.log('this are my products', response.products);
  //     setMethods(response.products.null);
  //   }
  // };

  const banksAvailable = useMemo(() => {
    const banks = [];
    if (bankProducts.length > 0) {
      const findCurrent = bankProducts.find(
        (method) => method.name === bankTransferType,
      );
      banks.push(findCurrent?.banks);
    }
    return banks;
  }, [bankProducts, bankTransferType]);

  // useEffect(() => {
  //   // Buscar productos que coincidan con los bancos objetivo

  //   // Establecer métodos si se encuentra un producto válido
  //   if (bankTransferProducts != null) {
  //     setMethods(bankTransferProducts);
  //   }
  // }, [bankProducts]);

  return (
    <div className="pt-4">
      <p className="text-muted-foreground text-pretty text-xs">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <div className="inline-flex flex-wrap gap-4  py-4">
        {bankProducts.map((method) => (
          <Button
            key={method.id}
            variant={bankTransferType === method.name ? 'default' : 'outline'}
            onClick={() => {
              setBankTransferType(method.name);
            }}
          >
            {method.label === '' ? method.name : method.label}
          </Button>
        ))}
      </div>
      {bankTransferType != null && bankTransferType === 'VERIFICATION_API' && (
        <VerificationApiForm
          paymentMethod={bankProducts.find(
            (element) => element.name === 'VERIFICATION_API',
          )}
        />
      )}
      {bankTransferType != null && bankTransferType === 'C2P' && (
        <MobilePayForm
          paymentMethod={bankProducts.filter(
            (element) => element.name === 'C2P',
          )}
        />
      )}
      {bankTransferType != null && bankTransferType === 'PAY_BUTTON' && (
        <div className="flex flex-col gap-4">
          <p className="text-muted-foreground text-pretty text-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="ml-auto flex flex-col items-end">
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
          </div>
          {banksSelected != null && (
            <div className="w-full space-y-2">
              {banksSelected === parseFloat(banksSelected.toString()) && (
                <Button className="w-full">Pay Banesco</Button>
              )}
              <p className="text-muted-foreground/90 text-center text-pretty text-xs">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BankTransfer;
