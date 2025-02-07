'use client';

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import { Button } from '@components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@components/ui/drawer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'src/hooks/use-media-query';

// const items = [
//   { href: '#', label: 'Dashboard' },
//   { href: '#', label: 'ISP Config' },
//   { href: '#', label: 'ISP Data' },
//   { label: 'Edit ISP' },
// ];

interface IBreadcrumbItem {
  href?: string;
  label: string;
}

const ITEMS_TO_DISPLAY = 4;

export const BreadcrumbNav = () => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<IBreadcrumbItem[]>([
    { href: '/admin', label: 'Dashboard' },
  ]);
  const router = useRouter();

  const isDesktop = useMediaQuery('(min-width: 768px)');
  const back = () => {
    router.back();
  };

  const getCurrentUrl = () => {
    if (typeof window !== 'undefined') {
      const urlString = window.location.href;
      const urlObj = new URL(urlString);

      // Get protocol, host, and port
      // const protocol = urlObj.protocol; // "http:"
      // const host = urlObj.host; // "localhost:3001"

      // Split the pathname into segments, filtering out any empty strings
      const pathSegments = urlObj.pathname
        .split('/')
        .filter((segment) => segment !== '');

      // Extract search parameters and map them to "key=value" strings
      const queryParams = Array.from(urlObj.searchParams.entries()).map(
        ([key, value]) => `${key}=${value}`,
      );

      // Combine all parts into a single array
      const parts = [...pathSegments, ...queryParams];

      return parts;
    }
    return '';
  };

  console.log(getCurrentUrl());

  useEffect(() => {
    const parts = getCurrentUrl();
    const bread: IBreadcrumbItem[] = [];
    if (parts !== '') {
      parts.forEach((element) => {
        if (element === 'admin') {
          bread.push({
            href: '/admin',
            label: 'Dashboard',
          });
        }
        if (element === 'section=isp-config') {
          console.log('count');
          bread.push({
            href: '/admin/settings?section=isp-config',
            label: 'ISP Configs',
          });
        }
        if (element.split('=')[0] === 'ispId') {
          bread.push({
            href: `/admin/settings?section=isp-config&&${element}&&update=false`,
            label: 'ISP Details',
          });
        }
      });
    }
    setItems(bread);
  }, []);

  return (
    <nav className="pt-16 pl-10 flex gap-2 items-center">
      {/* back button */}
      <Button
        variant={'ghost'}
        className="flex items-center gap-1"
        onClick={back}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <Breadcrumb>
        <BreadcrumbList>
          {/* <BreadcrumbItem>
            <BreadcrumbLink href={items[0].href}>
              {items[0].label}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator /> */}
          {items.length > ITEMS_TO_DISPLAY ? (
            <>
              <BreadcrumbItem>
                {isDesktop ? (
                  <DropdownMenu open={open} onOpenChange={setOpen}>
                    <DropdownMenuTrigger
                      className="flex items-center gap-1"
                      aria-label="Toggle menu"
                    >
                      <BreadcrumbEllipsis className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {items.slice(1, -2).map((item, index) => (
                        <DropdownMenuItem key={index}>
                          <Link href={item.href ?? '#'}>{item.label}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Drawer open={open} onOpenChange={setOpen}>
                    <DrawerTrigger aria-label="Toggle Menu">
                      <BreadcrumbEllipsis className="h-4 w-4" />
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader className="text-left">
                        <DrawerTitle>Navigate to</DrawerTitle>
                        <DrawerDescription>
                          Select a page to navigate to.
                        </DrawerDescription>
                      </DrawerHeader>
                      <div className="grid gap-1 px-4">
                        {items.slice(1, -2).map((item, index) => (
                          <Link
                            key={index}
                            href={item.href ?? '#'}
                            className="py-1 text-sm"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                      <DrawerFooter className="pt-4">
                        <DrawerClose asChild>
                          <Button variant="outline">Close</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                )}
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          ) : null}
          {items.slice(-ITEMS_TO_DISPLAY + 1).map((item, index) => (
            <BreadcrumbItem key={index}>
              {item.href != null ? (
                <>
                  <BreadcrumbLink
                    asChild
                    className="max-w-20 truncate md:max-w-none"
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                </>
              ) : (
                <BreadcrumbPage className="max-w-20 truncate md:max-w-none">
                  {item.label}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
};
