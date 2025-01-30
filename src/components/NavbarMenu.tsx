'use client';

import { buttonVariants } from '@components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { cn } from '@lib/utils';
import { CircleUser } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const NavbarMenu = () => {
  const router = useRouter();

  const handlerLogOut = () => {
    if (typeof window !== 'undefined') {
      // remove cookies
      document.cookie =
        'session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie =
        'token_expires=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

      router.replace('/sign-in');
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        as-child="true"
        className={cn(
          buttonVariants({
            variant: 'secondary',
            size: 'icon',
            className: 'rounded-full',
          }),
        )}
      >
        <CircleUser className="h-5 w-5" />
        <span className="sr-only">Toggle user menu</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/accounting" className="w-full h-full">
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handlerLogOut} className="cursor-pointer">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarMenu;
