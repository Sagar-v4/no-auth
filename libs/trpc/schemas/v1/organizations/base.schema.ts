import { z } from "zod";
import { STATUS_ENUM } from ".";

export const organizationInput = z.object({
  _id: z.string().optional(),
  uuid: z.string().uuid().optional(),
  user_id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  status: STATUS_ENUM.optional(),
});
export type OrganizationInput = z.infer<typeof organizationInput>;

export const organizationOutput = z.object({
  _id: z.custom<any>(),
  uuid: z.string().uuid().nonempty(),
  user_id: z.string().nonempty(),
  name: z.string().nonempty(),
  description: z.string().optional(),
  status: STATUS_ENUM,
  metadata: z.object({}).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type OrganizationOutput = z.infer<typeof organizationOutput>;

export const organizationInsertInput = z.object({
  user_id: z.string().nonempty(),
  uuid: z.string().uuid().optional(),
  name: z.string().nonempty(),
  description: z.string().optional(),
});
export type OrganizationInsertInput = z.infer<typeof organizationInsertInput>;

export const organizationIdInput = z
  .object({
    _id: z.string().optional(),
    uuid: z.string().uuid().optional(),
  })
  .refine((data) => !Object.values(data).every((value) => !value));
export type OrganizationIdInput = z.infer<typeof organizationIdInput>;

export const organizationUpdateInput = z.object({
  user_id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  status: STATUS_ENUM.optional(),
});
export type OrganizationUpdateInput = z.infer<typeof organizationUpdateInput>;
