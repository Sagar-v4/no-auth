import { z } from "zod";
import { ssoInput, ssoUpdateInput } from ".";

export const updateBySSODataInput = z.object({
  filter: z.array(ssoInput),
  update: ssoUpdateInput,
});
export type UpdateBySSODataInput = z.infer<typeof updateBySSODataInput>;

export const updateBySSODataOutput = z.object({
  acknowledged: z.boolean(),
  modifiedCount: z.number(),
  upsertedCount: z.number(),
  matchedCount: z.number(),
  upsertedId: z.custom<any>(),
});
export type UpdateBySSODataOutput = z.infer<typeof updateBySSODataOutput>;
