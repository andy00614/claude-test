"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import { SearchForm } from "@/components/search-form";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  RiScanLine,
  RiBardLine,
  RiUserFollowLine,
  RiCodeSSlashLine,
  RiLoginCircleLine,
  RiLayoutLeftLine,
  RiSettings3Line,
  RiLeafLine,
  RiLogoutBoxLine,
} from "@remixicon/react";

// This is sample data.
const data = {
  teams: [
    {
      name: "InnovaCraft",
      logo: "https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp1/logo-01_kp2j8x.png",
    },
    {
      name: "Acme Corp.",
      logo: "https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp1/logo-01_kp2j8x.png",
    },
    {
      name: "Evil Corp.",
      logo: "https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp1/logo-01_kp2j8x.png",
    },
  ],
  navMain: [
    {
      title: "Sections",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "#",
          icon: RiScanLine,
          isActive: false,
        },
        {
          title: "Insights",
          url: "#",
          icon: RiBardLine,
          isActive: false,
        },
        {
          title: "Contacts",
          url: "/dashboard",
          icon: RiUserFollowLine,
          isActive: false,
        },
        {
          title: "Tools",
          url: "/tools",
          icon: RiCodeSSlashLine,
          isActive: false,
        },
        {
          title: "Integration",
          url: "#",
          icon: RiLoginCircleLine,
          isActive: false,
        },
        {
          title: "Layouts",
          url: "#",
          icon: RiLayoutLeftLine,
          isActive: false,
        },
        {
          title: "Reports",
          url: "#",
          icon: RiLeafLine,
          isActive: false,
        },
      ],
    },
    {
      title: "Other",
      url: "#",
      items: [
        {
          title: "Settings",
          url: "#",
          icon: RiSettings3Line,
          isActive: false,
        },
        {
          title: "Help Center",
          url: "#",
          icon: RiLeafLine,
          isActive: false,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        <hr className="border-t border-border mx-2 -mt-px" />
        <SearchForm className="mt-3" />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="uppercase text-muted-foreground/60">
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent className="px-2">
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className="group/menu-button font-medium gap-3 h-9 rounded-md bg-gradient-to-r hover:bg-transparent hover:from-sidebar-accent hover:to-sidebar-accent/40 data-[active=true]:from-primary/20 data-[active=true]:to-primary/5 [&>svg]:size-auto"
                      isActive={pathname === item.url}
                    >
                      <a href={item.url}>
                        {item.icon && (
                          <item.icon
                            className="text-muted-foreground/60 group-data-[active=true]/menu-button:text-primary"
                            size={22}
                            aria-hidden="true"
                          />
                        )}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <hr className="border-t border-border mx-2 -mt-px" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="font-medium gap-3 h-9 rounded-md bg-gradient-to-r hover:bg-transparent hover:from-sidebar-accent hover:to-sidebar-accent/40 data-[active=true]:from-primary/20 data-[active=true]:to-primary/5 [&>svg]:size-auto">
              <RiLogoutBoxLine
                className="text-muted-foreground/60 group-data-[active=true]/menu-button:text-primary"
                size={22}
                aria-hidden="true"
              />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
