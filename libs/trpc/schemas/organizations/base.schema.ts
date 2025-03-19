import { z } from "zod";
import { STATUS_ENUM } from ".";

export const organizationInputSchema = z.object({
  _id: z.string().optional(),
  uuid: z.string().uuid().optional(),
  user_id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  status: STATUS_ENUM.optional(),
});
export type OrganizationInputSchema = z.infer<typeof organizationInputSchema>;

export const organizationOutputSchema = z.object({
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
export type OrganizationOutputSchema = z.infer<typeof organizationOutputSchema>;

export const organizationInsertInputSchema = z.object({
  user_id: z.string().nonempty(),
  name: z.string().nonempty(),
  description: z.string().optional(),
});
export type OrganizationInsertInputSchema = z.infer<
  typeof organizationInsertInputSchema
>;

export const organizationIdInputSchema = z
  .object({
    _id: z.string().optional(),
    uuid: z.string().uuid().optional(),
  })
  .refine((data) => !Object.values(data).every((value) => !value));
export type OrganizationIdInputSchema = z.infer<
  typeof organizationIdInputSchema
>;

export const organizationUpdateInputSchema = z.object({
  user_id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  status: STATUS_ENUM.optional(),
});
export type OrganizationUpdateInputSchema = z.infer<
  typeof organizationUpdateInputSchema
>;
