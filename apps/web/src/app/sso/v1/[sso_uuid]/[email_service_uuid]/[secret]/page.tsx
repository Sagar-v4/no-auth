"use client";

import * as React from "react";
import { LoaderCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { useLoginMutation } from "@/swr/hooks/sessions";
import { useSSOSecretVerifyMutation } from "@/swr/hooks/sso";
import { sso_url } from "@no-auth/next";
import { Button } from "@workspace/ui/components/button";
import { device_uuid, refresh_token } from "@/lib/const/cookies";

export default function Page() {
  const { sso_uuid, email_service_uuid, secret } = useParams<{
    sso_uuid: string;
    email_service_uuid: string;
    secret: string;
  }>();

  const [error, setError] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);
  const [countdown, setCountdown] = React.useState(5);
  const [showRedirectBtn, setShowRedirectBtn] = React.useState(false);

  const router = useRouter();

  const { trigger: loginTrigger, isMutating: loginIsMutating } =
    useLoginMutation();

  const { isMutating: magicLinkIsMutating, trigger: magicLinkTrigger } =
    useSSOSecretVerifyMutation();

  const handleLogin = async (handleLogin: string) => {
    const { did, rt, redirect } = await loginTrigger({
      sso_uuid: sso_uuid,
      user_uuid: handleLogin,
    });
    const redirect_url = new URL(redirect);
    redirect_url.searchParams.set(device_uuid, did);
    redirect_url.searchParams.set(refresh_token, rt);
    window.location.href = redirect_url.toString();
  };

  React.useEffect(() => {
    async function init() {
      try {
        await magicLinkTrigger({
          secret: secret,
          email_service_uuid,
        }).then(async (data) => {
          if (data.is_valid_secret) {
            await handleLogin(data.user_uuid as string).catch(() => {
              setError("Failed to login!");
            });
          } else if (typeof data.user_uuid === "string") {
            setError("Invalid link!");
          } else {
            setError("Link expired!");
          }
        });
      } catch (error) {
        setError("Something went wrong!");
      } finally {
        setShowRedirectBtn(true);
      }
    }

    init();
  }, []);

  React.useEffect(() => {
    if (!showRedirectBtn) return;
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setDisabled(true);
      router.push(sso_url.toString());
    }
  }, [countdown, router, showRedirectBtn]);

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center gap-2">
        {loginIsMutating || magicLinkIsMutating ? (
          <>
            <LoaderCircle className="size-5 animate-spin" />
            {magicLinkIsMutating ? "Verifying magic link" : null}
            {loginIsMutating ? "Logging in" : null}
          </>
        ) : (
          <>{error}</>
        )}

        {showRedirectBtn ? (
          <Button
            disabled={disabled}
            variant="destructive"
            onClick={() => router.push(sso_url.toString())}
          >
            {disabled ? (
              <>
                <LoaderCircle className="size-4 animate-spin" />
                Redirecting to sso
              </>
            ) : (
              `Redirecting to sso in ${countdown} seconds`
            )}
          </Button>
        ) : null}
      </div>
    </>
  );
}
