import { z } from "zod";
import { permissionInput } from ".";

export const deleteByPermissionDataInput = z.object({
  filter: z.array(permissionInput),
});
export type DeleteByPermissionDataInput = z.infer<
  typeof deleteByPermissionDataInput
>;

export const deleteByPermissionDataOutput = z.object({
  acknowledged: z.boolean(),
  deletedCount: z.number(),
});
export type DeleteByPermissionDataOutput = z.infer<
  typeof deleteByPermissionDataOutput
>;
