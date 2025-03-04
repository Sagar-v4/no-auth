import { z } from "zod";

export const formInputSchema = z.object({
  _id: z.string().optional(),
  uuid: z.string().uuid().optional(),
  client_id: z.string().optional(),
  organization_id: z.string().optional(),
  email_app_id: z.string().optional(),
  title: z.string().optional(),
  short_description: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  expiry: z.number().optional(),
  status: z.string().optional(),
});
export type FormInputSchema = z.infer<typeof formInputSchema>;

export const formOutputSchema = z.object({
  _id: z.custom<any>(),
  uuid: z.string().uuid().nonempty(),
  client_id: z.string().nonempty(),
  organization_id: z.string().nonempty(),
  email_app_id: z.string().nonempty(),
  title: z.string().nonempty(),
  short_description: z.string().optional(),
  name: z.string().nonempty(),
  description: z.string().optional(),
  expiry: z.number(),
  status: z.string().nonempty(),
  metadata: z.object({}).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type FormOutputSchema = z.infer<typeof formOutputSchema>;

export const formInsertInputSchema = z.object({
  client_id: z.string().nonempty(),
  organization_id: z.string().nonempty(),
  email_app_id: z.string().nonempty(),
  title: z.string().nonempty(),
  short_description: z.string().optional(),
  name: z.string().nonempty(),
  description: z.string().optional(),
});
export type FormInsertInputSchema = z.infer<typeof formInsertInputSchema>;

export const formIdInputSchema = z.object({
  _id: z.string().optional(),
  uuid: z.string().uuid().optional(),
});
export type FormIdInputSchema = z.infer<typeof formIdInputSchema>;

export const formUpdateInputSchema = z.object({
  client_id: z.string().optional(),
  organization_id: z.string().optional(),
  email_app_id: z.string().optional(),
  title: z.string().optional(),
  short_description: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  expiry: z.number().optional(),
  status: z.string().optional(),
});
export type FormUpdateInputSchema = z.infer<typeof formUpdateInputSchema>;
