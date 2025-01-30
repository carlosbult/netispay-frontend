'use client';

import { type ColumnDef } from '@tanstack/react-table';
import { Badge } from '@components/ui/badge';
import { type Client } from './data';

export const columns: Array<ColumnDef<Client>> = [
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'services',
    header: 'N° Servicios',
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: ({ row }) => {
      const status = row.getValue('status');
      return (
        <Badge
          className={`${status === 'exitosa' ? 'bg-success text-success-foreground' : 'text-white bg-red-500'}`}
        >
          {status === 'active' ? 'Activo' : 'Suspendido'}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'cutoffDate',
    header: 'Fecha de corte',
  },
];
