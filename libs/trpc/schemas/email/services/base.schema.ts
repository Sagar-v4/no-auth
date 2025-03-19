import { z } from "zod";

export const emailServiceInputSchema = z.object({
  _id: z.string().optional(),
  uuid: z.string().uuid().optional(),
  user_id: z.string().optional(),
  device_id: z.string().optional(),
});
export type EmailServiceInputSchema = z.infer<typeof emailServiceInputSchema>;

export const emailServiceOutputSchema = z.object({
  _id: z.custom<any>(),
  uuid: z.string().uuid().nonempty(),
  user_id: z.string().nonempty(),
  device_id: z.string().nonempty(),
  metadata: z.object({}).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type EmailServiceOutputSchema = z.infer<typeof emailServiceOutputSchema>;

export const emailServiceInsertInputSchema = z.object({
  user_id: z.string().nonempty(),
  device_id: z.string().nonempty(),
  metadata: z.object({}),
});
export type EmailServiceInsertInputSchema = z.infer<
  typeof emailServiceInsertInputSchema
>;

export const emailServiceIdInputSchema = z
  .object({
    _id: z.string().optional(),
    uuid: z.string().uuid().optional(),
  })
  .refine((data) => !Object.values(data).every((value) => !value));
export type EmailServiceIdInputSchema = z.infer<
  typeof emailServiceIdInputSchema
>;

export const emailServiceUpdateInputSchema = z.object({
  user_id: z.string().optional(),
  device_id: z.string().optional(),
});
export type EmailServiceUpdateInputSchema = z.infer<
  typeof emailServiceUpdateInputSchema
>;

export const emailServiceSendEmailInputSchema = z.object({
  to: z.array(z.string().email()),
  subject: z.string().nonempty(),
  from: z.string().optional(),
  text: z.string().optional(),
  html: z.string().optional(),
});
export type EmailServiceSendEmailInputType = z.infer<
  typeof emailServiceSendEmailInputSchema
>;

export const emailServiceSendEmailOutputSchema = z.any();
export type EmailServiceSendEmailOutputType = z.infer<
  typeof emailServiceSendEmailOutputSchema
>;
