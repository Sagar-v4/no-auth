"use client";

import { useTRPC } from "@/trpc/server";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@workspace/ui/components/button";

export default function Page() {
  const trpc = useTRPC();
  const user = useQuery(
    trpc.clients.getClient.queryOptions({ id: "67b8e9b23f6a1ff8a83475e5" }),
  );

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">{user.data?.name}</h1>
        <Button size="sm">Button</Button>
      </div>
    </div>
  );
}
