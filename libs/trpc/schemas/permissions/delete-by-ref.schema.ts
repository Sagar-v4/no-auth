import { z } from "zod";
import { userInputSchema } from "../users";
import { organizationInputSchema } from "../organizations";
import { permissionInputSchema } from ".";

export const deleteByPermissionRefInputSchema = z.object({
  filter: z.object({
    user: userInputSchema,
    organization: organizationInputSchema,
    permission: permissionInputSchema,
  }),
});
export type DeleteByPermissionRefInputType = z.infer<
  typeof deleteByPermissionRefInputSchema
>;

export const deleteByPermissionRefOutputSchema = z.object({
  acknowledged: z.boolean(),
  deletedCount: z.number(),
});
export type DeleteByPermissionRefOutputType = z.infer<
  typeof deleteByPermissionRefOutputSchema
>;
