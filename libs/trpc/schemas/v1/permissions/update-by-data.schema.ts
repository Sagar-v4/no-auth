import { z } from "zod";
import { permissionInput, permissionUpdateInput } from ".";

export const updateByPermissionDataInput = z.object({
  filter: z.array(permissionInput),
  update: permissionUpdateInput,
});
export type UpdateByPermissionDataInput = z.infer<
  typeof updateByPermissionDataInput
>;

export const updateByPermissionDataOutput = z.object({
  acknowledged: z.boolean(),
  modifiedCount: z.number(),
  upsertedCount: z.number(),
  matchedCount: z.number(),
  upsertedId: z.custom<any>(),
});
export type UpdateByPermissionDataOutput = z.infer<
  typeof updateByPermissionDataOutput
>;
