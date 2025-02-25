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
  params: Promise<{ name: string }>;
  children: React.ReactNode;
}>) {
  const { name } = await params;
  console.log("🚀 ~ organization name:", name);

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
