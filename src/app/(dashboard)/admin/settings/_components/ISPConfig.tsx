import { buttonVariants } from '@/components/ui/button';
import { Badge } from '@components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@components/ui/card';
import { cn } from '@lib/utils';
import { AlertTriangle, Pencil } from 'lucide-react';
import Link from 'next/link';
import { handlerGetMyIspConfig, type IISPConfig } from '../actions';
import ISPConfigForm from './ISPConfigForm';
import SecretApiKey from './SecretApiKey';

interface IISPProps {
  update: boolean;
  id: string;
}

const ISPConfig = async (props: IISPProps) => {
  const { update, id } = props;
  const IspConfig = await handlerGetMyIspConfig(id);
  if ('errorCode' in IspConfig) {
    return (
      <div>
        <h1>Error</h1>
        <p>{IspConfig.message}</p>
      </div>
    );
  }
  const currentIspConfig = IspConfig as IISPConfig;
  if (update) {
    return <ISPConfigForm data={currentIspConfig} update={update} />;
  }
  return (
    <div className="space-y-4">
      <div className="inline-flex justify-end  w-full">
        <Link
          href={`/admin/settings?section=isp-config&&ispId=${id}&&update=true`}
          className={cn(
            buttonVariants({
              className: 'px-6',
            }),
          )}
        >
          Update ISP config <Pencil className="w-4 h-4 ml-4" />{' '}
        </Link>
      </div>
      <Card className="w-full max-w-full ">
        <CardHeader className="rounded-t-sm bg-red-600/10 text-destructive">
          <div className="flex flex-row items-center  gap-2 ">
            <AlertTriangle className="h-5 w-5" />
            <div className="text-lg font-semibold">API Access Warning</div>
          </div>
          <p>
            This ISP configuration is currently inactive. Please update the
            configuration to activate the ISP.
          </p>
        </CardHeader>
        <CardContent className="grid gap-4 p-6">
          <div className="space-y-2">
            <h2 className="text-xl font-bold">{currentIspConfig.name}</h2>
            <p className="text-sm text-muted-foreground">
              {currentIspConfig.api_url}
            </p>
            <SecretApiKey ispKey={currentIspConfig.api_key} />
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">ISP Details</h3>
              <div className="grid gap-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">
                    {currentIspConfig.isp[0].name}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium">
                    {currentIspConfig.isp[0].email}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">RIF:</span>
                  <span className="font-medium">
                    {currentIspConfig.isp[0].rif}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge
                    variant={
                      currentIspConfig.isp[0].is_active
                        ? 'default'
                        : 'destructive'
                    }
                  >
                    {currentIspConfig.isp[0].is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t border-border/25 bg-muted/50 px-6 py-4">
          <p className="text-xs text-muted-foreground">
            Last updated:{' '}
            {new Date(currentIspConfig.isp[0].created_at).toLocaleDateString()}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
export default ISPConfig;
