import { z } from "zod";
import { clientInputSchema } from "../clients";
import { organizationInputSchema } from "../organizations";
import { keyInputSchema } from ".";

export const deleteByKeyRefInputSchema = z.object({
  filter: z.object({
    client: clientInputSchema,
    organization: organizationInputSchema,
    key: keyInputSchema,
  }),
});
export type DeleteByKeyRefInputType = z.infer<typeof deleteByKeyRefInputSchema>;

export const deleteByKeyRefOutputSchema = z.object({
  delete_count: z.number(),
});
export type DeleteByKeyRefOutputType = z.infer<
  typeof deleteByKeyRefOutputSchema
>;
