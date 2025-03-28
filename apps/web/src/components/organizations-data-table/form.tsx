import { ZodSchema } from "zod";
import * as React from "react";
import { LoaderCircle } from "lucide-react";
import { useForm } from "@tanstack/react-form";

import { cn } from "@workspace/ui/lib/utils";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Textarea } from "@workspace/ui/components/textarea";
import {
  createOneOrganizationV1,
  updateOrganizationByIdV1,
} from "@/trpc/routers/organizations";
import {
  organizationInsertInput,
  OrganizationOutput,
} from "@/lib/trpc/schemas/v1/organizations";
import { DialogTrigger } from "@workspace/ui/components/dialog";
import { useIsMobile } from "@workspace/ui/hooks/use-mobile";
import { DrawerTrigger } from "@workspace/ui/components/drawer";
import { useUser } from "@/hooks/use-user";
import { LoadingCircle } from "@/skeletons/loading";

export enum ACTIONS {
  ADD = "Add",
  UPDATE = "Update",
}

export function Form({
  className,
  data,
  action,
}: React.ComponentProps<"form"> & {
  data?: OrganizationOutput;
  action: ACTIONS;
}) {
  const isMobile = useIsMobile();
  const { exec: createMutateAsync } = createOneOrganizationV1();
  const { exec: updateMutateAsync } = updateOrganizationByIdV1();

  const { user } = useUser();

  if (!user) return <LoadingCircle />;

  const form = useForm({
    defaultValues: {
      user_id: user._id,
      name: data?.name ?? "",
      description: data?.description ?? "",
    },
    validators: {
      onChangeAsyncDebounceMs: 500,
      onChangeAsync: organizationInsertInput as ZodSchema,
    },
    onSubmit: async ({ value }) => {
      switch (action) {
        case ACTIONS.ADD:
          await createMutateAsync({
            doc: value,
          });
          break;
        case ACTIONS.UPDATE:
          await updateMutateAsync({
            filter: {
              _id: data?._id,
              uuid: data?.uuid,
            },
            update: value,
          });
          break;
      }
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit().finally(() => {});
      }}
      className={cn("grid gap-2", className)}
    >
      <form.Field
        name="name"
        children={(field) => {
          return (
            <>
              <div className="grid gap-2">
                <Label htmlFor={field.name}>Name</Label>
                <Input
                  type="text"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  placeholder="org name"
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors ? (
                  <em role="alert" className="text-red-500">
                    {field.state.meta.errors.map((error) => error?.message)}
                  </em>
                ) : null}
              </div>
            </>
          );
        }}
      />

      <form.Field
        name="description"
        children={(field) => {
          return (
            <>
              <div className="grid gap-2">
                <Label htmlFor={field.name}>Description</Label>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  placeholder="This org used for..."
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="max-h-26 !min-h-10"
                />
                {field.state.meta.errors ? (
                  <em role="alert" className="text-red-500">
                    {field.state.meta.errors.map((error) => error?.message)}
                  </em>
                ) : null}
              </div>
            </>
          );
        }}
      />

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) =>
          isMobile ? (
            <>
              <DrawerTrigger asChild>
                <Button
                  data-slot="drawer-close"
                  disabled={!canSubmit}
                  type="submit"
                  className="bg-green-600 text-white hover:bg-green-700"
                >
                  {isSubmitting ? (
                    <LoaderCircle className="animate-spin" />
                  ) : null}
                  {action}
                </Button>
              </DrawerTrigger>
            </>
          ) : (
            <>
              <DialogTrigger asChild>
                <Button
                  disabled={!canSubmit}
                  type="submit"
                  className="bg-green-600 text-white hover:bg-green-700"
                >
                  {isSubmitting ? (
                    <LoaderCircle className="animate-spin" />
                  ) : null}
                  {action}
                </Button>
              </DialogTrigger>
            </>
          )
        }
      />
    </form>
  );
}
