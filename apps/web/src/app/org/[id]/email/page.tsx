"use client";

import { DataTable as TemplateDataTable } from "@/components/email-template-data-table/data-table";
import { columns as templateColumns } from "@/components/email-template-data-table/columns";
import { DataTable as AppDataTable } from "@/components/email-app-data-table/data-table";
import { columns as appColumns } from "@/components/email-app-data-table/columns";
import { TabsContent } from "@workspace/ui/components/tabs";
import { getApps, getTemplates } from "@/registry/fake-data";
import { getEmailAppsByData } from "@/trpc/query/email";
import { z } from "zod";
import { appSchema } from "@/components/email-app-data-table/schema";

export default function Page() {
  // const apps = getApps();
  const { data, isLoading } = getEmailAppsByData();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log("🚀 ~ Page ~ data:", data);
  const apps = z.array(appSchema).parse(data);

  const templates = getTemplates();
  return (
    <>
      <TabsContent value="app" asChild>
        <AppDataTable data={apps} columns={appColumns} />
      </TabsContent>

      <TabsContent value="template" asChild>
        <TemplateDataTable data={templates} columns={templateColumns} />
      </TabsContent>
    </>
  );
}
