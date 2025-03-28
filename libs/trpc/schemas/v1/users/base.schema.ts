import { z } from "zod";
import { LOGIN_METHODS_ENUM, STATUS_ENUM } from ".";

export const userInput = z.object({
  _id: z.string().optional(),
  uuid: z.string().uuid().optional(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  organization_uuid: z.string().uuid().optional(),
  login_method: LOGIN_METHODS_ENUM.optional(),
  status: STATUS_ENUM.optional(),
  roles: z.array(z.string()).optional(),
});
export type UserDataInput = z.infer<typeof userInput>;

export const userOutput = z.object({
  _id: z.custom<any>(),
  uuid: z.string().uuid().nonempty(),
  name: z.string().optional(),
  email: z.string().email().nonempty(),
  organization_uuid: z.string().uuid().nonempty(),
  login_method: LOGIN_METHODS_ENUM,
  status: STATUS_ENUM,
  roles: z.array(z.string()).optional(),
  metadata: z.object({}).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type UserOutput = z.infer<typeof userOutput>;

export const userInsertInput = z.object({
  name: z.string().optional(),
  email: z.string().email().nonempty(),
  organization_uuid: z.string().uuid().nonempty(),
  login_method: LOGIN_METHODS_ENUM.optional(),
  roles: z.array(z.string()).optional(),
});
export type UserInsertInput = z.infer<typeof userInsertInput>;

export const userIdInput = z
  .object({
    _id: z.string().optional(),
    uuid: z.string().uuid().optional(),
  })
  .refine((data) => !Object.values(data).every((value) => !value));
export type UserIdInput = z.infer<typeof userIdInput>;

export const userUpdateInput = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  organization_uuid: z.string().uuid().optional(),
  login_method: LOGIN_METHODS_ENUM.optional(),
  status: STATUS_ENUM.optional(),
  roles: z.array(z.string()).optional(),
});
export type UserUpdateInput = z.infer<typeof userUpdateInput>;

export const useUser = z.object({
  _id: z.custom<any>(),
  name: z.string().nonempty(),
  uuid: z.string().uuid().nonempty(),
  email: z.string().email().nonempty(),
  login_method: LOGIN_METHODS_ENUM,
  status: STATUS_ENUM,
  roles: z.array(z.string()),
  createdAt: z.date(),
});
export type UseUser = z.infer<typeof useUser>;
