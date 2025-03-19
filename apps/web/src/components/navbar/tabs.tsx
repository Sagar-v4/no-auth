"use client";

import { useQueryState } from "nuqs";

import { useURL } from "@/hooks/use-url";
import { cn } from "@workspace/ui/lib/utils";
import { getNavbarTabs } from "@/registry/sidebar";
import { Separator } from "@workspace/ui/components/separator";
import { SidebarTrigger } from "@workspace/ui/components/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";

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
        <div className="flex items-center gap-2 px-2">
          <SidebarTrigger className="bg-sidebar-primary sm:bg-sidebar-accent text-sidebar-primary-foreground sm:text-sidebar-accent-foreground hover:text-sidebar-primary-foreground hover:bg-sidebar-primary p-2" />
          <Separator
            orientation="vertical"
            className="data-[orientation=vertical]:h-6"
          />
          <TabsList className="bg-background h-14 justify-evenly gap-2 overflow-scroll px-0">
            {data.list.map((tab, index) => {
              return (
                <TabsTrigger
                  key={index}
                  value={tab.value}
                  onClick={() => setTabName(tab.value)}
                  className={cn(
                    "bg-sidebar-accent text-sidebar-accent-foreground data-[state=active]:bg-sidebar-primary data-[state=active]:text-sidebar-primary-foreground hover:text-sidebar-primary-foreground hover:bg-sidebar-primary !px-4 data-[state=active]:shadow-none",
                  )}
                >
                  {tab.title}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>
      </header>
      <div className="p-2" suppressHydrationWarning>
        {children}
      </div>
    </Tabs>
  );
}
