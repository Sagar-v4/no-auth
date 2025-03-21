import { z } from "zod";
import { ssoInsertInput } from ".";

export const insertManySSOInput = z.object({
  doc: z.array(ssoInsertInput),
});
export type InsertManySSOInput = z.infer<typeof insertManySSOInput>;

export const insertManySSOOutput = z.object({
  acknowledged: z.boolean(),
  insertedCount: z.number(),
  insertedIds: z.record(z.string().nonempty(), z.custom<any>()),
});
export type InsertManySSOOutput = z.infer<typeof insertManySSOOutput>;
