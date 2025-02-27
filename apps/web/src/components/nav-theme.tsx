import { SidebarMenu, SidebarMenuItem } from "@workspace/ui/components/sidebar";
import { Button } from "@workspace/ui/components/button";
import { ModeSwitcher } from "@workspace/ui/components/mode-switcher";
import { Separator } from "@workspace/ui/components/separator";

export function NavTheme() {
  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex px-2 group-data-[collapsible=icon]:p-0">
        <ModeSwitcher className="group-data-[collapsible=icon]:size-8" />
        <Separator
          orientation="vertical"
          className="mx-2 group-data-[collapsible=icon]:hidden"
        />
        <Button
          variant="ghost"
          className="w-full group-data-[collapsible=icon]:hidden"
        >
          Customize theme
        </Button>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
