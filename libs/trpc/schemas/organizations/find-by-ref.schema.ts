import { userInputSchema, userOutputSchema } from "../users";
import { z } from "zod";
import { organizationInputSchema, organizationOutputSchema } from ".";

export const findByOrganizationRefInputSchema = z.object({
  filter: z.object({
    user: userInputSchema,
    organization: organizationInputSchema,
  }),
});
export type FindByOrganizationRefInputType = z.infer<
  typeof findByOrganizationRefInputSchema
>;

export const findByOrganizationRefOutputSchema = z.array(
  organizationOutputSchema.merge(z.object({ user_id: userOutputSchema })),
);
export type FindByOrganizationRefOutputType = z.infer<
  typeof findByOrganizationRefOutputSchema
>;
