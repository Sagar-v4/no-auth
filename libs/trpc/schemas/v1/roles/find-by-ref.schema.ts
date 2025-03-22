import { z } from "zod";
import { organizationInput, organizationOutput } from "../organizations";
import { userInput, userOutput } from "../users";
import { roleInput, roleOutput } from ".";

export const findByRoleRefInput = z.object({
  filter: z.object({
    user: userInput,
    organization: organizationInput,
    role: roleInput,
  }),
});
export type FindByRoleRefInput = z.infer<typeof findByRoleRefInput>;

export const findByRoleRefOutput = z.array(
  roleOutput
    .merge(z.object({ user_id: userOutput }))
    .merge(z.object({ organization_id: organizationOutput })),
);
export type FindByRoleRefOutput = z.infer<typeof findByRoleRefOutput>;
