import { z } from "zod";

export const sessionInputSchema = z.object({
  _id: z.string().optional(),
  uuid: z.string().uuid().optional(),
  user_id: z.string().optional(),
  user_type: z.string().optional(),
  device_id: z.string().optional(),
  status: z.string().optional(),
});
export type SessionInputSchema = z.infer<typeof sessionInputSchema>;

export const sessionOutputSchema = z.object({
  _id: z.custom<any>(),
  uuid: z.string().uuid().nonempty(),
  user_id: z.string().nonempty(),
  user_type: z.string().nonempty(),
  device_id: z.string().nonempty(),
  status: z.string().nonempty(),
  metadata: z.object({}).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type SessionOutputSchema = z.infer<typeof sessionOutputSchema>;

export const sessionInsertInputSchema = z.object({
  user_id: z.string().nonempty(),
  user_type: z.string().nonempty(),
  device_id: z.string().nonempty(),
});
export type SessionInsertInputSchema = z.infer<typeof sessionInsertInputSchema>;

export const sessionIdInputSchema = z.object({
  _id: z.string().optional(),
  uuid: z.string().uuid().optional(),
});
export type SessionIdInputSchema = z.infer<typeof sessionIdInputSchema>;

export const sessionUpdateInputSchema = z.object({
  user_id: z.string().optional(),
  user_type: z.string().optional(),
  device_id: z.string().optional(),
  status: z.string().optional(),
});
export type SessionUpdateInputSchema = z.infer<typeof sessionUpdateInputSchema>;
