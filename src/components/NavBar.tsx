import Link from 'next/link';
import { cn } from 'src/lib/utils';
import Icons from './Icons';
import MaxWidthWrapper from './MaxWidthWrapper';
import NavbarMenu from './NavbarMenu';

const NavBar = () => {
  return (
    <div
      className={cn(
        `hidden lg:flex w-screen h-fit border-none justify-center items-center fixed mx-auto left-0 right-0 transition-all duration-150 bg-white z-50 `,
      )}
    >
      <MaxWidthWrapper className="py-2 inline-flex justify-between">
        <Link href="/overview" className="">
          <Icons.logoIsoTipo className="w-[150px]" />
        </Link>
        <div className="flex items-center gap-2">
          <div className="flex ">
            <span>Balance: </span>
            <span className="ml-2">0.0 $</span>
          </div>
          <NavbarMenu />
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default NavBar;
