import { z } from "zod";
import { permissionInsertInput } from ".";

export const insertManyPermissionInput = z.object({
  doc: z.array(permissionInsertInput),
});
export type InsertManyPermissionInput = z.infer<
  typeof insertManyPermissionInput
>;

export const insertManyPermissionOutput = z.object({
  acknowledged: z.boolean(),
  insertedCount: z.number(),
  insertedIds: z.record(z.string().nonempty(), z.custom<any>()),
});
export type InsertManyPermissionOutput = z.infer<
  typeof insertManyPermissionOutput
>;
