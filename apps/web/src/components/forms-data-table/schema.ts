import { z } from "zod";

export const formSchema = z.object({
  _id: z.string(),
  uuid: z.string(),
  name: z.string(),
  title: z.string(),
  description: z.string(),
  short_description: z.string(),
  type: z.enum(["OTP", "Magic Link"]),
  status: z.enum(["Active", "Archived"]),
  client: z.object({
    name: z.string(),
    email: z.string(),
  }),
  email_app: z.object({
    name: z.string(),
    email: z.string(),
  }),
});

export type Form = z.infer<typeof formSchema>;
