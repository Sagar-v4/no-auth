import * as React from "react";

import { SSOForm } from "@/components/sso/form";
import { Card } from "@workspace/ui/components/card";
import { Separator } from "@workspace/ui/components/separator";
import { ModeSwitcher } from "@workspace/ui/components/mode-switcher";
import { SSOLoggedIn } from "@/components/sso/loggedin";

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;

  return (
    <>
      <div className="bg-secondary flex h-svh flex-col items-center justify-center p-6 md:p-10">
        <ModeSwitcher className="text-primary absolute top-4 right-4" />
        <div className="w-full max-w-sm md:max-w-3xl">
          <Card className="flex flex-col justify-center p-4 md:flex-row md:p-6">
            <div className="w-full p-2">
              <SSOLoggedIn />
            </div>

            <Separator className="md:!h-auto md:!w-px" />

            <div className="w-full p-2">
              <SSOForm />
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
