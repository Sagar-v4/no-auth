import { z } from "zod";
import { clienteleInputSchema } from ".";
import { organizationInputSchema } from "../organizations";

export const deleteByClienteleRefInputSchema = z.object({
  filter: z.object({
    organization: organizationInputSchema,
    clientele: clienteleInputSchema,
  }),
});
export type DeleteByClienteleRefInputType = z.infer<
  typeof deleteByClienteleRefInputSchema
>;

export const deleteByClienteleRefOutputSchema = z.object({
  acknowledged: z.boolean(),
  deletedCount: z.number(),
});
export type DeleteByClienteleRefOutputType = z.infer<
  typeof deleteByClienteleRefOutputSchema
>;
