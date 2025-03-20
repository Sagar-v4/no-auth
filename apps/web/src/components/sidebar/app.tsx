"use client";

import Link from "next/link";
import * as React from "react";
import { Search } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@workspace/ui/components/sidebar";
import { Label } from "@workspace/ui/components/label";
import { getSidebarLinks } from "@/registry/sidebar";
import { SidebarThemes } from "@/components/sidebar/themes";
import { SidebarUserSwitcher } from "@/components/sidebar/user-switcher";
import { useURL } from "@/hooks/use-url";

export function SidebarApp({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user_type, page_name } = useURL();
  const data = getSidebarLinks(user_type);

  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        <SidebarUserSwitcher />
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupContent>
            <form className="relative">
              <Label htmlFor="search" className="sr-only">
                Search
              </Label>
              <SidebarInput
                id="search"
                placeholder="Search tabs..."
                className="pl-8"
              />
              <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
            </form>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {Object.entries(data).map(([group_name, metadata]) => {
            return (
              <React.Fragment key={group_name}>
                <SidebarGroupLabel>{group_name}</SidebarGroupLabel>
                <SidebarMenu className="mb-6">
                  {Object.values(metadata).map((menu) => {
                    return (
                      <SidebarMenuItem key={menu.title}>
                        <SidebarMenuButton
                          asChild
                          tooltip={menu.title}
                          isActive={page_name === menu.url}
                        >
                          <Link href={menu.url}>
                            {menu.icon && <menu.icon />}
                            <span>{menu.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </React.Fragment>
            );
          })}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarThemes />
      </SidebarFooter>
      <SidebarRail className="hover:after:!bg-sidebar-primary" />
    </Sidebar>
  );
}
