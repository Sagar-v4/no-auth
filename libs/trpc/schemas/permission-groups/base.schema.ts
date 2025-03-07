import { z } from "zod";
import { STATUS_ENUM } from ".";

export const permissionGroupInputSchema = z.object({
  _id: z.string().optional(),
  uuid: z.string().uuid().optional(),
  client_id: z.string().optional(),
  organization_id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  active_permission_ids: z.array(z.string()).optional(),
  inactive_permission_ids: z.array(z.string()).optional(),
  status: STATUS_ENUM.optional(),
});
export type PermissionGroupInputSchema = z.infer<
  typeof permissionGroupInputSchema
>;

export const permissionGroupOutputSchema = z.object({
  _id: z.custom<any>(),
  uuid: z.string().uuid().nonempty(),
  client_id: z.string().nonempty(),
  organization_id: z.string().nonempty(),
  name: z.string().nonempty(),
  description: z.string().optional(),
  active_permission_ids: z.array(z.string()).nonempty(),
  inactive_permission_ids: z.array(z.string()).nonempty(),
  status: STATUS_ENUM,
  metadata: z.object({}).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type PermissionGroupOutputSchema = z.infer<
  typeof permissionGroupOutputSchema
>;

export const permissionGroupInsertInputSchema = z.object({
  client_id: z.string().nonempty(),
  organization_id: z.string().nonempty(),
  name: z.string().nonempty(),
  description: z.string().optional(),
});
export type PermissionGroupInsertInputSchema = z.infer<
  typeof permissionGroupInsertInputSchema
>;

export const permissionGroupIdInputSchema = z
  .object({
    _id: z.string().optional(),
    uuid: z.string().uuid().optional(),
  })
  .refine((data) => !Object.values(data).every((value) => !value));
export type PermissionGroupIdInputSchema = z.infer<
  typeof permissionGroupIdInputSchema
>;

export const permissionGroupUpdateInputSchema = z.object({
  client_id: z.string().optional(),
  organization_id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  active_permission_ids: z.array(z.string()).optional(),
  inactive_permission_ids: z.array(z.string()).optional(),
  status: STATUS_ENUM.optional(),
});
export type PermissionGroupUpdateInputSchema = z.infer<
  typeof permissionGroupUpdateInputSchema
>;
