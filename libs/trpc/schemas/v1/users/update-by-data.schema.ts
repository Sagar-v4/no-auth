import { z } from "zod";
import { userInput, userUpdateInput } from ".";

export const updateByUserDataInput = z.object({
  filter: z.array(userInput),
  update: userUpdateInput,
});
export type UpdateByUserDataInput = z.infer<typeof updateByUserDataInput>;

export const updateByUserDataOutput = z.object({
  acknowledged: z.boolean(),
  modifiedCount: z.number(),
  upsertedCount: z.number(),
  matchedCount: z.number(),
  upsertedId: z.custom<any>(),
});
export type UpdateByUserDataOutput = z.infer<typeof updateByUserDataOutput>;
