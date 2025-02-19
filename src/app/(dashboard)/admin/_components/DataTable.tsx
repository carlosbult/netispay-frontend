'use client';

import { Badge } from '@components/ui/badge';
import { ScrollArea } from '@components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { type Transaction } from './fakeData';

interface DataTableProps {
  data: Transaction[];
}

export const DataTable = (props: DataTableProps) => {
  const { data } = props;
  // const [pageSize, setPageSize] = useState(100);

  // const table = useReactTable({
  //   data,
  //   columns,
  //   getCoreRowModel: getCoreRowModel(),
  //   getPaginationRowModel: getPaginationRowModel(),
  //   initialState: {
  //     pagination: {
  //       pageSize,
  //     },
  //   },
  // });

  console.log('data: ', data);

  return (
    <div className="flex flex-col h-[calc(100vh-17rem)] ">
      <div className="rounded-lg flex-1 overflow-hidden flex flex-col">
        <ScrollArea className=" flex-1 pr-4">
          {/* <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length !== 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    onClick={() => onRowClick?.(row.original)}
                    className="cursor-pointer"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No hay resultados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table> */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>

                <TableHead className="hidden sm:table-cell">Banco</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Producto Bancario
                </TableHead>
                <TableHead className="hidden sm:table-cell">Estado</TableHead>
                <TableHead className="hidden md:table-cell">Fecha</TableHead>
                <TableHead className="text-right">Moneda</TableHead>
                <TableHead className="text-right">Monto</TableHead>
                <TableHead className="sr-only">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((element) => (
                <TableRow className="bg-card" key={element.id}>
                  <TableCell>
                    <div className="font-medium">
                      {element.client_profile.name}
                    </div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      <span className="flex">
                        <span className="mr-2">
                          {element.client_profile.isp.network_manager.name} ID:
                        </span>
                        <span className="font-bold">
                          {element.client_profile.network_manager_user_id}
                        </span>
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {element.bank_product.banks.name}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {element.bank_product.name}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {element.payment_status === 'SUCCESS' && (
                      <Badge className="text-xs" variant="default">
                        Pagado
                      </Badge>
                    )}
                    {element.payment_status === 'PENDING' && (
                      <Badge className="text-xs" variant="secondary">
                        Pendiente
                      </Badge>
                    )}
                    {element.payment_status === 'FAILED' && (
                      <Badge className="text-xs" variant="destructive">
                        Fallido
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {element.created_at.split('T')[0]}
                  </TableCell>
                  <TableCell className="text-right">
                    {element.currency}
                  </TableCell>
                  <TableCell className="text-right">{element.amount}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end">
                      <button className="text-blue-500 hover:text-blue-700">
                        View
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {/* <TableRow>
                <TableCell>
                  <div className="font-medium">Olivia Smith</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    olivia@example.com
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">Binance</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="outline">
                    Declined
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  2023-06-24
                </TableCell>
                <TableCell className="text-right">$150.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="font-medium">Noah Williams</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    noah@example.com
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">PayPal</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="secondary">
                    Fulfilled
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  2023-06-25
                </TableCell>
                <TableCell className="text-right">$350.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="font-medium">Emma Brown</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    emma@example.com
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">Binance</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="secondary">
                    Fulfilled
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  2023-06-26
                </TableCell>
                <TableCell className="text-right">$450.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="font-medium">Liam Johnson</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    liam@example.com
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">Binance</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="secondary">
                    Fulfilled
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  2023-06-23
                </TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="font-medium">Liam Johnson</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    liam@example.com
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">Binance</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="secondary">
                    Fulfilled
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  2023-06-23
                </TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="font-medium">Olivia Smith</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    olivia@example.com
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">Refund</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="outline">
                    Declined
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  2023-06-24
                </TableCell>
                <TableCell className="text-right">$150.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="font-medium">Emma Brown</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    emma@example.com
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">Binance</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="secondary">
                    Fulfilled
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  2023-06-26
                </TableCell>
                <TableCell className="text-right">$450.00</TableCell>
              </TableRow> */}
            </TableBody>
          </Table>
          {/* <TablePagination
            table={table}
            totalItems={data.length}
            onPageSizeChange={setPageSize}
          /> */}
        </ScrollArea>
      </div>
    </div>
  );
};
