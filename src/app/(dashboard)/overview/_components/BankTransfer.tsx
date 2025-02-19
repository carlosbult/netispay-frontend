import { Button } from '@/components/ui/button';
import { usePayInvoiceStore } from '@/store/use-payment';
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
import {
  type BankPaymentProduct,
  type IBanksDetails,
} from '@interfaces/paymentMethods.interface';
import { useMemo, useState } from 'react';
import MobilePayForm from './C2pForm';
import VerificationApiForm from './VerificationApiForm';

interface IBankTransferProps {
  bankProducts: BankPaymentProduct[];
}

const BankTransfer = (props: IBankTransferProps) => {
  const { bankProducts } = props;
  // const [methods, setMethods] = useState<BankPaymentProduct[]>([]);
  const [banksSelected, setBanksSelected] = useState<null | number>(null);
  const { typePaymentMethod, addTypePaymentMethodState } = usePayInvoiceStore();

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
    const banks: IBanksDetails[] = [];
    if (bankProducts.length > 0) {
      const filterByType = bankProducts.filter(
        (element) => element.name === typePaymentMethod,
      );

      filterByType.forEach((element) => {
        banks.push(element.banks);
      });
    }
    return banks;
  }, [bankProducts, typePaymentMethod]);

  const methodsAvailable = useMemo(
    () =>
      Array.from(
        new Map(bankProducts.map((item) => [item.name, item])).values(),
      ),
    [bankProducts],
  );

  return (
    <div className="pt-4">
      <p className="text-muted-foreground text-pretty text-xs">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <div className="inline-flex flex-wrap gap-4  py-4">
        {methodsAvailable.map((method) => (
          <Button
            key={method.id}
            variant={typePaymentMethod === method.name ? 'default' : 'outline'}
            onClick={() => {
              addTypePaymentMethodState(method.name);
            }}
          >
            {method.label === '' ? method.name : method.label}
          </Button>
        ))}
      </div>
      {typePaymentMethod != null &&
        typePaymentMethod === 'VERIFICATION_API' && (
          <VerificationApiForm
            paymentMethod={bankProducts.find(
              (element) => element.name === 'VERIFICATION_API',
            )}
          />
        )}
      {typePaymentMethod != null && typePaymentMethod === 'C2P' && (
        <MobilePayForm
          paymentMethod={bankProducts.filter(
            (element) => element.name === 'C2P',
          )}
          banksAvailable={banksAvailable}
        />
      )}
      {typePaymentMethod != null && typePaymentMethod === 'PAY_BUTTON' && (
        <div className="flex flex-col gap-4">
          <p className="text-muted-foreground text-pretty text-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="ml-auto flex flex-col items-end">
            <Label className="pb-2">Seleccione su banco:</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="max-w-[100px] h-7">
                <Button variant="outline">Seleccionar</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Panel de posición</DropdownMenuLabel>
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
