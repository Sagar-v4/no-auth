"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Search } from "lucide-react";

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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@workspace/ui/components/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible";
import { Label } from "@workspace/ui/components/label";
import { organizations, sidebar, user } from "@/registry/sidebar";
import { NavUser } from "@/components/nav-user";
import { NavTheme } from "@/components/nav-theme";
import { OrganizationSwitcher } from "@/components/organization-switcher";

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar> & { active_org_id: string }) {
  const pageName = usePathname().valueOf().split("/").at(-1);

  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        <OrganizationSwitcher active_org_id={props.active_org_id} />
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
        {Object.entries(sidebar).map(([name, list], index) => {
          return (
            <SidebarGroup key={index}>
              <SidebarGroupLabel>{name}</SidebarGroupLabel>
              <SidebarMenu>
                {list.map((menu) => {
                  if (menu.items.length > 0) {
                    return (
                      <Collapsible
                        key={menu.title}
                        asChild
                        defaultOpen={menu.isActive}
                        className="group/collapsible"
                      >
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton tooltip={menu.title}>
                              {menu.icon && <menu.icon />}
                              <span>{menu.title}</span>
                              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {/* {menu.items?.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton asChild>
                                    <a href={subItem.url}>
                                      <span>{subItem.title}</span>
                                    </a>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))} */}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    );
                  } else {
                    return (
                      <SidebarMenuItem key={menu.title}>
                        <SidebarMenuButton
                          asChild
                          tooltip={menu.title}
                          isActive={pageName === menu.url}
                        >
                          <Link href={menu.url}>
                            {menu.icon && <menu.icon />}
                            <span>{menu.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  }
                })}
              </SidebarMenu>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
      <SidebarFooter>
        <NavTheme />
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail className="hover:after:!bg-sidebar-primary" />
    </Sidebar>
  );
}
