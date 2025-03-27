import * as React from "react";

import { SSOEmailForm } from "@/components/sso/forms/email";
import { Card } from "@workspace/ui/components/card";
import { Separator } from "@workspace/ui/components/separator";
import { SSOLoggedIn } from "@/components/sso/loggedin";

export default async function Page() {
  return (
    <>
      <div className="w-full max-w-sm lg:max-w-3xl">
        <Card className="flex flex-col justify-center gap-4 p-4 lg:h-96 lg:flex-row lg:gap-6 lg:p-6">
          <div className="w-full p-2">
            <SSOLoggedIn />
          </div>

          <Separator className="lg:!h-auto lg:!w-px" />

          <div className="w-full p-2">
            <SSOEmailForm />
          </div>
        </Card>
      </div>
    </>
  );
}
