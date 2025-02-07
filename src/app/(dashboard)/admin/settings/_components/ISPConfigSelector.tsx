import { Badge } from '@components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { handlerGetMyIspConfig, type IISPConfig } from '../actions';

const ISPConfigSelector = async () => {
  const allConfigs = await handlerGetMyIspConfig();
  if ('errorCode' in allConfigs) {
    return (
      <div className="flex items-center justify-center">
        <h1>Error</h1>
        <p>The configs are not available at the moment</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-2 p-4">
      {(allConfigs as IISPConfig[]).map((config) => (
        <Link
          href={`/admin/settings?section=isp-config&&ispId=${config.id}&&update=false`}
          key={config.id}
          className={
            config.api_url == null || config.api_url === ''
              ? 'pointer-events-none'
              : 'hover:scale-[102%] transition-all duration-300 group'
          }
          aria-disabled={config.api_url == null || config.api_url === ''}
          tabIndex={
            config.api_url == null || config.api_url === '' ? -1 : undefined
          }
        >
          <Card>
            <CardHeader>
              <div
                aria-hidden="true"
                className="relative mb-4 h-20 w-28 text-muted-foreground mx-auto"
              >
                <Image
                  src={`/img/isp-icons/${config.name}.png`}
                  alt="cart empty"
                  fill
                  className="object-contain "
                />
              </div>

              <CardTitle>{config.name}</CardTitle>
              <CardDescription>{config.api_url}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full">
                {config.api_url == null || config.api_url === '' ? (
                  <div className="flex items-center justify-between">
                    <p className="text-muted-foreground text-center">
                      This ISP configuration is currently disabled. Please
                      contact your administrator to enable it.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col ">
                    <div className="w-full flex items-center justify-between">
                      <span className="text-muted-foreground">Base ISP:</span>
                      {config.isp.find((isp) => isp.is_active) != null ? (
                        <Badge variant={'default'}>Active</Badge>
                      ) : (
                        <Badge variant={'destructive'}>Inactive</Badge>
                      )}
                    </div>
                    {/* <div className="w-full flex items-center justify-between">
                    <span className="text-muted-foreground">
                      ISP Active Name:
                    </span>
                    <span className="font-medium">
                      {config.isp.find((isp) => isp.is_active)?.name}
                    </span>
                  </div> */}
                  </div>
                )}
              </div>
            </CardContent>
            {/* <CardFooter>
            <Button
              asChild
              className="w-full"
              variant="secondary"
              href={`?update=true`}
              type="submit"
            >
              <Link href={`/admin/settings?section=isp-config&update=true`}>
                Update
              </Link>
            </Button>
          </CardFooter> */}
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default ISPConfigSelector;
