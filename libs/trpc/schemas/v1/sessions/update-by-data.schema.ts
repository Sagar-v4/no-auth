import { z } from "zod";
import { sessionInput, sessionUpdateInput } from ".";

export const updateBySessionDataInput = z.object({
  filter: z.array(sessionInput),
  update: sessionUpdateInput,
});
export type UpdateBySessionDataInput = z.infer<typeof updateBySessionDataInput>;

export const updateBySessionDataOutput = z.object({
  acknowledged: z.boolean(),
  modifiedCount: z.number(),
  upsertedCount: z.number(),
  matchedCount: z.number(),
  upsertedId: z.custom<any>(),
});
export type UpdateBySessionDataOutput = z.infer<
  typeof updateBySessionDataOutput
>;
