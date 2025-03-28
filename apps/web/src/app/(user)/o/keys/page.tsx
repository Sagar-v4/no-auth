"use client";

import { z } from "zod";
import { RefreshCw } from "lucide-react";
import { TabsContent } from "@workspace/ui/components/tabs";
import { TABS } from "@/registry/sidebar";
import { getKeysByDataV1 } from "@/trpc/routers/keys";
import { Button } from "@workspace/ui/components/button";
import { columns } from "@/components/keys-data-table/columns";
import { DataTable } from "@/components/keys-data-table/data-table";
import { keyOutput } from "@/lib/trpc/schemas/v1/keys";
import { cn } from "@workspace/ui/lib/utils";
import { Add } from "@/components/keys-data-table/add";
import { LoadingCircle } from "@/skeletons/loading";
import { useOrganization } from "@/hooks/use-organization";

export default function Page() {
  const { org } = useOrganization();
  const { data, isLoading, isError, isRefetching, refetch } = getKeysByDataV1({
    filter: [
      {
        organization_id: org?._id,
      },
    ],
  });

  const Refresh = () => {
    return (
      <Button variant="default" size="sm" onClick={() => refetch()}>
        <RefreshCw className={cn(isRefetching && "animate-spin")} /> Refresh
      </Button>
    );
  };

  if (isLoading) return <LoadingCircle />;
  if (!data || isError) return <Refresh />;

  return (
    <>
      <TabsContent value={TABS.KEY.value} asChild>
        <DataTable
          data={z.array(keyOutput).parse(data)}
          columns={columns}
          Refresh={Refresh}
          Add={Add}
        />
      </TabsContent>
    </>
  );
}
