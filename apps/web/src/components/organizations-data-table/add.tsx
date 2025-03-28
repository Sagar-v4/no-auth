import * as React from "react";
import { Plus } from "lucide-react";

import { Button } from "@workspace/ui/components/button";
import { ResponsiveDialog } from "@workspace/ui/components/responsive-dialog";
import { ACTIONS, Form } from "@/components/organizations-data-table/form";

export function Add() {
  const title = "Organization";
  const description = "";
  const trigger = (
    <Button variant="default" size="sm">
      <Plus /> Add
    </Button>
  );

  return (
    <ResponsiveDialog title={title} trigger={trigger} description={description}>
      <Form action={ACTIONS.ADD} />
    </ResponsiveDialog>
  );
}
