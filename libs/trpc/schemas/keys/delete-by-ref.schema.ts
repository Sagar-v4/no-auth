import { z } from "zod";
import { userInputSchema } from "../users";
import { organizationInputSchema } from "../organizations";
import { keyInputSchema } from ".";

export const deleteByKeyRefInputSchema = z.object({
  filter: z.object({
    user: userInputSchema,
    organization: organizationInputSchema,
    key: keyInputSchema,
  }),
});
export type DeleteByKeyRefInputType = z.infer<typeof deleteByKeyRefInputSchema>;

export const deleteByKeyRefOutputSchema = z.object({
  acknowledged: z.boolean(),
  deletedCount: z.number(),
});
export type DeleteByKeyRefOutputType = z.infer<
  typeof deleteByKeyRefOutputSchema
>;
