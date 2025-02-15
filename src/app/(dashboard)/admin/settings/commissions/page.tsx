import { Card, CardContent, CardHeader } from '@components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import MaxWidthWrapper from 'src/components/MaxWidthWrapper';
import CommissionsDialog from './_components/CommissionsDialog';
import { handlerGetAllIspCommissions } from './actions';

const page = async () => {
  const allIspCommissions = await handlerGetAllIspCommissions();

  // const config: ConfiguracionISP = {
  //   fechaInicio: 'Jan 20, 2024',
  //   fechaFin: 'Feb 09, 2024',
  //   tasaBCV: 37.24,
  //   iva: 16,
  //   comision: 2.7,
  //   ingresoNeto: {
  //     bcv: 122300.0,
  //     usd: 12300.0,
  //   },
  // };

  return (
    <MaxWidthWrapper className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
        <h1 className="text-xl md:text-2xl font-bold">
          Configuración de comisiones de los ISP
        </h1>
        {/* <div className="text-sm text-muted-foreground">
          {config.fechaInicio} - {config.fechaFin}
        </div> */}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {/* <Card>
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
        </Card> */}

        {/* <Card>
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
        </Card> */}
      </div>

      <div className="w-full">
        <Card className="overflow-hidden">
          <CardHeader>
            <h3 className="text-base md:text-lg font-semibold">
              Configuración General
            </h3>
          </CardHeader>
          <CardContent className="p-0 md:p-3">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {/* <TableHead className="w-12"></TableHead> */}
                    <TableHead>Nombre de la ISP</TableHead>
                    <TableHead className="hidden sm:table-cell">IVA</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Tipo de comisión
                    </TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Estado
                    </TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allIspCommissions.map((item, index) => (
                    <TableRow key={index}>
                      {/* <TableCell>
                        <Checkbox />
                      </TableCell> */}
                      <TableCell className="whitespace-nowrap">
                        {item.isp.name}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {item.commission_type}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {item.iva_rate}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {item.isp.is_active ? 'Activa' : 'Inactiva'}
                      </TableCell>
                      <TableCell>
                        <CommissionsDialog commissionConfig={item} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
