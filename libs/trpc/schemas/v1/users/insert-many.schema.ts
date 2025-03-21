import { z } from "zod";
import { userInsertInput } from ".";

export const insertManyUserInput = z.object({
  doc: z.array(userInsertInput),
});
export type InsertManyUserInput = z.infer<typeof insertManyUserInput>;

export const insertManyUserOutput = z.object({
  acknowledged: z.boolean(),
  insertedCount: z.number(),
  insertedIds: z.record(z.string().nonempty(), z.custom<any>()),
});
export type InsertManyUserOutput = z.infer<typeof insertManyUserOutput>;
