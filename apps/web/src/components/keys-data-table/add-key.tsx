import * as React from "react";
import { Plus } from "lucide-react";

import { cn } from "@workspace/ui/lib/utils";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { Label } from "@workspace/ui/components/label";
import { ResponsiveDialog } from "@workspace/ui/components/responsive-dialog";

export function AddKey() {
  const title = "API Key";
  const description = "";
  const trigger = (
    <Button variant="default" size="sm" className="ml-2 h-8">
      <Plus /> Add
    </Button>
  );

  return (
    <ResponsiveDialog title={title} trigger={trigger} description={description}>
      <Form />
    </ResponsiveDialog>
  );
}

function Form({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input required type="text" id="name" placeholder="Key name" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" placeholder="Describe the key" />
      </div>

      <Button type="submit" className="bg-green-600 hover:bg-green-700">
        Save
      </Button>
    </form>
  );
}
