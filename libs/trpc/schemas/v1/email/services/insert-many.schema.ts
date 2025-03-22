import { z } from "zod";
import { emailServiceInsertInput } from ".";

export const insertManyEmailServiceInput = z.object({
  doc: z.array(emailServiceInsertInput),
});
export type InsertManyEmailServiceInput = z.infer<
  typeof insertManyEmailServiceInput
>;

export const insertManyEmailServiceOutput = z.object({
  acknowledged: z.boolean(),
  insertedCount: z.number(),
  insertedIds: z.record(z.string().nonempty(), z.custom<any>()),
});
export type InsertManyEmailServiceOutput = z.infer<
  typeof insertManyEmailServiceOutput
>;
