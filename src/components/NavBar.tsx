'use client';

import { usePayInvoiceStore } from '@/store/use-payment';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from 'src/lib/utils';
import Icons from './Icons';
import MaxWidthWrapper from './MaxWidthWrapper';
import NavbarMenu from './NavbarMenu';

const NavBar = () => {
  // const router = useRouter()
  const pathname = usePathname();
  const { clientBalance } = usePayInvoiceStore();
  const publicRoutes = [
    '/sign-in',
    '/sign-up',
    '/forgot-password',
    '/reset-password',
  ];

  if (pathname.includes('/admin')) {
    return null;
  }

  // useEffect(() => {
  //   // get local storage
  // }, []);

  return (
    <div
      className={cn(
        `hidden lg:flex w-screen h-fit border-none justify-center items-center fixed mx-auto left-0 right-0 transition-all duration-150 bg-background z-50 `,
      )}
    >
      <MaxWidthWrapper className="py-4 inline-flex justify-between">
        <Link href="/overview" className="">
          <Icons.logoIsoTipo className="w-[150px]" />
        </Link>
        <div className="flex items-center gap-2">
          {!publicRoutes.some((route) => pathname.includes(route)) && (
            <div className="flex ">
              <span>Saldo: </span>
              <span className="ml-2">{clientBalance.toFixed(2)} $</span>
            </div>
          )}
          <NavbarMenu />
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default NavBar;
