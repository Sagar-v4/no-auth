import { cookies } from "next/headers";

import {
  SidebarInset,
  SidebarProvider,
} from "@workspace/ui/components/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { NavHeader } from "@/components/nav-header";

export default async function AppLayout({
  params,
  children,
}: Readonly<{
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}>) {
  const { id } = await params;
  console.log("🚀 ~ organization id:", id);

  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar active_org_id={id} />
      <SidebarInset>
        <NavHeader>{children}</NavHeader>
      </SidebarInset>
    </SidebarProvider>
  );
}
