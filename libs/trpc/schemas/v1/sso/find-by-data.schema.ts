import { z } from "zod";
import { ssoInput, ssoOutput } from ".";

export const findBySSODataInput = z.object({
  filter: z.array(ssoInput),
});
export type FindBySSODataInput = z.infer<typeof findBySSODataInput>;

export const findBySSODataOutput = z.array(ssoOutput);
export type FindBySSODataOutput = z.infer<typeof findBySSODataOutput>;
