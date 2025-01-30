'use client';

import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Edit, Mail, X } from 'lucide-react';
import { type Client } from './data';

interface ClientDetailsProps {
  client: Client;
  onClose: () => void;
}

export const ClientDetails = ({ client, onClose }: ClientDetailsProps) => {
  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Detalle del cliente</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div
          className={`px-3 mt-2 py-1 rounded-full text-sm w-fit ${
            client.status === 'active'
              ? 'bg-success text-success-foreground'
              : 'bg-destructive text-destructive-foreground'
          }`}
        >
          {client.status === 'active' ? 'Activo' : 'Suspendido'}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Nombre completo</p>
            <p className="font-medium">{client.name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{client.email}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">N° de servicios</p>
              <p className="font-medium">{client.services}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Fecha de corte</p>
              <p className="font-medium">{client.cutoffDate}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1" variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Enviar correo
          </Button>
          <Button className="flex-1">
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
