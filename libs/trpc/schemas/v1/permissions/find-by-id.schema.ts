import { z } from "zod";
import { permissionIdInput, permissionOutput } from ".";

export const findByPermissionIdInput = z.object({
  filter: permissionIdInput,
});
export type FindByPermissionIdInput = z.infer<typeof findByPermissionIdInput>;

export const findByPermissionIdOutput = permissionOutput.or(z.undefined());
export type FindByPermissionIdOutput = z.infer<typeof findByPermissionIdOutput>;
