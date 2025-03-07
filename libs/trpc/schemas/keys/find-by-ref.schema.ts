import { z } from "zod";
import {
  organizationInputSchema,
  organizationOutputSchema,
} from "../organizations";
import { clientInputSchema, clientOutputSchema } from "../clients";
import { keyInputSchema, keyOutputSchema } from ".";

export const findByKeyRefInputSchema = z.object({
  filter: z.object({
    client: clientInputSchema,
    organization: organizationInputSchema,
    key: keyInputSchema,
  }),
});
export type FindByKeyRefInputType = z.infer<typeof findByKeyRefInputSchema>;

export const findByKeyRefOutputSchema = z.array(
  keyOutputSchema
    .merge(z.object({ client_id: clientOutputSchema }))
    .merge(z.object({ organization_id: organizationOutputSchema })),
);
export type FindByKeyRefOutputType = z.infer<typeof findByKeyRefOutputSchema>;
