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
    dashboard: {
      default: "dashboard",
      list: [{ name: "Dashboard", value: "dashboard" }],
    },
    profile: {
      default: "profile",
      list: [{ name: "Profile", value: "profile" }],
    },
    keys: {
      default: "keys",
      list: [{ name: "Keys", value: "keys" }],
    },
    team: {
      default: "members",
      list: [
        { name: "Members", value: "members" },
        { name: "Permissions", value: "permissions" },
      ],
    },
    settings: {
      default: "settings",
      list: [{ name: "Settings", value: "settings" }],
    },
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
    roles: {
      default: "roles",
      list: [{ name: "Roles", value: "roles" }],
    },
    permissions: {
      default: "permissions",
      list: [{ name: "Permissions", value: "permissions" }],
    },
  };

  const [tabName, setTabName] = useQueryState("tab");
  const pageName = usePathname().valueOf().split("/").at(-1);

  if (!pageName || !pages[pageName]) return;

  return (
    <Tabs
      defaultValue={tabName || pages[pageName].default}
      value={tabName || pages[pageName].default}
      // className="w-auto"
    >
      <header className="z-10 bg-background sticky inset-x-0 top-0 isolate flex shrink-0 items-center gap-2 border-b">
        <div className="flex w-full items-center gap-2 px-2">
          <SidebarTrigger />
          <Separator
            orientation="vertical"
            className="data-[orientation=vertical]:h-6"
          />
          <TabsList className="h-14 gap-2 bg-background">
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
      <div className="p-2">{children}</div>
    </Tabs>
  );
}
