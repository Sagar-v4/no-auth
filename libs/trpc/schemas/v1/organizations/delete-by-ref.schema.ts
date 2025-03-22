import { z } from "zod";
import { organizationInput } from ".";
import { userInput } from "../users";

export const deleteByOrganizationRefInput = z.object({
  filter: z.object({
    user: userInput,
    organization: organizationInput,
  }),
});
export type DeleteByOrganizationRefInput = z.infer<
  typeof deleteByOrganizationRefInput
>;

export const deleteByOrganizationRefOutput = z.object({
  acknowledged: z.boolean(),
  deletedCount: z.number(),
});
export type DeleteByOrganizationRefOutput = z.infer<
  typeof deleteByOrganizationRefOutput
>;
