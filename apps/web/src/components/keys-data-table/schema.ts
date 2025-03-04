import { z } from "zod";

export const keySchema = z.object({
  _id: z.string(),
  uuid: z.string(),
  name: z.string(),
  description: z.string(),
  status: z.enum(["Active", "Deactivated", "Expired"]),
  client: z.object({
    name: z.string(),
    email: z.string(),
  }),
});

export type Key = z.infer<typeof keySchema>;
