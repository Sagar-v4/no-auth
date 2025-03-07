import { z } from "zod";
import {
  organizationInputSchema,
  organizationOutputSchema,
} from "../organizations";
import { clientInputSchema, clientOutputSchema } from "../clients";
import { permissionInputSchema, permissionOutputSchema } from ".";

export const findByPermissionRefInputSchema = z.object({
  filter: z.object({
    client: clientInputSchema,
    organization: organizationInputSchema,
    permission: permissionInputSchema,
  }),
});
export type FindByPermissionRefInputType = z.infer<
  typeof findByPermissionRefInputSchema
>;

export const findByPermissionRefOutputSchema = z.array(
  permissionOutputSchema
    .merge(z.object({ client_id: clientOutputSchema }))
    .merge(z.object({ organization_id: organizationOutputSchema })),
);
export type FindByPermissionRefOutputType = z.infer<
  typeof findByPermissionRefOutputSchema
>;
