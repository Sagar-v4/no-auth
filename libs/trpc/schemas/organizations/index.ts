import { z } from "zod";

export const organizationInputSchema = z.object({
  _id: z.string().optional(),
  uuid: z.string().uuid().optional(),
  client_id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  status: z.string().optional(),
});
export type OrganizationInputSchema = z.infer<typeof organizationInputSchema>;

export const organizationOutputSchema = z.object({
  _id: z.custom<any>(),
  uuid: z.string().uuid().nonempty(),
  client_id: z.string().nonempty(),
  name: z.string().nonempty(),
  description: z.string().optional(),
  status: z.string().nonempty(),
  metadata: z.object({}).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type OrganizationOutputSchema = z.infer<typeof organizationOutputSchema>;

export const organizationInsertInputSchema = z.object({
  client_id: z.string().nonempty(),
  name: z.string().nonempty(),
  description: z.string().optional(),
});
export type OrganizationInsertInputSchema = z.infer<
  typeof organizationInsertInputSchema
>;

export const organizationIdInputSchema = z.object({
  _id: z.string().optional(),
  uuid: z.string().uuid().optional(),
});
export type OrganizationIdInputSchema = z.infer<
  typeof organizationIdInputSchema
>;

export const organizationUpdateInputSchema = z.object({
  client_id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  status: z.string().optional(),
});
export type OrganizationUpdateInputSchema = z.infer<
  typeof organizationUpdateInputSchema
>;
