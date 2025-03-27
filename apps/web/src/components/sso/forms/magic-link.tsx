"use client";

import { LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";

import { useForm } from "@tanstack/react-form";
import { Button } from "@workspace/ui/components/button";
import { SWRMutationResponse } from "swr/mutation";
import { SecretSendInput, SecretSendOutput } from "@/lib/trpc/schemas/v1/sso";

export function SSOMagicLinkForm({
  email,
  useSSOSecretSendMutation,
}: {
  email: string;
  useSSOSecretSendMutation: SWRMutationResponse<
    SecretSendOutput,
    Error,
    string,
    SecretSendInput
  >;
}) {
  const { sso_uuid } = useParams<{ sso_uuid: string }>();

  const { reset, trigger } = useSSOSecretSendMutation;

  const form = useForm({
    defaultValues: {},
    validators: {},
    onSubmit: async () => {
      await trigger({
        email: email,
        sso_uuid: sso_uuid,
      });
    },
  });

  return (
    <>
      <div className="mb-6 flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold">Welcome</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Magic link has been sent
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
        <div className="h-16.5 text-center">
          Email verification link has been sent to {email}
        </div>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <div className="flex justify-between gap-4 lg:mt-auto">
              <Button
                disabled={!canSubmit}
                type="reset"
                variant="outline"
                className="w-full"
                onClick={reset}
              >
                Change Email
              </Button>
              <Button
                disabled={!canSubmit}
                type="submit"
                variant="default"
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
              >
                {isSubmitting ? (
                  <LoaderCircle className="animate-spin" />
                ) : null}
                Resend Link
              </Button>
            </div>
          )}
        />
      </form>
    </>
  );
}
