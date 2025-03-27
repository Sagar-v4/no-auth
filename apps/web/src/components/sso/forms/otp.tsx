"use client";

import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  REGEXP_ONLY_DIGITS,
} from "@workspace/ui/components/input-otp";
import { useForm } from "@tanstack/react-form";
import { OTP_LENGTH } from "@/registry/constants";
import { Button } from "@workspace/ui/components/button";
import { Label } from "@workspace/ui/components/label";
import { SWRMutationResponse } from "swr/mutation";
import { SecretSendInput, SecretSendOutput } from "@/lib/trpc/schemas/v1/sso";
import { useSSOSecretVerifyMutation } from "@/swr/hooks/sso";
import { useLoginMutation } from "@/swr/hooks/sessions";
import { device_uuid, refresh_token } from "@/lib/const/cookies";

export function SSOOTPForm({
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

  const {
    data: emailData,
    isMutating: emailIsMutating,
    reset: emailReset,
    trigger: emailTrigger,
  } = useSSOSecretSendMutation;

  const {
    isMutating: otpIsMutating,
    reset: otpReset,
    trigger: otpTrigger,
  } = useSSOSecretVerifyMutation();

  const { trigger: loginTrigger, isMutating: loginIsMutating } =
    useLoginMutation();

  const handleLogin = async (user_uuid: string) => {
    const { did, rt, redirect } = await loginTrigger({
      sso_uuid: sso_uuid,
      user_uuid: user_uuid,
    });
    const redirect_url = new URL(redirect);
    redirect_url.searchParams.set(device_uuid, did);
    redirect_url.searchParams.set(refresh_token, rt);
    window.location.href = redirect_url.toString();
  };

  const form = useForm({
    defaultValues: {
      otp: "",
    },
    validators: {},
    onSubmit: async ({ value }) => {
      if (emailData) {
        await otpTrigger({
          secret: value.otp,
          email_service_uuid: emailData.email_service_uuid,
        }).then(async (data) => {
          if (data.is_valid_secret) {
            toast.success("OTP Valid", {
              richColors: true,
            });
            await handleLogin(data.user_uuid as string);
          } else if (typeof data.user_uuid === "string") {
            toast.error("OTP Invalid", {
              richColors: true,
            });
          } else {
            toast.error("OTP Expired", {
              action: {
                label: "Resend",
                onClick: async () =>
                  await otpTrigger({
                    secret: value.otp,
                    email_service_uuid: emailData.email_service_uuid,
                  }),
              },
              richColors: true,
            });
          }
        });
      }
    },
  });

  return (
    <>
      <div className="mb-6 flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold">Welcome</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter sended otp to your email
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
          name="otp"
          children={(field) => {
            return (
              <>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <Label htmlFor={field.name}>One-Time Password</Label>
                    <Button
                      type="reset"
                      variant="link"
                      className="h-3.5 !p-0"
                      disabled={
                        emailIsMutating || otpIsMutating || loginIsMutating
                      }
                      onClick={async () => {
                        await emailTrigger({
                          email: email,
                          sso_uuid: sso_uuid,
                        });
                        form.reset();
                        otpReset();
                      }}
                    >
                      {emailIsMutating ? (
                        <LoaderCircle className="m-0 animate-spin p-0" />
                      ) : null}
                      Resend?
                    </Button>
                  </div>
                  <InputOTP
                    disabled={otpIsMutating || loginIsMutating}
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e)}
                    pattern={REGEXP_ONLY_DIGITS}
                    maxLength={OTP_LENGTH}
                  >
                    {Array.from({ length: Number(OTP_LENGTH) }).map(
                      (_, index) => (
                        <InputOTPGroup
                          key={index}
                          className="w-full justify-evenly"
                        >
                          <InputOTPSlot index={index} key={index} />
                        </InputOTPGroup>
                      ),
                    )}
                  </InputOTP>
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
            <div className="flex justify-between gap-4 lg:mt-auto">
              <Button
                disabled={
                  !canSubmit ||
                  emailIsMutating ||
                  otpIsMutating ||
                  loginIsMutating
                }
                type="reset"
                variant="outline"
                className="w-full"
                onClick={emailReset}
              >
                Change Email
              </Button>
              <Button
                disabled={
                  !canSubmit ||
                  emailIsMutating ||
                  otpIsMutating ||
                  loginIsMutating
                }
                type="submit"
                variant="default"
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
              >
                {loginIsMutating || isSubmitting ? (
                  <LoaderCircle className="animate-spin" />
                ) : null}
                Verify
              </Button>
            </div>
          )}
        />
      </form>
    </>
  );
}
