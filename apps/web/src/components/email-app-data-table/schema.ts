import { z } from "zod";

export const appSchema = z.object({
  _id: z.any().optional(),
  uuid: z.string(),
  client_id: z.string(),
  organization_id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  type: z.string(),
  status: z.string(),
  metadata: z.object({}).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type App = z.infer<typeof appSchema>;
