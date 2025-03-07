import { z } from "zod";
import {
  permissionGroupInputSchema,
  permissionGroupUpdateInputSchema,
} from ".";

export const updateByPermissionGroupDataInputSchema = z.object({
  filter: z.array(permissionGroupInputSchema),
  update: permissionGroupUpdateInputSchema,
});
export type UpdateByPermissionGroupDataInputType = z.infer<
  typeof updateByPermissionGroupDataInputSchema
>;

export const updateByPermissionGroupDataOutputSchema = z.object({
  acknowledged: z.boolean(),
  modifiedCount: z.number(),
  upsertedCount: z.number(),
  matchedCount: z.number(),
  upsertedId: z.custom<any>(),
});
export type UpdateByPermissionGroupDataOutputType = z.infer<
  typeof updateByPermissionGroupDataOutputSchema
>;
