import { SidebarMenu, SidebarMenuItem } from "@workspace/ui/components/sidebar";
import { ModeSwitcher } from "@workspace/ui/components/mode-switcher";
import { Separator } from "@workspace/ui/components/separator";
import { ThemeCustomizer } from "@workspace/ui/theme/customizer.tsx";

export function NavTheme() {
  return (
    <SidebarMenu suppressHydrationWarning>
      <SidebarMenuItem className="flex px-2 group-data-[collapsible=icon]:p-0">
        <ModeSwitcher className="group-data-[collapsible=icon]:size-8" />
        <Separator
          orientation="vertical"
          className="mx-2 group-data-[collapsible=icon]:hidden"
        />
        <ThemeCustomizer />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
