import { z } from "zod";
import { userInputSchema } from "../users";
import { organizationInputSchema } from "../organizations";
import { ssoInputSchema } from ".";

export const deleteBySSORefInputSchema = z.object({
  filter: z.object({
    user: userInputSchema,
    organization: organizationInputSchema,
    sso: ssoInputSchema,
  }),
});
export type DeleteBySSORefInputType = z.infer<typeof deleteBySSORefInputSchema>;

export const deleteBySSORefOutputSchema = z.object({
  acknowledged: z.boolean(),
  deletedCount: z.number(),
});
export type DeleteBySSORefOutputType = z.infer<
  typeof deleteBySSORefOutputSchema
>;
