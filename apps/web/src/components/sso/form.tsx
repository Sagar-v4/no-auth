"use client";

import { Loader2 } from "lucide-react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  REGEXP_ONLY_DIGITS,
} from "@workspace/ui/components/input-otp";
import { useForm } from "@tanstack/react-form";
import { OTP_LENGTH } from "@/registry/constants";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";

export function SSOForm() {
  const form = useForm({
    defaultValues: {
      email: "",
      otp: "",
    },
    validators: {},
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
                    <Button
                      variant="link"
                      className="h-4 px-0"
                      onClick={() => form.reset()}
                    >
                      Reset?
                    </Button>
                  </div>
                  <Input
                    disabled={false}
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
                      {field.state.meta.errors.map((error) => error)}
                    </em>
                  ) : null}
                </div>
              </>
            );
          }}
        />

        <form.Field
          name="otp"
          children={(field) => {
            return (
              <>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <Label htmlFor={field.name}>One-Time Password</Label>
                    <Button
                      variant="link"
                      className="h-4 px-0"
                      onClick={() => form.reset()}
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

        <form.Subscribe
          selector={(state) => [
            state.canSubmit,
            state.isSubmitting,
            state.isSubmitSuccessful,
          ]}
          children={([canSubmit, isSubmitting, isSubmitSuccessful]) => (
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
