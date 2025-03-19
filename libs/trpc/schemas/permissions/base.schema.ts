import { z } from "zod";
import { STATUS_ENUM } from ".";

export const permissionInputSchema = z.object({
  _id: z.string().optional(),
  uuid: z.string().uuid().optional(),
  user_id: z.string().optional(),
  organization_id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  permission: z.string().optional(),
  status: STATUS_ENUM.optional(),
});
export type PermissionInputSchema = z.infer<typeof permissionInputSchema>;

export const permissionOutputSchema = z.object({
  _id: z.custom<any>(),
  uuid: z.string().uuid().nonempty(),
  user_id: z.string().nonempty(),
  organization_id: z.string().nonempty(),
  name: z.string().nonempty(),
  description: z.string().optional(),
  permission: z.string().nonempty(),
  status: STATUS_ENUM,
  metadata: z.object({}).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type PermissionOutputSchema = z.infer<typeof permissionOutputSchema>;

export const permissionInsertInputSchema = z.object({
  user_id: z.string().nonempty(),
  organization_id: z.string().nonempty(),
  name: z.string().nonempty(),
  description: z.string().optional(),
});
export type PermissionInsertInputSchema = z.infer<
  typeof permissionInsertInputSchema
>;

export const permissionIdInputSchema = z
  .object({
    _id: z.string().optional(),
    uuid: z.string().uuid().optional(),
  })
  .refine((data) => !Object.values(data).every((value) => !value));
export type PermissionIdInputSchema = z.infer<typeof permissionIdInputSchema>;

export const permissionUpdateInputSchema = z.object({
  user_id: z.string().optional(),
  organization_id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  permission: z.string().optional(),
  status: STATUS_ENUM.optional(),
});
export type PermissionUpdateInputSchema = z.infer<
  typeof permissionUpdateInputSchema
>;
