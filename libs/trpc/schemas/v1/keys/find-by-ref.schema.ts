import { z } from "zod";
import { organizationInput, organizationOutput } from "../organizations";
import { userInput, userOutput } from "../users";
import { keyInput, keyOutput } from ".";

export const findByKeyRefInput = z.object({
  filter: z.object({
    user: userInput,
    organization: organizationInput,
    key: keyInput,
  }),
});
export type FindByKeyRefInput = z.infer<typeof findByKeyRefInput>;

export const findByKeyRefOutput = z.array(
  keyOutput
    .merge(z.object({ user_id: userOutput }))
    .merge(z.object({ organization_id: organizationOutput })),
);
export type FindByKeyRefOutput = z.infer<typeof findByKeyRefOutput>;
