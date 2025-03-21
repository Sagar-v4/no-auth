import { z } from "zod";
import { permissionInput, permissionOutput } from ".";

export const findByPermissionDataInput = z.object({
  filter: z.array(permissionInput),
});
export type FindByPermissionDataInput = z.infer<
  typeof findByPermissionDataInput
>;

export const findByPermissionDataOutput = z.array(permissionOutput);
export type FindByPermissionDataOutput = z.infer<
  typeof findByPermissionDataOutput
>;
