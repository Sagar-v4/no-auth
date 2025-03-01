import {
  organizationInputSchema,
  organizationOutputSchema,
} from "../../organizations/schemas";
import { z } from "zod";
import { clienteleInputSchema, clienteleOutputSchema } from ".";

export const findByClienteleRefInputSchema = z.object({
  filter: z.object({
    organization: organizationInputSchema,
    clientele: clienteleInputSchema,
  }),
});
export type FindByClienteleRefInputType = z.infer<
  typeof findByClienteleRefInputSchema
>;

export const findByClienteleRefOutputSchema = z.array(
  clienteleOutputSchema.merge(
    z.object({ organization_id: organizationOutputSchema }),
  ),
);
export type FindByClienteleRefOutputType = z.infer<
  typeof findByClienteleRefOutputSchema
>;
