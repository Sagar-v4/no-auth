import { z } from "zod";
import { STATUS_ENUM } from ".";

export const roleInputSchema = z.object({
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
export type RoleInputSchema = z.infer<typeof roleInputSchema>;

export const roleOutputSchema = z.object({
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
export type RoleOutputSchema = z.infer<typeof roleOutputSchema>;

export const roleInsertInputSchema = z.object({
  user_id: z.string().nonempty(),
  organization_id: z.string().nonempty(),
  name: z.string().nonempty(),
  description: z.string().optional(),
});
export type RoleInsertInputSchema = z.infer<typeof roleInsertInputSchema>;

export const roleIdInputSchema = z
  .object({
    _id: z.string().optional(),
    uuid: z.string().uuid().optional(),
  })
  .refine((data) => !Object.values(data).every((value) => !value));
export type RoleIdInputSchema = z.infer<typeof roleIdInputSchema>;

export const roleUpdateInputSchema = z.object({
  user_id: z.string().optional(),
  organization_id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  active_permission_ids: z.array(z.string()).optional(),
  inactive_permission_ids: z.array(z.string()).optional(),
  status: STATUS_ENUM.optional(),
});
export type RoleUpdateInputSchema = z.infer<typeof roleUpdateInputSchema>;
