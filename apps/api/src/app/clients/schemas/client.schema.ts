import { z } from "zod";

export const clientSchema = z.object({
  _id: z.string(),
  name: z.string().min(3).max(50),
  email: z.string().email(),
  loginMethod: z.string().optional(),
  status: z.string(),
  roles: z.array(z.string()),
  metadata: z.object({}).optional(),
});

export const createClientSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
});

export type ClientSchema = z.infer<typeof clientSchema>;

export type CreateClientSchema = z.infer<typeof createClientSchema>;
