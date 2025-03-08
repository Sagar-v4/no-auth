"use client";

import { DataTable as FormsDataTable } from "@/components/forms-data-table/data-table";
import { columns as formColumns } from "@/components/forms-data-table/columns";
import { TabsContent } from "@workspace/ui/components/tabs";
import { getFroms } from "@/registry/fake-data";

export default function Page() {
  const forms = getFroms();
  return (
    <>
      <TabsContent value="forms" asChild>
        <FormsDataTable data={forms} columns={formColumns} />
      </TabsContent>
    </>
  );
}
