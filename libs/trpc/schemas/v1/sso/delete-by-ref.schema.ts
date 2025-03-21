import { z } from "zod";
import { userInput } from "../users";
import { organizationInput } from "../organizations";
import { ssoInput } from ".";

export const deleteBySSORefInput = z.object({
  filter: z.object({
    user: userInput,
    organization: organizationInput,
    sso: ssoInput,
  }),
});
export type DeleteBySSORefInput = z.infer<typeof deleteBySSORefInput>;

export const deleteBySSORefOutput = z.object({
  acknowledged: z.boolean(),
  deletedCount: z.number(),
});
export type DeleteBySSORefOutput = z.infer<typeof deleteBySSORefOutput>;
