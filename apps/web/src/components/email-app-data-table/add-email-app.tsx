import * as React from "react";
import { Plus } from "lucide-react";

import { cn } from "@workspace/ui/lib/utils";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { DialogDrawer } from "@workspace/ui/components/dialog-drawer";

export function AddEmailApp() {
  const title = "Email App";
  const description = "";
  const trigger = (
    <Button variant="default" size="sm" className="ml-2 h-8">
      <Plus /> Add
    </Button>
  );

  return (
    <DialogDrawer title={title} trigger={trigger} description={description}>
      <Form />
    </DialogDrawer>
  );
}

function Form({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" placeholder="Unique app name" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Input type="text" id="description" placeholder="Describe the app" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="email@example.com" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          placeholder="Generated app password"
        />
      </div>

      <Button type="submit" className="bg-green-600 hover:bg-green-700">
        Save
      </Button>
    </form>
  );
}
