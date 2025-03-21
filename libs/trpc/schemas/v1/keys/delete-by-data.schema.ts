import { z } from "zod";
import { keyInput } from ".";

export const deleteByKeyDataInput = z.object({
  filter: z.array(keyInput),
});
export type DeleteByKeyDataInput = z.infer<typeof deleteByKeyDataInput>;

export const deleteByKeyDataOutput = z.object({
  acknowledged: z.boolean(),
  deletedCount: z.number(),
});
export type DeleteByKeyDataOutput = z.infer<typeof deleteByKeyDataOutput>;
