import { z } from "zod";
import { organizationInput, organizationOutput } from "../organizations";
import { userInput, userOutput } from "../users";
import { ssoInput, ssoOutput } from ".";

export const findBySSORefInput = z.object({
  filter: z.object({
    user: userInput,
    organization: organizationInput,
    sso: ssoInput,
  }),
});
export type FindBySSORefInput = z.infer<typeof findBySSORefInput>;

export const findBySSORefOutput = z.array(
  ssoOutput
    .merge(z.object({ user_id: userOutput }))
    .merge(z.object({ organization_id: organizationOutput })),
);
export type FindBySSORefOutput = z.infer<typeof findBySSORefOutput>;
