'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from 'src/shared/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from 'src/shared/components/ui/table';
import { Checkbox } from 'src/shared/components/ui/checkbox';
import { Button } from 'src/shared/components/ui/button';
import { MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'src/shared/components/ui/dropdown-menu';

interface ConfiguracionISP {
  fechaInicio: string;
  fechaFin: string;
  tasaBCV: number;
  iva: number;
  comision: number;
  ingresoNeto: {
    bcv: number;
    usd: number;
  };
}

interface BancoConfig {
  banco: string;
  producto: string;
  estatus: 'Activo' | 'Por Solicitar';
}

interface ClaveValor {
  clave: string;
  valor: string | number;
}

const ConfiguracionISPPage = () => {
  const [config] = useState<ConfiguracionISP>({
    fechaInicio: 'Jan 20, 2024',
    fechaFin: 'Feb 09, 2024',
    tasaBCV: 37.24,
    iva: 16,
    comision: 2.7,
    ingresoNeto: {
      bcv: 122300.0,
      usd: 12300.0,
    },
  });

  const [bancosConfig] = useState<BancoConfig[]>([
    { banco: 'Banesco', producto: 'Boton de pago', estatus: 'Activo' },
    { banco: 'Banesco', producto: 'C2P', estatus: 'Activo' },
    { banco: 'Bancamiga', producto: 'C2P', estatus: 'Activo' },
    { banco: 'Zelle', producto: 'Verificacion de zelle', estatus: 'Activo' },
    { banco: 'Binance', producto: 'Binance pay', estatus: 'Por Solicitar' },
  ]);

  const [clavesValores] = useState<ClaveValor[]>([
    { clave: 'Comision por transaccion', valor: 'Pagada por Cliente' },
    { clave: 'IVA', valor: '16%' },
    { clave: 'Tasa de Cambio', valor: '36.57 bs x $' },
  ]);

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6 overflow-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
        <h1 className="text-xl md:text-2xl font-bold">Configuracion de ISP</h1>
        <div className="text-sm text-muted-foreground">
          {config.fechaInicio} - {config.fechaFin}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card>
          <CardContent className="pt-4 md:pt-6">
            <div className="text-sm text-muted-foreground">Tasa del BCV</div>
            <div className="text-xl md:text-2xl font-bold">
              {config.tasaBCV}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 md:pt-6">
            <div className="text-sm text-muted-foreground">IVA</div>
            <div className="text-xl md:text-2xl font-bold">{config.iva}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 md:pt-6">
            <div className="text-sm text-muted-foreground">Comision</div>
            <div className="text-xl md:text-2xl font-bold">
              {config.comision}% Cliente
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 md:pt-6">
            <div className="text-sm text-muted-foreground">
              Ingreso neto de mes en curso
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline space-y-2 sm:space-y-0">
              <div>
                <span className="text-sm text-muted-foreground">BCV</span>
                <div className="text-xl md:text-2xl font-bold">
                  {config.ingresoNeto.bcv.toLocaleString('es-VE')}
                </div>
              </div>
              <div className="sm:text-right">
                <span className="text-sm text-muted-foreground">USD</span>
                <div className="text-lg md:text-xl">
                  {config.ingresoNeto.usd.toLocaleString('en-US')}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card className="overflow-hidden">
          <CardHeader>
            <h3 className="text-base md:text-lg font-semibold">
              Configuración de Bancos
            </h3>
          </CardHeader>
          <CardContent className="p-0 md:p-3">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12"></TableHead>
                    <TableHead>Banco</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Producto
                    </TableHead>
                    <TableHead>Estatus</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bancosConfig.map((banco, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell>{banco.banco}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {banco.producto}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs ${
                            banco.estatus === 'Activo'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {banco.estatus}
                        </span>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Solicitar</DropdownMenuItem>
                            <DropdownMenuItem>Ver requisitos</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader>
            <h3 className="text-base md:text-lg font-semibold">
              Configuración General
            </h3>
          </CardHeader>
          <CardContent className="p-0 md:p-3">
            <div className="overflow-x-auto">
              <Table>
                <TableBody>
                  {clavesValores.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {item.clave}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {item.valor}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConfiguracionISPPage;
