import { cookies } from "next/headers";

import { AppSidebar } from "@/components/app-sidebar";
import { NavHeader } from "@/components/nav-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@workspace/ui/components/sidebar";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>
        <NavHeader>{children}</NavHeader>
      </SidebarInset>
    </SidebarProvider>
  );
}
