"use client";

import * as React from "react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { Building, ChevronsUpDown, Plus } from "lucide-react";
import { useIsMounted } from "usehooks-ts";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@workspace/ui/components/sidebar";
import { getOrganizationsByData } from "@/trpc/routers/organizations";

export function OrganizationSwitcher({
  active_org_id,
}: Readonly<{
  active_org_id: string;
}>) {
  if (!useIsMounted()) return <p>non mounted</p>;
  const { isMobile } = useSidebar();
  const page = usePathname().valueOf().split("/").at(3);

  const { data, isError, isLoading } = getOrganizationsByData({
    filter: [
      {
        client_id: "67c4331ebae09b4bce26a661",
      },
    ],
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error...</p>;
  if (!data) return <p>no org</p>;

  const activeOrganization = data.filter((o) => o.uuid === active_org_id);
  if (data.length === 0 || activeOrganization.length !== 1) {
    return redirect("/client/organizations");
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Building className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {activeOrganization[0]?.name}
                </span>
                {/* <span className="truncate text-xs">
                  {activeOrganization.plan}
                </span> */}
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Organizations
            </DropdownMenuLabel>
            {data.map((organization, index) => (
              <Link
                href={`/org/${organization.uuid}/${page}`}
                key={organization.name}
              >
                <DropdownMenuItem className="gap-2 p-2">
                  {/* <div className="flex size-6 items-center justify-center rounded-xs border">
                    <Building className="size-4 shrink-0" />
                  </div> */}
                  {organization.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="bg-background flex size-6 items-center justify-center rounded-md border">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">Add</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
