"use client";

import { createTRPCContext } from "@trpc/tanstack-react-query";
import type { AppRouter } from "@workspace/trpc/router";

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();
