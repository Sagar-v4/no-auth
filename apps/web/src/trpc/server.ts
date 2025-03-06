"use client";

import { createTRPCContext } from "@trpc/tanstack-react-query";
import type { AppRouter } from "@/lib/trpc/@generated/server";

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();
