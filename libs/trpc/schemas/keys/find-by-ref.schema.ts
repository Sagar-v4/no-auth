import { z } from "zod";
import {
  organizationInputSchema,
  organizationOutputSchema,
} from "../organizations";
import { userInputSchema, userOutputSchema } from "../users";
import { keyInputSchema, keyOutputSchema } from ".";

export const findByKeyRefInputSchema = z.object({
  filter: z.object({
    user: userInputSchema,
    organization: organizationInputSchema,
    key: keyInputSchema,
  }),
});
export type FindByKeyRefInputType = z.infer<typeof findByKeyRefInputSchema>;

export const findByKeyRefOutputSchema = z.array(
  keyOutputSchema
    .merge(z.object({ user_id: userOutputSchema }))
    .merge(z.object({ organization_id: organizationOutputSchema })),
);
export type FindByKeyRefOutputType = z.infer<typeof findByKeyRefOutputSchema>;
