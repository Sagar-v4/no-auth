import { z } from "zod";

export const clientInputSchema = z.object({
  _id: z.string().optional(),
  uuid: z.string().uuid().optional(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  login_method: z.string().optional(),
  status: z.string().optional(),
});
export type ClientDataInputType = z.infer<typeof clientInputSchema>;

export const clientOutputSchema = z.object({
  _id: z.custom<any>(),
  uuid: z.string().uuid().nonempty(),
  name: z.string().nonempty(),
  email: z.string().email().nonempty(),
  login_method: z.string().nonempty(),
  status: z.string().nonempty(),
  roles: z.record(z.string().nonempty(), z.number()),
  metadata: z.object({}).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type ClientOutputSchema = z.infer<typeof clientOutputSchema>;

export const clientInsertInputSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email().nonempty(),
});
export type ClientInsertInputSchema = z.infer<typeof clientInsertInputSchema>;

export const clientIdInputSchema = z.object({
  _id: z.string().optional(),
  uuid: z.string().uuid().optional(),
});
export type ClientIdInputSchema = z.infer<typeof clientIdInputSchema>;

export const clientUpdateInputSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  login_method: z.string().optional(),
  status: z.string().optional(),
});
export type ClientUpdateInputSchema = z.infer<typeof clientUpdateInputSchema>;
