import { z } from "zod";
import { userInsertInput, userOutput } from ".";

export const insertOneUserInput = z.object({
  doc: userInsertInput,
});
export type InsertOneUserInput = z.infer<typeof insertOneUserInput>;

export const insertOneUserOutput = userOutput;
export type InsertOneUserOutput = z.infer<typeof insertOneUserOutput>;
