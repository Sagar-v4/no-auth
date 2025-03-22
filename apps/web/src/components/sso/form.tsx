"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  REGEXP_ONLY_DIGITS,
} from "@workspace/ui/components/input-otp";
import { useDevice } from "@/hooks/use-device";
import { useForm } from "@tanstack/react-form";
import { OTP_LENGTH } from "@/registry/constants";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { sendEmailOTPV1, verifyEmailOTPV1 } from "@/trpc/routers/sso";

export function SSOForm({ sso_uuid }: { sso_uuid: string }) {
  const { device_uuid } = useDevice();
  const [service_uuid, set_service_uuid] = useState<string | null>(null);

  const { data: sendEmailData, exec: sendEmailExec } = sendEmailOTPV1();
  const { data: verifyEmailData, exec: verifyEmailExec } = verifyEmailOTPV1();

  if (!service_uuid && sendEmailData) {
    set_service_uuid(sendEmailData.service_id);
  }

  const form = useForm({
    defaultValues: {
      email: "",
      otp: "",
    },
    validators: {},
    onSubmit: async ({ value }) => {
      if (service_uuid) {
        await verifyEmailExec({
          otp: Number(value.otp),
          service_id: service_uuid,
        });
        if (verifyEmailData?.is_otp_correct) {
          alert("OTP verified successfully!");
        }
      } else {
        await sendEmailExec({
          email: value.email,
          sso_uuid: sso_uuid,
          device_uuid: String(device_uuid),
        });
      }
    },
  });

  return (
    <>
      <div className="mb-6 flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit().finally(() => {});
        }}
        className="flex h-52 flex-col gap-2 lg:h-60"
      >
        <form.Field
          name="email"
          children={(field) => {
            return (
              <>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <Label htmlFor={field.name}>Email</Label>
                  </div>
                  <Input
                    disabled={!!service_uuid}
                    type="email"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    placeholder="email@example.com"
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

        {service_uuid ? (
          <form.Field
            name="otp"
            children={(field) => {
              return (
                <>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <Label htmlFor={field.name}>One-Time Password</Label>
                      <Button
                        type="button"
                        variant="link"
                        className="h-4 px-0"
                        onClick={async () => {
                          await sendEmailExec({
                            email: form.getFieldValue("email"),
                            sso_uuid: sso_uuid,
                            device_uuid: String(device_uuid),
                          });
                        }}
                      >
                        Resend?
                      </Button>
                    </div>
                    <InputOTP
                      disabled={false}
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
                            className="w-full justify-center"
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
        ) : null}

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              disabled={!canSubmit}
              type="submit"
              className="mt-auto bg-blue-600 text-white hover:bg-blue-700"
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : null}
              Proceed
            </Button>
          )}
        />
      </form>
    </>
  );
}
