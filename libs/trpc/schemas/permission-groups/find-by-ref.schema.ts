import { z } from "zod";
import {
  organizationInputSchema,
  organizationOutputSchema,
} from "../organizations";
import { clientInputSchema, clientOutputSchema } from "../clients";
import { permissionGroupInputSchema, permissionGroupOutputSchema } from ".";

export const findByPermissionGroupRefInputSchema = z.object({
  filter: z.object({
    client: clientInputSchema,
    organization: organizationInputSchema,
    permissionGroup: permissionGroupInputSchema,
  }),
});
export type FindByPermissionGroupRefInputType = z.infer<
  typeof findByPermissionGroupRefInputSchema
>;

export const findByPermissionGroupRefOutputSchema = z.array(
  permissionGroupOutputSchema
    .merge(z.object({ client_id: clientOutputSchema }))
    .merge(z.object({ organization_id: organizationOutputSchema })),
);
export type FindByPermissionGroupRefOutputType = z.infer<
  typeof findByPermissionGroupRefOutputSchema
>;
