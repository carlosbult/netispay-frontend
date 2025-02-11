'use client';
import { API_BASE_URL, ApiService } from '@services/api/api.service';
import {
  CircleUserRound,
  // ChartSpline,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { handleClientLogout } from 'src/app/authClient';
import { removeAuthCookie } from 'src/app/authServer';
import { useAuthStore } from 'src/shared/store/useAuthStore';
import { Button } from '../../components/ui/button';
import { type RoleNavigation } from '../../interfaces/header.interface';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useToast } from './ui/use-toast';

const apiService = new ApiService(API_BASE_URL);

const roleNavigation: RoleNavigation = {
  ADMIN: {
    mainNav: [
      {
        label: 'Dashboard',
        href: '/dashboard/admin',
        icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
      },
      {
        label: 'Clientes',
        href: '/dashboard/admin/clients',
        icon: <Users className="mr-2 h-4 w-4" />,
      },
      // {
      //   label: 'Estadísticas',
      //   href: '/dashboard/admin/stats',
      //   icon: <ChartSpline className="mr-2 h-4 w-4" />,
      // },
      {
        label: 'Configuración',
        href: '/dashboard/admin/settings',
        icon: <Settings className="mr-2 h-4 w-4" />,
      },
      // {
      //   label: 'Soporte',
      //   href: '/dashboard/admin/support',
      //   icon: <CircleHelp className="mr-2 h-4 w-4" />,
      // },
    ],
    userNav: [
      {
        label: 'Mi Perfil',
        href: '/dashboard/admin/profile',
        icon: <CircleUserRound className="mr-2 h-4 w-4" />,
      },
    ],
  },
  CLIENT: {
    mainNav: [],
    userNav: [
      {
        label: 'Mi Perfil',
        href: '/dashboard/client/profile',
        icon: <CircleUserRound className="mr-2 h-4 w-4" />,
      },
    ],
  },
};

export const Header = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { role, clearAuth } = useAuthStore();

  const navigation =
    role !== null ? roleNavigation[role] : roleNavigation.CLIENT;

  const handleLogout = async () => {
    try {
      const logoutResponse: { message: string } = await apiService.post(
        '/auth/logout',
        {},
      );

      if (logoutResponse.message === 'Cierre de sesión exitoso') {
        await removeAuthCookie();
        await handleClientLogout();
        clearAuth();
        toast({
          title: 'Gracias por usar nuestro sistema',
          description: logoutResponse.message,
        });
      }

      router.push('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
      <div className="max-w-[1440px] flex justify-between items-center px-4 py-2 m-auto">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="font-bold text-xl">
            LOGO
          </Link>

          {/* Navegación principal */}
          <nav className="hidden md:flex items-center gap-4">
            {navigation?.mainNav?.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-gray-900 px-4 cursor-pointer flex items-center "
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* Menú de usuario */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="rounded-full outline-none"
                size="icon"
                variant="outline"
              >
                <CircleUserRound />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <DropdownMenuLabel className="truncate font-semibold p-1">
                  Carlos Acevedo
                </DropdownMenuLabel>
                <DropdownMenuLabel className="truncate text-xs p-1 py-0 font-light">
                  acevedo.bult@gmail.com
                </DropdownMenuLabel>
              </div>

              <DropdownMenuSeparator />

              {navigation.userNav.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link
                    href={item.href}
                    className="flex items-center cursor-pointer"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </DropdownMenuItem>
              ))}

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  void handleLogout();
                }}
                className="text-red-600 cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar Sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
