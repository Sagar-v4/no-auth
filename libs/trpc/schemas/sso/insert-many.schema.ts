import { z } from "zod";
import { ssoInsertInputSchema } from ".";

export const insertManySSOInputSchema = z.object({
  docs: z.array(ssoInsertInputSchema),
});
export type InsertManySSOInputType = z.infer<typeof insertManySSOInputSchema>;

export const insertManySSOOutputSchema = z.object({
  acknowledged: z.boolean(),
  insertedCount: z.number(),
  insertedIds: z.record(z.string().nonempty(), z.custom<any>()),
});
export type InsertManySSOOutputType = z.infer<typeof insertManySSOOutputSchema>;
