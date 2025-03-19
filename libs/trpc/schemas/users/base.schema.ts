import { z } from "zod";
import { LOGIN_METHODS_ENUM, STATUS_ENUM } from ".";

export const userInputSchema = z.object({
  _id: z.string().optional(),
  uuid: z.string().uuid().optional(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  organization_id: z.string().optional(),
  login_method: LOGIN_METHODS_ENUM.optional(),
  status: STATUS_ENUM.optional(),
  roles: z.array(z.string()).optional(),
});
export type UserDataInputType = z.infer<typeof userInputSchema>;

export const userOutputSchema = z.object({
  _id: z.custom<any>(),
  uuid: z.string().uuid().nonempty(),
  name: z.string().optional(),
  email: z.string().email().nonempty(),
  organization_id: z.string().optional(),
  login_method: LOGIN_METHODS_ENUM,
  status: STATUS_ENUM,
  roles: z.array(z.string()).optional(),
  metadata: z.object({}).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type UserOutputSchema = z.infer<typeof userOutputSchema>;

export const userInsertInputSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().nonempty(),
  organization_id: z.string().optional(),
  roles: z.array(z.string()).optional(),
});
export type UserInsertInputSchema = z.infer<typeof userInsertInputSchema>;

export const userIdInputSchema = z
  .object({
    _id: z.string().optional(),
    uuid: z.string().uuid().optional(),
  })
  .refine((data) => !Object.values(data).every((value) => !value));
export type UserIdInputSchema = z.infer<typeof userIdInputSchema>;

export const userUpdateInputSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  organization_id: z.string().optional(),
  login_method: LOGIN_METHODS_ENUM.optional(),
  status: STATUS_ENUM.optional(),
  roles: z.array(z.string()).optional(),
});
export type UserUpdateInputSchema = z.infer<typeof userUpdateInputSchema>;
