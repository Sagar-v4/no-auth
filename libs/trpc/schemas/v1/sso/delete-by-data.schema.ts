import { z } from "zod";
import { ssoInput } from ".";

export const deleteBySSODataInput = z.object({
  filter: z.array(ssoInput),
});
export type DeleteBySSODataInput = z.infer<typeof deleteBySSODataInput>;

export const deleteBySSODataOutput = z.object({
  acknowledged: z.boolean(),
  deletedCount: z.number(),
});
export type DeleteBySSODataOutput = z.infer<typeof deleteBySSODataOutput>;
