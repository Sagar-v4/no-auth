"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { getOrganizationByIdV1 } from "@/trpc/routers/organizations";
import { Button } from "@workspace/ui/components/button";

export default function Page() {
  const { organization } = useCurrentUser();
  const { exec, data, isError, error } = getOrganizationByIdV1({
    filter: {
      _id: organization._id,
    },
  });

  if (isError) {
    return <pre>{JSON.stringify(error)}</pre>;
  }

  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">{data?.name}</h1>
        <Button size="sm" onClick={exec}>
          Fetch
        </Button>
      </div>
    </div>
  );
}
