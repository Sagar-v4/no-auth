import { z } from "zod";
import { sessionInput } from ".";

export const deleteBySessionDataInput = z.object({
  filter: z.array(sessionInput),
});
export type DeleteBySessionDataInput = z.infer<typeof deleteBySessionDataInput>;

export const deleteBySessionDataOutput = z.object({
  acknowledged: z.boolean(),
  deletedCount: z.number(),
});
export type DeleteBySessionDataOutput = z.infer<
  typeof deleteBySessionDataOutput
>;
