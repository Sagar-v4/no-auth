import { z } from "zod";
import { keyInsertInput, keyOutput } from ".";

export const insertOneKeyInput = z.object({
  doc: keyInsertInput,
});
export type InsertOneKeyInput = z.infer<typeof insertOneKeyInput>;

export const insertOneKeyOutput = keyOutput;
export type InsertOneKeyOutput = z.infer<typeof insertOneKeyOutput>;
