import { z } from "zod";

export const templateSchema = z.object({
  _id: z.string(),
  uuid: z.string(),
  name: z.string(),
  description: z.string(),
  type: z.enum(["OTP"]),
  status: z.enum(["Personal", "Organiz", "Live"]),
  client: z.object({
    name: z.string(),
    email: z.string(),
  }),
});

export type Template = z.infer<typeof templateSchema>;
