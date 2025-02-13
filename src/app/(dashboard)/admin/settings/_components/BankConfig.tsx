import { Card, CardContent, CardHeader } from '@components/ui/card';
import { Checkbox } from '@components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { handlerGetPaymentMethods } from '../actions';
import BankConfigDialog from './BankConfigDialog';

// interface bankConfig {
//   bank: string;
//   producto: string;
//   estatus: 'Activo' | 'Por Solicitar';
// }

const BankConfig = async () => {
  const bankProducts = await handlerGetPaymentMethods();

  if ('errorCode' in bankProducts) {
    return <div>Error</div>;
  }

  return (
    <div>
      <Card className="overflow-hidden">
        <CardHeader>
          <h3 className="text-base md:text-lg font-semibold">
            Banks configuration
          </h3>
        </CardHeader>
        <CardContent className="p-0 md:p-3">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Bank</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Product
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bankProducts.products.BANK_TRANSFER.map((bank, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>{bank.banks.name}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {bank.name}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs ${
                          bank.is_active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {bank.is_active ? 'Activo' : 'No disponible'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <BankConfigDialog bank={bank} />
                      {/* <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Solicitar</DropdownMenuItem>
                          <DropdownMenuItem>Ver requisitos</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu> */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default BankConfig;
