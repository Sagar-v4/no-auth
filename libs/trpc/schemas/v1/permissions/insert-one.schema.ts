import { z } from "zod";
import { permissionInsertInput, permissionOutput } from ".";

export const insertOnePermissionInput = z.object({
  doc: permissionInsertInput,
});
export type InsertOnePermissionInput = z.infer<typeof insertOnePermissionInput>;

export const insertOnePermissionOutput = permissionOutput;
export type InsertOnePermissionOutput = z.infer<
  typeof insertOnePermissionOutput
>;
