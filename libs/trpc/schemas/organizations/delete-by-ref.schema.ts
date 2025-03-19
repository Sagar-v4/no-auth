import { z } from "zod";
import { organizationInputSchema } from ".";
import { userInputSchema } from "../users";

export const deleteByOrganizationRefInputSchema = z.object({
  filter: z.object({
    user: userInputSchema,
    organization: organizationInputSchema,
  }),
});
export type DeleteByOrganizationRefInputType = z.infer<
  typeof deleteByOrganizationRefInputSchema
>;

export const deleteByOrganizationRefOutputSchema = z.object({
  acknowledged: z.boolean(),
  deletedCount: z.number(),
});
export type DeleteByOrganizationRefOutputType = z.infer<
  typeof deleteByOrganizationRefOutputSchema
>;
