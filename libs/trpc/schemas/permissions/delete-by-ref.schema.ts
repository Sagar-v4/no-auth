import { z } from "zod";
import { clientInputSchema } from "../clients";
import { organizationInputSchema } from "../organizations";
import { permissionInputSchema } from ".";

export const deleteByPermissionRefInputSchema = z.object({
  filter: z.object({
    client: clientInputSchema,
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
