import { z } from "zod";
import { clientInputSchema } from "../clients";
import { emailAppInputSchema } from "../email/apps";
import { organizationInputSchema } from "../organizations";
import { formInputSchema } from ".";

export const deleteByFormRefInputSchema = z.object({
  filter: z.object({
    client: clientInputSchema,
    organization: organizationInputSchema,
    email_app: emailAppInputSchema,
    form: formInputSchema,
  }),
});
export type DeleteByFormRefInputType = z.infer<
  typeof deleteByFormRefInputSchema
>;

export const deleteByFormRefOutputSchema = z.object({
  delete_count: z.number(),
});
export type DeleteByFormRefOutputType = z.infer<
  typeof deleteByFormRefOutputSchema
>;
