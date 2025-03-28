import * as React from "react";

import { Button } from "@workspace/ui/components/button";
import { ResponsiveAlertDialog } from "@workspace/ui/components/responsive-alert-dialog";
import { deleteOrganizationsByDataV1 } from "@/trpc/routers/organizations";
import { OrganizationIdInput } from "@/lib/trpc/schemas/v1/organizations";

export function Delete(ids: OrganizationIdInput) {
  const { exec } = deleteOrganizationsByDataV1();

  const title = <>Are you absolutely sure?</>;
  const description = (
    <span className="grid">
      <span>
        This action cannot be undone. This will permanently delete your email
        app and remove from our servers.
      </span>
      {/* <span>
        <strong>Note: </strong>
        If this app is currently in use then it will not deleted.
      </span> */}
    </span>
  );

  const trigger = (
    <Button variant="ghost" size="sm" className="flex w-full justify-start">
      Delete
    </Button>
  );

  const onConfirm = async () => {
    await exec({
      filter: [ids],
    });
  };

  return (
    <ResponsiveAlertDialog
      title={title}
      trigger={trigger}
      onConfirm={onConfirm}
      description={description}
    />
  );
}
