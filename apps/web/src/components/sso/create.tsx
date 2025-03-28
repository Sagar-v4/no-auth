import * as React from "react";
import { Plus } from "lucide-react";

import { Button } from "@workspace/ui/components/button";
import { ResponsiveDialog } from "@workspace/ui/components/responsive-dialog";
import { Form, ACTIONS } from "@/components/sso/form";

export function Create() {
  const title = <>Create Single Sign On</>;
  const description = <></>;
  const trigger = (
    <Button size="icon" variant="secondary" className="scale-150 rounded-full">
      <Plus />
    </Button>
  );

  return (
    <ResponsiveDialog title={title} trigger={trigger} description={description}>
      <Form action={ACTIONS.CREATE} />
    </ResponsiveDialog>
  );
}
