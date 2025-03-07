import { z } from "zod";
import { clientInputSchema } from "../clients";
import { organizationInputSchema } from "../organizations";
import { permissionGroupInputSchema } from ".";

export const deleteByPermissionGroupRefInputSchema = z.object({
  filter: z.object({
    client: clientInputSchema,
    organization: organizationInputSchema,
    permissionGroup: permissionGroupInputSchema,
  }),
});
export type DeleteByPermissionGroupRefInputType = z.infer<
  typeof deleteByPermissionGroupRefInputSchema
>;

export const deleteByPermissionGroupRefOutputSchema = z.object({
  delete_count: z.number(),
});
export type DeleteByPermissionGroupRefOutputType = z.infer<
  typeof deleteByPermissionGroupRefOutputSchema
>;
