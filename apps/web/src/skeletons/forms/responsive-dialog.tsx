"use client";

import * as React from "react";

import { cn } from "@workspace/ui/lib/utils";
import { Skeleton } from "@workspace/ui/components/skeleton";

export function ResponsiveDialogSkeleton({
  className,
  fielCount = 2,
}: React.ComponentProps<"div"> & { fielCount?: number }) {
  return (
    <>
      <div className={cn("grid gap-4", className)}>
        {Array.from({ length: fielCount }).map((_, index) => {
          return (
            <div key={index} className="grid gap-2">
              <Skeleton className="h-3 w-[100px]" />
              <Skeleton className="h-9 w-full" />
            </div>
          );
        })}
        <Skeleton className="h-9 w-full bg-green-500" />
      </div>
    </>
  );
}
