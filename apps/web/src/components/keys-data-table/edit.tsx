import * as React from "react";

import { Button } from "@workspace/ui/components/button";
import { ResponsiveDialog } from "@workspace/ui/components/responsive-dialog";
import { getKeyByIdV1 } from "@/trpc/routers/keys";
import { KeyIdInput } from "@/lib/trpc/schemas/v1/keys";
import { ACTIONS, Form } from "@/components/keys-data-table/form";
import { ResponsiveDialogSkeleton } from "@/skeletons/forms/responsive-dialog";

export function Edit(ids: KeyIdInput) {
  const { data, refetch, isLoading } = getKeyByIdV1({
    filter: ids,
  });

  const title = <>Edit API Key</>;
  const description = <></>;
  const trigger = (
    <Button
      variant="ghost"
      size="sm"
      className="flex w-full justify-start"
      onClick={() => refetch}
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
