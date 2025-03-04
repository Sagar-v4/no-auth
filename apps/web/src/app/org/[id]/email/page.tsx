"use client";

import { DataTable as TemplateDataTable } from "@/components/email-template-data-table/data-table";
import { columns as templateColumns } from "@/components/email-template-data-table/columns";
import { DataTable as AppDataTable } from "@/components/email-app-data-table/data-table";
import { columns as appColumns } from "@/components/email-app-data-table/columns";
import { TabsContent } from "@workspace/ui/components/tabs";
import { getTemplates } from "@/registry/fake-data";
import { getEmailAppsByData } from "@/trpc/routers/email-apps";
import { z } from "zod";
import { emailAppOutputSchema } from "@/lib/trpc/schemas/email/apps";

export default function Page() {
  const { data, isLoading, isError } = getEmailAppsByData({
    filter: [
      {
        organization_id: "67c4337cbae09b4bce26a665",
      },
    ],
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error...</div>;
  }
  console.log("🚀 ~ Page ~ data:", data);
  const apps = z.array(emailAppOutputSchema).parse(data);

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
