import * as React from "react";
import { Plus } from "lucide-react";

import { cn } from "@workspace/ui/lib/utils";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { ResponsiveDialog } from "@workspace/ui/components/responsive-dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { getApps } from "@/registry/fake-data";
import { types } from "@/components/forms-data-table/data";

export function AddForm() {
  const title = "Form";
  const description = "Add details to create form";
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
  const apps = getApps();
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input required type="text" id="name" placeholder="Form name" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Input type="text" id="description" placeholder="Describe the form" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input required type="text" id="title" placeholder="Form title" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="short_description">Short Description</Label>
        <Input
          type="text"
          id="short_description"
          placeholder="Short description of form"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="type">Type</Label>
        <Select required>
          <SelectTrigger>
            <SelectValue placeholder="Select a form type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {types.map((type, index) => (
                <SelectItem key={index} value={type.value}>
                  {type.icon && <type.icon />}
                  {type.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email_app">Email App</Label>
        <Select required>
          <SelectTrigger>
            <SelectValue placeholder="Select a app to send email" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {apps.map((app, index) => (
                <SelectItem key={index} value={app._id}>
                  {app.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="redirect_url">Redirect URL</Label>
        <Input
          required
          type="url"
          id="redirect_url"
          placeholder="Where to redirect on success"
        />
      </div>

      <Button type="submit" className="bg-green-600 hover:bg-green-700">
        Save
      </Button>
    </form>
  );
}
