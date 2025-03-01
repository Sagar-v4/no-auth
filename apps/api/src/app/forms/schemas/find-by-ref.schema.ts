import { z } from "zod";
import {
  organizationInputSchema,
  organizationOutputSchema,
} from "../../organizations/schemas";
import {
  emailAppInputSchema,
  emailAppOutputSchema,
} from "../../email/apps/schemas";
import { clientInputSchema, clientOutputSchema } from "../../clients/schemas";
import { formInputSchema, formOutputSchema } from ".";

export const findByFormRefInputSchema = z.object({
  filter: z.object({
    client: clientInputSchema,
    organization: organizationInputSchema,
    email_app: emailAppInputSchema,
    form: formInputSchema,
  }),
});
export type FindByFormRefInputType = z.infer<typeof findByFormRefInputSchema>;

export const findByFormRefOutputSchema = z.array(
  formOutputSchema
    .merge(z.object({ client_id: clientOutputSchema }))
    .merge(z.object({ organization_id: organizationOutputSchema }))
    .merge(z.object({ email_app_id: emailAppOutputSchema })),
);
export type FindByFormRefOutputType = z.infer<typeof findByFormRefOutputSchema>;
