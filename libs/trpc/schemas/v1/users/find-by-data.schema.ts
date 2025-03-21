import { z } from "zod";
import { userInput, userOutput } from ".";

export const findByUserDataInput = z.object({
  filter: z.array(userInput),
});
export type FindByUserDataInput = z.infer<typeof findByUserDataInput>;

export const findByUserDataOutput = z.array(userOutput);
export type FindByUserDataOutput = z.infer<typeof findByUserDataOutput>;
