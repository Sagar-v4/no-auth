"use client";

import { z } from "zod";

import { DataTable as TemplateDataTable } from "@/components/email-template-data-table/data-table";
import { columns as templateColumns } from "@/components/email-template-data-table/columns";
import { DataTable as AppDataTable } from "@/components/email-app-data-table/data-table";
import { columns as appColumns } from "@/components/email-app-data-table/columns";
import { TabsContent } from "@workspace/ui/components/tabs";
import { getTemplates } from "@/registry/fake-data";
import { getEmailAppsByData } from "@/trpc/routers/email-apps";
import { emailAppOutputSchema } from "@/lib/trpc/schemas/email/apps";
import { Button } from "@workspace/ui/components/button";

export default function Page() {
  const { exec, data, isLoading, isError } = getEmailAppsByData({
    filter: [
      {
        organization_id: "67c9fe2ed8020ca2e2b54dd3",
      },
    ],
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error...</div>;
  }
  if (!data) {
    return <Button onClick={exec}>Retry</Button>;
  }
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
