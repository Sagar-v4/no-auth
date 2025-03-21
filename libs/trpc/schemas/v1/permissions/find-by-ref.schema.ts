import { z } from "zod";
import { organizationInput, organizationOutput } from "../organizations";
import { userInput, userOutput } from "../users";
import { permissionInput, permissionOutput } from ".";

export const findByPermissionRefInput = z.object({
  filter: z.object({
    user: userInput,
    organization: organizationInput,
    permission: permissionInput,
  }),
});
export type FindByPermissionRefInput = z.infer<typeof findByPermissionRefInput>;

export const findByPermissionRefOutput = z.array(
  permissionOutput
    .merge(z.object({ user_id: userOutput }))
    .merge(z.object({ organization_id: organizationOutput })),
);
export type FindByPermissionRefOutput = z.infer<
  typeof findByPermissionRefOutput
>;
