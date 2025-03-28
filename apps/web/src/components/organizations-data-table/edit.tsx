import * as React from "react";

import { Button } from "@workspace/ui/components/button";
import { ResponsiveDialog } from "@workspace/ui/components/responsive-dialog";
import { getOrganizationByIdV1 } from "@/trpc/routers/organizations";
import { OrganizationIdInput } from "@/lib/trpc/schemas/v1/organizations";
import { ACTIONS, Form } from "@/components/organizations-data-table/form";
import { ResponsiveDialogSkeleton } from "@/skeletons/forms/responsive-dialog";

export function Edit(ids: OrganizationIdInput) {
  const { data, refetch, isLoading } = getOrganizationByIdV1({
    filter: ids,
  });

  const title = <>Edit Organization</>;
  const description = <></>;
  const trigger = (
    <Button
      variant="ghost"
      size="sm"
      className="flex w-full justify-start"
      onClick={() => refetch()}
    >
      Edit
    </Button>
  );
  return (
    <ResponsiveDialog title={title} trigger={trigger} description={description}>
      {isLoading ? (
        <ResponsiveDialogSkeleton />
      ) : (
        <Form action={ACTIONS.UPDATE} data={data} />
      )}
    </ResponsiveDialog>
  );
}
