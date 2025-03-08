import { cookies } from "next/headers";

import {
  SidebarInset,
  SidebarProvider,
} from "@workspace/ui/components/sidebar";
import { SidebarApp } from "@/components/sidebar/app";
import { NavbarTabs } from "@/components/navbar/tabs";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <SidebarApp />
      <SidebarInset>
        <NavbarTabs>{children}</NavbarTabs>
      </SidebarInset>
    </SidebarProvider>
  );
}
