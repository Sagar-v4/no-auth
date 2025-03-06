import * as React from "react";
import { Plus } from "lucide-react";

import { Button } from "@workspace/ui/components/button";
import { ResponsiveDialog } from "@workspace/ui/components/responsive-dialog";
import { ACTIONS, Form } from "@/components/email-app-data-table/form";

export function AddEmailApp() {
  const title = <>New Email App</>;
  const description = <></>;
  const trigger = (
    <Button variant="default" size="sm" className="ml-2 h-8">
      <Plus /> Add
    </Button>
  );
  return (
    <ResponsiveDialog title={title} trigger={trigger} description={description}>
      <Form action={ACTIONS.ADD} />
    </ResponsiveDialog>
  );
}
