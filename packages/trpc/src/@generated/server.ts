import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();
const publicProcedure = t.procedure;

const appRouter = t.router({
  clients: t.router({
    createClient: publicProcedure.input(z.object({
      name: z.string().min(3).max(50),
      email: z.string().email(),
    })).output(z.any(z.object({
      _id: z.string(),
      name: z.string().min(3).max(50),
      email: z.string().email(),
      loginMethod: z.string().optional(),
      status: z.string(),
      roles: z.array(z.string()),
      metadata: z.object({}).optional(),
    }))).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    getClient: publicProcedure.input(z.object({
      id: z.string(),
    })).output(z.any(z.object({
      _id: z.string(),
      name: z.string().min(3).max(50),
      email: z.string().email(),
      loginMethod: z.string().optional(),
      status: z.string(),
      roles: z.array(z.string()),
      metadata: z.object({}).optional(),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  })
});
export type AppRouter = typeof appRouter;

