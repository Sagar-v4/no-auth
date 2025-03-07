"use client";

import { ZodSchema } from "zod";
import * as React from "react";
import { Loader2 } from "lucide-react";
import { useForm } from "@tanstack/react-form";

import { cn } from "@workspace/ui/lib/utils";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Textarea } from "@workspace/ui/components/textarea";
import {
  createOneEmailApp,
  updateEmailAppById,
} from "@/trpc/routers/email-apps";
import {
  emailAppInsertInputSchema,
  EmailAppOutputSchema,
} from "@/lib/trpc/schemas/email/apps";
import { DialogTrigger } from "@workspace/ui/components/dialog";
import { useIsMobile } from "@workspace/ui/hooks/use-mobile";
import { DrawerTrigger } from "@workspace/ui/components/drawer";

export enum ACTIONS {
  ADD = "Add",
  UPDATE = "Update",
}

export function Form({
  className,
  data,
  action,
}: React.ComponentProps<"form"> & {
  data?: EmailAppOutputSchema;
  action: ACTIONS;
}) {
  const isMobile = useIsMobile();
  const { mutateAsync: createMutateAsync } = createOneEmailApp();
  const { mutateAsync: updateMutateAsync } = updateEmailAppById();

  const form = useForm({
    defaultValues: {
      client_id: "67ca9a078e591331d8e817f7",
      organization_id: "67ca9a198e591331d8e817f9",
      name: data?.name ?? "",
      description: data?.description ?? "",
      metadata: {
        email: data?.metadata?.email ?? "",
        password: data?.metadata?.password ?? "",
      },
    },
    validators: {
      onChangeAsyncDebounceMs: 500,
      onChangeAsync: emailAppInsertInputSchema as ZodSchema,
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
                  // onBlur={field.handleBlur}
                  placeholder="App name"
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
        name="metadata.email"
        children={(field) => {
          return (
            <>
              <div className="grid gap-2">
                <Label htmlFor={field.name}>Email</Label>
                <Input
                  type="email"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  // onBlur={field.handleBlur}
                  placeholder="email@example.com"
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
        name="metadata.password"
        children={(field) => {
          return (
            <>
              <div className="grid gap-2">
                <Label htmlFor={field.name}>Password</Label>
                <Input
                  type="password"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  // onBlur={field.handleBlur}
                  placeholder="Describe the app"
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
                  // onBlur={field.handleBlur}
                  placeholder="Describe the app"
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
        selector={(state) => [
          state.canSubmit,
          state.isSubmitting,
          state.isSubmitSuccessful,
        ]}
        children={([canSubmit, isSubmitting, isSubmitSuccessful]) =>
          isMobile ? (
            <>
              <DrawerTrigger asChild>
                <Button
                  data-slot="drawer-close"
                  disabled={!canSubmit}
                  type="submit"
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" /> : null}
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
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" /> : null}
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
