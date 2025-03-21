import { z } from "zod";
import { userInput } from "../users";
import { organizationInput } from "../organizations";
import { permissionInput } from ".";

export const deleteByPermissionRefInput = z.object({
  filter: z.object({
    user: userInput,
    organization: organizationInput,
    permission: permissionInput,
  }),
});
export type DeleteByPermissionRefInput = z.infer<
  typeof deleteByPermissionRefInput
>;

export const deleteByPermissionRefOutput = z.object({
  acknowledged: z.boolean(),
  deletedCount: z.number(),
});
export type DeleteByPermissionRefOutput = z.infer<
  typeof deleteByPermissionRefOutput
>;
