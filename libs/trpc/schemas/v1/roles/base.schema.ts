import { z } from "zod";
import { STATUS_ENUM } from ".";

export const roleInput = z.object({
  _id: z.string().optional(),
  uuid: z.string().uuid().optional(),
  user_id: z.string().optional(),
  organization_id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  active_permission_ids: z.array(z.string()).optional(),
  inactive_permission_ids: z.array(z.string()).optional(),
  status: STATUS_ENUM.optional(),
});
export type RoleInput = z.infer<typeof roleInput>;

export const roleOutput = z.object({
  _id: z.custom<any>(),
  uuid: z.string().uuid().nonempty(),
  user_id: z.string().nonempty(),
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
export type RoleOutput = z.infer<typeof roleOutput>;

export const roleInsertInput = z.object({
  user_id: z.string().nonempty(),
  organization_id: z.string().nonempty(),
  name: z.string().nonempty(),
  description: z.string().optional(),
});
export type RoleInsertInput = z.infer<typeof roleInsertInput>;

export const roleIdInput = z
  .object({
    _id: z.string().optional(),
    uuid: z.string().uuid().optional(),
  })
  .refine((data) => !Object.values(data).every((value) => !value));
export type RoleIdInput = z.infer<typeof roleIdInput>;

export const roleUpdateInput = z.object({
  user_id: z.string().optional(),
  organization_id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  active_permission_ids: z.array(z.string()).optional(),
  inactive_permission_ids: z.array(z.string()).optional(),
  status: STATUS_ENUM.optional(),
});
export type RoleUpdateInput = z.infer<typeof roleUpdateInput>;
