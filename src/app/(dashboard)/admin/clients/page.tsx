'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Filter, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { ClientDetails } from 'src/modules/users/admin/components/ClientDetails';
import { type Client } from 'src/modules/users/admin/components/data';

const ClientsPage = () => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  // Datos de ejemplo - Reemplazar con datos reales de la API
  // const clients = [
  //   {
  //     id: '1',
  //     name: 'Carlos A',
  //     email: 'carlos@example.com',
  //     status: 'active',
  //     services: 2,
  //     cutoffDate: '2024-02-09',
  //   },
  // ];

  const stats = {
    total: 1320,
    active: 1289,
    suspended: 123,
  };

  return (
    <div className="h-screen flex flex-col p-2 gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Clientes</h1>
        <div className="flex items-center space-x-4">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filtrar
          </Button>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Nuevo Cliente
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.active}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Suspendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.suspended}</p>
          </CardContent>
        </Card>
      </div>

      <div
        className={`grid transition-all duration-300 ${
          selectedClient !== null ? 'grid-cols-[3fr_1fr]' : 'grid-cols-1'
        } gap-4 overflow-hidden`}
      >
        {/* <DataTable
          columns={columns}
          data={clients}
          onRowClick={(client) => {
            setSelectedClient(client);
          }}
        /> */}

        {selectedClient !== null && (
          <ClientDetails
            client={selectedClient}
            onClose={() => {
              setSelectedClient(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ClientsPage;
