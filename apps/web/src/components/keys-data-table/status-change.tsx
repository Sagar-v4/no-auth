import * as React from "react";

import { Button } from "@workspace/ui/components/button";
import { updateKeyByIdV1 } from "@/trpc/routers/keys";
import { KeyIdInput, StatusEnum } from "@/lib/trpc/schemas/v1/keys";

export function StatusChange({
  ids,
  value,
  children,
}: {
  ids: KeyIdInput;
  value: StatusEnum;
  children: React.ReactNode;
}) {
  const { exec } = updateKeyByIdV1();

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
