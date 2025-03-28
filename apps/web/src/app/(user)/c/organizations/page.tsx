"use client";

import { z } from "zod";
import { RefreshCw } from "lucide-react";
import { TabsContent } from "@workspace/ui/components/tabs";
import { TABS } from "@/registry/sidebar";
import { getOrganizationsByDataV1 } from "@/trpc/routers/organizations";
import { Button } from "@workspace/ui/components/button";
import { columns } from "@/components/organizations-data-table/columns";
import { DataTable } from "@/components/organizations-data-table/data-table";
import { organizationOutput } from "@/lib/trpc/schemas/v1/organizations";
import { cn } from "@workspace/ui/lib/utils";
import { Add } from "@/components/organizations-data-table/add";
import { LoadingCircle } from "@/skeletons/loading";
import { useUser } from "@/hooks/use-user";

export default function Page() {
  const { user } = useUser();
  const { data, isLoading, isError, isRefetching, refetch } =
    getOrganizationsByDataV1({
      filter: [
        {
          user_id: user?._id,
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
      <TabsContent value={TABS.ORGANIZATION.value} asChild>
        <div className="mx-auto p-2">
          <DataTable
            data={z.array(organizationOutput).parse(data)}
            columns={columns}
            Refresh={Refresh}
            Add={Add}
          />
        </div>
      </TabsContent>
    </>
  );
}
