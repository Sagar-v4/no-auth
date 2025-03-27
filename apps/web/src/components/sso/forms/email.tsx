"use client";

import { LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";

import { useForm } from "@tanstack/react-form";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { useSSOSecretSendMutation } from "@/swr/hooks/sso";
import { SSOOTPForm } from "@/components/sso/forms/otp";
import { SSOMagicLinkForm } from "@/components/sso/forms/magic-link";

export function SSOEmailForm() {
  const { sso_uuid } = useParams<{ sso_uuid: string }>();

  const mutation = useSSOSecretSendMutation();

  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {},
    onSubmit: async ({ value }) => {
      await mutation.trigger({
        email: value.email,
        sso_uuid: sso_uuid,
      });
    },
  });

  if (mutation.data) {
    switch (mutation.data.login_method) {
      case "OTP": {
        return (
          <SSOOTPForm
            email={form.getFieldValue("email")}
            useSSOSecretSendMutation={mutation}
          />
        );
      }

      case "MAGIC_LINK": {
        return (
          <SSOMagicLinkForm
            email={form.getFieldValue("email")}
            useSSOSecretSendMutation={mutation}
          />
        );
      }
    }
  }

  return (
    <>
      <div className="mb-6 flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold">Welcome</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email to get in
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="flex flex-col gap-2 lg:h-60"
      >
        <form.Field
          name="email"
          children={(field) => {
            return (
              <>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <Label htmlFor={field.name}>Email</Label>
                    <Button
                      type="reset"
                      variant="link"
                      className="h-3.5 rounded-none !p-0"
                      onClick={() => form.reset()}
                      disabled={mutation.isMutating}
                    >
                      Reset
                    </Button>
                  </div>
                  <Input
                    type="email"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    disabled={mutation.isMutating}
                    placeholder="example@email.com"
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors ? (
                    <em role="alert" className="text-red-500">
                      {field.state.meta.errors.map((error) => error)}
                    </em>
                  ) : null}
                </div>
              </>
            );
          }}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              disabled={!canSubmit || mutation.isMutating}
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-700 lg:mt-auto"
            >
              {isSubmitting ? <LoaderCircle className="animate-spin" /> : null}
              Proceed
            </Button>
          )}
        />
      </form>
    </>
  );
}
