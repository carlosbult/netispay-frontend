import { Button, buttonVariants } from '@/components/ui/button';
import { ScrollArea } from '@components/ui/scroll-area';
import { Separator } from '@components/ui/separator';
import { cn } from '@lib/utils';
import Link from 'next/link';

const sidebarNavItems = [
  // {
  //   title: 'Profile',
  //   href: '/examples/forms',
  // },
  {
    title: 'ISP Configuration',
    href: '?section=isp-config',
  },
  {
    title: 'Bank Configuration',
    href: '?section=bank-config',
  },
  {
    title: 'Commissions Configuration',
    href: '?section=commissions-config',
  },
];

interface ISideBarProps {
  children: React.ReactNode;
  pathname: string;
}

const SideBar = (props: ISideBarProps) => {
  const { children, pathname } = props;

  return (
    <>
      <div className="md:hidden"></div>
      <div className="hidden space-y-6 p-10 pt-2 pb-16 md:block min-h-screen h-full">
        <div className="space-y-0.5 mt-8">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 h-full">
          <aside className=" lg:w-1/5 h-full ">
            {/* <SidebarNav items={sidebarNavItems} /> */}
            <nav
              className={cn(
                'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 h-full',
              )}
            >
              {sidebarNavItems.map((item) =>
                // <Link
                //   key={item.href}
                //   href={item.href}
                //   className={cn(
                //     buttonVariants({ variant: 'ghost' }),
                //     pathname === item.href
                //       ? 'bg-muted hover:bg-muted'
                //       : 'hover:bg-transparent hover:underline',
                //     'justify-start',
                //   )}
                // >
                //   {item.title}
                // </Link>
                item.title !== 'Logout' ? (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      buttonVariants({
                        variant: item.href.includes(pathname)
                          ? 'default'
                          : 'ghost',
                        className: 'w-full justify-start font-normal',
                      }),
                    )}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <Button
                    type="button"
                    variant={'ghost'}
                    // onClick={() => {
                    //   document.cookie =
                    //     'AuthToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                    //   localStorage.removeItem('userId');
                    //   localStorage.removeItem('userRole');
                    //   setIsLoggedIn(false);
                    //   router.push('/');
                    // }}
                    key={item.href}
                  >
                    <span className="w-full text-start">{item.title}</span>
                  </Button>
                ),
              )}
            </nav>
          </aside>
          <ScrollArea className="flex-1 lg:max-w-6xl max-h-[60vh] px-6 pb-1 lg:border-l">
            {children}
          </ScrollArea>
        </div>
      </div>
    </>
  );
};

export default SideBar;
