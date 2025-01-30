'use client';

import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { type ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { formatCurrency } from 'src/lib/fomartCurrency';
import { type Payment } from './data';

export const columns: Array<ColumnDef<Payment>> = [
  {
    accessorKey: 'estado',
    header: 'Estado',
    cell: ({ row }) => {
      const status: string = row.getValue('estado');
      return (
        <Badge
          className={`${status === 'exitosa' ? 'bg-success text-success-foreground' : 'text-white bg-red-500'}`}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'moneda',
    header: 'Moneda',
  },
  {
    accessorKey: 'monto',
    header: 'Monto',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('monto'));
      const formatted = formatCurrency(amount, row.getValue('moneda'));
      return formatted;
    },
  },
  {
    accessorKey: 'banco',
    header: 'Banco',
  },
  {
    accessorKey: 'productoBancario',
    header: 'Producto Bancario',
  },
  {
    accessorKey: 'cliente',
    header: 'Cliente',
  },
  {
    accessorKey: 'fecha',
    header: 'Fecha',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      // const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-4 w-4 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem
            // onClick={async () => {
            //   await navigator.clipboard.writeText(payment.id);
            // }}
            >
              Copiar ID de pago
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Ver detalle</DropdownMenuItem>
            <DropdownMenuItem>Ver Cliente</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
