import { z } from "zod";
import { keyInput, keyOutput } from ".";

export const findByKeyDataInput = z.object({
  filter: z.array(keyInput),
});
export type FindByKeyDataInput = z.infer<typeof findByKeyDataInput>;

export const findByKeyDataOutput = z.array(keyOutput);
export type FindByKeyDataOutput = z.infer<typeof findByKeyDataOutput>;
