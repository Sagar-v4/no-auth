import { z } from "zod";
import { clientInputSchema } from "../../../clients/schemas";
import { organizationInputSchema } from "../../../organizations/schemas";
import { emailAppInputSchema } from ".";

export const deleteByEmailAppRefInputSchema = z.object({
  filter: z.object({
    client: clientInputSchema,
    organization: organizationInputSchema,
    email_app: emailAppInputSchema,
  }),
});
export type DeleteByEmailAppRefInputType = z.infer<
  typeof deleteByEmailAppRefInputSchema
>;

export const deleteByEmailAppRefOutputSchema = z.object({
  delete_count: z.number(),
});
export type DeleteByEmailAppRefOutputType = z.infer<
  typeof deleteByEmailAppRefOutputSchema
>;
