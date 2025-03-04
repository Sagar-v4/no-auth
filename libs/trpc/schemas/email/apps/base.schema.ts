import { z } from "zod";

export const emailAppInputSchema = z.object({
  _id: z.string().optional(),
  uuid: z.string().uuid().optional(),
  client_id: z.string().optional(),
  organization_id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  type: z.string().optional(),
  status: z.string().optional(),
});
export type EmailAppInputSchema = z.infer<typeof emailAppInputSchema>;

export const emailAppOutputSchema = z.object({
  _id: z.custom<any>(),
  uuid: z.string().uuid().nonempty(),
  client_id: z.string().nonempty(),
  organization_id: z.string().nonempty(),
  name: z.string().nonempty(),
  description: z.string().optional(),
  type: z.string().nonempty(),
  status: z.string().nonempty(),
  metadata: z.object({}).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type EmailAppOutputSchema = z.infer<typeof emailAppOutputSchema>;

export const emailAppInsertInputSchema = z.object({
  client_id: z.string().nonempty(),
  organization_id: z.string().nonempty(),
  name: z.string().nonempty(),
  description: z.string().optional(),
});
export type EmailAppInsertInputSchema = z.infer<
  typeof emailAppInsertInputSchema
>;

export const emailAppIdInputSchema = z.object({
  _id: z.string().optional(),
  uuid: z.string().uuid().optional(),
});
export type EmailAppIdInputSchema = z.infer<typeof emailAppIdInputSchema>;

export const emailAppUpdateInputSchema = z.object({
  client_id: z.string().optional(),
  organization_id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  type: z.string().optional(),
  status: z.string().optional(),
});
export type EmailAppUpdateInputSchema = z.infer<
  typeof emailAppUpdateInputSchema
>;
