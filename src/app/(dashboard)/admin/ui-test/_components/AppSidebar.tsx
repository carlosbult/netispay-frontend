'use client';

import { BookOpen, Bot, Home, Settings2 } from 'lucide-react';
import * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { NavMain } from './NavMain';
import { NavUser } from './NavUser';

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  // teams: [
  //   {
  //     name: 'Acme Inc',
  //     logo: GalleryVerticalEnd,
  //     plan: 'Enterprise',
  //   },
  //   {
  //     name: 'Acme Corp.',
  //     logo: AudioWaveform,
  //     plan: 'Startup',
  //   },
  //   {
  //     name: 'Evil Corp.',
  //     logo: Command,
  //     plan: 'Free',
  //   },
  // ],
  navMain: [
    {
      title: 'Inicio',
      url: '/admin',
      icon: Home,
      items: [],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'ISP',
          url: '/admin/settings?section=isp-config',
        },
        {
          title: 'Bancos',
          url: '/admin/settings?section=bank-config',
        },
        {
          title: 'Comisiones',
          url: '/admin/settings/commissions',
        },
      ],
    },
    {
      title: 'Clients',
      url: '#',
      icon: Bot,
      items: [
        {
          title: 'List',
          url: '/admin/clients',
        },
        // {
        //   title: 'Explorer',
        //   url: '#',
        // },
        // {
        //   title: 'Quantum',
        //   url: '#',
        // },
      ],
    },
    {
      title: 'Documentation',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Introduction',
          url: '#',
        },
        {
          title: 'Get Started',
          url: '#',
        },
        {
          title: 'Tutorials',
          url: '#',
        },
        {
          title: 'Changelog',
          url: '#',
        },
      ],
    },
    // {
    //   title: 'Settings',
    //   url: '#',
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: 'General',
    //       url: '#',
    //     },
    //     {
    //       title: 'Team',
    //       url: '#',
    //     },
    //     {
    //       title: 'Billing',
    //       url: '#',
    //     },
    //     {
    //       title: 'Limits',
    //       url: '#',
    //     },
    //   ],
    // },
  ],
  // projects: [
  //   {
  //     name: 'Design Engineering',
  //     url: '#',
  //     icon: Frame,
  //   },
  //   {
  //     name: 'Sales & Marketing',
  //     url: '#',
  //     icon: PieChart,
  //   },
  //   {
  //     name: 'Travel',
  //     url: '#',
  //     icon: Map,
  //   },
  // ],
};

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* <div className="w-full flex items-center justify-center pt-4">
        <Link href="/overview" className="">
          <Icons.logoIsoTipo className="w-[150px]" />
        </Link>
      </div> */}
      <SidebarHeader>{/* <TeamSwitcher teams={data.teams} /> */}</SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
