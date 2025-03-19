"use client";

import { z } from "zod";
import { RefreshCw } from "lucide-react";
import { TabsContent } from "@workspace/ui/components/tabs";
import { TABS } from "@/registry/sidebar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getKeysByData } from "@/trpc/routers/keys";
import { Button } from "@workspace/ui/components/button";
import { columns } from "@/components/keys-data-table/columns";
import { DataTable } from "@/components/keys-data-table/data-table";
import { keyOutputSchema } from "@/lib/trpc/schemas/keys";
import { cn } from "@workspace/ui/lib/utils";
import { Add } from "@/components/keys-data-table/add";
import { LoadingCircle } from "@/skeletons/loading";

export default function Page() {
  const { organization } = useCurrentUser();
  const { data, isLoading, isError, isRefetching, refetch } = getKeysByData({
    filter: [
      {
        organization_id: organization._id,
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
          data={z.array(keyOutputSchema).parse(data)}
          columns={columns}
          Refresh={Refresh}
          Add={Add}
        />
      </TabsContent>
    </>
  );
}
