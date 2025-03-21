import { z } from "zod";
import { ssoInsertInput, ssoOutput } from ".";

export const insertOneSSOInput = z.object({
  doc: ssoInsertInput,
});
export type InsertOneSSOInput = z.infer<typeof insertOneSSOInput>;

export const insertOneSSOOutput = ssoOutput;
export type InsertOneSSOOutput = z.infer<typeof insertOneSSOOutput>;
