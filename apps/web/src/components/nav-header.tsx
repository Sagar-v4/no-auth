"use client";

import { Separator } from "@workspace/ui/components/separator";
import { SidebarTrigger } from "@workspace/ui/components/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { cn } from "@workspace/ui/lib/utils";
import { usePathname } from "next/navigation";
import { parseAsString, useQueryState } from "nuqs";

export function NavHeader({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pages: {
    [key: string]: { default: string; list: { name: string; value: string }[] };
  } = {
    forms: {
      default: "all",
      list: [
        { name: "All", value: "all" },
        { name: "OTP", value: "otp" },
        { name: "Magic Link", value: "magic_link" },
      ],
    },
    sessions: {
      default: "user",
      list: [
        { name: "User", value: "user" },
        { name: "Device", value: "device" },
      ],
    },
    email: {
      default: "app",
      list: [
        { name: "App", value: "app" },
        { name: "Template", value: "template" },
      ],
    },
  };

  const [tabName, setTabName] = useQueryState("tab");
  const pageName = usePathname().valueOf().split("/").at(-1);

  if (!pageName || !pages[pageName]) return;

  return (
    <Tabs
      defaultValue={tabName || pages[pageName].default}
      value={tabName || pages[pageName].default}
      className="w-auto"
    >
      <header className="bg-background sticky inset-x-0 top-0 isolate flex shrink-0 items-center gap-2 border-b">
        <div className="flex h-14 w-full items-center gap-2 px-2">
          <SidebarTrigger />
          <Separator
            orientation="vertical"
            className="data-[orientation=vertical]:h-6"
          />
          <TabsList className="gap-2 bg-background">
            {pages[pageName].list.map((tab, index) => {
              return (
                <TabsTrigger
                  key={index}
                  value={tab.value}
                  onClick={() => setTabName(tab.value)}
                  className={cn("hover:text-primary !shadow-none")}
                >
                  {tab.name}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>
      </header>
      <div className="px-2">{children}</div>
    </Tabs>
  );
}
