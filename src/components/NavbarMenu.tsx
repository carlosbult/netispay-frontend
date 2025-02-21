/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import { usePayInvoiceStore } from '@/store/use-payment';
import { buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { closeSessionOnServer } from '@lib/auth';
import { cn } from '@lib/utils';
import { CircleUser } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const NavbarMenu = () => {
  const router = useRouter();
  const { clearPayInvoiceState } = usePayInvoiceStore();

  const closeSession = async () => {
    clearPayInvoiceState();
    await closeSessionOnServer();
    router.push('/sign-in');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        as-child="true"
        className={cn(
          buttonVariants({
            variant: 'default',
            size: 'icon',
            className: 'rounded-full',
          }),
        )}
      >
        <CircleUser className="h-5 w-5" />
        <span className="sr-only">Toggle user menu</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card">
        <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/accounting" className="w-full h-full">
            Configuraciones
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Soporte</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={closeSession} className="cursor-pointer">
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarMenu;
