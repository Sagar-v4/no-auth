"use client";

import * as React from "react";
import { Building, ChevronsUpDown } from "lucide-react";

import { SidebarMenuButton } from "@workspace/ui/components/sidebar";
import { Skeleton } from "@workspace/ui/components/skeleton";

export function SidebarOrganizationsSkeleton() {
  return (
    <SidebarMenuButton
      size="lg"
      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
    >
      <Skeleton className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg" />
      <Skeleton className="grid h-8 w-full flex-1 text-left text-sm leading-tight" />
      <Skeleton className="ml-auto h-8 w-4" />
    </SidebarMenuButton>
  );
}
