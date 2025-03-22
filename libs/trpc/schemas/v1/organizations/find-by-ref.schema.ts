import { userInput, userOutput } from "../users";
import { z } from "zod";
import { organizationInput, organizationOutput } from ".";

export const findByOrganizationRefInput = z.object({
  filter: z.object({
    user: userInput,
    organization: organizationInput,
  }),
});
export type FindByOrganizationRefInput = z.infer<
  typeof findByOrganizationRefInput
>;

export const findByOrganizationRefOutput = z.array(
  organizationOutput.merge(z.object({ user_id: userOutput })),
);
export type FindByOrganizationRefOutput = z.infer<
  typeof findByOrganizationRefOutput
>;
