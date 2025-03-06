import * as React from "react";

import { Button } from "@workspace/ui/components/button";
import { ResponsiveDialog } from "@workspace/ui/components/responsive-dialog";
import { getEmailAppById } from "@/trpc/routers/email-apps";
import { EmailAppIdInputSchema } from "@/lib/trpc/schemas/email/apps";
import { ACTIONS, Form } from "@/components/email-app-data-table/form";
import { ResponsiveDialogSkeleton } from "@/skeletons/forms/responsive-dialog";

export function EditEmailApp(ids: EmailAppIdInputSchema) {
  const { data, refetch, isLoading } = getEmailAppById({
    filter: ids,
  });

  const title = <>Edit Email App</>;
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
      {/* <ResponsiveDialogSkeleton /> */}
      {isLoading ? (
        <ResponsiveDialogSkeleton />
      ) : (
        <Form action={ACTIONS.UPDATE} data={data} />
      )}
    </ResponsiveDialog>
  );
}
