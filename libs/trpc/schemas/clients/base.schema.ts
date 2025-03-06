import { z } from "zod";
import { LOGIN_METHODS_ENUM, ROLES_ENUM, STATUS_ENUM } from ".";

export const clientInputSchema = z.object({
  _id: z.string().optional(),
  uuid: z.string().uuid().optional(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  login_method: LOGIN_METHODS_ENUM.optional(),
  status: STATUS_ENUM.optional(),
  roles: ROLES_ENUM.optional(),
});
export type ClientDataInputType = z.infer<typeof clientInputSchema>;

export const clientOutputSchema = z.object({
  _id: z.custom<any>(),
  uuid: z.string().uuid().nonempty(),
  name: z.string().nonempty(),
  email: z.string().email().nonempty(),
  login_method: LOGIN_METHODS_ENUM,
  status: STATUS_ENUM,
  roles: z.array(ROLES_ENUM),
  metadata: z.object({}).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type ClientOutputSchema = z.infer<typeof clientOutputSchema>;

export const clientInsertInputSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email().nonempty(),
});
export type ClientInsertInputSchema = z.infer<typeof clientInsertInputSchema>;

export const clientIdInputSchema = z
  .object({
    _id: z.string().optional(),
    uuid: z.string().uuid().optional(),
  })
  .refine((data) => !Object.values(data).every((value) => !value));
export type ClientIdInputSchema = z.infer<typeof clientIdInputSchema>;

export const clientUpdateInputSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  login_method: LOGIN_METHODS_ENUM.optional(),
  status: STATUS_ENUM.optional(),
  roles: z.array(ROLES_ENUM),
});
export type ClientUpdateInputSchema = z.infer<typeof clientUpdateInputSchema>;
