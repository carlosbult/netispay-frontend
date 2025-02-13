/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@components/ui/collapsible';
import { ChevronRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

export const NavMain = ({
  items,
}: {
  items: Array<{
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: Array<{
      title: string;
      url: string;
    }>;
  }>;
}) => {
  let pathname: string = '';
  if (typeof window !== 'undefined') {
    pathname = window.location.pathname;
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isActive =
            pathname === item.url ||
            item.items?.some((subItem) => pathname === subItem.url);

          return item.items != null && item.items.length > 0 ? (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={isActive ? 'bg-gray-200 dark:bg-gray-700' : ''}
                  >
                    {item.icon != null && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => {
                      const isSubActive = pathname === subItem.url;
                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            className={
                              isSubActive ? 'bg-gray-300 dark:bg-gray-600' : ''
                            }
                          >
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                asChild
                className={isActive ? 'bg-gray-200 dark:bg-gray-700' : ''}
              >
                <Link href={item.url}>
                  {item.icon != null && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
};
