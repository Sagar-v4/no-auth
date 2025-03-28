import * as React from "react";
import { Plus } from "lucide-react";

import { Button } from "@workspace/ui/components/button";
import { ResponsiveDialog } from "@workspace/ui/components/responsive-dialog";
import { SSOIdInput } from "@/lib/trpc/schemas/v1/sso";
import { getSSOByIdV1 } from "@/trpc/routers/sso";
import { ResponsiveDialogSkeleton } from "@/skeletons/forms/responsive-dialog";
import { ACTIONS, Form } from "@/components/sso/form";

export function Edit(ids: SSOIdInput) {
  const { data, refetch, isLoading } = getSSOByIdV1({
    filter: ids,
  });

  const title = <>Edit Single Sign On</>;
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
        <ResponsiveDialogSkeleton fielCount={3} />
      ) : (
        <Form action={ACTIONS.EDIT} data={data} />
      )}
    </ResponsiveDialog>
  );
}
