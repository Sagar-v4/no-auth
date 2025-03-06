import { z } from "zod";
import { STATUS_ENUM, TYPES_ENUM } from ".";

export const emailAppInputSchema = z.object({
  _id: z.string().optional(),
  uuid: z.string().uuid().optional(),
  client_id: z.string().optional(),
  organization_id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  type: TYPES_ENUM.optional(),
  status: STATUS_ENUM.optional(),
});
export type EmailAppInputSchema = z.infer<typeof emailAppInputSchema>;

export const emailAppMetadataSchema = z.object({
  email: z.string().email(),
  password: z.string().nonempty(),
});
export type EmailAppMetadataSchema = z.infer<typeof emailAppMetadataSchema>;

export const emailAppOutputSchema = z.object({
  _id: z.custom<any>(),
  uuid: z.string().uuid().nonempty(),
  client_id: z.string().nonempty(),
  organization_id: z.string().nonempty(),
  name: z.string().nonempty(),
  description: z.string().optional(),
  type: TYPES_ENUM,
  status: STATUS_ENUM,
  metadata: emailAppMetadataSchema.optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type EmailAppOutputSchema = z.infer<typeof emailAppOutputSchema>;

export const emailAppInsertInputSchema = z.object({
  client_id: z.string().nonempty(),
  organization_id: z.string().nonempty(),
  name: z.string().nonempty(),
  description: z.string().optional(),
  metadata: emailAppMetadataSchema,
});
export type EmailAppInsertInputSchema = z.infer<
  typeof emailAppInsertInputSchema
>;

export const emailAppIdInputSchema = z
  .object({
    _id: z.string().optional(),
    uuid: z.string().uuid().optional(),
  })
  .refine((data) => !Object.values(data).every((value) => !value));
export type EmailAppIdInputSchema = z.infer<typeof emailAppIdInputSchema>;

export const emailAppUpdateInputSchema = z.object({
  client_id: z.string().optional(),
  organization_id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  type: TYPES_ENUM.optional(),
  status: STATUS_ENUM.optional(),
});
export type EmailAppUpdateInputSchema = z.infer<
  typeof emailAppUpdateInputSchema
>;
