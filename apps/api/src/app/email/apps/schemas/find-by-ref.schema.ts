import { z } from "zod";
import {
  clientInputSchema,
  clientOutputSchema,
} from "../../../clients/schemas";
import {
  organizationInputSchema,
  organizationOutputSchema,
} from "../../../organizations/schemas";
import { emailAppInputSchema, emailAppOutputSchema } from ".";

export const findByEmailAppRefInputSchema = z.object({
  filter: z.object({
    client: clientInputSchema,
    organization: organizationInputSchema,
    email_app: emailAppInputSchema,
  }),
});
export type FindByEmailAppRefInputType = z.infer<
  typeof findByEmailAppRefInputSchema
>;

export const findByEmailAppRefOutputSchema = z.array(
  emailAppOutputSchema
    .merge(z.object({ client_id: clientOutputSchema }))
    .merge(z.object({ organization_id: organizationOutputSchema })),
);
export type FindByEmailAppRefOutputType = z.infer<
  typeof findByEmailAppRefOutputSchema
>;
