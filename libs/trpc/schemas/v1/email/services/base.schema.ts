import { z } from "zod";

export const emailServiceInput = z.object({
  _id: z.string().optional(),
  uuid: z.string().uuid().optional(),
  user_id: z.string().optional(),
  device_id: z.string().optional(),
});
export type EmailServiceInput = z.infer<typeof emailServiceInput>;

export const emailServiceOutput = z.object({
  _id: z.custom<any>(),
  uuid: z.string().uuid().nonempty(),
  user_id: z.string().nonempty(),
  device_id: z.string().nonempty(),
  metadata: z.object({}).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type EmailServiceOutput = z.infer<typeof emailServiceOutput>;

export const emailServiceInsertInput = z.object({
  user_id: z.string().nonempty(),
  device_id: z.string().nonempty(),
  metadata: z.object({}),
});
export type EmailServiceInsertInput = z.infer<typeof emailServiceInsertInput>;

export const emailServiceIdInput = z
  .object({
    _id: z.string().optional(),
    uuid: z.string().uuid().optional(),
  })
  .refine((data) => !Object.values(data).every((value) => !value));
export type EmailServiceIdInput = z.infer<typeof emailServiceIdInput>;

export const emailServiceUpdateInput = z.object({
  user_id: z.string().optional(),
  device_id: z.string().optional(),
});
export type EmailServiceUpdateInput = z.infer<typeof emailServiceUpdateInput>;

export const emailServiceSendEmailInput = z.object({
  to: z.array(z.string().email()),
  subject: z.string().nonempty(),
  from: z.string().optional(),
  text: z.string().optional(),
  html: z.string().optional(),
});
export type EmailServiceSendEmailInput = z.infer<
  typeof emailServiceSendEmailInput
>;

export const emailServiceSendEmailOutput = z.any();
export type EmailServiceSendEmailOutput = z.infer<
  typeof emailServiceSendEmailOutput
>;
