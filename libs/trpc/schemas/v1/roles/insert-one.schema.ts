import { z } from "zod";
import { roleInsertInput, roleOutput } from ".";

export const insertOneRoleInput = z.object({
  doc: roleInsertInput,
});
export type InsertOneRoleInput = z.infer<typeof insertOneRoleInput>;

export const insertOneRoleOutput = roleOutput;
export type InsertOneRoleOutput = z.infer<typeof insertOneRoleOutput>;
