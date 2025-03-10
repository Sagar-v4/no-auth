import * as React from "react";

import { Button } from "@workspace/ui/components/button";
import { updateEmailAppById } from "@/trpc/routers/email-apps";
import {
  EmailAppIdInputSchema,
  StatusEnum,
} from "@/lib/trpc/schemas/email/apps";

export function EmailAppStatusChange({
  ids,
  value,
  children,
}: {
  ids: EmailAppIdInputSchema;
  value: StatusEnum;
  children: React.ReactNode;
}) {
  const { exec } = updateEmailAppById();

  const handleStatusChange = () => {
    exec({
      filter: ids,
      update: { status: value },
    });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="flex w-full justify-start"
      onClick={handleStatusChange}
    >
      {children}
    </Button>
  );
}
