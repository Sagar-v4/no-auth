import { z } from "zod";
import { roleInsertInput } from ".";

export const insertManyRoleInput = z.object({
  doc: z.array(roleInsertInput),
});
export type InsertManyRoleInput = z.infer<typeof insertManyRoleInput>;

export const insertManyRoleOutput = z.object({
  acknowledged: z.boolean(),
  insertedCount: z.number(),
  insertedIds: z.record(z.string().nonempty(), z.custom<any>()),
});
export type InsertManyRoleOutput = z.infer<typeof insertManyRoleOutput>;
