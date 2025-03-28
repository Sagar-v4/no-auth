import * as React from "react";

import { Button } from "@workspace/ui/components/button";
import { ResponsiveDialog } from "@workspace/ui/components/responsive-dialog";
import { KeyRound, Link } from "lucide-react";
import {
  LOGIN_METHODS_ENUM,
  LoginMethodsEnum,
} from "@/lib/trpc/schemas/v1/users";
import { updateUserByIdV1 } from "@/trpc/routers/users";
import { updateSSOByIdV1 } from "@/trpc/routers/sso";
import { cn } from "@workspace/ui/lib/utils";

const loginMethods = [
  {
    method: LOGIN_METHODS_ENUM.Enum.OTP,
    name: "One-Time Password (OTP)",
    icon: KeyRound,
    description: "Receive a temporary code via email",
  },
  {
    method: LOGIN_METHODS_ENUM.Enum.MAGIC_LINK,
    name: "Magic Link",
    icon: Link,
    description: "Get a one-click login link sent to your email",
  },
];

export function ChangeLoginMethod({
  uuid,
  target,
  curr_method,
}: {
  uuid: string;
  target: "USER" | "SSO";
  curr_method: LoginMethodsEnum;
}) {
  const { exec: updateSSOLoginMethod } = updateSSOByIdV1();
  const { exec: updateUserLoginMethod } = updateUserByIdV1();

  const title = <>Choose Login Method</>;
  const description = <>Select how you'd like to log in to your account</>;
  const userTrigger = (
    <Button variant="outline" className="w-full">
      Change Login Method
    </Button>
  );

  const ssoTrigger = (
    <Button variant="outline" size="sm" className="mx-4">
      Edit
    </Button>
  );

  const handleMethodSelect = (method: LoginMethodsEnum) => {
    if (target === "USER") {
      updateUserLoginMethod({
        filter: {
          uuid: uuid,
        },
        update: {
          login_method: method,
        },
      });
    } else if (target === "SSO") {
      updateSSOLoginMethod({
        filter: {
          uuid: uuid,
        },
        update: {
          login_method: method,
        },
      });
    }
  };
  return (
    <ResponsiveDialog
      title={title}
      trigger={target === "SSO" ? ssoTrigger : userTrigger}
      description={description}
    >
      <div className="flex flex-col gap-4">
        {loginMethods.map((loginMethod) => (
          <Button
            key={loginMethod.method}
            variant="outline"
            className={cn(
              loginMethod.method === curr_method && "border-primary",
              "h-20 justify-start border-2",
            )}
            onClick={() =>
              handleMethodSelect(loginMethod.method as LoginMethodsEnum)
            }
          >
            <div className="flex items-center justify-start space-x-3 px-4">
              <loginMethod.icon className="size-5" />
              <div className="flex flex-col items-start">
                <span className="font-semibold">{loginMethod.name}</span>
                <span className="text-muted-foreground text-xs">
                  {loginMethod.description}
                </span>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </ResponsiveDialog>
  );
}
