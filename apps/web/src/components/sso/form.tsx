import { ZodSchema } from "zod";
import * as React from "react";
import { LoaderCircle } from "lucide-react";
import { useForm } from "@tanstack/react-form";

import { cn } from "@workspace/ui/lib/utils";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Textarea } from "@workspace/ui/components/textarea";
import { createOneSSOV1, updateSSOByIdV1 } from "@/trpc/routers/sso";
import { DialogTrigger } from "@workspace/ui/components/dialog";
import { useIsMobile } from "@workspace/ui/hooks/use-mobile";
import { DrawerTrigger } from "@workspace/ui/components/drawer";
import { useUser } from "@/hooks/use-user";
import { useOrganization } from "@/hooks/use-organization";
import { LoadingCircle } from "@/skeletons/loading";
import { ssoInsertInput, SSOOutput } from "@/lib/trpc/schemas/v1/sso";
import { LoginMethodsEnum, LOGIN_METHODS } from "@/lib/trpc/schemas/v1/users";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@workspace/ui/components/select";

export enum ACTIONS {
  CREATE = "Create",
  EDIT = "Edit",
}

export function Form({
  className,
  data,
  action,
}: React.ComponentProps<"form"> & {
  data?: SSOOutput;
  action: ACTIONS;
}) {
  const isMobile = useIsMobile();
  const { exec: createMutateAsync } = createOneSSOV1();
  const { exec: updateMutateAsync } = updateSSOByIdV1();

  const { user } = useUser();
  const { org } = useOrganization();

  if (!user || !org) return <LoadingCircle />;

  const form = useForm({
    defaultValues: {
      user_id: user._id,
      organization_id: org._id as string,
      redirect_url: data?.redirect_url ?? "",
      webhook_url: data?.webhook_url ?? "",
      login_method: data?.login_method ?? ("" as LoginMethodsEnum),
    },
    validators: {
      onChangeAsyncDebounceMs: 500,
      onChangeAsync: ssoInsertInput as ZodSchema,
    },
    onSubmit: async ({ value }) => {
      switch (action) {
        case ACTIONS.CREATE:
          await createMutateAsync({
            doc: value,
          });
          break;
        case ACTIONS.EDIT:
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
        name="login_method"
        children={(field) => {
          return (
            <>
              <div className="grid gap-2">
                <Label htmlFor={field.name}>Login Method</Label>
                <Select
                  name={field.name}
                  value={field.state.value}
                  onValueChange={(method: LoginMethodsEnum) =>
                    field.handleChange(method)
                  }
                >
                  <SelectTrigger id={field.name} className="w-full">
                    <SelectValue placeholder="Select user login method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {LOGIN_METHODS.map((method) => {
                        return (
                          <SelectItem key={method} value={method}>
                            {method.replaceAll("_", " ")}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
        name="redirect_url"
        children={(field) => {
          return (
            <>
              <div className="grid gap-2">
                <Label htmlFor={field.name}>Redirect URL</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  type="url"
                  placeholder="User redirect after login url"
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

      <form.Field
        name="webhook_url"
        children={(field) => {
          return (
            <>
              <div className="grid gap-2">
                <Label htmlFor={field.name}>Webhook URL</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  type="url"
                  placeholder="Webhook url to get new user data"
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
