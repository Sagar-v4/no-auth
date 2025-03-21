import { z } from "zod";
import { STATUS_ENUM } from ".";

export const permissionInput = z.object({
  _id: z.string().optional(),
  uuid: z.string().uuid().optional(),
  user_id: z.string().optional(),
  organization_id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  permission: z.string().optional(),
  status: STATUS_ENUM.optional(),
});
export type PermissionInput = z.infer<typeof permissionInput>;

export const permissionOutput = z.object({
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
export type PermissionOutput = z.infer<typeof permissionOutput>;

export const permissionInsertInput = z.object({
  user_id: z.string().nonempty(),
  organization_id: z.string().nonempty(),
  name: z.string().nonempty(),
  description: z.string().optional(),
});
export type PermissionInsertInput = z.infer<typeof permissionInsertInput>;

export const permissionIdInput = z
  .object({
    _id: z.string().optional(),
    uuid: z.string().uuid().optional(),
  })
  .refine((data) => !Object.values(data).every((value) => !value));
export type PermissionIdInput = z.infer<typeof permissionIdInput>;

export const permissionUpdateInput = z.object({
  user_id: z.string().optional(),
  organization_id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  permission: z.string().optional(),
  status: STATUS_ENUM.optional(),
});
export type PermissionUpdateInput = z.infer<typeof permissionUpdateInput>;
