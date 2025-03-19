import { z } from "zod";
import {
  organizationInputSchema,
  organizationOutputSchema,
} from "../organizations";
import { userInputSchema, userOutputSchema } from "../users";
import { permissionInputSchema, permissionOutputSchema } from ".";

export const findByPermissionRefInputSchema = z.object({
  filter: z.object({
    user: userInputSchema,
    organization: organizationInputSchema,
    permission: permissionInputSchema,
  }),
});
export type FindByPermissionRefInputType = z.infer<
  typeof findByPermissionRefInputSchema
>;

export const findByPermissionRefOutputSchema = z.array(
  permissionOutputSchema
    .merge(z.object({ user_id: userOutputSchema }))
    .merge(z.object({ organization_id: organizationOutputSchema })),
);
export type FindByPermissionRefOutputType = z.infer<
  typeof findByPermissionRefOutputSchema
>;
