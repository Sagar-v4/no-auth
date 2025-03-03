"use client";

import { getClientById } from "@/trpc/query/client";
import { getOrganizationsById } from "@/trpc/query/organization";
import { Button } from "@workspace/ui/components/button";

export default function Page() {
  const {
    data,
    isFetching,
    isLoading,
    isRefetching,
    refetch,
    dataUpdatedAt,
    fetchStatus,
    isPending,
    isStale,
    isError,
    error,
  } = getOrganizationsById("67c3351735d35d798b8aa54b");
  console.log("🚀 ~ Page ~ error:", error);

  if (isError) {
    return <pre>{JSON.stringify(error)}</pre>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isRefetching) {
    return <div>Refetching...</div>;
  }
  if (isFetching) {
    return <div>Fetching...</div>;
  }
  if (!data) {
    return <div>Client not found</div>;
  }

  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">{data.uuid}</h1>
        <Button size="sm" onClick={() => refetch()}>
          Refetch
        </Button>
      </div>
    </div>
  );
}
