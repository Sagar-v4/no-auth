import { z } from "zod";
import { keyInput, keyUpdateInput } from ".";

export const updateByKeyDataInput = z.object({
  filter: z.array(keyInput),
  update: keyUpdateInput,
});
export type UpdateByKeyDataInput = z.infer<typeof updateByKeyDataInput>;

export const updateByKeyDataOutput = z.object({
  acknowledged: z.boolean(),
  modifiedCount: z.number(),
  upsertedCount: z.number(),
  matchedCount: z.number(),
  upsertedId: z.custom<any>(),
});
export type UpdateByKeyDataOutput = z.infer<typeof updateByKeyDataOutput>;
