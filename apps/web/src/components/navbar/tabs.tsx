"use client";

import { useQueryState } from "nuqs";

import { useURL } from "@/hooks/use-url";
import { cn } from "@workspace/ui/lib/utils";
import { getNavbarTabs } from "@/registry/sidebar";
import { Separator } from "@workspace/ui/components/separator";
import { SidebarTrigger } from "@workspace/ui/components/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { NavbarUserSwitcher } from "@/components/navbar/user-switcher";

export function NavbarTabs({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [tabName, setTabName] = useQueryState("tab");
  const { user_type, page_name } = useURL();
  const data = getNavbarTabs(user_type, page_name);

  if (!data) return;

  return (
    <Tabs
      defaultValue={tabName || data.default}
      value={tabName || data.default}
    >
      <header className="bg-background sticky inset-x-0 top-0 isolate z-10 grid shrink-0 grid-cols-1 items-center border-b">
        <div className="flex h-14 items-center gap-2 px-2">
          <SidebarTrigger className="bg-sidebar-accent text-sidebar-accent-foreground hover:text-sidebar-primary-foreground hover:bg-sidebar-primary p-2" />
          <Separator
            orientation="vertical"
            className="data-[orientation=vertical]:h-6"
          />
          <div className="flex h-full items-center overflow-x-auto">
            <TabsList className="bg-background gap-2">
              {data.list.map((tab, index) => {
                return (
                  <TabsTrigger
                    key={index}
                    value={tab.value}
                    onClick={() => setTabName(tab.value)}
                    className={cn(
                      "bg-sidebar-accent text-sidebar-accent-foreground data-[state=active]:bg-sidebar-primary data-[state=active]:text-sidebar-primary-foreground hover:text-sidebar-primary-foreground hover:bg-sidebar-primary px-4",
                    )}
                  >
                    {tab.title}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>
          <div className="ml-auto flex md:hidden">
            <NavbarUserSwitcher />
          </div>
        </div>
      </header>
      <div className="p-2" suppressHydrationWarning>
        {children}
      </div>
    </Tabs>
  );
}
