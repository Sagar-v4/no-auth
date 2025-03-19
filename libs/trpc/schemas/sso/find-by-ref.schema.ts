import { z } from "zod";
import {
  organizationInputSchema,
  organizationOutputSchema,
} from "../organizations";
import { userInputSchema, userOutputSchema } from "../users";
import { ssoInputSchema, ssoOutputSchema } from ".";

export const findBySSORefInputSchema = z.object({
  filter: z.object({
    user: userInputSchema,
    organization: organizationInputSchema,
    sso: ssoInputSchema,
  }),
});
export type FindBySSORefInputType = z.infer<typeof findBySSORefInputSchema>;

export const findBySSORefOutputSchema = z.array(
  ssoOutputSchema
    .merge(z.object({ user_id: userOutputSchema }))
    .merge(z.object({ organization_id: organizationOutputSchema })),
);
export type FindBySSORefOutputType = z.infer<typeof findBySSORefOutputSchema>;
