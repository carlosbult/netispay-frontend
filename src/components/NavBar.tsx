'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from 'src/lib/utils';
import Icons from './Icons';
import MaxWidthWrapper from './MaxWidthWrapper';

const NavBar = () => {
  // const router = useRouter()
  const pathname = usePathname();
  if (pathname.includes('/admin')) {
    return null;
  }
  return (
    <div
      className={cn(
        `hidden lg:flex w-screen h-fit border-none justify-center items-center fixed mx-auto left-0 right-0 transition-all duration-150 bg-background z-50 `,
      )}
    >
      <MaxWidthWrapper className="py-2 inline-flex justify-between">
        <Link href="/overview" className="">
          <Icons.logoIsoTipo className="w-[150px]" />
        </Link>
        {/* <div className="flex items-center gap-2">
          <div className="flex ">
            <span>Balance: </span>
            <span className="ml-2">0.0 $</span>
          </div>
          <NavbarMenu />
        </div> */}
      </MaxWidthWrapper>
    </div>
  );
};

export default NavBar;
