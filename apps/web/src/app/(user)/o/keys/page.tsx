import { DataTable as KeysDataTable } from "@/components/keys-data-table/data-table";
import { columns as keyColumns } from "@/components/keys-data-table/columns";
import { TabsContent } from "@workspace/ui/components/tabs";
import { getKeys } from "@/registry/fake-data";

export default function Page() {
  const keys = getKeys();
  return (
    <>
      <TabsContent value="keys" asChild>
        <KeysDataTable data={keys} columns={keyColumns} />
      </TabsContent>
    </>
  );
}
