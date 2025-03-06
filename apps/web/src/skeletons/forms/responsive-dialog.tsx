"use client";

import * as React from "react";

import { cn } from "@workspace/ui/lib/utils";
import { Skeleton } from "@workspace/ui/components/skeleton";

export function ResponsiveDialogSkeleton({
  className,
}: React.ComponentProps<"div">) {
  return (
    <>
      <div className={cn("grid gap-4", className)}>
        <div className="grid gap-2">
          <Skeleton className="h-5 w-[100px]" />
          <Skeleton className="h-8 w-full" />
        </div>
        <div className="grid gap-2">
          <Skeleton className="h-5 w-[100px]" />
          <Skeleton className="h-8 w-full" />
        </div>
        <div className="grid gap-2">
          <Skeleton className="h-5 w-[100px]" />
          <Skeleton className="h-8 w-full" />
        </div>
        <div className="grid gap-2">
          <Skeleton className="h-5 w-[100px]" />
          <Skeleton className="h-8 w-full" />
        </div>
        <Skeleton className="h-8 w-full bg-green-500" />
      </div>
    </>
  );
}
