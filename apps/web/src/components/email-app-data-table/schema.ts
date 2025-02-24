import { z } from "zod";

export const appSchema = z.object({
  _id: z.string(),
  uuid: z.string(),
  name: z.string(),
  description: z.string(),
  type: z.enum(["Node Mailer"]),
  status: z.enum(["Active", "Blocked"]),
  client: z.object({
    name: z.string(),
    email: z.string(),
  }),
});

export type App = z.infer<typeof appSchema>;
