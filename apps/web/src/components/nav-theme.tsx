// "use client";

import { SidebarMenu, SidebarMenuItem } from "@workspace/ui/components/sidebar";
import { Button } from "@workspace/ui/components/button";
import { ModeSwitcher } from "@workspace/ui/components/mode-switcher";
import { Separator } from "@workspace/ui/components/separator";

export function NavTheme() {
  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex p-2 group-data-[collapsible=icon]:p-0">
        <ModeSwitcher className="group-data-[collapsible=icon]:size-8" />
        <Separator
          orientation="vertical"
          className="group-data-[collapsible=icon]:hidden mx-2"
        />
        <Button
          variant="ghost"
          className="group-data-[collapsible=icon]:hidden w-full"
        >
          Customize theme
        </Button>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
