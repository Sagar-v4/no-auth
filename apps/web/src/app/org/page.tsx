"use client";

import { getOrganizationById } from "@/trpc/routers/organizations";
import { Button } from "@workspace/ui/components/button";

export default function Page() {
  const { exec, data, isError, error } = getOrganizationById({
    filter: {
      _id: "67c9fe2ed8020ca2e2b54dd3",
    },
  });

  if (isError) {
    return <pre>{JSON.stringify(error)}</pre>;
  }

  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">{data?.createdAt}</h1>
        <Button size="sm" onClick={exec}>
          Fetch
        </Button>
      </div>
    </div>
  );
}
