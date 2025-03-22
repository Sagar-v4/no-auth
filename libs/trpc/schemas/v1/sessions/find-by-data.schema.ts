import { z } from "zod";
import { sessionInput, sessionOutput } from ".";

export const findBySessionDataInput = z.object({
  filter: z.array(sessionInput),
});
export type FindBySessionDataInput = z.infer<typeof findBySessionDataInput>;

export const findBySessionDataOutput = z.array(sessionOutput);
export type FindBySessionDataOutput = z.infer<typeof findBySessionDataOutput>;
