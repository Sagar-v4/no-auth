import { z } from "zod";
import { permissionInputSchema, permissionUpdateInputSchema } from ".";

export const updateByPermissionDataInputSchema = z.object({
  filter: z.array(permissionInputSchema),
  update: permissionUpdateInputSchema,
});
export type UpdateByPermissionDataInputType = z.infer<
  typeof updateByPermissionDataInputSchema
>;

export const updateByPermissionDataOutputSchema = z.object({
  acknowledged: z.boolean(),
  modifiedCount: z.number(),
  upsertedCount: z.number(),
  matchedCount: z.number(),
  upsertedId: z.custom<any>(),
});
export type UpdateByPermissionDataOutputType = z.infer<
  typeof updateByPermissionDataOutputSchema
>;
