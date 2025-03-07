import { z } from "zod";
import {
  organizationInputSchema,
  organizationOutputSchema,
} from "../organizations";
import { clientInputSchema, clientOutputSchema } from "../clients";
import { ssoInputSchema, ssoOutputSchema } from ".";

export const findBySSORefInputSchema = z.object({
  filter: z.object({
    client: clientInputSchema,
    organization: organizationInputSchema,
    sso: ssoInputSchema,
  }),
});
export type FindBySSORefInputType = z.infer<typeof findBySSORefInputSchema>;

export const findBySSORefOutputSchema = z.array(
  ssoOutputSchema
    .merge(z.object({ client_id: clientOutputSchema }))
    .merge(z.object({ organization_id: organizationOutputSchema })),
);
export type FindBySSORefOutputType = z.infer<typeof findBySSORefOutputSchema>;
